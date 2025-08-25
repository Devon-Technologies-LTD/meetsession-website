"use client";


import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";


type CarouselProps = {
  items: { text: string; author: string; rating?: number; }[];
}

const pageVariants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

function Stars({ rating }: { rating?: number }) {
  const ratingRounded = Math.round(rating ?? 0);
  return (
    <div className="flex gap-1 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={18} className={cn(
          { "text-orange-500": i + 1 <= ratingRounded },
          "shrink-0",
        )} fill="currentColor" />
      ))}
    </div>
  );
}

function Card({ text, author, rating, className = "" }: { text: string; author: string; rating?: number; className?: string }) {
  return (
    <div className={`bg-gray-100 p-6 rounded-2xl shadow-sm font-poppins italic ${className}`}>
      <Stars rating={rating} />
      <p className="text-gray-700 mb-3">{text}</p>
      <p className="font-semibold text-gray-900">{author}</p>
    </div>
  );
}

export function Carousel({ items }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const len = items.length;
  const at = (i: number) => items[((i % len) + len) % len];

  const prev = () => setIndex((i) => (i - 1 + len) % len);
  const next = () => setIndex((i) => (i + 1) % len);

  // Auto-rotate every 5s, pause on hover/focus
  useEffect(() => {
    if (paused || len <= 1) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, len]);

  const showArrows = len > 1;

  return (
    <div
      className="relative w-full max-w-full md:max-w-4xl mx-auto px-4 md:px-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Slides wrapper (animated as a whole to get real exit animations) */}
      <div className="relative overflow-hidden px-8 md:px-20">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={index}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* 1 column on mobile, 2 columns at md+. Hide the second card on mobile to avoid 2 rows */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <Card rating={at(index).rating} text={at(index).text} author={at(index).author} />
              <Card
                rating={at(index + 1).rating}
                text={at(index + 1).text}
                author={at(index + 1).author}
                className="hidden md:block"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Inset arrow controls that DO NOT cause layout overflow */}
        {showArrows && (
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-end justify-between">
            <button
              aria-label="Previous"
              onClick={prev}
              className="pointer-events-auto m-2 md:m-0 bg-brand-black-extralight text-white py-2 px-4 rounded-lg shadow-md hover:bg-brand-black-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              aria-label="Next"
              onClick={next}
              className="pointer-events-auto m-2 md:m-0 bg-brand-black-extralight text-white py-2 px-4 rounded-lg shadow-md hover:bg-brand-black-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Optional: dots/pagination (uncomment if you want them) */}
      {/*
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: len }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full ${i === index ? "bg-neutral-900" : "bg-neutral-300"}`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
      */}
    </div>
  );
}

