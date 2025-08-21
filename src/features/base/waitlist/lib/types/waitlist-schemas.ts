import { z } from "zod";

export const waitlistSchema = z.object({
  email: z.email("Invalid email").trim(),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }).trim()
});
export type TWaitlist = z.infer<typeof waitlistSchema>;
