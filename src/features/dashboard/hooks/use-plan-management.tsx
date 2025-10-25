"use client";

import { createContext, RefObject, useContext, useRef, useState } from "react";

import { TStatus } from "@/features/dashboard/lib/types";
import { TSubscriptionPlan } from "@/lib/types";

export type TPlanManagementContext = {
  paymentStatus: RefObject<TStatus>;
  selectedPlan: TSubscriptionPlan | null;
  transactionDetails: TPaymentDetails | null;
  updatePaymentStatus: (status: TStatus) => void;
  updateSelectedPlan: (plan: TSubscriptionPlan) => void;
  updateTransactionDetails: (details: TPaymentDetails) => void;
};
export type TPaymentDetails = {
  transactionId?: string;
  date?: string | Date;
  status: "idle" | "pending" | "successful" | "failed";
  nextAction?: () => void;
};

const PlanManagementContext = createContext<TPlanManagementContext | null>(
  null,
);
export function usePlanManagementContext() {
  const planManagementContext = useContext(PlanManagementContext);
  if (!planManagementContext) {
    throw new Error(
      "usePlanManagementContext must be used within PlanManagement",
    );
  }
  return planManagementContext;
}

export function PlanManagementProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedPlan, setSelectedPlan] = useState<TSubscriptionPlan | null>(
    null,
  );
  const [transactionDetails, setTransactionDetails] =
    useState<TPaymentDetails | null>(null);
  const paymentStatus = useRef<TStatus>("idle");

  function updateSelectedPlan(plan: TSubscriptionPlan) {
    setSelectedPlan(plan);
  }
  function updatePaymentStatus(status: TStatus) {
    paymentStatus.current = status;
  }
  function updateTransactionDetails(details: TPaymentDetails) {
    setTransactionDetails(details);
  }

  return (
    <PlanManagementContext.Provider
      value={{
        selectedPlan,
        paymentStatus,
        transactionDetails,
        updateTransactionDetails,
        updatePaymentStatus,
        updateSelectedPlan,
      }}
    >
      {children}
    </PlanManagementContext.Provider>
  );
}
