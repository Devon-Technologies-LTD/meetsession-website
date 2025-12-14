"use client";

import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import Image from "next/image";

export function DownloadAppButtons() {
  const handleGooglePlayLink = () => {
    window.open("https://play.google.com/store/apps/details?id=com.meet_session.io", "_blank");
  };

  const handleAppleStoreLink = () => {
    window.open("https://apps.apple.com/us/app/meetsession/id6751320453", "_blank");
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
