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
  access_code?: string;
  payment_url?: string;
  plan_code?: string;
  reference?: string;
  email?: string;
  callbacks?: TCallbacks;
};

type TPaystackWindow = Window & {
  PaystackPop?: {
    setup: (config: {
      key: string;
      email: string;
      plan: string;
      ref: string;
      callback: (response: { reference?: string }) => void;
      onClose: () => void;
    }) => { openIframe: () => void };
  };
};

let paystackScriptLoaderPromise: Promise<void> | null = null;

async function loadPaystackScript() {
  if (typeof window === "undefined") return;
  const typedWindow = window as TPaystackWindow;
  if (typedWindow.PaystackPop?.setup) return;

  if (!paystackScriptLoaderPromise) {
    paystackScriptLoaderPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector<HTMLScriptElement>(
        'script[src="https://js.paystack.co/v1/inline.js"]',
      );
      if (existingScript) {
        existingScript.addEventListener("load", () => resolve(), {
          once: true,
        });
        existingScript.addEventListener(
          "error",
          () => reject(new Error("Failed to load Paystack inline script")),
          { once: true },
        );
        return;
      }

      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () =>
        reject(new Error("Failed to load Paystack inline script"));
      document.body.appendChild(script);
    });
  }

  await paystackScriptLoaderPromise;
}

function getAccessCodeFromHostedUrl(url?: string) {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    const fromQuery =
      parsed.searchParams.get("access_code") ||
      parsed.searchParams.get("code") ||
      "";
    if (fromQuery) return fromQuery;

    const parts = parsed.pathname.split("/").filter(Boolean);
    return parts[parts.length - 1] ?? "";
  } catch {
    return "";
  }
}

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
    ({ tierId, subscriptionType, callbackUrl }: { tierId: string; subscriptionType: string; callbackUrl?: string }) => {
      const formdata = new FormData();
      formdata.append("tier_id", tierId);
      formdata.append("subscription_type", subscriptionType);
      if (callbackUrl) {
        formdata.append("callback_url", callbackUrl);
      }
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
    async ({
      access_code,
      payment_url,
      plan_code,
      reference,
      email,
      callbacks,
    }: TPaystackArgs) => {
      // Check if we're in the browser
      if (typeof window === "undefined") return;

      try {
        const resolvedAccessCode =
          access_code || getAccessCodeFromHostedUrl(payment_url);

        if (resolvedAccessCode) {
          const PaystackPop = (await import("@paystack/inline-js")).default;
          const popup = new PaystackPop();
          popup.resumeTransaction(resolvedAccessCode, {
            onSuccess(tranx) {
              console.log({ tranx });
              const paidRef = tranx?.reference;
              verify({ reference: paidRef });
              callbacks?.onSuccess(tranx);
            },
            onError(error) {
              callbacks?.onError(error);
            },
            onCancel() {
              callbacks?.onCancel();
            },
          });
          return;
        }

        if (plan_code && reference && email) {
          await loadPaystackScript();
          const typedWindow = window as TPaystackWindow;
          const paystack = typedWindow.PaystackPop;

          if (!paystack?.setup) {
            throw new Error("Paystack inline setup is not available");
          }

          const paystackPublicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
          if (!paystackPublicKey) {
            throw new Error("Paystack public key is not configured");
          }
          console.log("Initializing Paystack inline payment", {
            plan_code,
            reference,
            email,
          });
          const handler = paystack.setup({
            key: paystackPublicKey,
            email,
            plan: plan_code,
            ref: reference,
            callback(response) {
              const paidRef = response?.reference ?? reference;
              verify({ reference: paidRef });
              callbacks?.onSuccess({
                id: "",
                reference: paidRef,
                message: "Payment complete",
                redirecturl: "",
                status: "success",
                trans: "",
                transaction: "",
                trxref: paidRef,
              });
            },
            onClose() {
              callbacks?.onCancel();
            },
          });

          handler.openIframe();
          return;
        }

        throw new Error(
          "Unable to start payment inline: expected access_code or plan_code + reference + email",
        );
      } catch (error) {
        callbacks?.onError({
          type: "setup",
          message:
            error instanceof Error ? error.message : "Payment setup failed",
        });
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
