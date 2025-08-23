"use client";


import { cn } from "@/lib/utils";
import Image from "next/image";
import { THowItWorks } from "../lib/types";
import { motion as m, Variants } from "motion/react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function HowItWorks() {
  const [hoverState, setHoverState] = useState<"open" | "close">("close");
  const isMobile = useIsMobile("desktop");

  const rightItemVariant: Variants = {
    open: { right: "0%", transition: { type: "spring", stiffness: 40, bounceStiffness: 100, } },
    close: { right: "50%", translateX: "50%", transition: { type: "spring", stiffness: 40, } },
  };
  const leftItemVariant: Variants = {
    open: { left: "0%", transition: { type: "spring", stiffness: 40, bounceStiffness: 100, } },
    close: { left: "50%", translateX: "-50%", transition: { type: "spring", stiffness: 40, } },
  };

  return (
    <m.div
      className={cn(
        "h-full lg:h-dvh w-full",
        "px-7 py-8 md:py-16 md:pt-24",
        "flex flex-col items-center justify-center",
      )}
      id="how-it-works"
    >
      <div className="h-fit w-full text-center">
        <p className="font-dm-sans font-black text-2xl md:text-3xl">How it Works</p>
      </div>

      <m.div
        className={cn(
          "mx-auto h-full max-w-full w-full",
          "py-10 md:px-16",
          "flex-1 flex flex-col gap-8 md:gap-16 items-center",
        )}
        onHoverStart={!isMobile ? (() => setHoverState("open")) : () => { }}
        onHoverEnd={!isMobile ? (() => setHoverState("close")) : () => { }}
      >
        <m.div
          animate={hoverState}
          className="relative flex items-center justify-center h-full w-full min-w-full lg:min-w-300"
        >
          <m.div
            variants={!isMobile ? leftItemVariant : undefined}
            className={cn(
              "h-154 w-154 rounded-full bg-brand-green-foreground",
              "hidden lg:block absolute top-1/2 -translate-y-1/2",
            )}
          >
            <div className="h-full w-full relative">
              <Image
                src="/svg/ms-screenshots.svg"
                alt="screenshot"
                height={256}
                width={256}
                className="h-auto w-128 absolute right-1/2 translate-x-1/2 bottom-0"
              />
            </div>
          </m.div>

          <m.div
            variants={!isMobile ? rightItemVariant : undefined}
            className={cn(
              "py-7 lg:py-0 px-5 rounded-2xl lg:rounded-4xl bg-brand-green-foreground",
              "flex flex-col gap-12 lg:gap-24 justify-center",
              "h-fit lg:h-156 w-full lg:w-156",
              "lg:absolute lg:top-1/2 lg:-translate-y-1/2",
            )}
          >
            {steps.map(step => (
              <div
                className={cn(
                  "flex gap-2 lg:gap-4 items-center",
                )}
                key={step.id}
              >
                <p className="font-bold text-white text-5xl lg:text-7xl font-calcio-demo">{step.id}</p>
                <div className={cn(
                  "font-raleway flex flex-col",
                  "px-6 lg:px-8",
                  // "border-b last:border-none",
                )}>
                  <p className="text-brand-green font-bold text-base lg:text-lg">{step.title}</p>
                  <p className="text-sm lg:text-base font-light">{step.description}</p>
                </div>
              </div>
            ))}
          </m.div>
        </m.div>
      </m.div>
    </m.div>
  );
}

const steps: THowItWorks[] = [
  { id: 1, title: "Record", description: "Open the app and start recording your meeting or cross-examination with on tap" },
  { id: 2, title: "Transcribe", description: "Get accurate transcripts in minutes using our advanced AI transcription engine" },
  { id: 3, title: "Organize", description: "Save your sessions into folders for easy access and efficient case management" },
];
