import { DeleteAccount } from "@/features/base/account/components/delete-account";

type PageProps = {
  searchParams: Promise<{ email?: string; token?: string }>;
};
export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const { email, token } = searchParams;

  return (
    <div className="w-full h-full">
      <DeleteAccount email={email} token={token} />
    </div>
  );
}
