"use client";

import CountAnimation from "@/components/count-animation";
import { cn, separateCamelCase } from "@/lib/utils";
import { useInView } from "motion/react";
import { useRef } from "react";

type MetricsDisplayProps = {
  value: number;
  description: string;
};
export function MetricsDisplay({ value, description }: MetricsDisplayProps) {
  const countdownRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(countdownRef);

  return (
    <div className="p-px rounded-xl bg-linear-to-b from-brand-blue to-brand-green">
      <div className="w-full h-full rounded-xl bg-brand-black">
        <div
          ref={countdownRef}
          className={cn(
            "min-w-32 md:min-w-44 w-fit min-h-20 h-fit rounded-xl bg-linear-to-r from-white/10 to-transparent",
            "p-2 sm:p-3 md:p-5 lg:p-6 flex flex-col gap-1 sm:gap-2 md:gap-3 items-center justify-center",
          )}
        >
          {isInView && (
            <CountAnimation
              number={value}
              suffix="+"
              className="text-4xl font-dm-sans font-black text-white text-center"
            />
          )}
          <p className="text-xs md:text-sm lg:text-base">
            {separateCamelCase(description)}
          </p>
        </div>
      </div>
    </div>
  );
}
