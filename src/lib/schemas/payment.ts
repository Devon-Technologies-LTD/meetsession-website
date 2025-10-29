import z from "zod";

export const initiatePaymentSchema = z.object({
  plan_id: z.string({ error: "Plan ID is required" }),
});

export type TInitiatePayment = z.infer<typeof initiatePaymentSchema>;

export const verifyPaymentSchema = z.object({
  reference: z.string({ error: "Reference is required" }),
});

export type TVerifyPayment = z.infer<typeof verifyPaymentSchema>;
