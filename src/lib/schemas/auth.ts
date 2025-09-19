import z from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type TLogin = z.infer<typeof loginSchema>;

export const userSchema = z.object({
  id: z.string(),
  status: z.string(),
  email: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  profile_image: z.string(),
  is_onboarded: z.boolean(),
  user_type: z.string(),
  app_version: z.string().optional(),
});
export type TUser = z.infer<typeof userSchema>;

export const tokensSchema = z.string();
export type TTokens = z.infer<typeof tokensSchema>;
