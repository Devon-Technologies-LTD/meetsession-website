"use client";

import { BackButton } from "@/components/back-button";
import { SigninForm, useSigninRedirect } from "@/components/signin";
import { SigninSplit } from "@/features/auth/components/signin-split";

export default function Page() {
  const { onSuccess, onError } = useSigninRedirect();

  return (
    <section className="h-full w-full flex flex-col gap-10 pt-32 pb-7 px-7 md:px-10 lg:p-0 lg:gap-0">
      <BackButton
        href="/manage"
        className="h-12 w-fit self-end fixed top-10 lg:hidden"
      />

      <div className="text-brand-blue-dark font-dm-sans w-full h-fit lg:hidden">
        <p className="font-black text-3xl tracking-tight">Login</p>
        <p className="text-sm text-muted-foreground">
          Please enter the correct credentials to access your account
        </p>
      </div>

      <div className="w-full h-full lg:hidden">
        <SigninForm onSuccessAction={onSuccess} onFailedAction={onError} />
      </div>

      <SigninSplit onSuccessAction={onSuccess} />
    </section>
  );
}
