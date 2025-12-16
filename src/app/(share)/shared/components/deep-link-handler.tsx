"use client";

import { useEffect } from "react";

interface DeepLinkHandlerProps {
  meetId: string;
}

export function DeepLinkHandler({ meetId }: DeepLinkHandlerProps) {
  useEffect(() => {
    // Deep link URL for the app
    const deepLinkUrl = `meetsession://shared?meet_id=${meetId}`;

    // App Store URLs
    const playStoreUrl = "https://play.google.com/store/apps/details?id=com.meet_session.io";
    const appStoreUrl = "https://apps.apple.com/us/app/meetsession/id6751320453";

    // Detect if user is on iOS or Android
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);

    // Check if we're in test mode (add ?test=true to URL to test without redirecting)
    const urlParams = new URLSearchParams(window.location.search);
    const isTestMode = urlParams.get("test") === "true";

    // Log for testing purposes
    console.log("🔗 Deep Link Testing:");
    console.log("  - Deep Link URL:", deepLinkUrl);
    console.log("  - Device Type:", isIOS ? "iOS" : isAndroid ? "Android" : "Desktop");
    console.log("  - Will redirect to:", isIOS ? "App Store" : isAndroid ? "Play Store" : "Stay on web");
    console.log("  - Test Mode:", isTestMode ? "ON (won't redirect)" : "OFF");

    if (isTestMode) {
      console.log("⚠️ Test mode enabled. Add the deep link to test manually:");
      console.log("   Copy this URL:", deepLinkUrl);
      return; // Don't redirect in test mode
    }

    // Try to open the app
    let appOpened = false;
    const timeout = setTimeout(() => {
      if (!appOpened) {
        // App is not installed, redirect to store
        if (isIOS) {
          console.log("📱 Redirecting to App Store...");
          window.location.href = appStoreUrl;
        } else if (isAndroid) {
          console.log("📱 Redirecting to Play Store...");
          window.location.href = playStoreUrl;
        }
        // For desktop, do nothing (show web page)
      }
    }, 2500); // Wait 2.5 seconds to see if app opens

    // Handle visibility change - if app opens, page becomes hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        appOpened = true;
        clearTimeout(timeout);
        console.log("✅ App opened successfully!");
      }
    };

    // Handle blur - if app opens, window loses focus
    const handleBlur = () => {
      appOpened = true;
      clearTimeout(timeout);
      console.log("✅ App opened successfully!");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    // Attempt to open the app
    if (isIOS || isAndroid) {
      console.log("🚀 Attempting to open app...");
      window.location.href = deepLinkUrl;
    }

    // Cleanup
    return () => {
      clearTimeout(timeout);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, [meetId]);

  return null; // This component doesn't render anything
}
