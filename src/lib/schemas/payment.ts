import z from "zod";

export const initiatePaymentSchema = z.object({
  tier_id: z.string({ error: "Tier ID is required" }),
  subscription_type: z.string({ error: "Subscription type is required" }),
  callback_url: z.string().optional(),
});

export type TInitiatePayment = z.infer<typeof initiatePaymentSchema>;

export const verifyPaymentSchema = z.object({
  reference: z.string({ error: "Reference is required" }),
});

export type TVerifyPayment = z.infer<typeof verifyPaymentSchema>;
