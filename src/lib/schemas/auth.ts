import z from "zod";

// login
export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});
export type TLogin = z.infer<typeof loginSchema>;

// tokens
export const tokensSchema = z.string();
export type TTokens = z.infer<typeof tokensSchema>;

// signup
export const signupSchema = z
  .object({
    first_name: z.string({ error: "First name is required" }),
    last_name: z.string({ error: "Last name is required" }),
    email: z.email({ error: "Email is required" }),
    password: z
      .string({ error: "Password is required" })
      .min(4, { error: "At least 4 characters are required" }),
    password_confirm: z
      .string({ error: "Confirm password is required" })
      .min(4, { error: "At least 4 characters are required" }),
  })
  .refine((values) => values.password === values.password_confirm, {
    error: "Confirm password does not match",
  });
export type TSignup = z.infer<typeof signupSchema>;

// user
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

// verify email
export const verifyEmailSchema = z.object({
  email: z.email(),
  otp: z.string().min(6, { error: "OTP must be 6 digits" }),
});
export type TVerifyEmail = z.infer<typeof verifyEmailSchema>;
