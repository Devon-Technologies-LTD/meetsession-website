"use server";

import z from "zod";
import { deleteAccountSchema } from "../lib/types";
import { createApiClient } from "@/lib/api-client";
import { BASE_URL } from "@/lib/constants";

const apiClient = createApiClient({
  baseURL: BASE_URL,
});

export async function deleteAccountAction(formdata: FormData) {
  const dirty = Object.fromEntries(formdata);
  const result = deleteAccountSchema.safeParse(dirty);
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
  const res = await apiClient.authenticated<{
    message: string;
    data: Record<string, string>;
    status?: boolean;
  }>("/profile", {
    method: "DELETE",
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
