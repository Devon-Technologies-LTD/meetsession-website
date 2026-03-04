"use client";

import { useEffect } from "react";

interface DeepLinkHandlerProps {
  meetId: string;
}

interface OpenMeetSessionAppOptions {
  deepLinkUrl: string;
  fallbackDelayMs?: number;
  playStoreUrl?: string;
  appStoreUrl?: string;
  onDesktop?: () => void;
}

export function openMeetSessionApp({
  deepLinkUrl,
  fallbackDelayMs = 2500,
  playStoreUrl = "https://play.google.com/store/apps/details?id=com.meet_session.io",
  appStoreUrl = "https://apps.apple.com/us/app/meetsession/id6751320453",
  onDesktop,
}: OpenMeetSessionAppOptions) {
  if (typeof window === "undefined") return;

  const isIOS = /iPad|iPhone|iPod/i.test(navigator.userAgent);
  const isAndroid = /android/i.test(navigator.userAgent);

  if (!isIOS && !isAndroid) {
    onDesktop?.();
    return;
  }

  let appOpened = false;
  const timeout = window.setTimeout(() => {
    if (appOpened) return;
    window.location.href = isIOS ? appStoreUrl : playStoreUrl;
  }, fallbackDelayMs);

  const handleVisibilityChange = () => {
    if (!document.hidden) return;
    appOpened = true;
    window.clearTimeout(timeout);
  };

  const handleBlur = () => {
    appOpened = true;
    window.clearTimeout(timeout);
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("blur", handleBlur);
  window.location.href = deepLinkUrl;

  window.setTimeout(() => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    window.removeEventListener("blur", handleBlur);
  }, fallbackDelayMs + 500);
}

export function DeepLinkHandler({ meetId }: DeepLinkHandlerProps) {
  useEffect(() => {
    const deepLinkUrl = `meetsession://shared?meet_id=${meetId}`;

    // Check if we're in test mode (add ?test=true to URL to test without redirecting)
    const urlParams = new URLSearchParams(window.location.search);
    const isTestMode = urlParams.get("test") === "true";

    // Log for testing purposes
    console.log("🔗 Deep Link Testing:");
    console.log("  - Deep Link URL:", deepLinkUrl);
    const isIOS = /iPad|iPhone|iPod/i.test(navigator.userAgent);
    const isAndroid = /android/i.test(navigator.userAgent);
    console.log(
      "  - Device Type:",
      isIOS ? "iOS" : isAndroid ? "Android" : "Desktop",
    );
    console.log(
      "  - Will redirect to:",
      isIOS ? "App Store" : isAndroid ? "Play Store" : "Stay on web",
    );
    console.log("  - Test Mode:", isTestMode ? "ON (won't redirect)" : "OFF");

    if (isTestMode) {
      console.log("⚠️ Test mode enabled. Add the deep link to test manually:");
      console.log("   Copy this URL:", deepLinkUrl);
      return; // Don't redirect in test mode
    }
    console.log("🚀 Attempting to open app...");
    openMeetSessionApp({ deepLinkUrl });
  }, [meetId]);

  return null; // This component doesn't render anything
}
