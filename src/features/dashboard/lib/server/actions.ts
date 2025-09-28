"use server";

import { createApiClient } from "@/lib/api-client";
import { BASE_URL } from "@/lib/constants";
import { TSubscriptionPlan } from "@/lib/types";
import { TQueryParams } from "@/lib/types";

const apiClient = createApiClient({
  baseURL: BASE_URL,
});

type retrievePlansParams = TQueryParams & {
  withFeature?: boolean;
};

export async function retrievePlansAction(params?: retrievePlansParams) {
  type TResponse = {
    message: string;
    data: TSubscriptionPlan[];
  };
  const res = await apiClient.authenticated<TResponse>(
    `/subscriptions${params?.withFeature && "?with_feature=true"}`,
    {
      method: "GET",
    },
  );

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
