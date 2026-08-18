import { TUser } from "@/lib/schemas";

export type TPartnerActivationResponse = {
  token: string;
  refresh_token: string;
  user_details: TUser;
  partner_name: string;
  tier_id: string;
  coupon_code: string;
  discount_percentage: number;
  discount_amount: number;
  coupon_expires_at: string;
  trial_days: number;
};
