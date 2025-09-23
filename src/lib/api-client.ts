import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import { cookies } from "next/headers";
import { decodeToken, decryptToken as tokenDecryptor } from "./utils";
import { ALGORITHM, SECRET_KEY } from "./constants";

// ---------------- Types ----------------
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ApiClientOptions = {
  baseURL: string;
  getAccessToken?: () => Promise<string | null> | string | null;
  refreshToken?: () => Promise<{
    accessToken: string;
    refreshToken?: string;
  } | null>;
  logout?: () => Promise<void> | void;
  enableRefresh?: boolean;
  setCookie?: (name: string, value: string) => Promise<void> | void;
  cookieNames?: { access?: string; refresh?: string };
  timeout?: number; // request timeout in ms (default: 10000)
  logger?: { log: (msg: string) => void; error: (msg: string) => void };
};

type RequestOptions<TData = unknown> = {
  method?: HttpMethod;
  data?: TData;
  headers?: Record<string, string>;
  signal?: AbortSignal; // for abort support
};

export type ApiResponse<T> =
  | { ok: true; data: T; status?: number }
  | { ok: false; error: string; status?: number };

// Internal
interface RetryableConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

// ---------------- Utils ----------------
/*
function decodeJwt(token: string): { exp?: number } {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString(),
    );
    return payload;
  } catch {
    return {};
  }
}
*/

// ---------------- Client ----------------
class ApiClient {
  private baseURL: string;
  private getAccessToken?: ApiClientOptions["getAccessToken"];
  private refreshToken?: ApiClientOptions["refreshToken"];
  private logout?: ApiClientOptions["logout"];
  private setCookie?: ApiClientOptions["setCookie"];
  private cookieNames: { access: string; refresh: string };
  private enableRefresh: boolean;
  private axios: AxiosInstance;
  private logger?: ApiClientOptions["logger"];

  // refresh lock
  private refreshPromise: Promise<string | null> | null = null;

