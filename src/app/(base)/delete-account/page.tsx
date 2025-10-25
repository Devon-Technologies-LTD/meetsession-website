import { DeleteAccount } from "@/features/base/account/components/delete-account";
import { auth } from "@/lib/auth";

type PageProps = {
  searchParams: Promise<{ email?: string; token?: string }>;
};
export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const { email, token } = searchParams;
  if (token) {
    await auth.storeTokens({ accessToken: token });
  }

  return (
    <div className="w-full h-full">
      <DeleteAccount email={email} token={token} />
    </div>
  );
}
