import { NextResponse, type NextRequest } from "next/server";
import { createAuthService } from "./lib/auth-service";
import { ALGORITHM, SECRET_KEY } from "./lib/constants";
import { setServerCookie } from "./server/set-cookie";
import {
  apiPrefix,
  authPaths,
  DEFAULT_DASHBOARD_REDIRECT,
  DEFAULT_LOGIN_REDIRECT,
  protectedPaths,
} from "./routes";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const res = NextResponse.next();

  const auth = createAuthService({
    secret: SECRET_KEY,
    algorithm: ALGORITHM,
    setCookie: setServerCookie,
  });

  const { getAccessToken } = auth;
  const token = await getAccessToken();

  const isLoggedIn = !!token;

  const isApiRoute = pathname.startsWith(apiPrefix);
  const isProtectedRoute = protectedPaths.some((route) => {
    return pathname.startsWith(route);
  });
  const isAuthRoute = authPaths.some((route) => {
    return pathname.startsWith(route);
  });

  if (isApiRoute) return res;

  if (isAuthRoute) {
    if (isLoggedIn)
      return NextResponse.redirect(
        new URL(DEFAULT_DASHBOARD_REDIRECT, request.nextUrl),
      );
    return res;
  }

  if (isProtectedRoute) {
    if (isLoggedIn) return res;
    return NextResponse.redirect(
      new URL(DEFAULT_LOGIN_REDIRECT, request.nextUrl),
    );
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
