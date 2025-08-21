"use client";

import { useForm } from "react-hook-form";
import { deleteAccountSchema, TDeleteAccount } from "../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export function DeleteAccount() {
  const form = useForm<TDeleteAccount>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: {
      email: "",
      reason: "",
    },
  });

  function onSubmit(values: TDeleteAccount) {
    console.log(values);
  }

  return (
    <div className="w-full h-full bg-brand-black-dark text-white flex flex-col items-center justify-center">
      <div className="flex flex-col items-start gap-8 w-fit">
        <div className="flex flex-col items-start justify-start">
          <p className="text-3xl font-bold font-dm-sans">Delete Your Account</p>
          <p className="text-sm md:text-base">You are about to request to permanently delete your MeetSession account.</p>
        </div>

        <div className="flex flex-col gap-5 rounded-xl bg-white max-w-5xl w-full p-10 text-brand-black">
          <p className="text-2xl font-bold font-dm-sans">Confirm Account Deletion</p>

          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full h-fit">
            <Form {...form}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="example@email.com" {...field} className="py-6" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Reason for Deletion (Optional)</FormLabel>
                    <FormControl>
                      <textarea {...field} className="py-2 px-4 rounded-md border border-border text-sm" placeholder="Reason for deleting account" rows={5}></textarea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>

            <div className="bg-red-50 max-w-xl rounded-md px-4 py-5 text-sm">
              <p>All your meetings, transcripts, recordings, and account data will be permanently erased and cannot be restored.</p>
            </div>

            <div>
              <p className="font-semibold text-sm">What happens when you delete your account?</p>
              <ul className="list-disc list-inside text-sm">
                <li>All meeting history will be permanently deleted</li>
                <li>Transcripts and recording will be deleted</li>
                <li>Account information and preferences will be erased</li>
                <li>You will be removed from any team collaborations</li>
                <li>This action canoot be undone</li>
              </ul>
            </div>

            <div className="flex items-center gap-4">
              <Button size="lg">Cancel</Button>
              <Button variant="destructive" size="lg">Request Account Deletion</Button>
            </div>
            <div className="flex">
              <p className="font-semibold">Need help? Contact <a href="mailto:product@devontech.io" className="text-brand-blue-light underline">product@devontech.io</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
