import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export function JoinWaitlist() {
  return (
    <div
      id="waitlist"
      className={cn(
        "bg-brand-black text-white",
        "px-4 py-10 md:py-32 sm:px-6 lg:px-8",
        "flex items-center justify-center",
      )}
    >
      <div className="flex flex-col gap-10 items-center justify-center w-max h-fit">
        <div className={cn(
          "mx-auto max-w-85 text-center",
          "flex flex-col gap-3 items-center",
        )}>
          <p className="font-dm-sans font-black text-3xl">Join the Waitlist</p>
          <p className="text-base">Be among the first to experience MeetSession when we launch</p>

          <Link
            href="/waitlist"
            className={cn(
              buttonVariants({ variant: "brand-blue", size: "lg" }),
              "w-full font-semibold text-base h-12"
            )}
          >Join Waitlist</Link>
        </div>

        <div className={cn(
          "border border-brand-blue flex flex-col gap-8 items-center justify-center",
          "py-6 px-24 rounded-3xl w-fit",
        )}>
          <p className="text-brand-blue-light w-full max-w-102 text-center">We&apos;re currently in private beta but you can secure your spot today. Click on the Button to secure your spot.</p>
          <div className={cn(
            "w-full h-fit relative",
            "flex items-start justify-around",
            "before:absolute before:border-b before:border-border/40 before:border-dashed before:w-full before:top-1/2 before:-translate-y-5",
          )}>
            {waitlistSteps.map(item => (
              <div className="flex flex-col items-center justify-center gap-3 z-10" key={item.id}>
                <div className="h-20 w-20 rounded-full bg-brand-black-light text-white text-5xl font-bold font-dm-sans flex items-center justify-center">{item.id}</div>
                <p className="max-w-26 text-center text-sm">{item.item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const waitlistSteps = [
  { id: 1, item: "Join Waitlist" },
  { id: 2, item: "Get Early Access", },
  { id: 3, item: "Enjoy Premium Features", }
];
