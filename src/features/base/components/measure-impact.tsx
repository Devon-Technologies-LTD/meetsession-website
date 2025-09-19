import Image from "next/image";
import { cn, separateCamelCase } from "@/lib/utils";

import { getMetrics } from "../server";

import { NoiseElement } from "@/components/noise-element";
import CountAnimation from "@/components/count-animation";

export function MeasureImpact() {
  return (
    <section
      id="impact"
      className={cn(
        "relative overflow-hidden",
        "bg-brand-black text-white",
        "flex items-center justify-center",
        "px-7 py-8 md:py-32 sm:px-10 md:px-16 lg:px-20 xl:px-24 2xl:px-32 h-dvh",
      )}
    >
      <div className="w-full h-fit z-10 flex flex-col gap-10">
        <div className="flex flex-col gap-2 items-center md:items-start w-full h-fit z-10 text-center md:text-start">
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-dm-sans mix-blend-difference">
            Measurable impact in Numbers
          </p>
          <p className="text-base md:text-lg max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
            Real metrics. Real outcomes. Real transformations. Every number
            tells a story of growth, collaboration, and progress.
          </p>
        </div>

        <Metrics />
      </div>

      <div
        className={cn(
          "hidden md:block",
          "w-32 sm:w-64 md:w-96 lg:w-124 xl:w-172 h-auto",
          "absolute top-1/2 -translate-y-1/2 right-0 z-0",
          "after:absolute after:-top-10 lg:after:top-0 after:-right-44",
          "md:after:h-124 lg:after:h-154 xl:after:h-196",
          "md:after:w-124 lg:after:w-154 xl:after:w-196",
          "after:rounded-full after:opacity-10 after:bg-gray-100",
        )}
      >
        <Image
          src={"/image/ms-screenshot-text.svg"}
          alt="screenshot"
          height={400}
          width={200}
          className="h-full w-full"
        />
      </div>

      {/* filters */}
      {/* left side */}
      <NoiseElement
        className="hidden md:block absolute -left-64 -top-52"
        intensity={40}
        opacity={0.2}
      >
        <div
          className={cn(
            "h-full w-full relative",
            "before:w-182 before:h-182",
            "before:bg-brand-blue-light before:opacity-50 before:rounded-full before:blur-3xl",
            "before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-12",
          )}
        ></div>
      </NoiseElement>
      <NoiseElement
        className="hidden md:block absolute -left-64 -bottom-20"
        intensity={40}
        opacity={0.2}
      >
        <div
          className={cn(
            "h-full w-full relative",
            "before:w-182 before:h-182",
            "before:bg-brand-blue-light before:opacity-50 before:rounded-full before:blur-3xl",
            "before:absolute before:bottom-1/2 before:translate-y-1/2 before:-left-12",
          )}
        ></div>
      </NoiseElement>

      {/* right side */}
      <NoiseElement className="absolute -right-32 -top-10">
        <div
          className={cn(
            "h-full w-full relative",
            "before:w-120 md:before:w-182 before:h-120 md:before:h-182",
            "before:bg-brand-blue before:opacity-30 before:rounded-full before:blur-3xl",
            "before:absolute before:-bottom-64 md:before:bottom-1/2 before:right-1/2 md:before:-right-12",
            "before:-translate-x-1/2 md:before:translate-x-0 before:-translate-y-0 md:before:translate-y-1/2",
          )}
        ></div>
      </NoiseElement>
      <NoiseElement className="absolute -right-32 -bottom-10">
        <div
          className={cn(
            "h-full w-full relative",
            "before:bg-brand-blue before:opacity-30 before:rounded-full before:blur-3xl",
            "before:w-120 md:before:w-182 before:h-120 md:before:h-182",
            "before:absolute before:-bottom-64 md:before:bottom-1/2 before:right-1/2 md:before:-right-12",
            "before:-translate-x-1/2 md:before:translate-x-0 before:-translate-y-0 md:before:translate-y-1/2",
          )}
        ></div>
      </NoiseElement>
    </section>
  );
}

async function Metrics() {
  const metrics = await getMetrics();
  if (!metrics.success || !metrics.data) {
    return <p className="text-white text-sm italic">No analytics founds</p>;
  }
  const arr: { id: number; value: number; description: string }[] = [];
  Object.entries(metrics.data).forEach(([key, val], i) => {
    arr.push({ value: val, description: key, id: i + 1 });
  });
  return (
    <div className="w-full md:w-fit h-fit gap-3.5 sm:gap-4 md:gap-5 lg:gap-6 flex flex-wrap items-center md:items-start justify-center">
      {arr.map((itr) => (
        <div
          key={itr.id}
          className="p-px rounded-xl bg-linear-to-b from-brand-blue to-brand-green"
        >
          <div className="w-full h-full rounded-xl bg-brand-black">
            <div
              className={cn(
                "min-w-32 md:min-w-44 w-fit min-h-20 h-fit rounded-xl bg-linear-to-r from-white/10 to-transparent",
                "p-2 sm:p-3 md:p-5 lg:p-6 flex flex-col gap-1 sm:gap-2 md:gap-3 items-center justify-center",
              )}
            >
              <CountAnimation
                number={itr.value}
                suffix="+"
                className="text-4xl font-dm-sans font-black text-white text-center"
              />
              <p className="text-xs md:text-sm lg:text-base">
                {separateCamelCase(itr.description)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
