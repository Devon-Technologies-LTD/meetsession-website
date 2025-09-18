import { z } from "zod";

export const impactSchema = z.object({
  TotalUsers: z.number(),
  TotalTranscripts: z.number(),
  TotalMeetings: z.number(),
});

export type TImpact = z.infer<typeof impactSchema>;
