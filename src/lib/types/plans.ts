export type TFeature = { id: number; response: string };

export type TSubscriptionPlanFeature = {
  key: string;
  label: string;
  value: string | number | boolean;
  category: string;
};

export type TSubscriptionPlan = {
  id: string;
  name: string;
  price?: number;
  meeting_hours?: number;
  features?: TSubscriptionPlanFeature[];
};

export type TUserCurrentPlan = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;

  user_id?: string;
  plan_id?: string;
  tier_id?: string;
  meeting_hours: number;
  start_date?: string;
  end_date?: string;
  subscription_start_date?: string;
  subscription_end_date?: string;
  subscription_type?: string;
  subscription_status?: string;
  tier?: string;
  // created_by: {
  //   email: string;
  //   last_name: string;
  //   user_type: string;
  //   first_name: string;
  // };
  // plan_snapshot: {
  //   name: string;
  //   price_ngn: number;
  //   meeting_hours: number;
  // };
  // feature_snapshot_list: null;
  // coupon_snapshot: null;
  // status: string;
  // created_at: string;
  // updated_at: string;
  // DeletedAt: string | null;
};
