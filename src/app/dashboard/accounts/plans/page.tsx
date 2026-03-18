import { cookies, headers } from "next/headers";
import { BackAction } from "@/components/back-button";
import { PlanUI } from "@/features/dashboard/components/accounts/plans/plan-ui";
import { retrievePlansAction } from "@/features/dashboard/lib/server/actions";
import { TUser } from "@/lib/schemas";

export default async function Page() {
  const plans = await retrievePlansAction({ withFeature: true });
  const requestHeaders = await headers();
  const cookieStore = await cookies();
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  let user: TUser | null = null;

  if (host) {
    const profileResponse = await fetch(`${protocol}://${host}/api/v1/profile`, {
      method: "GET",
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (profileResponse.ok) {
      user = (await profileResponse.json()) as TUser;
    }
  }

  const DEFAULT_TIER_ID = "00000000-0000-0000-0000-000000000000";
  const isUserOnTrial = user?.subscription_type === "TRIAL_SUBSCRIPTION";
  const isTrialEligible = Boolean(
    user &&
      (
        user.tier_id === DEFAULT_TIER_ID ||
        user.subscription_type === "" ||
        user.subscription_status === ""
      ),
  );

  return (
    <div className="relative font-dm-sans px-2 pb-10 w-full h-full flex flex-col gap-8">
      <BackAction name="Back to Account" />

      <div className="w-full h-fit">
        <p className="text-sm font-medium">
          {isUserOnTrial
            ? "You are currently on Free Trial. You can switch to any paid plan anytime."
            : isTrialEligible
            ? "Activate your 7-day free trial by selecting a plan. Please click on the 'Select Plan' button to get started. You can cancel anytime during the trial period without any charges."
            : "Try Out a New Plan. You can always switch back anytime you like"}
        </p>
      </div>

      <div className="flex flex-col w-full gap-10">
      {plans?.success && (
          <PlanUI
            plans={plans?.data?.data}
            isTrialEligible={isTrialEligible}
            isUserOnTrial={isUserOnTrial}
            userEmail={user?.email}
          />
        )}

        <p className="max-w-48 md:max-w-full mx-auto text-center text-xs text-neutral-500">
          &copy; 2025 MeetSession by Devon Technologies Ltd.
        </p>
      </div>
    </div>
  );
}
