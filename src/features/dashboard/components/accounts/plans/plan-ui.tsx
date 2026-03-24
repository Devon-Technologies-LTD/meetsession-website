"use client";

import { useUserSubscription } from "@/context/use-user-subscription";
import { TSubscriptionPlan } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion as m } from "motion/react";
import {
  CircleCheckIcon,
  CircleChevronDownIcon,
  CircleChevronUpIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { usePaystackPayment } from "@/hooks/use-paystack-payment";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { usePlanManagementContext } from "@/features/dashboard/hooks/use-plan-management";
import { trialStartAction } from "@/server/actions";
import { DiscountCodeModal } from "./discount-code-modal";

export type TBillingCycle = "monthly" | "quarterly" | "annual";

const isPaystackEnabled =
  process.env.NEXT_PUBLIC_ENABLE_PAYSTACK ? process.env.NEXT_PUBLIC_ENABLE_PAYSTACK.toLowerCase() === "true" : false;
export function PlanUI<T extends TSubscriptionPlan>({
  plans,
  isTrialEligible,
  isUserOnTrial,
  userEmail,
  currentTierId,
  subscriptionEndDate,
  hasUsedDiscountCode,
  hasPreviousPayment,
}: {
  plans?: T[];
  isTrialEligible?: boolean;
  isUserOnTrial?: boolean;
  userEmail?: string;
  currentTierId?: string;
  subscriptionEndDate?: string;
  hasUsedDiscountCode?: boolean;
  hasPreviousPayment?: boolean;
}) {
  const [selectedId, setSelectedId] = useState(() => {
    if (!plans?.length) return "";
    return plans.some((plan) => plan.id === currentTierId)
      ? currentTierId ?? ""
      : plans[0].id;
  });
  const [billingCycle, setBillingCycle] = useState<TBillingCycle>("monthly");

  useEffect(() => {
    if (!plans?.length) {
      setSelectedId("");
      return;
    }

    if (currentTierId && plans.some((plan) => plan.id === currentTierId)) {
      setSelectedId(currentTierId);
      return;
    }

    setSelectedId((prev) =>
      plans.some((plan) => plan.id === prev) ? prev : plans[0].id,
    );
  }, [currentTierId, plans]);

  function updateSelectedId(id: string) {
    setSelectedId(id);
  }
  const selectedPlan = plans?.find((p) => p.id === selectedId) ?? plans?.[0];

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="flex justify-center w-full">
        <div className="flex bg-neutral-100 p-1.5 rounded-full border border-black/5">
          {(["monthly", "quarterly", "annual"] as TBillingCycle[]).map(
            (cycle) => (
              <button
                key={cycle}
                type="button"
                onClick={() => setBillingCycle(cycle)}
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-semibold transition-all capitalize",
                  billingCycle === cycle
                    ? "bg-white text-black shadow-sm"
                    : "text-neutral-500 hover:text-black",
                )}
              >
                {cycle}
              </button>
            ),
          )}
        </div>
      </div>

      <PlanUIOptions
        plans={plans}
        selectedId={selectedId}
        updateSelectedIdAction={updateSelectedId}
      />
      <div className="hidden md:flex gap-2 flex-wrap justify-center">
        {plans?.map((plan) => {
          return (
            <PlanUIItem
              plans={plans}
              plan={plan}
              key={plan.id}
              billingCycle={billingCycle}
              isTrialEligible={isTrialEligible}
              isUserOnTrial={isUserOnTrial}
              userEmail={userEmail}
              currentTierId={currentTierId}
              subscriptionEndDate={subscriptionEndDate}
              hasUsedDiscountCode={hasUsedDiscountCode}
              hasPreviousPayment={hasPreviousPayment}
            />
          );
        })}
      </div>
      <div className="w-full h-full md:hidden">
        <PlanUIItem
          plans={plans}
          plan={selectedPlan ?? plans?.[0]}
          billingCycle={billingCycle}
          isTrialEligible={isTrialEligible}
          isUserOnTrial={isUserOnTrial}
          userEmail={userEmail}
          currentTierId={currentTierId}
          subscriptionEndDate={subscriptionEndDate}
          hasUsedDiscountCode={hasUsedDiscountCode}
          hasPreviousPayment={hasPreviousPayment}
        />
      </div>
    </div>
  );
}

