"use server";

import { apiClient, auth } from "@/lib/server-api";
import { updateProfileSchema } from "../lib/schemas";
import { TProfile, TProfileResponse } from "../lib/types";
import { revalidatePath } from "next/cache";
import z from "zod";
import { TUserCurrentPlan } from "@/lib/types";
import { BASE_URL } from "@/lib/constants";

export async function getUser() {
  return await auth.getUserDetails();
}

export async function retrieveProfileAction() {
  const res = await apiClient.authenticated<TProfileResponse>("/profile", {
    method: "GET",
  });

  if (!res.ok) {
    return {
      success: res.ok,
      data: null,
      errors: res.error,
      message: "Failed to retrieve profile",
      status: res.status,
    };
  } else {
    return {
      success: res.ok,
      data: res.data,
      errors: null,
      message: "Successfully retrieved profile",
      status: res.status,
    };
  }
}

export async function updateProfileAction(formdata: FormData) {
  const data = Object.fromEntries(formdata);
  const result = updateProfileSchema.safeParse(data);
  if (!result.success) {
    const errs = z.flattenError(result.error).formErrors;
    return {
      success: false,
      message: "Failed to update profile",
      errors: errs,
      data: null,
      status: 400,
      initialData: data,
    };
  }

  type TProfileResponse = {
    message: string;
    data: TProfile;
  };

  const res = await apiClient.authenticated<TProfileResponse>("/profile", {
    data: result.data,
    method: "PATCH",
  });

  revalidatePath("/dashboard/accounts/edit");
  if (!res.ok) {
    return {
      success: res.ok,
      data: null,
      errors: res.error,
      message: "Failed to update profile",
      status: res.status,
      initialData: data,
    };
  } else {
    return {
      success: res.ok,
      data: res.data,
      errors: null,
      message: "Successfully updated profile",
      status: res.status,
      initialData: data,
    };
  }
}
export async function updatePassword(formdata: FormData) {
  const data = Object.fromEntries(formdata);
  const result = updateProfileSchema.safeParse(data);
  if (!result.success) {
    const errs = z.flattenError(result.error).formErrors;
    return {
      success: false,
      message: "Failed to update Password",
      errors: errs,
      data: null,
      status: 400,
      initialData: data,
    };
  }

  type TProfileResponse = {
    message: string;
    data: TProfile;
  };

  const res = await apiClient.authenticated<TProfileResponse>("/auth/change_password", {
    data: result.data,
    method: "POST",
  });

  revalidatePath("/dashboard/accounts/edit");
  if (!res.ok) {
    return {
      success: res.ok,
      data: null,
      errors: res.error,
      message: "Failed to update profile",
      status: res.status,
      initialData: data,
    };
  } else {
    return {
      success: res.ok,
      data: res.data,
      errors: null,
      message: "Successfully updated profile",
      status: res.status,
      initialData: data,
    };
  }
}

export async function uploadProfileImage(_prev: unknown, formdata: FormData) {
  const data = Object.fromEntries(formdata);

  return {
    success: false,
    message: "Failed to update profile",
    errors: "Cannot upload profile image at the moment",
    data: null,
    status: 400,
    initialData: data,
  };
  /*
  const result = updateProfileSchema.safeParse(data);
  if (!result.success) {
    const errs = z.flattenError(result.error).formErrors;
    return {
      success: false,
      message: "Failed to update profile",
      errors: errs,
      data: null,
      status: 400,
      initialData: data,
    };
  }

  type TProfileResponse = {
    message: string;
    data: TProfile;
  };

  const res = await apiClient.authenticated<TProfileResponse>("/profile", {
    data: result.data,
    method: "POST",
  });

  if (!res.ok) {
    return {
      success: res.ok,
      data: null,
      errors: res.error,
      message: "Failed to update profile",
      status: res.status,
      initialData: data,
    };
  } else {
    return {
      success: res.ok,
      data: res.data,
      errors: null,
      message: "Successfully updated profile",
      status: res.status,
      initialData: data,
    };
  }
  */
}

export async function retrieveSubscriptionAction() {
  const res = await apiClient.authenticated<{
    message: string;
    data: TUserCurrentPlan;
  }>("/subscriptions/fetch-subscription", {
    method: "GET",
  });

  if (!res.ok) {
    return {
      success: res.ok,
      data: null,
      errors: res.error,
      message: "Failed to retrieve subscription",
      status: res.status,
    };
  } else {
    return {
      success: res.ok,
      data: res.data,
      errors: null,
      message: "Successfully retrieved subscription",
      status: res.status,
    };
  }
}
export async function retrieveTierAction() {
  const res = await apiClient.authenticated<{
    message: string;
    data: TUserCurrentPlan;
  }>("/tiers/fetch-tier", {
    method: "GET",
  });

  if (!res.ok) {
    return {
      success: res.ok,
      data: null,
      errors: res.error,
      message: "Failed to retrieve subscription",
      status: res.status,
    };
  } else {
    return {
      success: res.ok,
      data: res.data,
      errors: null,
      message: "Successfully retrieved subscription",
      status: res.status,
    };
  }
}

type TAllTiersOptions = {
  with_feature?: boolean;
  with_subscription?: boolean;
}
export async function retrieveAllTiersAction(opts?: TAllTiersOptions) {
  const params = new URLSearchParams();
  if (opts?.with_feature) {
    params.append("with_feature", "true");
  }
  if (opts?.with_subscription) {
    params.append("with_subscription", "true");
  }
  const paramsString = params.toString();

  const res = await apiClient.unauthenticated<{
    message: string;
    data: TUserCurrentPlan;
  }>(`${BASE_URL}/all-tiers${paramsString ? `?${paramsString}` : ""}`, {
    method: "GET",
  });

  if (!res.ok) {
    return {
      success: res.ok,
      data: null,
      errors: res.error,
      message: "Failed to retrieve all tiers",
      status: res.status,
    };
  } else {
    return {
      success: res.ok,
      data: res.data,
      errors: null,
      message: "Successfully retrieved all tiers",
      status: res.status,
    };
  }
}
