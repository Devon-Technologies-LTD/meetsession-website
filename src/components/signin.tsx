"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, TLogin } from "@/lib/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginAction } from "@/server/actions";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { TLoginResponse } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Label } from "./ui/label";
import { PasswordField } from "./ui/password-field";

type LoginFormProps = {
  onSuccessAction?: (response?: TLoginResponse | null) => void;
  onFailedAction?: (error?: Record<string, string>) => void;
};

export function SigninForm({ onSuccessAction: onSuccess }: LoginFormProps) {
  const form = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: TLogin) {
    const formdata = new FormData();
    Object.keys(values).forEach((value) => {
      formdata.append(value, values[value as keyof typeof values] ?? "");
    });

    const response = await loginAction(formdata);

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
    }
  }

  return (
    <div className="z-10 flex flex-col justify-center items-center gap-6 w-full h-full text-center">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="z-10 text-start max-w-2xl font-dm-sans w-full [&_button]:placeholder:text-white flex flex-col gap-5"
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
                    className="pill py-6 text-sm md:text-base placeholder:text-gray-300 focus-visible:ring-0"
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
          Login
        </Button>
      </form>
    </div>
  );
}

export function Signin() {
  const router = useRouter();
  // success handler
  function onSuccess() {
    router.push(`/dashboard`);
  }

  // error handler
  function onError(
    data?: Record<string, string | string[] | undefined> | string,
  ) {
    console.log(data);
  }

  return (
    <div className="w-full h-full">
      <SigninForm onSuccessAction={onSuccess} onFailedAction={onError} />
    </div>
  );
}
