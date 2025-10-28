import z from "zod";

export const deleteAccountSchema = z.object({
  email: z.email("Email address is invalid").trim(),
  reason: z
    .string({ error: "Please provide a reason for deleting your account" })
    .trim(),
});
export type TDeleteAccount = z.infer<typeof deleteAccountSchema>;
