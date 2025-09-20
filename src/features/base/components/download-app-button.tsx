"use client";

import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { TAppOption } from "../lib/types";
import { cn } from "@/lib/utils";
import { motion as m } from "motion/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

export function DownloadAppButton({
  option,
  className,
}: {
  option: TAppOption;
  className?: string;
}) {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const isMobile = useIsMobile();

  if (option.link) {
    return (
      <m.a
        href={option.link}
        className={cn(
          buttonVariants({ variant: "secondary" }),
          "relative text-sm font-medium h-12 px-8 w-full md:w-fit",
          className,
        )}
      >
        {option.icon}
        <p className="text-sm font-medium">
          <span>{option.title}</span>
        </p>
      </m.a>
    );
  } else {
    return (
      <Tooltip open={isMobile ? showComingSoon : undefined}>
        <TooltipTrigger
          onClick={() => setShowComingSoon((prev) => !prev)}
          onBlur={() => setShowComingSoon(false)}
          asChild
        >
          <Button
            variant="secondary"
            className={cn(
              "disabled:opacity-85 relative text-sm font-medium h-12 px-8 w-full md:w-fit",
              className,
            )}
          >
            {option.icon}
            <p className="text-sm font-medium">
              <span>{option.title}</span>
            </p>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs md:text-sm">Coming Soon</p>
        </TooltipContent>
      </Tooltip>
    );
  }
}
