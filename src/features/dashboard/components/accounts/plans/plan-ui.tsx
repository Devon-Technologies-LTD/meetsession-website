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

export function PlanUI<T extends TSubscriptionPlan>({
  plans,
}: {
  plans?: T[];
}) {
  const [selectedId, setSelectedId] = useState(plans?.[0].id ?? "");
  // update selected plan
  function updateSelectedId(id: string) {
    setSelectedId(id);
  }
  const selectedPlan = plans?.find((p) => p.id === selectedId) ?? plans?.[0];

  return (
    <div className="flex flex-col w-full gap-8">
      <PlanUIOptions
        plans={plans}
        selectedId={selectedId}
        updateSelectedIdAction={updateSelectedId}
      />
      <div className="hidden md:flex gap-2 flex-wrap justify-center">
        {plans?.map((plan) => {
          return <PlanUIItem plans={plans} plan={plan} key={plan.id} />;
        })}
      </div>
      <div className="w-full h-full md:hidden">
        <PlanUIItem plans={plans} plan={selectedPlan ?? plans?.[0]} />
      </div>
    </div>
  );
}

export function PlanUIItem<T extends TSubscriptionPlan>({
  plans,
  plan,
}: {
  plans?: T[];
  plan?: T;
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
  const { verifyState, isVerifying } = verifyPayment;

  const isFreePlan = plan?.price_ngn === 0;
  const isCurrentPlan = subscription ? subscription.plan_id === plan?.id : null;

  const planAction = useCallback(() => {
    const selectedPlan = plans?.find(
      (p) => p.id === plan?.id,
    ) as TSubscriptionPlan;
    updateSelectedPlan(selectedPlan);

    if (isFreePlan) {
      updatePaymentStatus("not_paying");
      updateTransactionDetails({
        status: "successful",
        nextAction: () => {
          console.log("success next action: launch MeetSession mobile app");
        },
      });
      router.push("/dashboard/accounts/plans/status");
      // onPaymentSuccess();
    } else {
      hasPaid.current = false;
      updatePaymentStatus("payment_initiated");
      initialize({ planId: plan?.id ?? "" });
    }
  }, [
    isFreePlan,
    plan?.id,
    initialize,
    plans,
    router,
    updatePaymentStatus,
    updateSelectedPlan,
    updateTransactionDetails /*updateStatus*/,
  ]);

  // verify effect
  useEffect(() => {
    if (verifyState) {
      console.log("Transaction verified");
      // if (typeof window !== "undefined") {
      //   window.location.href = `/dashboard/accounts/plans/status`;
      //   // router.push(`/dashboard/accounts/plans/status`);
      // }
    }
  }, [verifyState]);

  // init and payment effect
  useEffect(() => {
    if (initializeState && !hasPaid.current) {
      if (initializeState.success) {
        toast.success("Payment initialized");

        // make payment
        popupPayment({
          access_code: initializeState.data.data.access_code,
          callbacks: {
            onSuccess: (res) => {
              hasPaid.current = true;
              updatePaymentStatus("payment_success");
              updateTransactionDetails({
                status: "successful",
                transactionId: res?.trans,
                date: new Date(),
                nextAction: () => {
                  console.log(
                    "success next action: launch MeetSession mobile app",
                  );
                },
              });
              requestAnimationFrame(() => {
                router.push("/dashboard/accounts/plans/status");
              });
            },
            onError: (err) => {
              hasPaid.current = true;
              updatePaymentStatus("payment_failed");
              updateTransactionDetails({
                status: "successful",
                transactionId: "",
                date: new Date(),
                nextAction: () => {
                  initialize({ planId: plan?.id ?? "" });
                },
              });
              console.log("payment err: ", err);
              requestAnimationFrame(() => {
                router.push("/dashboard/accounts/plans/status");
              });
            },
            onCancel: () => {},
          },
        });
      }
      if (!initializeState.success) {
        /*
        updateStatus("idle"); // reset status
        */
        toast.error(initializeState.message, {
          description:
            typeof initializeState.errors === "string"
              ? initializeState.errors
              : initializeState.errors.plan_id,
        });
      }
    }
  }, [
    initializeState,
    popupPayment,
    initialize,
    plan?.id,
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
        onClick={planAction}
        size="pill"
        variant="default"
        className="h-14 w-full relative overflow-hidden disabled:pointer-events-none"
        disabled={isCurrentPlan || isInitializing || isVerifying}
      >
        {(isInitializing || isVerifying) && <Spinner />}
        {isFreePlan ? "Select Plan" : "Proceed to Payment"}
      </Button>
    );
  }

  return (
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
                ₦{plan?.price_ngn.toLocaleString()}
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
                {plan?.meeting_hours}hrs
              </p>
            </div>

            {plan?.features?.map((feat, index) => {
              if (index === 0) {
                return null;
              }

              return (
                <div
                  key={feat.key}
                  className="w-full text-xs font-normal h-fit flex items-center gap-2"
                >
                  <div className="w-full h-fit flex flex-col gap-1 flex-1">
                    <span>{feat.label}</span>
                  </div>

                  <p className="min-h-fit font-semibold">{feat.status}</p>
                </div>
              );
            })}
          </CardContent>
        </m.div>
      </Card>
      <div className="md:hidden">{renderActionButton()}</div>
    </m.div>
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
                "p-2",
                "hover:cursor-pointer",
                "h-20 w-16 rounded-lg bg-neutral-100",
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
