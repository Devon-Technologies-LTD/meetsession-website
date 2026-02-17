"use server";

import { apiClient } from "@/lib/server-api";
import { TImpact } from "./lib/schemas";



export async function getMetrics() {
  const res = await apiClient.unauthenticated<{
    message: string;
    data: TImpact;
    status: string;
  }>("/platform-analytics", {
    method: "GET",
  });

  if (!res.ok) {
    return {
      success: res.ok,
      errors: res.error,
      message: "Failed request",
      status: res.status,
      data: null,
    };
  } else {
    return {
      success: res.ok,
      data: res.data.data,
      status: res.status,
      errors: null,
      message: res.data.message,
    };
  }
}
