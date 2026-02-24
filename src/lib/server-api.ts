import { createApiClient } from "@/lib/api-client";
import { createAuthService } from "@/lib/auth-service";
import { BASE_URL, SECRET_KEY, ALGORITHM } from "@/lib/constants";
import { setServerCookie } from "@/server/set-cookie";

export const auth = createAuthService({
    secret: SECRET_KEY,
    algorithm: ALGORITHM,
    baseURL: BASE_URL,
    setCookie: setServerCookie,
});

export const apiClient = createApiClient({
    baseURL: BASE_URL,
    enableRefresh: true,
    skipTokenStorage: true,
    getAccessToken: async () => {
        return (await auth.getAccessToken()) ?? null;
    },
    refreshToken: async () => {
        const newToken = await auth.refreshTokens();
        if (newToken) {
            return { accessToken: newToken };
        }
        return null;
    },
    logout: async () => {
        await auth.clearTokens();
    }
});
