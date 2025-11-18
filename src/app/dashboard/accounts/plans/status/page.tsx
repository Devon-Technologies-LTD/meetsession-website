import { SubscriptionStatus } from "@/features/dashboard/components/accounts/plans/subscription-status";

export default async function Page() {
  return (
    <div className="min-h-dvh min-w-full bg-white h-full w-full font-dm-sans px-7 py-10">
      <SubscriptionStatus />
    </div>
  );
}
