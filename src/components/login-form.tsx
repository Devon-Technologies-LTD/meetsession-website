"use client";

import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
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

export function LoginForm() {
  // const router = useRouter();

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
    <div className="z-10 flex flex-col py-24 px-6 justify-center items-center gap-6 w-full h-full bg-brand-black text-center text-white">
      <div className="z-10 flex flex-col items-center gap-4">
        <p className="z-10 text-3xl md:text-5xl font-bold font-dm-sans">
          Login form
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="z-10 text-start max-w-2xl w-full [&_button]:placeholder:text-white flex flex-col gap-5"
      >
        <Form {...form}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Email (required)"
                    {...field}
                    className="py-6 text-sm md:text-base placeholder:text-gray-300"
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
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password (required)"
                    {...field}
                    className="py-6 text-sm md:text-base placeholder:text-gray-300"
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
          size="lg"
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
