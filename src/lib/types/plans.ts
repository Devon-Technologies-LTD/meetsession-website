// import { JSX } from "react";
// import { SVGProps } from "react";

import { TStatus, TUserType } from "./user";

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
  price: number;
  meeting_hours: number;
  features?: TSubscriptionPlanFeature[];
};

export type TUserCurrentPlan = {
  id: string;
  user_id: string;
  plan_id: string;
  meeting_hours: number;
  start_date: string;
  end_date: string;
  created_by: {
    email: string;
    last_name: string;
    user_type: TUserType;
    first_name: string;
  };
  plan_snapshot: {
    name: string;
    price_ngn: number;
    meeting_hours: number;
  };
  feature_snapshot_list: null;
  coupon_snapshot: null;
  status: TStatus;
  created_at: string;
  updated_at: string;
  DeletedAt: string | null;
};
