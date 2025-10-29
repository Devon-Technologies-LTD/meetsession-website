"use client";

// ❌ DON'T import at the top level
// import PaystackPop from "@paystack/inline-js";

import { initializePaymentAction, verifyPaymentAction } from "@/server/actions";
import { useActionState, useCallback, useTransition } from "react";

export type TSuccessResponse = {
  id: string;
  reference: string;
  message: string;
  redirecturl: string;
  status: "success";
  trans: string;
  transaction: string;
  trxref: string;
};

export type TErrorResponse = {
  type: "setup";
  message: string;
};

type TCallbacks = {
  onSuccess: (tranx?: TSuccessResponse) => void;
  onError: (error?: TErrorResponse) => void;
  onCancel: () => void;
};

type TPaystackArgs = {
  access_code: string;
  callbacks?: TCallbacks;
};

export const usePaystackPayment = () => {
  const [isPending, startTransition] = useTransition();

  const [initializeState, initAction, isInitializing] = useActionState(
    initializePaymentAction,
    undefined,
  );

  const [verifyState, verifyAction, isVerifying] = useActionState(
    verifyPaymentAction,
    undefined,
  );

  const initialize = useCallback(
    ({ planId }: { planId: string }) => {
      const formdata = new FormData();
      formdata.append("plan_id", planId);
      startTransition(() => {
        initAction(formdata);
      });
    },
    [initAction, startTransition],
  );

  const verify = useCallback(
    ({ reference }: { reference?: string }) => {
      const formdata = new FormData();
      formdata.append("reference", String(reference));
      startTransition(() => {
        verifyAction(formdata);
      });
    },
    [verifyAction, startTransition],
  );

  const popupPayment = useCallback(
    async ({ access_code, callbacks }: TPaystackArgs) => {
      // Check if we're in the browser
      if (typeof window === "undefined") return;

      // ✅ Dynamically import PaystackPop only when needed
      const PaystackPop = (await import("@paystack/inline-js")).default;
      
      const popup = new PaystackPop();
      
      if (access_code) {
        popup.resumeTransaction(access_code, {
          onSuccess(tranx) {
            console.log({ tranx });
            const reference = tranx?.reference;
            verify({ reference });
            callbacks?.onSuccess(tranx);
          },
          onError(error) {
            callbacks?.onError(error);
          },
          onCancel() {
            callbacks?.onCancel();
          },
        });
      } else {
        throw new Error("No access code provided");
      }
    },
    [verify],
  );

  return {
    initializePayment: { initializeState, initialize, isInitializing },
    verifyPayment: { verifyState, verify, isVerifying },
    isPending,
    popupPayment,
  };
};