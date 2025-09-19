"use server";

import z from "zod";
import { loginSchema, TTokens, TUser } from "@/lib/schemas";
import { createApiClient } from "@/lib/api-client";
import { BASE_URL } from "@/lib/constants";
import { createAuthService } from "@/lib/auth-service";
import { SECRET_KEY, ALGORITHM } from "@/lib/constants";
import { setServerCookie } from "./set-cookie";

const apiClient = createApiClient({
  baseURL: BASE_URL,
});
const auth = createAuthService({
  secret: SECRET_KEY,
  algorithm: ALGORITHM,
  setCookie: setServerCookie,
});

export async function loginAction(formdata: FormData) {
  const dirty = Object.fromEntries(formdata);
  const result = loginSchema.safeParse(dirty);
  if (!result.success) {
    const errs = z.flattenError(result.error).fieldErrors;
    return {
      success: false,
      message: result.error.message,
      errors: errs,
      data: null,
      initialData: dirty,
    };
  }
  const res = await apiClient.unauthenticated<{
    token: TTokens;
    user_details: TUser;
  }>("/auth/login", {
    method: "POST",
    data: result.data,
  });
  if (!res.ok) {
    return {
      success: res.ok,
      errors: res.error,
      message: "Failed request",
      data: null,
      initialData: dirty,
    };
  } else {
    await auth.storeTokens({ accessToken: res.data.token });
    return {
      success: res.ok,
      data: res.data,
      errors: null,
      message: "Successful request",
      initialData: dirty,
    };
  }
}
