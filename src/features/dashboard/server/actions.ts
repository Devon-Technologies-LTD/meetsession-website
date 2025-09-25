"use server";

import { createApiClient } from "@/lib/api-client";
import { updateProfileSchema } from "../lib/schemas";
import { ALGORITHM, BASE_URL, SECRET_KEY } from "@/lib/constants";
import { setServerCookie } from "@/server/set-cookie";
import { TProfile, TProfileResponse } from "../lib/types";
import { createAuthService } from "@/lib/auth-service";
import { revalidatePath } from "next/cache";
import z from "zod";

const apiClient = createApiClient({
  baseURL: BASE_URL,
});

const auth = createAuthService({
  secret: SECRET_KEY,
  algorithm: ALGORITHM,
  setCookie: setServerCookie,
});

export async function getUser() {
  return await auth.getUserDetails();
}

export async function retrieveProfileAction() {
  const res = await apiClient.authenticated<TProfileResponse>("/profile", {
    method: "GET",
  });

  if (!res.ok) {
    revalidatePath("/dashboard/accounts/edit");
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

  console.log("clicked", data);

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
