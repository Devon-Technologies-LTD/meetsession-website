"use client";

import { cn } from "@/lib/utils";
import { NoiseElement } from "@/components/noise-element";
import { TTier, TTierTheme } from "../lib/types";
import { TSubscriptionPlan, TSubscriptionPlanFeature } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generateTierColor } from "../lib/utils";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FreePlanIcon } from "@/components/icons/free-plan-icon";
import { BasicPlanIcon } from "@/components/icons/basic-plan-icon";
import { EssentialPlanIcon } from "@/components/icons/essential-plan-icon";
import { ProPlanIcon } from "@/components/icons/pro-plan-icon";
import Link from "next/link";
import { useEffect, useState } from "react";

type PricingProps = {
  plans?: TSubscriptionPlan[] | null;
};

const HIDDEN_FEATURE_KEYS = new Set([
  "monthly_subscription",
  "quarterly_subscription",
  "annual_subscription",
]);

function formatFeature(feature: TSubscriptionPlanFeature) {
  if (HIDDEN_FEATURE_KEYS.has(feature.key) || feature.value === false) return null;

  if (feature.value === true) return feature.label;
  if (typeof feature.value === "number") {
    if (feature.value === -1) return `${feature.label}: Unlimited`;
    return `${feature.label}: ${feature.value}`;
  }

  if (typeof feature.value === "string") {
    return `${feature.label}: ${feature.value}`;
  }

  return feature.label;
}

function getTierTheme(index: number): TTierTheme {
  const themes: TTierTheme[] = ["black", "blue", "green", "midnight-blue"];
  return themes[index % themes.length];
}

function getTierIcon(name: string, index: number) {
  const lower = name.toLowerCase();
  if (lower.includes("individual") || lower.includes("free")) return <FreePlanIcon />;
  if (lower.includes("professional") || lower.includes("pro")) return <ProPlanIcon />;
  if (lower.includes("essential")) return <EssentialPlanIcon />;
  if (lower.includes("basic")) return <BasicPlanIcon />;
  return index % 2 === 0 ? <BasicPlanIcon /> : <EssentialPlanIcon />;
}

function getTierPrice(plan: TSubscriptionPlan) {
  const monthlyFeature = plan.features?.find((f) => f.key === "monthly_subscription");
  const fromFeature = monthlyFeature ? Number(monthlyFeature.value) : NaN;
  const fallbackPrice = typeof plan.price === "number" ? plan.price : 0;
  const price = Number.isFinite(fromFeature) ? fromFeature : fallbackPrice;
  return String(price);
}

function getTierDescription(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("individual") || lower.includes("free")) {
    return "Perfect for individuals just getting started with recording and transcription";
  }
  if (lower.includes("professional") || lower.includes("pro")) {
    return "Built for professionals and teams that need advanced AI and collaboration features";
  }
  return `Best for ${name.toLowerCase()} users who need reliable meeting productivity tools`;
}

