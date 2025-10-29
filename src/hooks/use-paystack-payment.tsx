"use client";

import PaystackPop from "@paystack/inline-js";
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
/*
type TTransactionState =
  | "idle"
  | "initializing"
  | "verifying"
  | "success"
  | "failed";
*/

/*
export const usePaystackPayment1 = () => {
  // const [isPending, startTransition] = useTransition();
  // const initFormRef = useRef<HTMLFormElement | null>(null);
  const [initializeState, initAction, isInitializing] = useActionState(
    initializePaymentAction,
    undefined,
  );
  const [verifyState, verifyAction, isVerifying] = useActionState(
    verifyPaymentAction,
    undefined,
  );

  const initializePayment = useCallback(() => {
    function initialize({ planId }: { planId: string }) {
      const formdata = new FormData();
      formdata.append("plan_id", planId);
      initAction(formdata);

      // approach 1
      // const input = document.createElement("input");
      // const form = document.createElement("form");
      // input.name = "plan_id";
      // input.value = planId;
      // form.appendChild(input);
      // form.action = initAction;
      // form.requestSubmit();

      // approach 2
      // startTransition(() => {
      //   initAction(formdata);
      // });
    }

    return { initializeState, initialize, isInitializing };
  }, [initAction, initializeState, isInitializing]);

  const popupPayment = useCallback(
    ({ access_code, callbacks }: TPaystackArgs) => {
      const popup = new PaystackPop();
      if (access_code) {
        popup.resumeTransaction(access_code, {
          onSuccess(tranx) {
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
    [],
  );

  const verifyPayment = useCallback(() => {
    function verify({ reference }: { reference?: string }) {
      const formdata = new FormData();
      formdata.append("reference", String(reference));
      verifyAction(formdata);
    }

    return { verifyState, verify, isVerifying };
  }, [isVerifying, verifyAction, verifyState]);

  return { initializePayment, popupPayment, verifyPayment };
};
*/

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
    ({ access_code, callbacks }: TPaystackArgs) => {
      if (typeof window === "undefined") return;
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
