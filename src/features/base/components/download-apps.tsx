import { AppleStoreLogo } from "@/components/icons/apple-store-logo";
import { PlayStoreLogo } from "@/components/icons/play-store-logo";
import { Button } from "@/components/ui/button";

export function DownloadApps() {
  return (
    <div className="w-full h-full p-0 md:px-20 md:py-24 bg-brand-black-dark text-white text-center">
      <div className="md:rounded-4xl bg-brand-green w-full h-full px-7 md:px-24 py-24 md:py-24 flex flex-col items-center gap-20">
        <div className="flex flex-col gap-2 md:gap-3">
          <p className="font-black font-dm-sans text-2xl md:text-5xl">Start Transcribing Smart Today</p>
          <p className="text-sm md:text-base font-light">Get MeetSession on your phone and start recording with ease.</p>
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          <Button
            variant="secondary"
            className="text-sm font-medium h-12 px-8"
          >
            <AppleStoreLogo />
            <span className="text-sm font-medium">Apple App Store</span>
          </Button>

          <Button
            variant="secondary"
            className="text-sm font-medium h-12 px-8"
          >
            <PlayStoreLogo />
            <span className="text-sm font-medium">Google Play Store</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