export function Pricing({ plans }: PricingProps) {
  const [status, setStatus] = useState<
    "success" | "error" | "loading" | "idle"
  >("idle");
  const [livePlans, setLivePlans] = useState<TSubscriptionPlan[] | null>(
    plans ?? null,
  );
  const trialUrl = "https://meetsession.devontech.io/trial";
  const isUsingFallbackPlans = !livePlans || livePlans.length === 0;

  useEffect(() => {
    setStatus("loading");
    fetch("/api/v1/public/get-tiers")
      .then((res) => res.json())
      .then((data: { data?: TSubscriptionPlan[] }) => {
        if (!Array.isArray(data?.data)) {
          setStatus("error");
          return;
        }
        setLivePlans(data.data);
        setStatus("success");
      })
      .catch((err) => {
        console.log({ tiers: err });
        setLivePlans((current) => current ?? null);
        setStatus("error");
      });
  }, [setLivePlans]);

  const mappedTiers: TTier[] =
    livePlans
      ?.map((plan, index) => {
        const dynamicFeatures =
          plan.features
            ?.map(formatFeature)
            .filter((item): item is string => Boolean(item)) ?? [];
        return {
          id: plan.id,
          title: plan.name,
          price: getTierPrice(plan),
          description: getTierDescription(plan.name),
          features:
            dynamicFeatures.length > 0
              ? dynamicFeatures
              : index === 0
                ? priceList[0].features
                : [],
          link: "",
          isDefault:
            plan.name.toLowerCase().includes("individual") ||
            plan.name.toLowerCase().includes("free"),
          isRecommended:
            plan.name.toLowerCase().includes("professional") ||
            plan.name.toLowerCase().includes("pro"),
          icon: getTierIcon(plan.name, index),
          themeColor: getTierTheme(index),
        };
      })
      .filter((tier) => tier.features.length > 0) ?? [];

  const tiers: TTier[] = [...priceList, ...mappedTiers];

  return (
    <div
      id="waitlist"
      className={cn(
        "bg-brand-black text-white",
        "px-7 py-8 md:py-32 lg:px-8 h-fit",
        "flex justify-center",
        "relative overflow-hidden",
      )}
    >
      <div className="z-10 flex h-fit w-full max-w-7xl flex-col items-center justify-center gap-6 sm:gap-10 md:gap-16 lg:gap-24">
        <div
          className={cn(
            "mx-auto max-w-full md:max-w-120 text-center",
            "flex flex-col gap-2 md:gap-3 items-center",
          )}
        >
          <p className="font-dm-sans font-black text-2xl md:text-3xl">
            Find the Right Plan for You
          </p>
          <p className="text-sm md:text-base lg:text-lg text-neutral-400">
            Every tier includes our core features. Choose the one that fits your
            needs.
          </p>
          {status === "loading" && (
            <p className="text-xs text-neutral-300">Loading plans...</p>
          )}
          {status === "error" && (
            <p className="text-xs text-neutral-300">
              Failed to retrieve live plans.
            </p>
          )}
          {isUsingFallbackPlans && (
            <p className="max-w-xl rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-neutral-300">
              Live plan data is temporarily unavailable. Showing fallback
              pricing while we reconnect.
            </p>
          )}
        </div>

        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {tiers.map((itr) => (
            <Card
              key={itr.id}
              className={cn(
                generateTierColor(itr.themeColor),
                "flex h-full min-h-[38rem] flex-col rounded-3xl px-2 py-2",
                "shadow-none border-none text-white",
              )}
            >
              <CardHeader className="rounded-2xl p-4 bg-neutral-700/20 font-dm-sans relative">
                {itr.isRecommended && (
                  <div className="absolute top-1 right-4 text-[9px] bg-black rounded-full py-0.5 px-1.5">
                    Recommended plan
                  </div>
                )}
                <div
                  className={cn(
                    "w-full h-full",
                    "flex items-center justify-between gap-2",
                  )}
                >
                  <div className="flex gap-2 items-center">
                    <div className="flex items-center justify-center h-12 w-12 bg-white/10 rounded-xl">
                      {itr.icon}
                    </div>
                    <CardTitle className="font-bold text-sm md:text-base">
                      {itr.title}
                    </CardTitle>
                  </div>
                  <div className="w-fit flex items-center gap-2.5">
                    {/* {itr.isDefault && (
                      <span
                        className={cn(
                          generateTierColor("green"),
                          "font-light text-[9px] py-0.5 px-1.5 rounded-full",
                        )}
                      >
                        Default plan
                      </span>
                    )} */}
                    <CardDescription className="text-2xl font-bold text-white">
                      ₦{itr.price}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent
                className={cn(
                  "font-poppins text-xs md:text-sm",
                  "flex flex-1 flex-col gap-8 px-6 pb-2 pt-6",
                )}
              >
                <div className="min-h-16 w-full text-sm leading-6 md:text-base">
                  {itr.description}
                </div>

                <ul className="flex w-full flex-1 flex-col gap-3">
                  {itr.features.map((feat, idx) => (
                    <li key={idx} className="flex gap-2.5 items-center">
                      <span className="rounded-full bg-white/10 p-1">
                        <CheckIcon className="w-2.5 md:w-4 h-2.5 md:h-4" />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="mt-auto px-6 py-4">
                <Button
                  asChild
                  className={cn(
                    generateTierColor(
                      itr.themeColor === "blue" || itr.themeColor === "green"
                        ? "black"
                        : "green",
                    ),
                    "w-full py-5 hover:bg-neutral-600 rounded-lg",
                  )}
                >
                  <Link href={trialUrl}>Choose plan</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* filters */}
      <NoiseElement
        className="hidden md:block absolute -left-148 top-1/2 translate-y-1/2"
        intensity={40}
        opacity={0.2}
      >
        <div
          className={cn(
            "h-full w-full relative",
            "before:w-204 before:h-204",
            "before:bg-brand-blue before:opacity-40 before:rounded-full before:blur-3xl",
            "before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-12",
          )}
        ></div>
      </NoiseElement>
      <NoiseElement className="absolute -right-148 bottom-0 md:bottom-1/2 -translate-y-1/2">
        <div
          className={cn(
            "h-full w-full relative",
            "before:bg-brand-blue before:opacity-40 before:rounded-full before:blur-3xl",
            "before:w-120 md:before:w-204 before:h-120 md:before:h-204",
            "before:absolute before:-bottom-64 md:before:bottom-1/2 before:right-1/2 md:before:-right-12",
            "before:-translate-x-1/2 md:before:translate-x-0 before:-translate-y-0 md:before:translate-y-1/2",
          )}
        ></div>
      </NoiseElement>
    </div>
  );
}

const priceList: TTier[] = [
  {
    id: 1,
    title: "Free",
    price: "0",
    description:
      "Perfect for individuals just getting started with recording and transcription",
    features: [
      "8hrs+ recording & Transcription",
      "Meeting Organization",
      "Speaker Differentiation",
    ],
    link: "",
    isDefault: true,
    icon: <FreePlanIcon />,
    themeColor: "black",
  },
 
];
