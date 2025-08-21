import z from "zod";

export const deleteAccountSchema = z.object({
  email: z.email("Email address is invalid").trim(),
  reason: z.string().trim().optional(),
});
export type TDeleteAccount = z.infer<typeof deleteAccountSchema>;
