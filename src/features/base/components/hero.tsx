import { AppleStoreLogo } from "@/components/icons/apple-store-logo";
import { PlayStoreLogo } from "@/components/icons/play-store-logo";
import { NoiseElement } from "@/components/noise-element";
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
      <>
        {/* top */}
        <div
          className={cn(
            "bg-[size:24px_24px] opacity-25",
            "absolute bottom-0 left-0 right-0 top-0 z-0",
            "[mask-image:radial-gradient(ellipse_80%_10%_at_50%_5%,#000_40%,transparent_110%)]",
            "bg-[linear-gradient(to_right,var(--brand-green-color-default)_1px,transparent_1px),linear-gradient(to_right,var(--brand-green-color-default)_1px,transparent_1px)]",
          )}
        ></div>
        {/* right */}
        <div
          className={cn(
            "bg-[size:24px_24px] opacity-25",
            "absolute bottom-0 left-0 right-0 top-0 z-0",
            "[mask-image:radial-gradient(ellipse_10%_80%_at_90%_50%,#000_40%,transparent_110%)]",
            "bg-[linear-gradient(to_bottom,var(--brand-green-color-default)_1px,transparent_1px),linear-gradient(to_bottom,var(--brand-green-color-default)_1px,transparent_1px)]",
          )}
        ></div>
        {/* bottom */}
        <div
          className={cn(
            "bg-[size:24px_24px] opacity-25",
            "absolute bottom-0 left-0 right-0 top-0 z-0",
            "[mask-image:radial-gradient(ellipse_80%_10%_at_50%_90%,#000_40%,transparent_110%)]",
            "bg-[linear-gradient(to_right,var(--brand-green-color-default)_1px,transparent_1px),linear-gradient(to_right,var(--brand-green-color-default)_1px,transparent_1px)]",
          )}
        ></div>
      </>

      {/* main content */}
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

        <p className="text-sm md:text-base font-normal md:font-light max-w-full md:max-w-96">
          Meet session helps lawyers and organizations record meetings or
          cross-examinations and stores them neatly in folders for instant
          access.
        </p>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <Link
              href={"https://apps.apple.com/ng/app/meetsession/id6751320453"}
              target="_blank"
              className={cn(
                buttonVariants({ variant: "brand-blue" }),
                "py-6 !px-8 w-full md:w-fit",
              )}
            >
              <AppleStoreLogo className="w-7 h-7" />
              <span>Apple App Store</span>
            </Link>

            <Button
              variant="brand-green"
              className="py-6 !px-8 w-full md:w-fit"
            >
              <PlayStoreLogo className="w-9 h-9" />
              <span>Google Play store</span>
            </Button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "w-full lg:w-fit z-10",
          "absolute right-1/2 translate-x-1/2 bottom-3 translate-y-0 lg:translate-y-0 lg:right-16 lg:-translate-x-0 lg:bottom-0",
          "before:absolute before:h-full before:w-full before:bg-brand-black/80 lg:before:bg-transparent",
          "",
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
      <NoiseElement
        className={cn(
          "hidden lg:block absolute top-1/2 -translate-y-1/2 right-0",
        )}
        as="section"
        opacity={60}
      >
        <div
          className={cn(
            "border border-red-400",
            "absolute h-182 w-182 top-10 right-0 rounded-full",
            "bg-brand-green-dark blur-3xl opacity-50 z-0",
            "rounded-full",
            // "noise-filter",
          )}
        ></div>
      </NoiseElement>
    </div>
  );
}
