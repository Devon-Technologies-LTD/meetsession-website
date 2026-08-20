"use client";

import Link from "next/link";
import { CheckIcon, Loader2Icon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordField } from "@/components/ui/password-field";
import { GoogleSignInButton } from "@/components/ui/google-signin-button";
import { Logo } from "@/components/icons/logo";
import { TLoginResponse } from "@/lib/types";
import { useSigninForm } from "../hook/use-signin-form";
import { toast } from "sonner";

const FEATURES = [
  "Accurate transcripts, even in noisy rooms",
  "Speaker separation and AI summaries",
  "Encrypted storage, private to you",
];

const inputClassName =
  "h-12 rounded-lg border-gray-200 px-4 text-base placeholder:text-gray-300 focus-visible:ring-0 focus-visible:border-brand-green";

type SigninSplitProps = {
  defaultEmail?: string;
  onSuccessAction?: (response?: TLoginResponse | null) => void;
};

export function SigninSplit({
  defaultEmail,
  onSuccessAction: onSuccess,
}: SigninSplitProps) {
  const { form, onSubmit } = useSigninForm({ defaultEmail, onSuccess });

  return (
    <div className="hidden lg:flex w-full min-h-dvh">
      <div className="relative w-[46%] shrink-0 overflow-hidden bg-gradient-to-br from-brand-green-extradark via-brand-green-black to-black text-white flex flex-col px-14 py-12">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, currentColor 0 1px, transparent 1px 48px), repeating-linear-gradient(90deg, currentColor 0 1px, transparent 1px 48px)",
          }}
        />

        <div className="relative z-10 flex items-center gap-3">
          <Logo className="size-10" />
          <p className="font-bold text-xl">MeetSession</p>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center gap-6 max-w-md">
          <h1 className="font-black text-4xl leading-tight text-balance">
            Record it once. Find it forever.
          </h1>
          <p className="text-white/70 text-base leading-relaxed">
            Capture every session, get a speaker-separated transcript in
            minutes, and keep it filed where you can actually find it.
          </p>
          <ul className="flex flex-col gap-3">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-center gap-2.5">
                <span className="rounded-full bg-white/10 p-1">
                  <CheckIcon className="w-3.5 h-3.5 text-brand-green-extralight" />
                </span>
                <span className="text-sm text-white/90">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-xs text-white/50">
          &copy; 2026 Devon Technologies Ltd.
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center px-10 py-12">
        <div className="w-full max-w-md flex flex-col gap-6">
          <div>
            <h2 className="font-black text-3xl text-brand-blue-dark tracking-tight">
              Welcome back
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Enter your details to log in to your account.
            </p>
          </div>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 font-dm-sans"
          >
            <Form {...form}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Label className="font-bold text-sm" htmlFor={field.name}>
                      Email address
                    </Label>
                    <FormControl>
                      <Input
                        id={field.name}
                        placeholder="example@email.com"
                        className={inputClassName}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Label className="font-bold text-sm" htmlFor={field.name}>
                      Password
                    </Label>
                    <FormControl>
                      <PasswordField
                        id={field.name}
                        placeholder="*****************"
                        className={inputClassName}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  defaultChecked
                  className="size-4 rounded accent-brand-green"
                />
                <span className="text-brand-blue-dark">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-brand-blue font-semibold hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              size="lg"
              className="bg-brand-black hover:bg-brand-black-light text-white font-semibold h-12 rounded-lg cursor-pointer relative overflow-hidden"
              disabled={form.formState.isSubmitting || !form.formState.isValid}
            >
              {form.formState.isSubmitting && (
                <span className="w-full h-full bg-inherit pointer-events-none cursor-not-allowed absolute top-0 right-0 flex items-center justify-center">
                  <Loader2Icon className="animate-spin" />
                </span>
              )}
              Log in
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <GoogleSignInButton
              onSuccess={(response) => {
                toast.success("Successfully signed in with Google!");
                onSuccess?.(response?.data);
              }}
              onError={(error) => {
                toast.error(error?.error || "Failed to sign in with Google");
              }}
            />
          </form>

          <p className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-brand-blue font-bold">
              Create one
            </Link>
          </p>

          <p className="text-xs text-center text-muted-foreground">
            By continuing you agree to our{" "}
            <Link href="/policy" className="underline">
              Terms and Conditions and Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
