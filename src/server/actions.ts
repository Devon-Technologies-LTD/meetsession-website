"use server";

import z from "zod";
import {
  initiatePaymentSchema,
  loginSchema,
  resendOTPSchema,
  signupSchema,
  verifyEmailSchema,
  verifyPaymentSchema,
} from "@/lib/schemas";
import { createApiClient } from "@/lib/api-client";
import { BASE_URL } from "@/lib/constants";
import { createAuthService } from "@/lib/auth-service";
import { SECRET_KEY, ALGORITHM } from "@/lib/constants";
import { setServerCookie } from "./set-cookie";
import {
  TFullUser,
  TLoginResponse,
  TResentOTPResponse,
  TVerifyTokenResponse,
} from "@/lib/types";
import {
  TPaymentInitResponse,
  TPaymnetVerifyResponse,
} from "@/features/dashboard/lib/types";

const apiClient = createApiClient({
  baseURL: BASE_URL,
});

const auth = createAuthService({
  secret: SECRET_KEY,
  algorithm: ALGORITHM,
  setCookie: setServerCookie,
});

// user signin
export async function signoutAction() {
  await auth.clearTokens();
  return {
    success: true,
    errors: null,
    message: "Failed request",
    data: null,
  };
}

// user signin
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
  const res = await apiClient.unauthenticated<TLoginResponse>("/auth/login", {
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
    await auth.storeTokens({
      tokens: { accessToken: res.data.token },
      user: res.data.user_details,
    });
    return {
      success: res.ok,
      data: res.data,
      errors: null,
      message: "Successful request",
      initialData: dirty,
    };
  }
}

// user signup
export async function signupAction(formdata: FormData) {
  const dirty = Object.fromEntries(formdata);
  const result = signupSchema.safeParse(dirty);
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

  type TSignupResponse = TFullUser;
  const res = await apiClient.unauthenticated<TSignupResponse>("/auth/signup", {
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
    return {
      success: res.ok,
      data: res.data,
      errors: null,
      message: "Successful request",
      initialData: dirty,
    };
  }
}

// verify email
export async function verifyEmailAction(formdata: FormData) {
  const dirty = Object.fromEntries(formdata);
  const result = verifyEmailSchema.safeParse(dirty);
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

  const res = await apiClient.unauthenticated<TVerifyTokenResponse>(
    "/auth/verify",
    {
      method: "POST",
      data: result.data,
    },
  );
  if (!res.ok) {
    return {
      success: res.ok,
      errors: res.error,
      message: "Failed request",
      data: null,
      initialData: dirty,
    };
  } else {
    // await auth.storeTokens({ accessToken: res.data.token });
    return {
      success: res.ok,
      data: res.data,
      errors: null,
      message: "Successful request",
      initialData: dirty,
    };
  }
}

// resend otp
export async function resentOTPAction(formdata: FormData) {
  const dirty = Object.fromEntries(formdata);
  const result = resendOTPSchema.safeParse(dirty);
  if (!result.success) {
    const errs = z.flattenError(result.error).fieldErrors;
    return {
      success: false,
      message: result.error.message,
      errors: { email: errs.email ?? undefined },
      data: null,
      initialData: dirty,
    };
  }

  const res = await apiClient.unauthenticated<TResentOTPResponse>(
    "/auth/resend_otp",
    {
      method: "POST",
      data: result.data,
    },
  );
  if (!res.ok) {
    return {
      success: res.ok,
      errors: res.error,
      message: "Failed request",
      data: null,
      initialData: dirty,
    };
  } else {
    return {
      success: res.ok,
      data: res.data.data,
      errors: null,
      message: res.data.message,
      initialData: dirty,
    };
  }
}

export async function initializePaymentAction(
  _prev: unknown,
  formdata: FormData,
) {
  const dirty = Object.fromEntries(formdata);
  const result = initiatePaymentSchema.safeParse(dirty);
  if (!result.success) {
    const errs = z.flattenError(result.error).fieldErrors;
    const clientErr: {
      success: false;
      message: string;
      errors: { tier_id?: string[] };
      data: null;
      initialData: {
        [k: string]: FormDataEntryValue;
      };
    } = {
      success: false,
      message: result.error.message,
      errors: { tier_id: errs.tier_id ?? undefined },
      data: null,
      initialData: dirty,
    };
    return clientErr;
  }
  // tiers/initiate-payment
  const res = await apiClient.authenticated<TPaymentInitResponse>(
    `/tiers/initiate-payment`,
    {
      method: "POST",
      data: {
        tier_id: result.data.tier_id,
        subscription_type: result.data.subscription_type,
      },
    },
  );
  if (!res.ok) {
    return {
      success: res.ok,
      errors: res.error,
      message: "Failed request",
      data: null,
    };
  } else {
    return {
      success: res.ok,
      data: res.data,
      errors: null,
      message: "Successful request",
    };
  }
}

export async function verifyPaymentAction(_prev: unknown, formdata: FormData) {
  const dirty = Object.fromEntries(formdata);
  const result = verifyPaymentSchema.safeParse(dirty);
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

  const res = await apiClient.authenticated<TPaymnetVerifyResponse>(
    `/subscriptions/verify-payment/${result.data.reference}`,
    {
      method: "GET",
    },
  );
  if (!res.ok) {
    return {
      success: res.ok,
      errors: res.error,
      message: "Failed request",
      data: null,
    };
  } else {
    return {
      success: res.ok,
      data: res.data,
      errors: null,
      message: "Successful request",
    };
  }
}
