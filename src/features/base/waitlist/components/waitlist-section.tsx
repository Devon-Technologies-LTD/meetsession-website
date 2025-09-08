"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

import { waitlistSchema, TWaitlist } from "@/features/base/waitlist/lib/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { joinWaitlistAction } from "../server";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

export function WaitlistSection() {
  const router = useRouter();
  const currentDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
  const source = "WEB";

  const form = useForm<TWaitlist>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      email: "",
      last_name: "",
      first_name: "",
      other_name: "",
      source: source,
      phone_number: "",
      date_joined: currentDate,
    },
  });

  async function onSubmit(values: TWaitlist) {
    const formdata = new FormData();
    Object.keys(values).forEach((value) => {
      formdata.append(value, values[value as keyof typeof values] ?? "");
    });

    const response = await joinWaitlistAction(formdata);

    if (response.success) {
      toast.success("Successfully joined waitlist!");
      form.reset();
      router.push("/waitlist/success");
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
          Join MeetSession Waitlist
        </p>
        <p className="z-10 text-sm md:text-base max-w-sm">
          Be among the first to experience seamless legal transcription. Sign up
          now to reserve your spot on our exclusive waitlist.
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="z-10 text-start max-w-2xl w-full [&_button]:placeholder:text-white flex flex-col gap-5"
      >
        <Form {...form}>
          <div className="flex items-center gap-4 w-full">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="First name (required)"
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
              name="last_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Last name (required)"
                      {...field}
                      className="py-6 text-sm md:text-base placeholder:text-gray-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center gap-4 w-full">
            <FormField
              control={form.control}
              name="other_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Other name (optional)"
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
              name="phone_number"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Phone number (required)"
                      {...field}
                      className="py-6 text-sm md:text-base placeholder:text-gray-300"
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
                <FormControl>
                  <Input
                    placeholder="Email address (required)"
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
          Join Waitlist
        </Button>
      </form>
    </div>
  );
}
