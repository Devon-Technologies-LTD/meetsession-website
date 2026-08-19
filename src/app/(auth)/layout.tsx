import { AuthWrapper } from "@/features/auth/components/auth-wrapper";

export default async function AuthLayout(props: LayoutProps<"/">) {
  return (
    <div className="min-h-dvh w-full">
      {/* Width capping lives inside AuthWrapper — it needs to be
          route-aware (skip the cap for desktop signin), and layouts are
          server components with no access to the current pathname. */}
      <AuthWrapper>
        <main className="z-10 flex-1">{props.children}</main>
      </AuthWrapper>
    </div>
  );
}
