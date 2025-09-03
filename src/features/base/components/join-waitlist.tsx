import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { NoiseElement } from "@/components/noise-element";

export function JoinWaitlist() {
  return (
    <div
      id="waitlist"
      className={cn(
        "bg-brand-black text-white",
        "px-7 py-8 md:py-32 lg:px-8 h-dvh",
        "flex items-center justify-center",
        "relative overflow-hidden",
      )}
    >
      <div className="flex flex-col gap-6 md:gap-10 items-center justify-center w-max h-fit z-10">
        <div
          className={cn(
            "mx-auto max-w-full md:max-w-85 text-center",
            "flex flex-col gap-2 md:gap-3 items-center",
          )}
        >
          <p className="font-dm-sans font-black text-2xl mf:text-3xl">
            Join the Waitlist
          </p>
          <p className="text-sm md:text-base">
            Be among the first to experience MeetSession when we launch
          </p>

          <Link
            href="/waitlist"
            className={cn(
              buttonVariants({ variant: "brand-blue", size: "lg" }),
              "w-full font-semibold text-base h-12",
            )}
          >
            Join Waitlist
          </Link>
        </div>

        <div className="h-fit w-fit rounded-xl md:rounded-3xl p-px bg-gradient-to-b from-brand-blue to-brand-green">
          <div
            className={cn(
              "bg-brand-black border border-brand-blue",
              "py-4 md:py-6 px-7 md:px-24 rounded-xl md:rounded-3xl w-fit",
              "flex flex-col gap-4 md:gap-8 items-center justify-center",
            )}
          >
            <p className="text-sm md:text-base text-brand-blue-foreground md:text-brand-blue-light w-full max-w-full md:max-w-128 text-center">
              We&apos;re currently in private beta but you can secure your spot
              today. Click on the Button to secure your spot.
            </p>
            <div
              className={cn(
                "w-full h-fit relative",
                "flex items-start justify-evenly md:justify-around",
                "before:absolute before:border-b before:border-border/40 before:border-dashed before:w-full before:top-1/2 before:-translate-y-10",
              )}
            >
              {waitlistSteps.map((item) => (
                <div
                  className="flex flex-col items-center w-fit justify-center gap-1.5 md:gap-3 z-10"
                  key={item.id}
                >
                  <div className="h-16 md:h-20 w-16 md:w-20 rounded-full bg-brand-black-foreground text-white text-3xl md:text-4xl font-bold font-dm-sans flex items-center justify-center">
                    {item.id}
                  </div>
                  <p className="w-20 max-w-full md:w-26 md:max-w-32 text-center text-sm md:text-base">
                    {item.item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* filters */}
      <NoiseElement
        className="hidden md:block absolute -left-96 top-1/2 translate-y-1/2"
        intensity={40}
        opacity={0.2}
      >
        <div
          className={cn(
            "h-full w-full relative",
            "before:w-182 before:h-182",
            "before:bg-brand-blue before:opacity-70 before:rounded-full before:blur-3xl",
            "before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-12",
          )}
        ></div>
      </NoiseElement>
      <NoiseElement className="absolute -right-96 bottom-0 md:bottom-1/2 -translate-y-1/2">
        <div
          className={cn(
            "h-full w-full relative",
            "before:bg-brand-blue before:opacity-70 before:rounded-full before:blur-3xl",
            "before:w-120 md:before:w-182 before:h-120 md:before:h-182",
            "before:absolute before:-bottom-64 md:before:bottom-1/2 before:right-1/2 md:before:-right-12",
            "before:-translate-x-1/2 md:before:translate-x-0 before:-translate-y-0 md:before:translate-y-1/2",
          )}
        ></div>
      </NoiseElement>
    </div>
  );
}

const waitlistSteps = [
  { id: 1, item: "Join Waitlist" },
  { id: 2, item: "Get Early Access" },
  { id: 3, item: "Enjoy Premium Features" },
];
