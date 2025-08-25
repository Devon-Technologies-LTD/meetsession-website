"use client";


import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { format } from "date-fns";

import { waitlistSchema, TWaitlist } from "@/features/base/waitlist/lib/types"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
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
      name: "",
      email: "",
      source: source,
      phone_number: "",
      date_joined: currentDate,
    },
  });

  async function onSubmit(values: TWaitlist) {
    const formdata = new FormData();
    formdata.append("email", values.email);
    formdata.append("phone_number", values.phone_number);
    formdata.append("name", values.name);
    formdata.append("source", values.source);
    formdata.append("date_joined", values.date_joined);

    const response = await joinWaitlistAction(formdata);

    if (response.success) {
      toast.success(response.message);
      form.reset();
      router.push("/waitlist/success");
    } else {
      toast.error(typeof response.errors === "string" ? response.errors : response.message);
    }
  }

  return (
    <div className="flex flex-col py-24 px-6 justify-center items-center gap-6 w-full h-full bg-brand-black text-center text-white">
      <div className="flex flex-col items-center gap-4">
        <p className="text-3xl md:text-5xl font-bold font-dm-sans">Join MeetSession Waitlist</p>
        <p className="text-sm md:text-base max-w-sm">
          Be among the first to experience seamless legal transcription. Sign up now to reserve your spot on our exclusive waitlist.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="text-start max-w-2xl w-full flex flex-col gap-5">
        <Form {...form}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Full name" {...field} className="py-6" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Email address" {...field} className="py-6" />
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
                  <Input placeholder="Phone number" {...field} className="py-6" />
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
            <span className="w-full h-full bg-inherit pointer-events-none cursor-not-allowed absolute top-0 right-0 flex items-center justify-center"><Loader2Icon className="animate-spin" /></span>
          )}
          Join Waitlist
        </Button>
      </form>
    </div>
  );
}
