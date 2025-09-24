import { AuthWrapper } from "@/features/auth/components/auth-wrapper";

export default async function AuthLayout(props: LayoutProps<"/">) {
  return (
    <div className="min-h-dvh h-full w-full">
      <AuthWrapper>
        <main className="z-10">{props.children}</main>
      </AuthWrapper>
    </div>
  );
}
