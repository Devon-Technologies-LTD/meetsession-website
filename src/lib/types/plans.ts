import { JSX } from "react";
import { SVGProps } from "react";

export type TFeature = { id: number; response: string };
export type TPlanTheme = "black" | "blue" | "green" | "midnight-blue";
export type TPlan = {
  id: number;
  title: string;
  description?: string;
  price: number;
  features: TFeature[];
  link: string;
  isDefault?: boolean;
  isRecommended?: boolean;
  themeColor?: TPlanTheme;
  icon?: (
    props: SVGProps<SVGSVGElement>,
  ) => Element | React.ReactNode | JSX.Element;
};
export type TPlanFeature = {
  id: number;
  detail: string;
  subDetail?: string;
};

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
