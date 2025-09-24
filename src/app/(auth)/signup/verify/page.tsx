import { BackButton } from "@/components/back-button";
import { Verify } from "@/features/auth/components/verify";

export default async function Page(props: PageProps<"/signup/verify">) {
  const query = await props.searchParams;
  const email = query.email as string | undefined;

  return (
    <section className="h-full w-full flex flex-col gap-10 pt-32 pb-7 px-7 md:px-10">
      <BackButton className="h-12 w-fit self-end fixed top-10" />

      <div className="text-brand-blue-dark font-dm-sans w-full h-fit">
        <p className="font-black text-3xl tracking-tight">
          Verify Your Account
        </p>
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit code sent to your email{" "}
          <span className="font-semibold">{email}</span> to continue
        </p>
      </div>

      <Verify email={email} />
    </section>
  );
}
