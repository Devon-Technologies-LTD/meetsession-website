import z from "zod";

export const initiatePaymentSchema = z.object({
  tier_id: z.string({ error: "Tier ID is required" }),
  subscription_type: z.string({ error: "Subscription type is required" }),
  callback_url: z.string().optional(),
  coupon_code: z.string().optional(),
});

export type TInitiatePayment = z.infer<typeof initiatePaymentSchema>;

export const verifyPaymentSchema = z.object({
  reference: z.string({ error: "Reference is required" }),
});

export type TVerifyPayment = z.infer<typeof verifyPaymentSchema>;

export const validateCouponCodeSchema = z.object({
  code: z.string({ error: "Coupon code is required" }).trim().min(1, {
    error: "Coupon code is required",
  }),
});

export type TValidateCouponCode = z.infer<typeof validateCouponCodeSchema>;

export const trialStartSchema = z.object({
  tier_id: z.string({ error: "Tier ID is required" }),
  coupon_code: z.string().optional(),
});

export type TTrialStart = z.infer<typeof trialStartSchema>;
