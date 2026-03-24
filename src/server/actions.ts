"use server";

import { cookies, headers } from "next/headers";
import z from "zod";
import {
  initiatePaymentSchema,
  loginSchema,
  resendOTPSchema,
  signupSchema,
  trialStartSchema,
  validateCouponCodeSchema,
  verifyEmailSchema,
  verifyPaymentSchema,
} from "@/lib/schemas";
import { apiClient, auth } from "@/lib/server-api";
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
import { TUser } from "@/lib/schemas";

async function syncStoredSubscriptionDetailsFromProfile() {
  const currentUser = await auth.getUserDetails();
  if (!currentUser) {
    return null;
  }

  const requestHeaders = await headers();
  const cookieStore = await cookies();
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");

  if (!host) {
    return null;
  }

  const response = await fetch(`${protocol}://${host}/api/v1/profile`, {
    method: "GET",
    headers: {
      cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const profile = (await response.json()) as Partial<TUser>;
  const updatedUser: TUser = {
    ...currentUser,
    subscription_type: profile.subscription_type ?? currentUser.subscription_type,
    subscription_status:
      profile.subscription_status ?? currentUser.subscription_status,
    tier: profile.tier ?? currentUser.tier,
    tier_id: profile.tier_id ?? currentUser.tier_id,
    subscription_id: profile.subscription_id ?? currentUser.subscription_id,
    subscription_start_date:
      profile.subscription_start_date ?? currentUser.subscription_start_date,
    subscription_end_date:
      profile.subscription_end_date ?? currentUser.subscription_end_date,
    organization_id: profile.organization_id ?? currentUser.organization_id,
  };

  await auth.storeUserDetails(updatedUser);
  return updatedUser;
}


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
      tokens: {
        accessToken: res.data.token,
        refreshToken: res.data.refresh_token,
      },
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
  const res = await apiClient.authenticated<TPaymentInitResponse>(
    `/tiers/initiate-payment`,
    {
      method: "POST",
      data: {
        tier_id: result.data.tier_id,
        subscription_type: result.data.subscription_type,
        ...(result.data.coupon_code
          ? { coupon_code: result.data.coupon_code }
          : {}),
        ...(result.data.callback_url
          ? { callback_url: result.data.callback_url }
          : {}),
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
    await syncStoredSubscriptionDetailsFromProfile();
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
    `/tiers/verify-payment/${result.data.reference}`,
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
    await syncStoredSubscriptionDetailsFromProfile();
    return {
      success: res.ok,
      data: res.data,
      errors: null,
      message: "Successful request",
    };
  }
}

export async function validateCouponCodeAction(formdata: FormData) {
  const dirty = Object.fromEntries(formdata);
  const result = validateCouponCodeSchema.safeParse(dirty);

  if (!result.success) {
    const errs = z.flattenError(result.error).fieldErrors;
    return {
      success: false,
      message: result.error.message,
      errors: {
        coupon_code: errs.coupon_code ?? undefined,
        tier_id: errs.tier_id ?? undefined,
      },
      data: null,
      initialData: dirty,
    };
  }

  const res = await apiClient.authenticated<{ message?: string; data?: unknown }>(
    `/tiers/initiate-payment-with-coupon`,
    {
      method: "POST",
      data: {
        coupon_code: result.data.coupon_code,
        tier_id: result.data.tier_id,
      },
    },
  );

  console.log("Coupon code validation response:", res);

  if (!res.ok) {
    return {
      success: false,
      errors: { code: [res.error] },
      message: res.error || "Coupon code validation failed",
      data: null,
      initialData: dirty,
    };
  }

  return {
    success: true,
    data: res.data,
    errors: null,
    message: res.data?.message || "Coupon code is valid",
    initialData: dirty,
  };
}

export async function trialStartAction(_prev: unknown, formdata: FormData) {
  const dirty = Object.fromEntries(formdata);
  const result = trialStartSchema.safeParse(dirty);

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

  const res = await apiClient.authenticated<{ message: string; data: null }>(
    "/tiers/trial-start",
    {
      method: "POST",
      data: {
        tier_id: result.data.tier_id,
        coupon_code: result.data.coupon_code ?? "",
      },
    },
  );

  if (!res.ok) {
    return {
      success: false,
      errors: res.error,
      message: "Failed request",
      data: null,
      initialData: dirty,
    };
  }

  await syncStoredSubscriptionDetailsFromProfile();

  return {
    success: true,
    data: res.data,
    errors: null,
    message: "Successful request",
    initialData: dirty,
  };
}
