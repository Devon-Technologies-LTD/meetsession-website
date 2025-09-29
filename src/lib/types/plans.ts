// import { JSX } from "react";
// import { SVGProps } from "react";

export type TFeature = { id: number; response: string };

export type TSubscriptionPlanFeature = {
  key: string;
  label: string;
  status: "YES" | "N/A";
  available: boolean;
};

export type TSubscriptionPlan = {
  id: string;
  name: string;
  price_ngn: number;
  meeting_hours: number;
  features?: TSubscriptionPlanFeature[];
};
