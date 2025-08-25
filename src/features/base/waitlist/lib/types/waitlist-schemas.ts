import { z } from "zod";

export const waitlistSchema = z.object({
  email: z.email("The email provided is not valid").trim(),
  last_name: z.string().min(2, { message: "Last name must be at least 2 characters" }).trim(),
  first_name: z.string().min(2, { message: "First name must be at least 2 characters" }).trim(),
  source: z.enum(["WEB", "APP"], "Invalid option provided, Expected 'WEB' or 'APP'"),
  date_joined: z.string("The date provided is invalid").trim(),
  phone_number: z.string()
    .min(11, "Phone number should be at least 11 characters")
    .max(12, "Phone number should be at most 12 characters")
    .trim(),
});
export type TWaitlist = z.infer<typeof waitlistSchema>;
