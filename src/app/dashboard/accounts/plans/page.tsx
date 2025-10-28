import { BackAction } from "@/components/back-button";
import {
  PlanManagement,
  FeatureCards,
  PaymentStatusReport,
} from "@/features/dashboard/components/accounts/plans/plan-management";
import { retrievePlansAction } from "@/features/dashboard/lib/server/actions";

export default async function Page() {
  const plans = await retrievePlansAction({ withFeature: true });

  return (
    <div className="relative font-dm-sans px-2 pb-10 w-full h-full flex flex-col gap-8">
      <BackAction name="Back to Account" />
      <div className="w-full h-fit">
        <p className="text-sm font-medium">
          Try Out a New Plan. You can always switch back anytime you like
        </p>
      </div>

      <div className="flex flex-col w-full gap-10">
        <PlanManagement plans={plans.data?.data}>
          <FeatureCards />
          <PaymentStatusReport />
        </PlanManagement>

        <p className="max-w-48 md:max-w-full mx-auto text-center text-xs text-neutral-500">
          &copy; 2025 MeetSession by Devon Technologies Ltd.
        </p>
      </div>
    </div>
  );
}
