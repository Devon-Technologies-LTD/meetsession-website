"use client";

import { TUserCurrentPlan } from "@/lib/types";
import { createContext, useCallback, useContext, useState } from "react";

type TUserCurrentPlanContext = {
  subscription: TUserCurrentPlan | undefined;
  updateSubscription: (sub: TUserCurrentPlanContext["subscription"]) => void;
};

const UserSubscriptionContext = createContext<
  TUserCurrentPlanContext | undefined
>(undefined);

export function UserSubscriptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [subscription, setLocalSub] = useState<TUserCurrentPlan | undefined>(
    undefined,
  );
  const updateSubscription = useCallback(
    (sub: TUserCurrentPlan | undefined) => {
      setLocalSub(sub);
    },
    [],
  );
  return (
    <UserSubscriptionContext.Provider
      value={{ subscription, updateSubscription }}
    >
      {children}
    </UserSubscriptionContext.Provider>
  );
}

export function useUserSubscription() {
  const context = useContext(UserSubscriptionContext);
  if (!context) {
    throw new Error(
      "useUserSubscription must be used within a UserSubscriptionProvider",
    );
  }
  return context;
}
