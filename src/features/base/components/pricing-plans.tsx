"use client";

import { TAllSubscriptionPlan } from "@/lib/types";
import { useEffect, useState } from "react";
import { Pricing } from "./pricing";
import { Spinner } from "@/components/spinner";


const PricingPlans = () => {
  const [plans, setPlans] = useState<TAllSubscriptionPlan[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "success" | "idle">("idle")

  useEffect(() => {
    setStatus("idle");
    setStatus("loading");
    fetch("/api/v1/tier/all?with_feature=true")
      .then((res) => res.json())
      .then((data: TAllSubscriptionPlan[]) => {
        setStatus("success");
        setPlans(data);
      })
      .catch((err) => {
        setStatus("error");
        console.log({ all_tiers: err });
      });
  }, [setPlans]);

  return (
    status === "loading" ? (
      <div className="w-full h-10 relative"><Spinner /></div>
    ) : (status === "error") ? (
      <div className="w-full h-10 relative">
        <p className="text-red-500 text-sm">Error fetching plans</p>
      </div>
    ) : (status === "success") ? (<Pricing plans={plans} />) : null
  )
};
export { PricingPlans };
