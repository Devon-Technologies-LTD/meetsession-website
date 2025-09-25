"use client";

import { AuthEllipses } from "@/components/auth-ellipses";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isSignup = pathname.startsWith("/signup");

  function generateFrom() {
    return isSignup ? "from-brand-sky/50" : "from-brand-green-light/50";
  }

  return (
    <div
      className={cn(
        "min-h-full h-full w-full z-0",
        "relative overflow-hidden",
        "bg-linear-to-b via-gray-200 via-20% to-white to-30%",
        generateFrom(),
      )}
    >
      <AuthEllipses className="absolute -top-28 left-1/2 -translate-x-1/2 h-72 w-120 md:w-full -z-0" />
      <div className="w-full h-full z-10 flex flex-col gap-6">
        {children}

        <p className="text-muted-foreground text-center text-xs">
          &copy; 2025 MeetSession by Devon <br /> Technologies Ltd.
        </p>
      </div>
    </div>
  );
}
