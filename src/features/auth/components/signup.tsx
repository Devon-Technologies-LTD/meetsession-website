"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signupSchema, TSignup } from "@/lib/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signupAction } from "@/server/actions";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { PasswordField } from "@/components/ui/password-field";
import { useRouter } from "next/navigation";
import { TFullUser } from "@/lib/types";

// user signup
type SignupFormProps = {
  onSuccessAction?: (response?: TFullUser | null) => void;
  onFailedAction?: (
    error?: Record<string, string | string[] | undefined> | string,
  ) => void;
};

function SignupForm({
  onSuccessAction: onSuccess,
  onFailedAction: onError,
}: SignupFormProps) {
  const form = useForm<TSignup>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirm: "",
    },
  });

  async function onSubmit(values: TSignup) {
    const formdata = new FormData();
    Object.keys(values).forEach((value) => {
      formdata.append(value, values[value as keyof typeof values] ?? "");
    });

    const response = await signupAction(formdata);

    if (response.success) {
      toast.success("Successfully");
      form.reset();
      onSuccess?.(response?.data);
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "flex flex-col gap-5 ",
          "z-10 max-w-2xl w-full",
          "text-start [&_button]:placeholder:text-white font-dm-sans",
        )}
      >
        <Form {...form}>
          <div className="flex flex-row gap-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Label className="font-bold" htmlFor={field.name}>
                    First Name
                  </Label>
                  <FormControl>
                    <Input
                      id={field.name}
                      placeholder="First Name"
                      className="pill py-6 text-base placeholder:text-gray-300 focus-visible:ring-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Label className="font-bold" htmlFor={field.name}>
                    Last Name
                  </Label>
                  <FormControl>
                    <Input
                      id={field.name}
                      placeholder="Last Name"
                      className="pill py-6 text-base placeholder:text-gray-300 focus-visible:ring-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <Label className="font-bold" htmlFor={field.name}>
                  Email
                </Label>
                <FormControl>
                  <Input
                    id={field.name}
                    placeholder="Enter your email address"
                    className="pill py-6 text-base placeholder:text-gray-300 focus-visible:ring-0"
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
                <Label className="font-bold" htmlFor={field.name}>
                  Password
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
                  Confirm Password
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
          Create Account
        </Button>
      </form>
    </div>
  );
}

export function Signup() {
  const router = useRouter();
  // success handler
  function onSuccess(response?: TFullUser | null) {
    const query = new URLSearchParams();
    if (response?.email) {
      query.append("email", response.email);
    }
    router.push(`/signup/verify?${query.toString()}`);
  }

  // error handler
  function onError(
    data?: Record<string, string | string[] | undefined> | string,
  ) {
    console.log(data);
  }

  return (
    <div className="w-full h-full">
      <SignupForm onSuccessAction={onSuccess} onFailedAction={onError} />
    </div>
  );
}

Signup.SignupForm = SignupForm;
