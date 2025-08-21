import { cn } from "@/lib/utils";
import Image from "next/image";
import { THowItWorks } from "../lib/types";

export function HowItWorks() {
  return (
    <div
    id="how-it-works"
    className={cn(
      "px-4 py-8 md:py-24 sm:px-6 lg:px-8",
    )}
    >
      <div className={cn(
        "mx-auto max-w-7xl",
        "flex flex-col gap-16 items-center",
      )}>
        <p className="font-dm-sans font-black text-3xl">How it Works</p>

        <div className="flex gap-20 items-center justify-center">
          <div className="h-154 w-154 rounded-full bg-brand-green-foreground relative">
            <Image
              src="/svg/ms-screenshots.svg"
              alt="screenshot"
              height={256}
              width={256}
              className="h-auto w-128 absolute right-1/2 translate-x-1/2 bottom-0"
            />
          </div>

          <div className="h-142 w-142 flex flex-col gap-24 px-5 justify-center rounded-4xl bg-brand-green-foreground">
            {steps.map(step => (
              <div
                className={cn(
                  "flex gap-4 items-center",
                )}
                key={step.id}
              >
                <p className="font-bold text-white text-7xl font-calcio-demo">{step.id}</p>
                <div className={cn(
                  "font-raleway flex flex-col",
                  "px-8",
                  // "border-b last:border-none",
                )}>
                  <p className="text-brand-green font-bold text-lg">{step.title}</p>
                  <p className="text-base font-light">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const steps: THowItWorks[] = [
  { id: 1, title: "Record", description: "Open the app and start recording your meeting or cross-examination with on tap" },
  { id: 2, title: "Transcribe", description: "Get accurate transcripts in minutes using our advanced AI transcription engine" },
  { id: 3, title: "Organize", description: "Save your sessions into folders for easy access and efficient case management" },
];
