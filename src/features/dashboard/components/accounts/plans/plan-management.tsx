"use client";

import { createContext, RefObject, useContext, useState } from "react";
import { AnimatePresence, motion as m } from "motion/react";

import { cn } from "@/lib/utils";
import { usePersistentState } from "@/hooks/use-persistent-state";

import {
  CircleChevronDownIcon,
  CircleChevronUpIcon,
  CircleCheckIcon,
  CheckCircle2Icon,
  CircleXIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { TSubscriptionPlan } from "@/lib/types";
import { useRouter } from "next/navigation";

type TPaymentDetails = {
  transactionId: string;
  date: string | Date;
  transactionType: string;
  planName?: string;
  amount?: number;
  status: "successful" | "failed";
  nextAction?: () => void;
};
type TStatus =
  | "idle"
  | "not_paying"
  | "payment_initiated"
  | "payment_pending"
  | "payment_success"
  | "payment_failed";

type PlanManagementContextType = {
  plans?: TSubscriptionPlan[];
  status: TStatus;
  statusRef?: RefObject<TStatus>;
  selectedId: string;
  selectedPlan?: TSubscriptionPlan;
  paymentDetails?: TPaymentDetails;

  clearStates: () => void;
  updateStatus: (status: TStatus) => void;
  updatePaymentDetails: (details: TPaymentDetails) => void;
  updateSelectedId: (id: string) => void;
};
const PlanManagementContext = createContext<PlanManagementContextType | null>(
  null,
);
export const usePlanManagementContext = () => {
  const planManagementContext = useContext(PlanManagementContext);
  if (!planManagementContext) {
    throw new Error(
      "usePlanManagementContext must be used within PlanManagement",
    );
  }
  return planManagementContext;
};

type PlanManagementProps = {
  children?: React.ReactNode;
  plans?: TSubscriptionPlan[];
};
const PlanManagement = ({ children, plans }: PlanManagementProps) => {
  const [paymentDetails, setPaymentDetails] = usePersistentState<
    TPaymentDetails | undefined
  >("plan_payment_details", undefined);
  const updatePaymentDetails = (details: TPaymentDetails | undefined) => {
    setPaymentDetails(details);
  };
  const [status, setStatus] = usePersistentState<TStatus>(
    "plan_status",
    "idle",
  );
  const updateStatus = (status: TStatus) => {
    setStatus(status);
  };
  const [selectedId, setSelectedId] = usePersistentState<string>(
    "plan_selected_id",
    plans?.[0].id ?? "",
  );
  const updateSelectedId = (id: string) => {
    setSelectedId(id);
  };

  const selectedPlan = plans?.find((p) => p.id === selectedId) ?? plans?.[0];

  const clearStates = () => {
    updateStatus("idle");
    updateSelectedId(plans?.[0].id ?? "");
    updatePaymentDetails(undefined);
  };

  return (
    <PlanManagementContext.Provider
      value={{
        plans,
        status,
        selectedId,
        selectedPlan,
        paymentDetails,

        clearStates,
        updateStatus,
        updateSelectedId,
        updatePaymentDetails,
      }}
    >
      {children}
    </PlanManagementContext.Provider>
  );
};

export const FeatureCards = () => {
  const {
    plans,
    selectedPlan,
    // status,

    clearStates,
    updateStatus,
    updatePaymentDetails,
  } = usePlanManagementContext();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const isFreePlan = selectedPlan?.id === plans?.[0].id;

  function onPaymentSuccess() {
    updateStatus("payment_success");
    updatePaymentDetails({
      date: new Date(),
      transactionType: "Credit Card Payment",
      transactionId: "123456789",
      amount: selectedPlan?.price_ngn,
      planName: selectedPlan?.name,
      status: "successful",
      nextAction: () => {
        clearStates();
        router.push("#"); // open in app
        // router.push("/dashboard/accounts");
        console.log("Return home");
      }, // to return to app
    });
  }
  function onPaymentFailed() {
    updateStatus("payment_failed");
    updatePaymentDetails({
      date: new Date(),
      transactionType: "Credit Card Payment",
      transactionId: "123456789",
      planName: selectedPlan?.name,
      status: "failed",
      nextAction: () => planAction(), // to retry transaction
    });
  }
  function planAction() {
    if (isFreePlan) {
      updateStatus("not_paying");
      onPaymentSuccess();
    } else {
      updateStatus("payment_initiated");
      onPaymentFailed();
    }
  }

  function renderActionButton() {
    return (
      <Button
        onClick={planAction}
        size="pill"
        variant="default"
        className="h-14 w-full"
      >
        {isFreePlan ? "Select Plan" : "Proceed to Payment"}
      </Button>
    );
  }

  return (
    <div className="flex flex-col w-full gap-8">
      <FeatureCardOptions />

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
            <CardTitle className="font-normal">{selectedPlan?.name}</CardTitle>
            <CardDescription className="flex items-center w-fit justify-center gap-2">
              <span className="font-bold text-neutral-800 text-xl tracking-tighter">
                ₦{selectedPlan?.price_ngn.toLocaleString()}
              </span>

              <span
                className={cn(
                  "font-medium text-white text-xs py-0.5 px-1.5",
                  "bg-brand-green rounded-full whitespace-nowrap",
                )}
              >
                Current plan
              </span>
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
                {selectedPlan?.meeting_hours}hrs
              </p>
            </div>

            {selectedPlan?.features?.map((feat, index) => {
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
    </div>
  );
};
export const FeatureCardOptions = () => {
  const { plans, updateSelectedId, selectedId } = usePlanManagementContext();
  if (!plans || plans.length < 1) return null;

  return (
    <div className="flex md:hidden items-center justify-between gap-2.5 w-full">
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
};
export const PaymentStatusReport = () => {
  const { paymentDetails, status } = usePlanManagementContext();

  function paymentThemeEls(status: TStatus) {
    switch (status) {
      case "not_paying":
      case "payment_success":
        return {
          icon: <CheckCircle2Icon className="text-brand-green h-32 w-32" />,
          textColor: "text-brand-green",
          bgColor: "bg-brand-green text-white",
          actionText: "Back to Home",
        };
      case "payment_failed":
      default:
        return {
          icon: <CircleXIcon className="text-red-500 h-32 w-32" />,
          textColor: "text-red-500",
          bgColor: "bg-red-500 text-white",
          actionText: "Try Again",
        };
    }
  }

  function renderPaymentDetails() {
    return (
      <div className="w-full flex flex-col gap-3.5">
        <p className="font-bold text-sm">Payment details</p>
        <div className="text-sm p-3 rounded-xl bg-neutral-100 w-full h-fit flex flex-col gap-2.5">
          <div className="w-full flex items-center justify-between">
            <p>Transaction ID</p>
            <p>{paymentDetails?.transactionId}</p>
          </div>

          <div className="w-full flex items-center justify-between">
            <p>Date</p>
            <p>{paymentDetails?.date.toLocaleString()}</p>
          </div>

          <div className="w-full flex items-center justify-between">
            <p>Type of Transaction</p>
            <p>{paymentDetails?.transactionType}</p>
          </div>

          <div className="w-full flex items-center justify-between">
            <p>Plan</p>
            <p>{paymentDetails?.planName}</p>
          </div>

          {paymentDetails?.amount !== undefined && (
            <div className="w-full flex items-center justify-between">
              <p>Amount Paid</p>
              <p>{paymentDetails?.amount}</p>
            </div>
          )}

          <div className="w-full flex items-center justify-between">
            <p>Status</p>
            <p className={cn(paymentThemeEls(status).textColor, "capitalize")}>
              {paymentDetails?.status}
            </p>
          </div>
        </div>
      </div>
    );
  }

  function renderSuccess() {
    return (
      <div
        className={cn(
          "bg-white h-full w-full px-4 py-14",
          "fixed top-0 left-0 right-0 bottom-0",
          "flex flex-col gap-8 items-center",
        )}
      >
        <div className="w-fit h-fit flex flex-col gap-5 items-center">
          {paymentThemeEls(status).icon}
          <div className="w-full h-fit flex flex-col items-center gap-2">
            <p className="font-bold text-2xl">
              Plan Updated{" "}
              <span className={cn(paymentThemeEls(status).textColor)}>
                Successfully
              </span>
            </p>
            <p className="text-sm text-center max-w-full md:max-w-80">
              Your payment for the underlisted plan was successful. Enjoy full
              access to the selected plan.
            </p>
          </div>
        </div>

        {renderPaymentDetails()}

        <Button
          size="pill"
          variant="brand-green"
          onClick={() => paymentDetails?.nextAction?.()}
          className={cn("h-14 w-full", paymentThemeEls(status).bgColor)}
        >
          {paymentThemeEls(status).actionText}
        </Button>
      </div>
    );
  }
  function renderFailed() {
    return (
      <div
        className={cn(
          "bg-white h-full w-full px-4 py-14",
          "fixed top-0 left-0 right-0 bottom-0",
          "flex flex-col gap-8 items-center",
        )}
      >
        <div className="w-fit h-fit flex flex-col gap-5 items-center">
          {paymentThemeEls(status).icon}
          <div className="w-full h-fit flex flex-col items-center gap-2">
            <p className="font-bold text-2xl">
              Payment{" "}
              <span className={cn(paymentThemeEls(status).textColor)}>
                Failed
              </span>
            </p>
            <p className="text-sm text-center max-w-sm">
              Your payment for the underlisted plan has failed. Please try
              again.
            </p>
          </div>
        </div>

        {renderPaymentDetails()}

        <Button
          size="pill"
          onClick={() => paymentDetails?.nextAction?.()}
          className={cn("h-14 w-full", paymentThemeEls(status).bgColor)}
        >
          {paymentThemeEls(status).actionText}
        </Button>
      </div>
    );
  }

  switch (status) {
    case "not_paying":
    case "payment_success":
      return renderSuccess();
    case "payment_failed":
      return renderFailed();
    case "idle":
    case "payment_pending":
    case "payment_initiated":
    default:
      return null;
  }
};

PlanManagement.FeatureCards = FeatureCards;
PlanManagement.FeatureCardOptions = FeatureCardOptions;
PlanManagement.PaymentStatusReport = PaymentStatusReport;

export { PlanManagement };
