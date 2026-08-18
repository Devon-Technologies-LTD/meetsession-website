import { BackButton } from "@/components/back-button";
import { Signin } from "@/components/signin";

export default async function Page(props: PageProps<"/activate">) {
  const query = await props.searchParams;
  const email = typeof query.email === "string" ? query.email : undefined;
  const code = typeof query.code === "string" ? query.code : undefined;
  const tierId = typeof query.tier_id === "string" ? query.tier_id : undefined;

  return (
    <section className="h-full w-full flex flex-col gap-10 pt-32 pb-7 px-7 md:px-10">
      <BackButton href="/manage" className="h-12 w-fit self-end fixed top-10" />

      <div className="text-brand-blue-dark font-dm-sans w-full h-fit">
        <p className="font-black text-3xl tracking-tight">
          Activate Your Account
        </p>
        <p className="text-sm text-muted-foreground">
          Sign in with the temporary password we emailed you to activate your
          discounted plan
        </p>
      </div>

      <Signin
        defaultEmail={email}
        carryForward={code && tierId ? { code, tierId } : undefined}
      />
    </section>
  );
}
