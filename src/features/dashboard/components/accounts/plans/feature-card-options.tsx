"use client";

import { TSubscriptionPlan } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CircleCheckIcon } from "lucide-react";

type FeatureCardOptionsProps = {
  selectedId: string;
  setSelectedIdAction: React.Dispatch<
    React.SetStateAction<FeatureCardOptionsProps["selectedId"]>
  >;
  plans?: TSubscriptionPlan[];
};
export function FeatureCardOptions({
  plans,
  selectedId,
  setSelectedIdAction: setSelectedId,
}: FeatureCardOptionsProps) {
  if (!plans || plans.length < 1) return null;

  return (
    <div className="flex md:hidden items-center justify-between gap-2.5 w-full">
      {plans
        .map((p) => ({ id: p.id, title: p.name }))
        .map((plan) => {
          return (
            <div
              key={plan.id}
              className={cn(
                "p-2",
                "hover:cursor-pointer",
                "h-20 w-16 rounded-lg bg-neutral-100",
                "flex flex-col items-center justify-between",
                "transition-all scale-100 text-neutral-800",
                {
                  "scale-115 bg-linear-to-b from-brand-blue to-brand-green text-white":
                    selectedId === plan.id,
                },
              )}
              onClick={() => setSelectedId(plan.id)}
            >
              <span className="text-xs font-semibold">{plan.title}</span>

              {selectedId === plan.id && (
                <span className="z-10">
                  <CircleCheckIcon className="w-4 h-4" />
                </span>
              )}
            </div>
          );
        })}
    </div>
  );
}
