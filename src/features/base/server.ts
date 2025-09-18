"use server";

import { createApiClient } from "@/lib/api-client";
import { BASE_URL } from "@/lib/constants";
import { TImpact } from "./lib/schemas";

const apiClient = createApiClient({
  baseURL: BASE_URL,
});

export async function getMetrics() {
  const res = await apiClient.unauthenticated<{
    message: string;
    data: TImpact;
  }>("/platform-analytics", {
    method: "GET",
  });

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
      data: res.data.data,
      errors: null,
      message: res.data.message,
    };
  }
}
