import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/dashboard/components/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <main className="w-full h-full p-4">{children}</main>
    </SidebarProvider>
  );
}

/*
    <div className="min-h-dvh h-full w-full font-dm-sans tracking-tight">
      {children}
    </div>
    */
