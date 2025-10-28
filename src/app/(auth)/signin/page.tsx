import { BackButton } from "@/components/back-button";
import { Signin } from "@/components/signin";

export default async function Page() {
  return (
    <section className="h-full w-full flex flex-col gap-10 pt-32 pb-7 px-7 md:px-10">
      <BackButton href="/manage" className="h-12 w-fit self-end fixed top-10" />

      <div className="text-brand-blue-dark font-dm-sans w-full h-fit">
        <p className="font-black text-3xl tracking-tight">Login</p>
        <p className="text-sm text-muted-foreground">
          Please enter the correct credentials to access your account
        </p>
      </div>

      <Signin />
    </section>
  );
}
