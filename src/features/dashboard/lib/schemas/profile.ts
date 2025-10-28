import { z } from "zod";

export const updateProfileSchema = z.object({
  first_name: z.string().optional(),
  middle_name: z.string().optional(),
  last_name: z.string().optional(),
  phone_number: z.string().optional(),
  email: z.email().optional(),
  gender: z.string().optional(),
  date_of_birth: z.string().optional(),
  profile_image: z.string().optional(),
});

export type TUpdateProfile = z.infer<typeof updateProfileSchema>;
