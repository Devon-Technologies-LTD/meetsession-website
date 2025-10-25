import { PlanManagement } from "@/features/dashboard/components/accounts/plans/plan-management";
import { PlanManagementProvider } from "@/features/dashboard/hooks/use-plan-management";

export default function AccountsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PlanManagementProvider>
      <PlanManagement>
        <div className="max-w-full md:max-w-5xl mx-0 md:mx-auto">
          {children}
        </div>
      </PlanManagement>
    </PlanManagementProvider>
  );
}
