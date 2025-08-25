"use client";

import { cn } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion as m, Variants } from "motion/react";


const faqs = [
  { id: 1, question: "Is MeetSession Secure?", answer: "Yes, all recordings and transcripts are encrypted and stored safely. We use industry standard AES-256 encryption and comply with legal data protection regulations." },
  { id: 2, question: "Can I Use It Outside the Court Room?", answer: "Dis, ut dignissim magna vitae sem, ultrices quisque odio posuere praesent id. Auctor est tincidunt sem eros, enim rhoncus, purus." },
  { id: 3, question: "Does it Work Offline?", answer: "Dis, ut dignissim magna vitae sem, ultrices quisque odio posuere praesent id. Auctor est tincidunt sem eros, enim rhoncus, purus." },
  { id: 4, question: "How Accurate is the Transcription?", answer: "Dis, ut dignissim magna vitae sem, ultrices quisque odio posuere praesent id. Auctor est tincidunt sem eros, enim rhoncus, purus." },
];


export function FAQs() {
  return (
    <div className="py-8 md:py-25 px-7 md:px-16 flex flex-col items-center gap-5 md:gap-10 w-full h-full bg-white text-brand-black">
      <p className="text-3xl md:text-4xl font-dm-sans font-semibold text-center">Frequently Asked Questions</p>
      <div className="max-w-3xl w-full h-full flex flex-col gap-4">
        {faqs.map(item => {
          return (
            <FAQCard key={item.id} {...item} />
          );
        })}
      </div>
    </div>
  );
}

type FAQCardProp = {
  question: string;
  answer: string;
}
function FAQCard({ question, answer }: FAQCardProp) {
  const [toggleState, setToggleState] = useState<"open" | "close">("close");
  const toggleVariant: Variants = {
    open: { height: "auto", opacity: 1, },
    close: { height: "0px", opacity: 0, },
  };

  return (
    <m.div
      layout
      className={cn(
        "px-4 py-4 border border-border rounded-md cursor-pointer",
        [toggleState === "open" ? "bg-brand-black-dark text-white" : "bg-secondary text-brand-black"],
      )}
      initial="close"
      animate="open"
      exit="close"
      onClick={() => setToggleState(prev => prev === "close" ? "open" : "close")}
    >
      <div className="flex gap-4 items-center justify-between">
        <p className="font-dm-sans font-medium text-sm md:text-base">{question}</p>
        <span className="rounded-full bg-brand-green text-white p-1">
          {toggleState === "close"
            ? (<MinusIcon className="h-4 w-4" />)
            : (<PlusIcon className="h-4 w-4" />)
          }
        </span>
      </div>
      <AnimatePresence>
        {toggleState === "open" && (
          <m.p
            layout
            variants={toggleVariant}
            className="w-[95%] font-medium text-sm"
            initial="close"
            animate="open"
            exit="close"
          >
            {answer}
          </m.p>
        )}
      </AnimatePresence>
    </m.div>
  );
}
