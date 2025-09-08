import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Page() {
  return (
    <div
      className={cn(
        "min-h-fit h-full w-full bg-brand-black text-white",
        "px-7 z-10",
        "flex items-center justify-center",
      )}
    >
      <div
        className={cn(
          "w-full md:w-fit h-fit text-center z-10",
          "flex flex-col gap-3 md:gap-5 items-center",
        )}
      >
        <p className="text-3xl md:text-5xl font-bold font-dm-sans">
          🎉 You&apos;re on the Waitlist!
        </p>
        <p className="text-xs md:text-sm font-light">
          Thank you for signing up. You&apos;ll be among the first to <br />{" "}
          experience MeetSession when we launch. Stay tuned for <br /> updates
          in your inbox.
        </p>
        <Link
          href="/"
          className={cn(
            buttonVariants({
              variant: "brand-green",
            }),
            "w-full md:w-fit h-12 font-medium",
          )}
        >
          Back Home
        </Link>
      </div>
    </div>
  );
}