  constructor(options: ApiClientOptions) {
    this.baseURL = options.baseURL;
    this.getAccessToken = options.getAccessToken;
    this.refreshToken = options.refreshToken;
    this.logout = options.logout;
    this.setCookie = options.setCookie;
    this.cookieNames = {
      access: options.cookieNames?.access ?? "access_token",
      refresh: options.cookieNames?.refresh ?? "refresh_token",
    };
    this.enableRefresh = options.enableRefresh ?? false;
    this.logger = options.logger;

    this.axios = axios.create({
      baseURL: this.baseURL,
      timeout: options.timeout ?? 10000,
    });

    if (this.enableRefresh && this.refreshToken) {
      this.axios.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
          const originalConfig = error.config as RetryableConfig;

          if (
            error.response?.status === 401 &&
            this.refreshToken &&
            !originalConfig._retry
          ) {
            originalConfig._retry = true;
            this.logger?.log("401 received, attempting token refresh...");

            try {
              const newToken = await this.handleTokenRefresh();
              if (newToken && originalConfig.headers) {
                originalConfig.headers["Authorization"] = `Bearer ${newToken}`;
              }
              return this.axios(originalConfig);
            } catch (refreshError) {
              this.logger?.error("Token refresh failed");
              if (this.logout) await this.logout();
              return Promise.reject(refreshError);
            }
          }

          return Promise.reject(error);
        },
      );
    }
  }

  // -------- Token Management --------
  private async resolveToken(): Promise<string | null> {
    let token: string | null = null;
    let retrieved: string | null = null;

    if (this.getAccessToken) {
      retrieved = await this.getAccessToken();
    } else {
      const cookieStore = await cookies();
      retrieved = cookieStore.get(this.cookieNames.access)?.value ?? null;
    }
    const key = new TextEncoder().encode(SECRET_KEY);
    const decrypted = await tokenDecryptor({
      algorithm: ALGORITHM,
      encrypted: retrieved,
      key,
    });
    token = decrypted?.token ?? null;

    if (!token) return null;

    // Pre-check JWT expiry

    const decoded = decodeToken(token);
    const { exp } = decoded;
    if (exp && Date.now() >= exp * 1000) {
      this.logger?.log("Token expired before request");

      // If refresh is enabled, try refresh instead of immediate logout
      if (this.enableRefresh && this.refreshToken) {
        try {
          const refreshed = await this.handleTokenRefresh();
          if (refreshed) {
            this.logger?.log("Token successfully refreshed");
            return refreshed;
          }
        } catch {
          this.logger?.error("Token refresh failed before request");
          if (this.logout) await this.logout();
          return null;
        }
      }

      // Otherwise logout immediately
      if (this.logout) await this.logout();
      return null;
    }

    /*
    const { exp } = decodeJwt(token);
    if (exp && Date.now() >= exp * 1000) {
      this.logger?.log("Token expired before request, triggering logout...");
      if (this.logout) await this.logout();
      return null;
    }
    */

    return token;
  }

  private async storeToken(name: string, value: string) {
    if (this.setCookie) {
      await this.setCookie(name, value);
    } else {
      (await cookies()).set(name, value, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
      });
    }
  }

  private async handleTokenRefresh(): Promise<string | null> {
    if (!this.refreshToken) return null;

    if (!this.refreshPromise) {
      this.refreshPromise = (async () => {
        const tokens = await this.refreshToken!();
        if (tokens?.accessToken) {
          await this.storeToken(this.cookieNames.access, tokens.accessToken);
        }
        if (tokens?.refreshToken) {
          await this.storeToken(this.cookieNames.refresh, tokens.refreshToken);
        }
        return tokens?.accessToken ?? null;
      })();

      // Reset after resolve
      this.refreshPromise.finally(() => {
        this.refreshPromise = null;
      });
    }

    return this.refreshPromise;
  }

  // -------- Request Methods --------
  async unauthenticated<TResponse = unknown, TData = unknown>(
    path: string,
    options: RequestOptions<TData> = {},
  ): Promise<ApiResponse<TResponse>> {
    try {
      const { method = "GET", data, headers, signal } = options;

      this.validateDataForWriteRequest(method, data);

      const response = await this.axios.request<TResponse>({
        url: path,
        method,
        data,
        headers,
        signal,
      });

      return { ok: true, data: response.data, status: response.status };
    } catch (err) {
      const errorMsg = this.extractError(err);
      return { ok: false, error: errorMsg.message, status: errorMsg.status };
    }
  }

  async authenticated<TResponse = unknown, TData = unknown>(
    path: string,
    options: RequestOptions<TData> = {},
  ): Promise<ApiResponse<TResponse>> {
    try {
      const { method = "GET", data, headers, signal } = options;

      this.validateDataForWriteRequest(method, data);

      const token = await this.resolveToken();
      if (!token) {
        throw new Error("No access token available");
      }

      const response = await this.axios.request<TResponse>({
        url: path,
        method,
        data,
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
        signal,
      });

      return { ok: true, data: response.data };
    } catch (err) {
      const errorMsg = this.extractError(err);
      return { ok: false, error: errorMsg.message, status: errorMsg.status };
    }
  }

  // -------- Helpers --------
  private extractError(err: unknown): { message: string; status?: number } {
    if (axios.isAxiosError(err)) {
      return {
        message: err.response?.data?.message || err.message || "API Error",
        status: err.response?.status,
      };
    }
    if (err instanceof Error) return { message: err.message, status: 400 };
    return { message: "Unknown error", status: 500 };
  }

  private validateDataForWriteRequest<TData = undefined>(
    method: HttpMethod,
    data: TData,
  ) {
    if (["POST", "PUT", "PATCH"].includes(method) && !data) {
      throw new Error(`Data is required for ${method} requests`);
    }
  }
}

// ---------------- Factory ----------------
export function createApiClient(options: ApiClientOptions) {
  return new ApiClient(options);
}
