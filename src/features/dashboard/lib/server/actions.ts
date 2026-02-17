"use server";

import { apiClient } from "@/lib/server-api";
import { TSubscriptionPlan } from "@/lib/types";
import { TQueryParams } from "@/lib/types";
import { updateProfileSchema } from "../schemas";
import { TProfile } from "../types";
import { revalidatePath } from "next/cache";
import z from "zod";

type retrievePlansParams = TQueryParams & {
  withFeature?: boolean;
};

export async function retrievePlansAction(params?: retrievePlansParams) {
  type TResponse = {
    message: string;
    data: TSubscriptionPlan[];
  };
  // const res = await apiClient.authenticated<TResponse>(
  //   `/subscriptions${params?.withFeature && "?with_feature=true"}`,
  //   {
  //     method: "GET",
  //   },
  // );
  const res = await apiClient.authenticated<TResponse>(
    `/tiers${params?.withFeature && "?with_feature=true"}`,
    {
      method: "GET",
    },
  );
  // {{MS_staging}}/tiers?with_feature=true

  if (!res.ok) {
    return {
      success: res.ok,
      data: null,
      errors: res.error,
      message: "Failed to retrieve plans",
      status: res.status,
    };
  } else {
    return {
      success: res.ok,
      data: res.data,
      errors: null,
      message: "Successfully retrieved plans",
      status: res.status,
    };
  }
}

export async function initiatePaymentAction(formdata: FormData) {
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
