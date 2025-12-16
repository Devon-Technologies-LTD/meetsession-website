"use client";

import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export function DownloadAppButtons() {
  const searchParams = useSearchParams();
  const meetId = searchParams.get("meet_id");

  const tryOpenApp = (storeUrl: string) => {
    if (!meetId) {
      // No meeting ID, just open the store
      window.open(storeUrl, "_blank");
      return;
    }

    // Try to open the app with deep link
    const deepLinkUrl = `meetsession://shared?meet_id=${meetId}`;

    let appOpened = false;
    const timeout = setTimeout(() => {
      if (!appOpened) {
        // App not installed, redirect to store
        window.location.href = storeUrl;
      }
    }, 2000);

    // Detect if app opened
    const handleVisibilityChange = () => {
      if (document.hidden) {
        appOpened = true;
        clearTimeout(timeout);
      }
    };

    const handleBlur = () => {
      appOpened = true;
      clearTimeout(timeout);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    // Try to open the app
    window.location.href = deepLinkUrl;

    // Cleanup after timeout
    setTimeout(() => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
    }, 3000);
  };

  const handleGooglePlayLink = () => {
    tryOpenApp("https://play.google.com/store/apps/details?id=com.meet_session.io");
  };

  const handleAppleStoreLink = () => {
    tryOpenApp("https://apps.apple.com/us/app/meetsession/id6751320453");
  };

  return (
    <div className="gap-3 relative mb-4">
      <Button
        variant="brand-blue"
        size="lg"
        className="flex absolute right-0 top-8 z-0 rounded-full border-white border-3 items-center gap-2"
        onClick={handleAppleStoreLink}
      >
        <Image
          src="/svg/apple.svg"
          alt="Apple Store"
          width={8}
          height={10}
          className="h-auto w-4"
        />
        Apple Store
      </Button>
      <Button
        variant="brand-green"
        size="lg"
        className="flex relative z-10 rounded-full border-white border-3 items-center gap-2"
        onClick={handleGooglePlayLink}
      >
        <Image
          src="/svg/gogle.svg"
          alt="Google Play"
          width={8}
          height={10}
          className="h-auto w-4"
        />
        Google Play
      </Button>
    </div>
  );
}
