"use server";


import z from "zod";
import { waitlistSchema } from "./lib/types"
import { createApiClient } from "@/lib/api-client";
import { BASE_URL } from "@/lib/constants";

const apiClient = createApiClient({
  baseURL: BASE_URL,
});


export async function joinWaitlistAction(formdata: FormData) {
  const dirty = Object.fromEntries(formdata);
  const result = waitlistSchema.safeParse(dirty);
  if (!result.success) {
    const errs = z.flattenError(result.error).fieldErrors;
    console.log(errs)
    return {
      success: false,
      message: result.error.message,
      errors: errs,
      data: null,
      initialData: dirty,
    };
  }
  const res = await apiClient.unauthenticated<{ message: string; data: Record<string, string>; }>(
    "/waitlist",
    {
      method: "POST",
      data: result.data,
    }
  );
  if (!res.ok) {
    return {
      success: res.ok,
      errors: res.error,
      message: "Failed request",
      data: null,
      initialData: dirty,
    }
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
