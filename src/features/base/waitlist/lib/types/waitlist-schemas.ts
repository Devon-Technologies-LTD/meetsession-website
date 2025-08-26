import { z } from "zod";

export const waitlistSchema = z.object({
  email: z.email({ error: "The email provided is not valid" }).trim(),
  last_name: z.string().min(2, { error: "Last name must be at least 2 characters" }).trim(),
  first_name: z.string().min(2, { error: "First name must be at least 2 characters" }).trim(),
  other_name: z.string().trim().optional(),
  source: z.enum(["WEB", "APP"], { error: "Invalid option provided, Expected 'WEB' or 'APP'" }),
  date_joined: z.string({ error: "The date provided is invalid" }).trim(),
  phone_number: z.string()
    .min(11, { error: "Phone number should be at least 11 characters" })
    .max(12, { error: "Phone number should be at most 12 characters" })
    .trim(),
});
export type TWaitlist = z.infer<typeof waitlistSchema>;
