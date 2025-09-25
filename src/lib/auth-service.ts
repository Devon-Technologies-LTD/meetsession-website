import { cookies } from "next/headers";
import * as jose from "jose";
import { TTokens, TUser } from "./schemas";
import { decodeToken, decryptToken as tokenDecryptor } from "./utils";

type AuthTokens = {
  accessToken: string;
  refreshToken?: string;
};

interface AuthServiceOptions {
  secret: string; // used for token encryption
  algorithm?: string;
  cookieNames?: { access?: string; refresh?: string; user?: string };
  setCookie?: (
    name: string,
    value: string,
    options?: Record<string, string | number | Date>,
  ) => Promise<void> | void;
  logger?: { log: (msg: string) => void; error: (msg: string) => void };
}

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

export function createAuthService(options: AuthServiceOptions) {
  const cookieNames = {
    access: options.cookieNames?.access ?? "access_token",
    refresh: options.cookieNames?.refresh ?? "refresh_token",
    user: options.cookieNames?.user ?? "user_details",
  };

  const key = new TextEncoder().encode(options.secret);

  // -------- Encryption Helpers --------
  async function encryptToken(token: string): Promise<string> {
    return new jose.SignJWT({ token })
      .setProtectedHeader({ alg: options?.algorithm || "HS256" })
      .sign(key);
  }

  async function decryptToken(
    encrypted: string,
  ): Promise<{ user_details: TUser; token: TTokens } | null> {
    return tokenDecryptor({ algorithm: options?.algorithm, encrypted, key });
  }

  // -------- Core Methods --------
  async function storeTokens(data: { user?: TUser; tokens: AuthTokens }) {
    if (!data.tokens.accessToken) throw new Error("Missing access token");

    if (!options.setCookie) {
      throw new Error(
        "setCookie callback not provided. You must call storeTokens from a Server Action or Route Handler with setCookie configured.",
      );
    }

    const duration = 24 * 60 * 60 * 1000;

    const decryptedToken = decodeToken(data.tokens.accessToken);
    const expires = decryptedToken.exp
      ? decryptedToken.exp * 1000
      : new Date(Date.now() + duration);

    const encryptedAccess = await encryptToken(data.tokens.accessToken);
    await options.setCookie(cookieNames.access, encryptedAccess, { expires });

    if (data.user) {
      const encryptedUserDetails = await encryptToken(
        JSON.stringify(data.user),
      );
      await options.setCookie(cookieNames.user, encryptedUserDetails, {
        expires,
      });
    }

    if (data.tokens.refreshToken) {
      const decryptedToken = decodeToken(data.tokens.refreshToken);
      const expires = decryptedToken.exp
        ? decryptedToken.exp * 1000
        : new Date(Date.now() + duration);
      const encryptedRefresh = await encryptToken(data.tokens.refreshToken);
      await options.setCookie(cookieNames.refresh, encryptedRefresh, {
        expires,
      });
    }
  }

  async function getAccessToken(): Promise<TTokens | null | undefined> {
    const cookieStore = await cookies();
    const encrypted = cookieStore.get(cookieNames.access)?.value;
    if (!encrypted) return null;
    const tok = await decryptToken(encrypted);
    return tok?.token;
  }

  async function getRefreshToken(): Promise<string | null | undefined> {
    const cookieStore = await cookies();
    const encrypted = cookieStore.get(cookieNames.refresh)?.value;
    if (!encrypted) return null;
    const tok = await decryptToken(encrypted);
    return tok?.token;
  }

  async function clearTokens() {
    if (!options.setCookie) {
      throw new Error(
        "setCookie callback not provided. You must call clearTokens from a Server Action or Route Handler with setCookie configured.",
      );
    }
    await options.setCookie(cookieNames.access, "");
    await options.setCookie(cookieNames.refresh, "");
    await options.setCookie(cookieNames.user, "");
  }

  async function getUserDetails(): Promise<TUser | null | undefined> {
    const cookieStore = await cookies();
    const encrypted = cookieStore.get(cookieNames.user)?.value;
    if (!encrypted) return null;
    const user = await decryptToken(encrypted);
    if (!user) return null;
    return JSON.parse(user.token);
  }

  async function isAccessTokenValid(): Promise<boolean> {
    const token = await getAccessToken();
    if (!token) return false;
    const { exp } = decodeJwt(token);
    return exp ? Date.now() < exp * 1000 : true;
  }

  async function isRefreshTokenValid(): Promise<boolean> {
    const token = await getRefreshToken();
    if (!token) return false;
    const { exp } = decodeJwt(token);
    return exp ? Date.now() < exp * 1000 : true;
  }

  return {
    storeTokens,
    getUserDetails,
    getAccessToken,
    getRefreshToken,
    clearTokens,
    isAccessTokenValid,
    isRefreshTokenValid,
    encryptToken,
    decryptToken,
  };
}
