import { AppleStoreLogo } from "@/components/icons/apple-store-logo";
import { PlayStoreLogo } from "@/components/icons/play-store-logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <div
      className={cn(
        "w-full h-dvh max-h-[calc(100vh-72px)] relative",
        "after:absolute after:bottom-0 after:w-full after:h-6 after:bg-brand-green",
        "flex items-center",
        "bg-brand-black",
      )}
    >
      <div
        className={cn(
          "flex flex-col items-start justify-center gap-1.5 md:gap-3.5",
          "px-7 md:pl-52 text-white max-w-full md:max-w-205",
          "z-20",
        )}
      >
        <div className="text-4xl md:text-5xl font-bold font-dm-sans">
          <p>Your Legal Transcript,</p>
          <p>Organized and Ready </p>
          <p className="text-brand-green-dark">Anytime, Anywhere.</p>
        </div>

        <p className="text-sm font-normal md:font-light max-w-full md:max-w-96">
          Meet session helps lawyers and organizations record meetings or
          cross-examinations and stores them neatly in folders for instant
          access.
        </p>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center gap-2">
            <Button size="icon" variant="brand-blue">
              <AppleStoreLogo className="w-7 h-7" />
            </Button>

            <Button size="icon" variant="brand-green">
              <PlayStoreLogo className="w-9 h-9" />
            </Button>
          </div>

          <Link
            href="/waitlist"
            className={cn(
              buttonVariants({ variant: "brand-blue", size: "lg" }),
              "h-12 w-full md:w-fit",
            )}
          >
            Join Waitlist
          </Link>
        </div>
      </div>

      <div
        className={cn(
          "blur-none lg:blur-none w-full md:w-fit",
          "absolute right-1/2 translate-x-1/2 bottom-3 translate-y-0 lg:translate-y-0 lg:right-0 lg:-translate-x-0 lg:bottom-0",
          "before:absolute before:h-full before:w-full before:bg-brand-black/80 before:md:bg-transparent z-10",
        )}
      >
        <Image
          src="/svg/hero-img.svg"
          alt="hero"
          width={100}
          height={150}
          className="h-auto w-128"
        />
      </div>
      <div
        className={cn(
          "md:after:absolute md:after:h-182 md:after:w-182 md:after:top-10 md:after:right-0 md:after:rounded-full",
          "md:after:bg-brand-green-dark md:after:blur-3xl md:after:opacity-50 after:z-0",
          "rounded-full",
        )}
      ></div>
    </div>
  );
}
