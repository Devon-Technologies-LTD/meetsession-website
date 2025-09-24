import { BackButton } from "@/components/back-button";
import { Signup } from "@/features/auth/components/signup";

export default async function Page() {
  return (
    <section className="h-full w-full flex flex-col gap-10 pt-32 pb-7 px-7 md:px-10">
      <BackButton className="h-12 w-fit self-end fixed top-10" />

      <div className="text-brand-blue-dark font-dm-sans w-full h-fit">
        <p className="font-black text-3xl tracking-tight">Create Account</p>
        <p className="text-sm text-muted-foreground">
          Ensure all credentials entered here are correct and up to date
        </p>
      </div>

      <Signup />
    </section>
  );
}
