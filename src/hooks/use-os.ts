"use client";

import { useEffect, useState } from "react";

export type TOperatingSystem =
  | "Windows"
  | "macOS"
  | "Linux"
  | "Android"
  | "iOS"
  | "Unknown";

const getOSFromUserAgent = (userAgent: string): TOperatingSystem => {
  const lowerCaseUA = userAgent.toLowerCase();

  // Android check (must be done before Linux, as Android is Linux-based)
  if (lowerCaseUA.includes("android")) {
    return "Android";
  }

  // iOS check (includes iPhones, iPads, and iPods)
  if (lowerCaseUA.includes("iphone") || lowerCaseUA.includes("ipad")) {
    return "iOS";
  }

  // macOS check (using "Mac" string, as "Macintosh" is an older indicator)
  if (lowerCaseUA.includes("mac")) {
    return "macOS";
  }

  // Windows check
  if (lowerCaseUA.includes("win")) {
    return "Windows";
  }

  // Linux check
  if (lowerCaseUA.includes("linux")) {
    return "Linux";
  }

  return "Unknown";
};

export function useOS(): TOperatingSystem {
  const [os, setOs] = useState<TOperatingSystem>("Unknown");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const detectedOS = getOSFromUserAgent(window.navigator.userAgent);
      setOs(detectedOS);
    }
  }, []);

  return os;
}
