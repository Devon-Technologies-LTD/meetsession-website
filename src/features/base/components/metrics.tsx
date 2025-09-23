"use client";

import { useEffect, useState } from "react";
import { MetricsDisplay } from "./metrics-display";

export function Metrics() {
  const [metrices, setMetrices] = useState<
    { id: number; value: number; description: string }[] | undefined
  >(undefined);

  useEffect(() => {
    fetch("/api/v1/public/get-metrics")
      .then((res) => res.json())
      .then((data) => {
        const arr: { id: number; value: number; description: string }[] = [];
        Object.entries(data.data).forEach(([key, val], i) => {
          arr.push({ value: Number(val), description: key, id: i + 1 });
        });
        setMetrices(arr);
      })
      .catch((err) => console.log({ metric: err }));
  }, [setMetrices]);

  return (
    <div className="w-full md:w-fit h-fit gap-3.5 sm:gap-4 md:gap-5 lg:gap-6 flex flex-wrap items-center md:items-start justify-center">
      {metrices ? (
        metrices?.map((itr) => (
          <MetricsDisplay
            key={itr.id}
            value={itr.value}
            description={itr.description}
          />
        ))
      ) : (
        <p className="text-white text-sm italic">No analytics founds</p>
      )}
    </div>
  );
}
