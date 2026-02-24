import { BackButton } from "@/components/back-button";
import Folders from "@/components/Folders";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params.page ? Number(params.page) || 1 : 1;

  return (
    <section className="h-full w-full flex flex-col gap-10 pt-32 pb-7 px-7 md:px-10">
      <BackButton
        href="/manage"
        className="h-12 w-fit self-end fixed top-10"
      />

      <div className="text-brand-blue-dark font-dm-sans w-full h-fit">
        <p className="font-black text-3xl tracking-tight">Folders</p>
        <p className="text-sm text-muted-foreground">Select a Folder</p>
      </div>

      <Folders page={page} />
    </section>
  );
}
