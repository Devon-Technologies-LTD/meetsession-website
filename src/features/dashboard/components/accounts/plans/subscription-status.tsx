"use client";

import { FailIcon } from "@/components/icons/fail-icon";
import { SuccessIcon } from "@/components/icons/success-icon";
import { Button } from "@/components/ui/button";
import { usePlanManagementContext } from "@/features/dashboard/hooks/use-plan-management";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function SubscriptionStatus() {
  // const router = useRouter();
  const { paymentStatus: status } = usePlanManagementContext();

  switch (status.current) {
    case "not_paying":
    case "payment_success":
    case "payment_failed":
      return <PaymentStatusReportWrapper />;
    default:
      return null;
  }
}

const PaymentStatusReportWrapper = () => {
  const router = useRouter();
  const { transactionDetails, selectedPlan } = usePlanManagementContext();
  function renderPaymentDetails() {
    return (
      <div className="w-full flex flex-col gap-3.5">
        <p className="font-bold text-sm">Payment details</p>
        <div className="text-sm p-3 rounded-xl bg-neutral-100 w-full h-fit flex flex-col gap-2.5">
          {transactionDetails?.transactionId && (
            <div className="w-full flex items-center justify-between">
              <p>Transaction ID</p>
              <p>{transactionDetails?.transactionId}</p>
            </div>
          )}

          <div className="w-full flex items-center justify-between">
            <p>Date</p>
            <p>{transactionDetails?.date?.toLocaleString()}</p>
          </div>

          <div className="w-full flex items-center justify-between">
            <p>Plan</p>
            <p>{selectedPlan?.name}</p>
          </div>

          {selectedPlan?.price_ngn !== undefined && (
            <div className="w-full flex items-center justify-between">
              <p>Amount Paid</p>
              <p>{selectedPlan?.price_ngn}</p>
            </div>
          )}

          <div className="w-full flex items-center justify-between">
            <p>Status</p>

            <p
              className={cn(
                {
                  "text-brand-green":
                    transactionDetails?.status === "successful",
                  "text-red-500": transactionDetails?.status === "failed",
                },
                "capitalize",
              )}
            >
              {transactionDetails?.status}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full h-full min-w-full bg-white",
        "fixed top-0 left-0 right-0 bottom-0",
        "flex flex-col justify-start gap-2",
      )}
    >
      <Button
        variant="ghost"
        className="w-fit h-fit flex items-center gap-1.5 hover:cursor-pointer active:bg-neutral-100"
        onClick={() => router.push("/dashboard/accounts/plans")}
      >
        <ArrowLeftIcon />
        <span>Back</span>
      </Button>

      <div className={cn("flex flex-col items-center justify-center")}>
        <div
          className={cn(
            "h-fit w-full max-w-full md:max-w-3xl px-4 py-14",
            "flex flex-col gap-8 items-center",
            "mx-auto",
          )}
        >
          <div className="w-fit h-fit flex flex-col gap-5 items-center">
            {transactionDetails?.status === "successful" ? (
              <SuccessIcon className="text-brand-green h-24 md:h-28 w-24 md:w-28" />
            ) : (
              <FailIcon className="text-red-500 h-24 md:h-28 w-24 md:w-28" />
            )}
            <div className="w-full h-fit flex flex-col items-center gap-2">
              {transactionDetails?.status === "successful" ? (
                <>
                  <p className="font-bold text-2xl">
                    Plan Updated{" "}
                    <span className={cn("text-brand-green")}>Successfully</span>
                  </p>
                  <p className="text-sm text-center max-w-full md:max-w-80">
                    Your payment for the underlisted plan was successful. Enjoy
                    full access to the selected plan.
                  </p>
                </>
              ) : transactionDetails?.status === "failed" ? (
                <>
                  <p className="font-bold text-2xl">
                    Payment <span className={cn("text-red-500")}>Failed</span>
                  </p>
                  <p className="text-sm text-center max-w-sm">
                    Your payment for the underlisted plan has failed. Please try
                    again.
                  </p>
                </>
              ) : null}
            </div>
          </div>

          {renderPaymentDetails()}

          <Button
            size="pill"
            onClick={() => transactionDetails?.nextAction?.()}
            className={cn(
              "h-14 w-full",
              {
                "bg-brand-green": transactionDetails?.status === "successful",
                "bg-red-500": transactionDetails?.status === "failed",
              },
              "text-white",
            )}
          >
            {transactionDetails?.status}
          </Button>
        </div>
      </div>
    </div>
  );
};
