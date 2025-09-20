import { AppleStoreLogo } from "@/components/icons/apple-store-logo";
import { PlayStoreLogo } from "@/components/icons/play-store-logo";
import { cn } from "@/lib/utils";
import { DownloadAppButton } from "./download-app-button";
import { TAppOption } from "../lib/types";

export function DownloadApps() {
  return (
    <div
      className={cn(
        "w-full h-full",
        "p-0 md:px-20 md:py-40",
        "bg-brand-black-dark text-white text-center",
      )}
    >
      <div
        className={cn(
          "md:rounded-[72px] px-7 md:px-24 py-32 md:py-24",
          "bg-brand-green-dark w-full h-116",
          "relative overflow-hidden",
        )}
      >
        {/* circles */}
        <div
          className={cn(
            "w-252 h-252 rounded-full",
            "absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2",
            "border-64 border-white/10",
          )}
        />
        <div
          className={cn(
            "w-220 h-220 rounded-full",
            "absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2",
            "border-64 border-brand-green-dark",
          )}
        />
        <div
          className={cn(
            "w-full md:w-190 h-full md:h-190 rounded-full",
            "px-7 md:bg-brand-black/10",
            "absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2",
            "flex flex-col items-center justify-center gap-10 md:gap-20",
          )}
        >
          <div className="flex flex-col gap-2 md:gap-3">
            <p className="font-black font-dm-sans text-2xl md:text-3xl">
              Start Transcribing Smart Today
            </p>
            <p className="text-sm md:text-base font-light">
              Get MeetSession on your phone and start recording with ease.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5 w-full md:w-fit">
            {appOptions.map((option) => {
              return <DownloadAppButton option={option} key={option.id} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const appOptions: TAppOption[] = [
  {
    id: 1,
    icon: <AppleStoreLogo />,
    title: "Apple App Store",
    link: "https://apps.apple.com/ng/app/meetsession/id6751320453",
  },
  {
    id: 2,
    icon: <PlayStoreLogo />,
    title: "Google Play Store",
    link: "https://play.google.com/store/apps/details?id=com.meet_session.io",
  },
];
