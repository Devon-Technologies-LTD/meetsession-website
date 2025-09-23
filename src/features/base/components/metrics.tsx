"use client";

import { useEffect, useState } from "react";
import { MetricsDisplay } from "./metrics-display";

export function Metrics() {
  const [status, setStatus] = useState<
    "success" | "error" | "loading" | "idle"
  >("idle");

  const [metrics, setMetrics] = useState<
    { id: number; value: number; description: string }[] | undefined
  >(undefined);

  useEffect(() => {
    setStatus("loading");
    fetch("/api/v1/public/get-metrics")
      .then((res) => res.json())
      .then((data) => {
        const arr: { id: number; value: number; description: string }[] = [];
        Object.entries(data.data).forEach(([key, val], i) => {
          arr.push({ value: Number(val), description: key, id: i + 1 });
        });
        setMetrics(arr);
        setStatus("success");
      })
      .catch((err) => {
        setStatus("error");
        console.log({ metric: err });
      });
  }, [setMetrics]);

  return (
    <div className="w-full md:w-fit h-fit gap-3.5 sm:gap-4 md:gap-5 lg:gap-6 flex flex-wrap items-center md:items-start justify-center">
      {status === "loading" ? (
        <p className="text-white text-sm italic">Getting metrics...</p>
      ) : status === "error" ? (
        <p className="text-white text-sm italic">Failed to retrieve metrics</p>
      ) : status === "success" ? (
        metrics && metrics.length ? (
          metrics.map((itr) => (
            <MetricsDisplay
              key={itr.id}
              value={itr.value}
              description={itr.description}
            />
          ))
        ) : (
          <p className="text-white text-sm italic">No metrics founds</p>
        )
      ) : null}
    </div>
  );
}
