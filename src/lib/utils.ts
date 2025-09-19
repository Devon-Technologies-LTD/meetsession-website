import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TSeparateOptions } from "./types";
import { jwtDecode } from "jwt-decode";
import * as jose from "jose";
import { TTokens, TUser } from "./schemas";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function separateCamelCase(
  input: string,
  options: TSeparateOptions = {},
): string {
  const {
    capitalizeFirst = true,
    separator = " ",
    preserveAcronyms = false,
  } = options;

  if (typeof input !== "string") {
    throw new Error("Input must be a string");
  }

  if (input.length === 0) return "";

  let result = input;

  // Handle acronyms if preserveAcronyms is true
  if (preserveAcronyms) {
    result = result.replace(/([A-Z]+)([A-Z][a-z])/g, `$1${separator}$2`);
  }

  // Add separator before each uppercase letter
  result = result.replace(/([a-z])([A-Z])/g, `$1${separator}$2`);

  // Capitalize first letter if requested
  if (capitalizeFirst) {
    result = result.replace(/^./, (str) => str.toUpperCase());
  }

  return result;
}

export function decodeToken(token: string) {
  const decoded = jwtDecode(token);
  return decoded;
}

export async function decryptToken({
  algorithm,
  encrypted,
  key,
}: {
  algorithm?: string;
  encrypted: string | null;
  key: Uint8Array<ArrayBuffer>;
}) {
  if (!encrypted) return null;
  try {
    const { payload } = await jose.jwtVerify(encrypted, key, {
      algorithms: [algorithm || "HS256"],
    });
    return payload as { user_details: TUser; token: TTokens };
  } catch {
    return null;
  }
}
