import { AuthWrapper } from "@/features/auth/components/auth-wrapper";

export default async function AuthLayout(props: LayoutProps<"/">) {
  return (
    <div className="min-h-dvh h-dvh w-full max-w-full md:max-w-5xl mx-0 md:mx-auto">
      <AuthWrapper>
        <main className="z-10">{props.children}</main>
      </AuthWrapper>
    </div>
  );
}
