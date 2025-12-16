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

    // Try to open the app
    let appOpened = false;
    const timeout = setTimeout(() => {
      if (!appOpened) {
        // App is not installed, redirect to store
        if (isIOS) {
          window.location.href = appStoreUrl;
        } else if (isAndroid) {
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
      }
    };

    // Handle blur - if app opens, window loses focus
    const handleBlur = () => {
      appOpened = true;
      clearTimeout(timeout);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    // Attempt to open the app
    if (isIOS || isAndroid) {
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
