import { type NextRequest } from "next/server";
import { createAuthService } from "@/lib/auth-service";
import { SECRET_KEY, ALGORITHM } from "@/lib/constants";
import { setServerCookie } from "@/server/set-cookie";

const auth = createAuthService({
  secret: SECRET_KEY,
  algorithm: ALGORITHM,
  setCookie: setServerCookie,
});

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const accessToken = (searchParams.get("accessToken") as string) || "";
  await auth.storeTokens({ tokens: { accessToken: accessToken } });

  return Response.json(
    { message: "Tokens stored successfully" },
    { status: 200 },
  );
}
