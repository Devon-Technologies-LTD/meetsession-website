"use client";

import { AuthEllipses } from "@/components/auth-ellipses";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isSignup = pathname.startsWith("/signup");
  // The desktop signin view (SigninSplit) renders its own full-bleed
  // branding panel and footer — this wrapper's gradient/ellipses/footer
  // chrome is for the shared single-column layout every other auth page
  // (and signin below lg:) still uses, so it only hides on desktop signin.
  const isSignin = pathname.startsWith("/signin");

  function generateFrom() {
    return isSignup ? "from-brand-sky/50" : "from-brand-green-light/50";
  }

  return (
    <div
      className={cn(
        "min-h-dvh w-full z-0 max-w-full md:max-w-5xl mx-0 md:mx-auto",
        "relative overflow-x-hidden",
        "bg-linear-to-b via-gray-200 via-20% to-white to-30%",
        generateFrom(),
        isSignin && "lg:max-w-full lg:mx-0 lg:bg-none",
      )}
    >
      <AuthEllipses
        className={cn(
          "absolute -top-28 left-1/2 -translate-x-1/2 h-72 w-120 md:w-full -z-0",
          isSignin && "lg:hidden",
        )}
      />
      <div className="w-full min-h-dvh z-10 flex flex-col gap-6">
        {children}

        <p
          className={cn(
            "text-muted-foreground text-center text-xs",
            isSignin && "lg:hidden",
          )}
        >
          &copy; 2026 MeetSession by Devon <br /> Technologies Ltd.
        </p>
      </div>
    </div>
  );
}
