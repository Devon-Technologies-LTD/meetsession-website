import { cookies } from "next/headers";
import * as jose from "jose";

type AuthTokens = {
  accessToken: string;
  refreshToken?: string;
};

interface AuthServiceOptions {
  secret: string; // used for token encryption
  cookieNames?: { access?: string; refresh?: string };
  setCookie?: (name: string, value: string) => Promise<void> | void;
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
  };

  const key = new TextEncoder().encode(options.secret);

  // -------- Encryption Helpers --------
  async function encryptToken(token: string): Promise<string> {
    const jwe = await new jose.EncryptJWT({ token })
      .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
      .setIssuedAt()
      .setExpirationTime("1h") // encryption envelope lifetime (not JWT exp)
      .encrypt(key);
    return jwe;
  }

  async function decryptToken(encrypted: string): Promise<string | null> {
    try {
      const { payload } = await jose.jwtDecrypt(encrypted, key);
      return payload.token as string;
    } catch {
      return null;
    }
  }

  // -------- Core Methods --------
  async function storeTokens(tokens: AuthTokens) {
    if (!tokens.accessToken) throw new Error("Missing access token");

    const cookieStore = await cookies();
    const encryptedAccess = await encryptToken(tokens.accessToken);
    cookieStore.set(cookieNames.access, encryptedAccess, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    if (tokens.refreshToken) {
      const encryptedRefresh = await encryptToken(tokens.refreshToken);
      cookieStore.set(cookieNames.refresh, encryptedRefresh, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
      });
    }
  }

  async function getAccessToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const encrypted = cookieStore.get(cookieNames.access)?.value;
    if (!encrypted) return null;
    return await decryptToken(encrypted);
  }

  async function getRefreshToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const encrypted = cookieStore.get(cookieNames.refresh)?.value;
    if (!encrypted) return null;
    return await decryptToken(encrypted);
  }

  async function clearTokens() {
    const cookieStore = await cookies();
    cookieStore.delete(cookieNames.access);
    cookieStore.delete(cookieNames.refresh);
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
    getAccessToken,
    getRefreshToken,
    clearTokens,
    isAccessTokenValid,
    isRefreshTokenValid,
  };
}
