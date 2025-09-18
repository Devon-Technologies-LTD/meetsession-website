import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TSeparateOptions } from "./types";

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
