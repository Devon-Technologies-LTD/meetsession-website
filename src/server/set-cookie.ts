"use server";

import { cookies } from "next/headers";

export async function setServerCookie(
  name: string,
  value: string,
  options?: Record<string, string | number | Date>,
) {
  const cookieStore = await cookies();

  // If value is empty, delete cookie instead
  if (!value) {
    cookieStore.delete(name);
    return;
  }

  cookieStore.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", //"lax",
    path: "/",
    ...options,
  });
}
