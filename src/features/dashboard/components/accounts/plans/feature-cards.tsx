"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FeatureCardOptions } from "./feature-card-options";
import { CircleChevronDownIcon, CircleChevronUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion as m } from "motion/react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { TSubscriptionPlan } from "@/lib/types";

type FeatureCardsProps = {
  plans?: TSubscriptionPlan[];
};
export function FeatureCards({ plans }: FeatureCardsProps) {
  const [selectedId, setSelectedId] = useState<string>(plans?.[0].id ?? "");
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const selectedPlan = plans?.find((p) => p.id === selectedId) ?? plans?.[0];

  const isFreePlan = selectedPlan?.id === plans?.[0].id;

  function renderActionButton() {
    return (
      <Button size="pill" variant="default" className="h-14 w-full">
        {isFreePlan ? "Select Plan" : "Proceed to Payment"}
      </Button>
    );
  }

  // if (!plan) return null;

  return (
    <div className="flex flex-col w-full gap-8">
      <FeatureCardOptions
        selectedId={selectedId}
        setSelectedIdAction={setSelectedId}
        plans={plans}
      />

      <Card
        className={cn(
          "border-black shadow-none bg-neutral-100",
          "transition-all duration-200",
          isCollapsed ? "gap-0" : "",
        )}
      >
        <CardHeader
          className={cn(
            "w-full flex flex-row items-center justify-between hover:cursor-pointer",
          )}
          onClick={() => setIsCollapsed((prev) => !prev)}
        >
          <div className="w-full h-fit flex flex-col gap-2">
            <CardTitle className="font-normal">{selectedPlan?.name}</CardTitle>
            <CardDescription className="flex items-center w-fit justify-center gap-2">
              <span className="font-bold text-neutral-800 text-xl tracking-tighter">
                ₦{selectedPlan?.price_ngn.toLocaleString()}
              </span>
              <span
                className={cn(
                  "font-medium text-white text-xs py-0.5 px-1.5",
                  "bg-brand-green rounded-full whitespace-nowrap",
                )}
              >
                Current plan
              </span>
            </CardDescription>
          </div>

          {isCollapsed ? (
            <m.span layoutId="toggler">
              <CircleChevronDownIcon />
            </m.span>
          ) : (
            <m.span layoutId="toggler">
              <CircleChevronUpIcon />
            </m.span>
          )}
        </CardHeader>

        <div className="px-6 hidden md:block">{renderActionButton()}</div>

        <AnimatePresence>
          {!isCollapsed && (
            <m.div exit={{ opacity: 0 }} className="w-full px-6">
              <Separator className="bg-black" />
            </m.div>
          )}
        </AnimatePresence>

        <m.div
          initial={{ height: "auto", opacity: 1 }}
          animate={
            isCollapsed
              ? { height: 0, opacity: 0 }
              : { height: "auto", opacity: 1 }
          }
        >
          <CardContent className="flex flex-col w-full gap-4">
            <div className="w-full text-xs font-normal h-fit flex items-center gap-2">
              <div className="w-full h-fit flex flex-col gap-1 flex-1">
                <span>Recording & Transcribe</span>
              </div>

              <p className="min-h-fit font-semibold">
                {selectedPlan?.meeting_hours}hrs
              </p>
            </div>
            {selectedPlan?.features?.map((feat, index) => {
              if (index === 0) {
                return null;
              }
              return (
                <div
                  key={feat.key}
                  className="w-full text-xs font-normal h-fit flex items-center gap-2"
                >
                  <div className="w-full h-fit flex flex-col gap-1 flex-1">
                    <span>{feat.label}</span>
                  </div>

                  <p className="min-h-fit font-semibold">{feat.status}</p>
                </div>
              );
            })}
          </CardContent>
        </m.div>
      </Card>
      <div className="md:hidden">{renderActionButton()}</div>
    </div>
  );
}
