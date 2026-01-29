import { NextRequest, NextResponse } from "next/server";
import { TLoginResponse } from "@/lib/types";
import { BASE_URL, SECRET_KEY, ALGORITHM } from "@/lib/constants";
import axios from "axios";
import { createAuthService } from "@/lib/auth-service";
import { setServerCookie } from "@/server/set-cookie";

const auth = createAuthService({
  secret: SECRET_KEY,
  algorithm: ALGORITHM,
  setCookie: setServerCookie,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id_token } = body;

    if (!id_token) {
      return NextResponse.json(
        { success: false, error: "Missing ID token" },
        { status: 400 },
      );
    }

    console.log("Using BASE_URL:", BASE_URL);
    console.log("Forwarding Google ID token to backend:", id_token ? id_token.substring(0, 20) + "..." : "undefined");

    // Forward the Google ID token to your backend using Axios directly as requested
    try {
      const axiosRes = await axios.post(`${BASE_URL}/auth/google`, { id_token });
      
      console.log("Backend response status:", axiosRes.status);
      console.log("Backend response data (Exact):", JSON.stringify(axiosRes.data, null, 2));

      // Handle the response structure based on the log
      // Assuming response is { message: string, data: { token, refresh_token, user_details } }
      const responseBody = axiosRes.data;
      const responseData = responseBody.data || responseBody; // Fallback if no data wrapper

      const { token, refresh_token, user_details } = responseData;

      if (!token) {
        console.error("Token missing in response data");
        return NextResponse.json(
          { success: false, error: "Authentication failed: No token received" },
          { status: 401 },
        );
      }

      // Store tokens using the centralized auth service (handles encryption)
      await auth.storeTokens({
        tokens: { 
          accessToken: token,
          refreshToken: refresh_token 
        },
        user: user_details,
      });

      // Create the response matching TLoginResponse structure in 'data'
      const response = NextResponse.json({ 
        success: true, 
        message: "Google authentication successful",
        data: {
          token,
          refresh_token,
          user_details
        }
      });

      return response;

    } catch (axiosError: any) {
      console.error("Axios request failed:", axiosError.message);
      if (axiosError.response) {
        console.error("Axios error response data:", JSON.stringify(axiosError.response.data, null, 2));
        return NextResponse.json(
          { success: false, error: axiosError.response.data.message || "Backend error" },
          { status: axiosError.response.status }
        );
      }
      throw axiosError;
    }

  } catch (error: any) {
    console.error("Error authenticating with Google:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}