import { PartnerActivateWizard } from "@/features/partner-activate/components/partner-activate-wizard";

export default async function Page(props: PageProps<"/partner/activate">) {
  const query = await props.searchParams;
  const token = typeof query.token === "string" ? query.token : undefined;

  return (
    <section className="h-full w-full flex flex-col gap-10 pt-32 pb-16 px-7 md:px-10">
      <div className="text-brand-blue-dark font-dm-sans w-full h-fit max-w-3xl mx-auto text-center">
        <p className="font-black text-3xl tracking-tight">
          Activate Your Account
        </p>
      </div>

      <div className="max-w-3xl mx-auto w-full">
        <PartnerActivateWizard token={token} />
      </div>
    </section>
  );
}
