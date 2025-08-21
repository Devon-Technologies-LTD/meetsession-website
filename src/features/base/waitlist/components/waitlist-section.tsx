"use client";


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { waitlistSchema, TWaitlist } from "@/features/base/waitlist/lib/types"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function WaitlistSection() {
  const form = useForm<TWaitlist>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  function onSubmit(values: TWaitlist) {
    console.log(values);
  }

  return (
    <div className="flex flex-col py-24 px-6 justify-center items-center gap-6 w-full h-full bg-brand-black text-center text-white">
      <div className="flex flex-col items-center gap-4">
        <p className="text-5xl font-bold font-dm-sans">Join MeetSession Waitlist</p>
        <p className="text-base max-w-sm">
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
        </Form>
        <Button variant="brand-green" type="submit" size="lg" className="py-6 cursor-pointer">Join Waitlist</Button>
      </form>
    </div>
  );
}
