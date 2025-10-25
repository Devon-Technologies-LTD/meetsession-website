"use client";

import { useForm } from "react-hook-form";
import { deleteAccountSchema, TDeleteAccount } from "../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRef, useState } from "react";
import { deleteAccountAction } from "../server/actions";
import { toast } from "sonner";
import { LoginForm } from "@/components/login-form";

type DeleteAccountProps = {
  email?: string;
  token?: string;
};

export function DeleteAccount({ email, token }: DeleteAccountProps) {
  const [open, setOpen] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);

  const form = useForm<TDeleteAccount>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: {
      email: email ?? "",
      reason: "",
    },
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  async function onSubmit(values: TDeleteAccount) {
    const formdata = new FormData();
    formdata.append("email", values.email);
    values.reason ? formdata.append("reason", values?.reason) : null;
    const res = await deleteAccountAction(formdata);
    if (!res.success) {
      toast.error(res.message, {
        description:
          typeof res.errors === "string"
            ? res.errors
            : res.errors.email + ", " + res.errors.reason,
      });
      
      if (
        typeof res.errors === "string" &&
        res.errors.toLowerCase().includes("token")
      ) {
        setOpenAuth(true); // open login dialog
      }
    } else {
      toast.success(res.message);
    }
  }

  function onConfirmDelete() {
    setOpen(false);
    formRef.current?.requestSubmit();
  }
  function onSuccessfullLogin() {
    setOpenAuth(false);
  }

  return (
    <div className="w-full h-full bg-brand-black-dark text-white flex flex-col items-center justify-center">
      <div className="flex flex-col items-start gap-8 w-fit">
        <div className="flex flex-col items-start justify-start">
          <p className="text-3xl font-bold font-dm-sans">Delete Your Account</p>
          <p className="text-sm md:text-base">
            You are about to permanently delete your MeetSession account.
          </p>
        </div>

        <div className="flex flex-col gap-5 rounded-xl bg-white max-w-5xl w-full p-10 text-brand-black">
          <p className="text-2xl font-bold font-dm-sans">
            Confirm Account Deletion
          </p>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full h-fit"
            ref={formRef}
          >
            <Form {...form}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@email.com"
                        {...field}
                        className="py-6"
                      />
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
                      <textarea
                        {...field}
                        className="py-2 px-4 rounded-md border border-border text-sm"
                        placeholder="Reason for deleting account"
                        rows={5}
                      ></textarea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>

            <div className="bg-red-50 max-w-xl rounded-md px-4 py-5 text-sm">
              <p>
                All your meetings, transcripts, recordings, and account data
                will be permanently erased and cannot be restored.
              </p>
            </div>

            <div>
              <p className="font-semibold text-sm">
                What happens when you delete your account?
              </p>
              <ul className="list-disc list-inside text-sm">
                <li>All meeting history will be permanently deleted</li>
                <li>Transcripts and recording will be deleted</li>
                <li>Account information and preferences will be erased</li>
                <li>You will be removed from any team collaborations</li>
                <li>This action canoot be undone</li>
              </ul>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/" className={cn(buttonVariants({ size: "lg" }))}>
                Cancel
              </Link>
              <DeleteAccountDialog
                open={open}
                onOpenChange={setOpen}
                onSuccess={onConfirmDelete}
              />
            </div>
            <div className="flex">
              <p className="font-semibold">
                Need help? Contact{" "}
                <a
                  href="mailto:product@devontech.io"
                  className="text-brand-blue-light underline"
                >
                  product@devontech.io
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
      <LoginDialog
        open={openAuth}
        setOpen={setOpenAuth}
        onSuccess={onSuccessfullLogin}
      />
    </div>
  );
}

type DeleteAccountDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
  onClose?: () => void;
};
function DeleteAccountDialog({
  open,
  onOpenChange,
  onSuccess,
  onClose,
}: DeleteAccountDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" variant="destructive" size="lg">
          Delete Account
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you wawnt to permanently delete your account?
          </DialogTitle>
          <DialogDescription>
            Deleting your account will permanently erase all your data,
            including all meeting history, transcripts, recordings, and
            preferences.
          </DialogDescription>

          <DialogFooter>
            <DialogClose onClick={onClose} asChild>
              <Button variant="default" size="lg">
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant={"destructive"}
              size="lg"
              type="submit"
              onClick={onSuccess}
            >
              Yes, delete my account
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

function LoginDialog({
  open,
  setOpen,
  onSuccess: onConfirmLogin,
}: {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  onSuccess?: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login to confirm account deletion</DialogTitle>
          <DialogDescription>
            To proceed with the account deletion process, please log in to your
            account.
          </DialogDescription>
        </DialogHeader>
        <LoginForm onSuccessAction={onConfirmLogin} />
      </DialogContent>
    </Dialog>
  );
}