export function PlanUIItem<T extends TSubscriptionPlan>({
  plans,
  plan,
  billingCycle,
  isTrialEligible,
  isUserOnTrial,
  userEmail,
  currentTierId,
  subscriptionEndDate,
  hasUsedDiscountCode,
  hasPreviousPayment,
}: {
  plans?: T[];
  plan?: T;
  billingCycle: TBillingCycle;
  isTrialEligible?: boolean;
  isUserOnTrial?: boolean;
  userEmail?: string;
  currentTierId?: string;
  subscriptionEndDate?: string;
  hasUsedDiscountCode?: boolean;
  hasPreviousPayment?: boolean;
}) {
  const { updateSelectedPlan, updatePaymentStatus, updateTransactionDetails } =
    usePlanManagementContext();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const hasPaid = useRef(false);
  const router = useRouter();

  const { subscription } = useUserSubscription();

  const { popupPayment, verifyPayment, initializePayment } =
    usePaystackPayment();
  const { initialize, initializeState, isInitializing } = initializePayment;
  const { verifyState, verify, isVerifying } = verifyPayment;
  const [isStartingTrial, setIsStartingTrial] = useState(false);
  const hasCheckedCallbackReference = useRef(false);
  const handledInitializeState = useRef(initializeState);
  const [isDiscountPromptOpen, setIsDiscountPromptOpen] = useState(false);
  const activeDiscountCode = useRef<string | undefined>(undefined);

  const featurePrice = plan?.features?.find(
    (f) => f.key === `${billingCycle}_subscription`,
  )?.value;

  const currentPrice =
    featurePrice !== undefined ? Number(featurePrice) : (plan?.price ?? 0);

  const meetingHours =
    plan?.meeting_hours ??
    plan?.features?.find((f) => f.key === "join_online_meeting")?.value ??
    0;

  const canStartTrial = Boolean(isTrialEligible && !isUserOnTrial);
  const isFreePlan = Boolean(currentPrice === 0);
  const activePlanId =
    currentTierId ?? subscription?.tier_id ?? subscription?.plan_id;
  const isCurrentPlan = activePlanId ? activePlanId === plan?.id : false;
  const parsedSubscriptionEndDate = subscriptionEndDate
    ? new Date(subscriptionEndDate)
    : null;
  const hasSubscriptionExpired = Boolean(
    parsedSubscriptionEndDate &&
      !Number.isNaN(parsedSubscriptionEndDate.getTime()) &&
      parsedSubscriptionEndDate.getTime() < Date.now(),
  );
  const canResubscribeCurrentPlan = Boolean(
    isCurrentPlan && hasSubscriptionExpired && !isFreePlan,
  );
  const shouldDisableAction =
    Boolean(isCurrentPlan) && !isUserOnTrial && !canResubscribeCurrentPlan;
  const isPaidCheckoutDisabled =
    !isPaystackEnabled && !canStartTrial && !isFreePlan;
  const shouldShowDiscountPrompt = Boolean(!hasUsedDiscountCode);

  const startPlanCheckout = useCallback(async (discountCode?: string) => {
    const selectedPlan = plans?.find(
      (p) => p.id === plan?.id,
    ) as TSubscriptionPlan;
    updateSelectedPlan(selectedPlan);
    activeDiscountCode.current = discountCode?.trim() || undefined;

    if (canStartTrial && plan?.id) {
      setIsStartingTrial(true);
      const formdata = new FormData();
      formdata.append("tier_id", plan.id);
      formdata.append("coupon_code", "");

      const trialRes = await trialStartAction(undefined, formdata);
      setIsStartingTrial(false);

      if (trialRes.success) {
        toast.success("Free trial activated");
        updatePaymentStatus("not_paying");
        updateTransactionDetails({
          status: "successful",
          nextAction: () => {
            console.log("success next action: launch MeetSession mobile app");
          },
        });
        router.push("/dashboard/accounts/plans/status");
      } else {
        toast.error(
          typeof trialRes.errors === "string"
            ? trialRes.errors
            : trialRes.message,
        );
      }
      return;
    }


    if (isFreePlan) {
      updatePaymentStatus("not_paying");
      updateTransactionDetails({
        status: "successful",
        nextAction: () => {
          console.log("success next action: launch MeetSession mobile app");
        },
      });
      router.push("/dashboard/accounts/plans/status");
    } else {
      if (!isPaystackEnabled) {
        toast.error("Paid plans are temporarily unavailable.");
        return;
      }

      hasPaid.current = false;
      updatePaymentStatus("payment_initiated");
      const subType = `${billingCycle}_subscription`;
      const callbackUrl = window.location.origin + window.location.pathname;
      initialize({
        tierId: plan?.id ?? "",
        subscriptionType: subType,
        callbackUrl,
        couponCode: activeDiscountCode.current,
      });
    }
  }, [
    isFreePlan,
    plan?.id,
    initialize,
    canStartTrial,
    plans,
    router,
    updatePaymentStatus,
    updateSelectedPlan,
    updateTransactionDetails, /*updateStatus*/
    billingCycle,
  ]);

  const planAction = useCallback(async () => {
    if (
      !canStartTrial &&
      !isFreePlan &&
      isPaystackEnabled &&
      shouldShowDiscountPrompt
    ) {
      setIsDiscountPromptOpen(true);
      return;
    }

    await startPlanCheckout();
  }, [canStartTrial, isFreePlan, shouldShowDiscountPrompt, startPlanCheckout]);

  // verify payment after return from hosted payment page
  useEffect(() => {
    if (typeof window === "undefined" || hasCheckedCallbackReference.current) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const callbackReference =
      params.get("reference") ?? params.get("trxref") ?? "";
    if (!callbackReference) return;

    hasCheckedCallbackReference.current = true;
    hasPaid.current = true;
    updatePaymentStatus("payment_pending");
    verify({ reference: callbackReference });
  }, [updatePaymentStatus, verify]);

  // verify effect
  useEffect(() => {
    if (!verifyState) return;

    const verifyMessage = (
      verifyState.success ? verifyState.data?.message : verifyState.message
    ) ?? "";
    const normalizedVerifyMessage = verifyMessage.toLowerCase();
    const verifyPayload = verifyState.data?.data as
      | {
          status?: string | boolean;
          reference?: string;
          id?: string | number;
          amount?: number;
          paid_at?: string;
        }
      | undefined;

    const nestedStatus = verifyPayload?.status;
    const normalizedNestedStatus =
      typeof nestedStatus === "string" ? nestedStatus.toLowerCase() : nestedStatus;
    const hasExplicitVerifyFailure =
      normalizedVerifyMessage.includes("failed") ||
      normalizedVerifyMessage.includes("error") ||
      normalizedNestedStatus === "failed" ||
      normalizedNestedStatus === "error" ||
      normalizedNestedStatus === false;

    if (verifyState.success && !hasExplicitVerifyFailure) {
      updatePaymentStatus("payment_success");
      updateTransactionDetails({
        status: "successful",
        transactionId:
          verifyPayload?.reference ??
          (verifyPayload?.id ? String(verifyPayload.id) : ""),
        amount: verifyPayload?.amount,
        date: verifyPayload?.paid_at ? new Date(verifyPayload.paid_at) : new Date(),
      });
      toast.success(verifyMessage || "Payment successfully verified");
      requestAnimationFrame(() => {
        router.push("/dashboard/accounts/plans/status");
      });
      return;
    }

    updatePaymentStatus("payment_failed");
    toast.error(
      verifyState.success
        ? verifyState.data?.message || "Payment verification failed"
        : verifyState.message || "Payment verification failed",
    );
  }, [verifyState, router, updatePaymentStatus, updateTransactionDetails]);

  // init and payment effect
  useEffect(() => {
    if (!initializeState || hasPaid.current) return;
    if (handledInitializeState.current === initializeState) return;

    handledInitializeState.current = initializeState;

    if (initializeState.success) {
      const initData = initializeState.data.data;
      const isDiscountCheckout = Boolean(activeDiscountCode.current);
      const paymentLink =
        initData.payment_link ?? initData.payment_url ?? initData.authorization_url;

      if (isDiscountCheckout && !paymentLink) {
        hasPaid.current = true;
        updatePaymentStatus("payment_success");
        updateTransactionDetails({
          status: "successful",
          transactionId: initData.Reference ?? initData.reference,
          amount: initData.amount ?? currentPrice,
          date: new Date(),
        });
        toast.success(initializeState.data.message || "Discount code applied");
        requestAnimationFrame(() => {
          router.push("/dashboard/accounts/plans/status");
        });
        return;
      }

      toast.success("Payment initialized");
      popupPayment({
        access_code: initData.access_code,
        payment_url: paymentLink,
        plan_code: initData.plan_code,
        reference: initData.Reference ?? initData.reference,
        email: userEmail ?? subscription?.email,
        callbacks: {
          onSuccess: (res) => {
            hasPaid.current = true;
            updatePaymentStatus("payment_pending");
            updateTransactionDetails({
              status: "pending",
              transactionId: res?.reference ?? res?.trans,
              date: new Date(),
            });
          },
          onError: (err) => {
            hasPaid.current = true;
            updatePaymentStatus("payment_failed");
            updateTransactionDetails({
              status: "failed",
              transactionId: "",
              date: new Date(),
              nextAction: () => {
                const subType = `${billingCycle}_subscription`;
                const callbackUrl = window.location.origin + window.location.pathname;
                initialize({
                  tierId: plan?.id ?? "",
                  subscriptionType: subType,
                  callbackUrl,
                  couponCode: activeDiscountCode.current,
                });
              },
            });
            toast.error(err?.message || "Payment setup failed");
          },
          onCancel: () => {
            updatePaymentStatus("payment_failed");
            toast.warning("Payment was cancelled.");
          },
        },
      });
      return;
    }

    /*
    updateStatus("idle"); // reset status
    */
    const initializeErrorDescription =
      typeof initializeState.errors === "string"
        ? initializeState.errors
        : Array.isArray(initializeState.errors?.tier_id)
          ? initializeState.errors.tier_id.join(", ")
          : initializeState.errors?.tier_id;

    const normalizedInitError = (
      initializeErrorDescription || initializeState.message || ""
    ).toLowerCase();

    // if (normalizedInitError.includes("already on this tier")) {
    //   toast.error("You already have this plan. Choose another tier.");
    //   return;
    // }

    toast.error(initializeState.message, {
      description: initializeErrorDescription,
    });
  }, [
    initializeState,
    popupPayment,
    initialize,
    billingCycle,
    userEmail,
    subscription?.email,
    plan?.id,
    currentPrice,
    router,
    updatePaymentStatus,
    updateTransactionDetails,
    /*
    onPaymentSuccess,
    onPaymentFailed,
    updateStatus,
    */
  ]);

  if (!plan) return null;

  function renderActionButton() {
    return (
      <Button
        type="button"
        onClick={planAction}
        size="pill"
        variant="default"
        className="h-14 w-full relative overflow-hidden disabled:pointer-events-none"
        disabled={
          shouldDisableAction ||
          isPaidCheckoutDisabled ||
          isInitializing ||
          isVerifying ||
          isStartingTrial
        }
      >
        {(isInitializing || isVerifying || isStartingTrial) && <Spinner />}
        
        {isStartingTrial
          ? "Activating Trial..."
          : isPaidCheckoutDisabled
            ? "Paid Plans Unavailable"
          : isFreePlan
            ? "Select Plan"
            : canResubscribeCurrentPlan
              ? "Resubscribe"
            : isUserOnTrial
              ? "Upgrade to Paid Plan"
              : "Proceed to Payment"}

      </Button>
    );
  }

  return (
    <>
      <m.div layout className="min-w-full md:min-w-xs w-xs flex flex-col gap-3">
        <Card
          className={cn(
            "border-black shadow-none bg-neutral-100",
            "transition-all duration-200",
            isCollapsed ? "gap-0" : "",
          )}
        >
          <CardHeader
            className={cn(
              "w-full flex flex-row items-center justify-between hover:cursor-pointer",
            )}
            onClick={() => setIsCollapsed((prev) => !prev)}
          >
            <div className="w-full h-fit flex flex-col gap-2">
              <CardTitle className="font-normal">{plan?.name}</CardTitle>
              <CardDescription className="flex items-center w-fit justify-center gap-2">
                <span className="font-bold text-neutral-800 text-xl tracking-tighter">
                  ₦{currentPrice?.toLocaleString()}
                </span>

                {isCurrentPlan && (
                  <span
                    className={cn(
                      "font-medium text-white text-xs py-0.5 px-1.5",
                      "bg-brand-green rounded-full whitespace-nowrap",
                    )}
                  >
                    Current plan
                  </span>
                )}
              </CardDescription>
            </div>

            {isCollapsed ? <CircleChevronDownIcon /> : <CircleChevronUpIcon />}
          </CardHeader>

          <div className="px-6 hidden md:block">{renderActionButton()}</div>

          <AnimatePresence>
            {!isCollapsed && (
              <m.div exit={{ opacity: 0 }} className="w-full px-6">
                <Separator className="bg-black" />
              </m.div>
            )}
          </AnimatePresence>

          <m.div
            key="collapsible"
            layout
            initial={{
              height: "auto",
              opacity: 1,
              transition: { duration: 1.5 },
            }}
            animate={
              isCollapsed
                ? {
                  height: 0,
                  opacity: 0,
                  display: "none",
                  transition: { duration: 0.2 },
                }
                : {
                  display: "block",
                  height: "auto",
                  opacity: 1,
                  transition: { duration: 0.4 },
                }
            }
          >
            <CardContent className="flex flex-col w-full gap-4 h-full">
              <div className="w-full text-xs font-normal h-fit flex items-center gap-2">
                <div className="w-full h-fit flex flex-col gap-1 flex-1">
                  <span>Recording & Transcribe</span>
                </div>

                <p className="min-h-fit font-semibold">
                  {meetingHours === -1 ? "Unlimited" : `${meetingHours}hrs`}
                </p>
              </div>

              {plan?.features
                ?.filter(
                  (feat) =>
                    !feat.key.includes("_subscription") &&
                    feat.key !== "join_online_meeting",
                )
                .map((feat) => {
                  return (
                    <div
                      key={feat.key}
                      className="w-full text-xs font-normal h-fit flex items-center gap-2"
                    >
                      <div className="w-full h-fit flex flex-col gap-1 flex-1">
                        <span>{feat.label}</span>
                      </div>

                      <div className="min-h-fit font-semibold capitalize">
                        {typeof feat.value === "boolean" ? (
                          feat.value ? (
                            <CircleCheckIcon className="w-4 h-4 text-brand-green" />
                          ) : (
                            "N/A"
                          )
                        ) : (
                          feat.value
                        )}
                      </div>
                    </div>
                  );
                })}
            </CardContent>
          </m.div>
        </Card>
        <div className="md:hidden">{renderActionButton()}</div>
      </m.div>

      <DiscountCodeModal
        open={isDiscountPromptOpen}
        tierId={plan.id}
        inputId={`discount-code-${plan.id}`}
        onOpenChange={setIsDiscountPromptOpen}
        onProceed={startPlanCheckout}
      />

    </>
  );
}

export function PlanUIOptions<T extends TSubscriptionPlan>({
  plans,
  selectedId,
  updateSelectedIdAction: updateSelectedId,
}: {
  plans?: T[];
  selectedId: string;
  updateSelectedIdAction: (id: string) => void;
}) {
  if (!plans || plans.length < 1) return null;

  return (
    <div className="flex md:hidden items-center justify-between sm:justify-center gap-2.5 w-full">
      {plans
        .map((p) => ({ id: p.id, title: p.name }))
        .map((plan) => {
          return (
            <div
              key={plan.id}
              className={cn(
                "p-4",
                "hover:cursor-pointer",
                "h-20 w-24 rounded-lg bg-neutral-100",
                "flex flex-col items-center justify-between",
                "transition-all scale-100 text-neutral-800",
                {
                  "scale-115 bg-linear-to-b from-brand-blue to-brand-green text-white":
                    selectedId === plan.id,
                },
              )}
              onClick={() => updateSelectedId(plan.id)}
            >
              <span className="text-xs font-semibold">{plan.title}</span>

              {selectedId === plan.id && (
                <span className="z-10">
                  <CircleCheckIcon className="w-4 h-4" />
                </span>
              )}
            </div>
          );
        })}
    </div>
  );
}
