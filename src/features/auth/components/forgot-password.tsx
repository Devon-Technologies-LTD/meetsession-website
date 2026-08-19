"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  TResetPassword,
  TSendResetPasswordCode,
  resetPasswordSchema,
  sendResetPasswordCodeSchema,
} from "@/lib/schemas";
import {
  resetPasswordAction,
  sendResetPasswordCodeAction,
} from "@/server/actions";

function RequestCodeStep({
  onSent,
}: {
  onSent: (email: string) => void;
}) {
  const form = useForm<TSendResetPasswordCode>({
    resolver: zodResolver(sendResetPasswordCodeSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: TSendResetPasswordCode) {
    const formdata = new FormData();
    formdata.append("email", values.email);
    const response = await sendResetPasswordCodeAction(formdata);

    if (response.success) {
      toast.success(response.message || "Reset code sent");
      onSent(values.email);
    } else {
      toast.error(response.message);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="z-10 text-start max-w-2xl font-dm-sans w-full flex flex-col gap-5"
    >
      <Form {...form}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <Label className="font-bold" htmlFor={field.name}>
                Email Address
              </Label>
              <FormControl>
                <Input
                  id={field.name}
                  placeholder="example@email.com"
                  className="pill py-6 text-base placeholder:text-gray-300 focus-visible:ring-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>

      <Button
        variant="brand-green"
        type="submit"
        size="pill"
        className="text-white font-medium py-6 cursor-pointer relative overflow-hidden"
        disabled={form.formState.isSubmitting || !form.formState.isValid}
      >
        {form.formState.isSubmitting && (
          <span className="w-full h-full bg-inherit pointer-events-none cursor-not-allowed absolute top-0 right-0 flex items-center justify-center">
            <Loader2Icon className="animate-spin" />
          </span>
        )}
        Send reset code
      </Button>
    </form>
  );
}

function ResetPasswordStep({ email }: { email: string }) {
  const router = useRouter();
  const form = useForm<TResetPassword>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email, otp: "", password: "", password_confirm: "" },
  });

  async function onSubmit(values: TResetPassword) {
    const formdata = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formdata.append(key, value);
    });
    const response = await resetPasswordAction(formdata);

    if (response.success) {
      toast.success(response.message || "Password reset successfully");
      router.push("/dashboard/accounts");
    } else {
      toast.error(response.message);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="z-10 text-start max-w-2xl font-dm-sans w-full flex flex-col gap-5"
    >
      <p className="text-sm text-muted-foreground -mt-2">
        Enter the code sent to <span className="font-semibold">{email}</span>{" "}
        and choose a new password.
      </p>

      <Form {...form}>
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="w-fit mx-auto">
              <FormControl>
                <InputOTP
                  className="mx-auto w-fit"
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  id={field.name}
                  {...field}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
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
              <Label className="font-bold" htmlFor={field.name}>
                New Password
              </Label>
              <FormControl>
                <PasswordField
                  id={field.name}
                  placeholder="*****************"
                  className="pill py-6 text-sm md:text-base placeholder:text-gray-300"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password_confirm"
          render={({ field }) => (
            <FormItem className="w-full">
              <Label className="font-bold" htmlFor={field.name}>
                Confirm New Password
              </Label>
              <FormControl>
                <PasswordField
                  id={field.name}
                  placeholder="*****************"
                  className="pill py-6 text-sm md:text-base placeholder:text-gray-300"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>

      <Button
        variant="brand-green"
        type="submit"
        size="pill"
        className="text-white font-medium py-6 cursor-pointer relative overflow-hidden"
        disabled={form.formState.isSubmitting || !form.formState.isValid}
      >
        {form.formState.isSubmitting && (
          <span className="w-full h-full bg-inherit pointer-events-none cursor-not-allowed absolute top-0 right-0 flex items-center justify-center">
            <Loader2Icon className="animate-spin" />
          </span>
        )}
        Reset password
      </Button>
    </form>
  );
}

export function ForgotPassword() {
  const [sentToEmail, setSentToEmail] = useState<string | null>(null);

  return (
    <div className="z-10 flex flex-col justify-center items-center gap-6 w-full h-full text-center">
      {sentToEmail ? (
        <ResetPasswordStep email={sentToEmail} />
      ) : (
        <RequestCodeStep onSent={setSentToEmail} />
      )}
    </div>
  );
}
