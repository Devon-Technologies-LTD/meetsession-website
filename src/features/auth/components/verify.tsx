"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { resentOTPAction, verifyEmailAction } from "@/server/actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { TVerifyEmail, verifyEmailSchema } from "@/lib/schemas";
import { TVerifyTokenResponse } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { AlarmClockIcon, Loader2Icon } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter } from "next/navigation";
import { useCountdown } from "../hook/use-countdown";
import { useActionState, useEffect } from "react";

type VerifyEmailFormProps = {
  onSuccessAction?: (response?: TVerifyTokenResponse | null) => void;
  onFailedAction?: (
    error?: Record<string, string | string[] | undefined> | string,
  ) => void;
  email?: string;
};

function VerifyEmailForm({
  onSuccessAction: onSuccess,
  onFailedAction: onError,
  email,
}: VerifyEmailFormProps) {
  const { formattedTime, start, timeLeft } = useCountdown(120);
  const form = useForm<TVerifyEmail>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: email,
      otp: "",
    },
  });

  async function onResendOtp(_prev: unknown, formdata: FormData) {
    const response = await resentOTPAction(formdata);

    if (response.success) {
      toast.success("Successfully", { description: response.message });
      start();
    } else {
      toast.error(
        typeof response.errors === "object"
          ? response.errors.email
          : response.errors,
      );
    }
  }
  const [_, action, loading] = useActionState(onResendOtp, undefined);

  useEffect(() => {
    start();
  }, []);

  async function onSubmit(values: TVerifyEmail) {
    const formdata = new FormData();
    Object.keys(values).forEach((value) => {
      formdata.append(value, values[value as keyof typeof values] ?? "");
    });

    const response = await verifyEmailAction(formdata);

    if (response.success) {
      toast.success("Successfully");
      form.reset();
      onSuccess?.(response?.data);
      // router.push("/");
    } else {
      toast.error(
        typeof response.errors === "string"
          ? response.errors
          : response.message,
      );
      onError?.(response.errors);
    }
  }

  return (
    <div className="z-10 flex flex-col justify-center items-center gap-6 w-full h-full text-center">
      {email ? (
        <div className="w-full h-fit flex flex-col gap-2">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn(
              "flex flex-col gap-5 ",
              "z-10 max-w-2xl w-full",
              "text-start [&_button]:placeholder:text-white font-dm-sans",
            )}
          >
            <Form {...form}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        id={field.name}
                        className="pill py-6 text-sm md:text-base placeholder:text-gray-300 focus-visible:ring-0"
                        {...field}
                        type="hidden"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
            </Form>

            <Button
              variant="brand-blue"
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
              Verify & Continue
            </Button>
          </form>

          <div className="text-xs md:text-sm w-full italic flex justify-between items-center gap-2">
            <div className="text-start flex items-center gap-1 divide divide-neutral-800">
              <AlarmClockIcon className="w-4 h-4" />
              <span>Resend in {formattedTime}</span>
            </div>
            <div className="text-start">
              <form action={action} className="w-fit h-fit">
                <input type="hidden" name="email" defaultValue={email} />
                <Button
                  disabled={timeLeft !== 0 || loading}
                  variant="link"
                  className="text-xs text-sky-600 relative overflow-hidden"
                  type="submit"
                >
                  {loading && (
                    <span className="absolute top-0 left-0 h-full w-full bg-inherit/10 flex items-center justify-center backdrop-blur-[0.8px]">
                      <Loader2Icon className="animate-spin w-5 h-5" />
                    </span>
                  )}
                  Didn't receive OTP? Send again.
                </Button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-red-800 italic font-dm-sans">
          Email is required to proceed
        </p>
      )}
    </div>
  );
}

type VerifyProps = { email?: string };

export function Verify({ email }: VerifyProps) {
  const router = useRouter();
  function onSuccess(response?: TVerifyTokenResponse | null) {
    const query = new URLSearchParams();
    if (response?.data) {
      query.append("email", response.data.email);
    }
    router.push(`/signin?${query.toString()}`);
  }
  function onError(
    error?: Record<string, string | string[] | undefined> | string,
  ) {
    console.log(error);
  }

  return (
    <div className="w-full h-full">
      <VerifyEmailForm
        email={email}
        onSuccessAction={onSuccess}
        onFailedAction={onError}
      />
    </div>
  );
}
