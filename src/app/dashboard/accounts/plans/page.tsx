import { BackAction } from "@/components/back-button";
import { FeatureCards } from "@/features/dashboard/components/accounts/plans/feature-cards";

export default function Page() {
  return (
    <div className="px-2 w-full h-full flex flex-col gap-6">
      <BackAction name="Back to Account" />
      <FeatureCards />
    </div>
  );
}
