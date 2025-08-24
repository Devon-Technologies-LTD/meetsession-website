import { z } from "zod";

export const waitlistSchema = z.object({
  email: z.email("The email provided is not valid").trim(),
  date_joined: z.string("The date provided is invalid").trim(),
  source: z.enum(["WEB", "APP"], "Invalid option provided, Expected 'WEB' or 'APP'"),
  // name: z.string().min(2, { message: "Name must be at least 2 characters" }).trim()
});
export type TWaitlist = z.infer<typeof waitlistSchema>;
