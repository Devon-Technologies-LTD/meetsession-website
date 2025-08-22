import { AppleStoreLogo } from "@/components/icons/apple-store-logo";
import { PlayStoreLogo } from "@/components/icons/play-store-logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <div className={cn(
      "w-full bg-brand-black h-dvh max-h-[calc(100vh-72px)] relative",
      "after:absolute after:bottom-0 after:w-full after:h-6 after:bg-brand-green",
      "flex items-center",
    )}>
      <div className={cn(
        "flex flex-col items-start gap-3.5",
        "pl-52 text-white max-w-205",
      )}>
        <div className="text-5xl font-bold font-dm-sans">
          <p>Your Legal Transcription,</p>
          <p>Organized and Ready </p>
          <p className="text-brand-green-dark">Anytime, Anywhere.</p>
        </div>

        <p className="text-sm font-light max-w-96">Meet session helps lawyers and organizations record meetings or cross-examinations and stores them neatly in folders for instant access.</p>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
          <Button size="icon" variant="brand-blue">
            <AppleStoreLogo className="w-7 h-7" />
          </Button>

          <Button size="icon" variant="brand-green">
            <PlayStoreLogo className="w-9 h-9" />
          </Button>
          </div>

          <Link href="/waitlist" className={cn(buttonVariants({ variant: "brand-blue", size: "lg" }), "h-12")}>Join Waitlist</Link>
        </div>
      </div>

      <div className={cn(
        "absolute right-0 bottom-0",
        "after:absolute after:h-128 after:w-128 after:bottom-52 after:right-32 after:rounded-full",
        "after:teal-radial-fade",
      )}>
        <Image
          src="/svg/hero-img.svg"
          alt="hero"
          width={100}
          height={150}
          className="h-auto w-128"
        />
      </div>
    </div>
  );
}
