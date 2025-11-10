import { SidebarProvider } from "@/components/ui/sidebar";
import { UserSubscriptionProvider } from "@/context/use-user-subscription";
import { AppSidebar } from "@/features/dashboard/components/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <UserSubscriptionProvider>
        <main className="w-full h-full p-4">{children}</main>
      </UserSubscriptionProvider>
    </SidebarProvider>
  );
}

/*
    <div className="min-h-dvh h-full w-full font-dm-sans tracking-tight">
      {children}
    </div>
    */
