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

function detectMobileOs() {
  if (typeof window === "undefined") {
    return { isIOS: false, isAndroid: false };
  }

  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  const maxTouchPoints = window.navigator.maxTouchPoints ?? 0;
  const isIPadOS = platform === "MacIntel" && maxTouchPoints > 1;
  const isIOS = /iPad|iPhone|iPod/i.test(userAgent) || isIPadOS;
  const isAndroid = /android/i.test(userAgent);

  return { isIOS, isAndroid };
}

export function openMeetSessionApp({
  deepLinkUrl,
  fallbackDelayMs = 2500,
  playStoreUrl = "https://play.google.com/store/apps/details?id=com.meet_session.io",
  appStoreUrl = "https://apps.apple.com/us/app/meetsession/id6751320453",
  onDesktop,
}: OpenMeetSessionAppOptions) {
  if (typeof window === "undefined") return;

  const { isIOS, isAndroid } = detectMobileOs();

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
    const { isIOS, isAndroid } = detectMobileOs();

    if (isTestMode) {
      return; // Don't redirect in test mode
    }
    openMeetSessionApp({ deepLinkUrl });
  }, [meetId]);

  return null; // This component doesn't render anything
}
