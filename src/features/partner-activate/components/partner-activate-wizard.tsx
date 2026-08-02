"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import { cn } from "@/lib/utils";
import { TSubscriptionPlan } from "@/lib/types";
import {
  exchangeActivationTokenAction,
  trialStartAction,
  validateCouponCodeAction,
} from "@/server/actions";
import { retrievePlansAction } from "@/features/dashboard/lib/server/actions";
import { usePaystackPayment } from "@/hooks/use-paystack-payment";
import { TPartnerActivationResponse } from "../lib/types";

type TBillingCycle = "monthly" | "quarterly" | "annual";

type TStep =
  | "exchanging"
  | "token-error"
  | "select-plan"
  | "choose"
  | "paying"
  | "trial-success"
  | "payment-success";

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString()}`;
}

function daysUntil(isoDate: string) {
  const ms = new Date(isoDate).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

export function PartnerActivateWizard({ token }: { token?: string }) {
  const router = useRouter();
  const hasExchanged = useRef(false);

  const [step, setStep] = useState<TStep>("exchanging");
  const [tokenError, setTokenError] = useState("");
  const [onboarding, setOnboarding] = useState<TPartnerActivationResponse | null>(
    null,
  );
  const [plans, setPlans] = useState<TSubscriptionPlan[]>([]);
  const [selectedTierId, setSelectedTierId] = useState("");
  const [billingCycle, setBillingCycle] = useState<TBillingCycle>("monthly");
  const [isStartingTrial, setIsStartingTrial] = useState(false);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  // Cached from the first successful coupon validation — the coupon is
  // single-use, so a retry (e.g. after the Paystack popup errors/cancels)
  // must resume this same access_code rather than re-validate the coupon,
  // which would fail with "already used" the second time.
  const [couponAccessCode, setCouponAccessCode] = useState<string | null>(
    null,
  );

  const { popupPayment, verifyPayment } = usePaystackPayment();
  const { verify, verifyState } = verifyPayment;

  // a cached access_code is only valid for the tier/cycle it was validated
  // against — invalidate it if either changes.
  useEffect(() => {
    setCouponAccessCode(null);
  }, [selectedTierId, billingCycle]);

  // exchange the one-time token for a session + onboarding context
  useEffect(() => {
    if (hasExchanged.current) return;
    hasExchanged.current = true;

    if (!token) {
      setTokenError("This activation link is missing its token.");
      setStep("token-error");
      return;
    }

    (async () => {
      const formdata = new FormData();
      formdata.append("token", token);
      const res = await exchangeActivationTokenAction(formdata);

      if (!res.success || !res.data) {
        setTokenError(
          res.message ||
            "This activation link is invalid, expired, or has already been used.",
        );
        setStep("token-error");
        return;
      }

      setOnboarding(res.data);
      setSelectedTierId(res.data.tier_id);

      const plansRes = await retrievePlansAction({ withFeature: true });
      if (plansRes?.success && plansRes.data?.data) {
        setPlans(plansRes.data.data);
      }

      setStep("select-plan");
    })();
  }, [token]);

  // verify effect — mirrors plan-ui.tsx's payment verification handling
  useEffect(() => {
    if (!verifyState) return;

    const verifyMessage = (
      verifyState.success ? verifyState.data?.message : verifyState.message
    ) ?? "";
    const normalizedVerifyMessage = verifyMessage.toLowerCase();
    const hasExplicitVerifyFailure =
      normalizedVerifyMessage.includes("failed") ||
      normalizedVerifyMessage.includes("error");

    if (verifyState.success && !hasExplicitVerifyFailure) {
      setStep("payment-success");
      return;
    }

    if (step === "paying") {
      toast.error(
        verifyState.success
          ? verifyState.data?.message || "Payment verification failed"
          : verifyState.message || "Payment verification failed",
      );
      setStep("choose");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifyState]);

  const selectedPlan = plans.find((p) => p.id === selectedTierId);
  const featurePrice = selectedPlan?.features?.find(
    (f) => f.key === `${billingCycle}_subscription`,
  )?.value;
  const price =
    featurePrice !== undefined ? Number(featurePrice) : (selectedPlan?.price ?? 0);

  const discountedPrice = onboarding
    ? Math.max(
        0,
        onboarding.discount_percentage > 0
          ? price - (price * onboarding.discount_percentage) / 100
          : price - onboarding.discount_amount,
      )
    : price;

  const handleContinueWithTrial = useCallback(async () => {
    if (!onboarding || !selectedTierId) return;
    setIsStartingTrial(true);
    const formdata = new FormData();
    formdata.append("tier_id", selectedTierId);
    formdata.append("coupon_code", onboarding.coupon_code);
    const res = await trialStartAction(undefined, formdata);
    setIsStartingTrial(false);

    if (!res.success) {
      toast.error(
        typeof res.errors === "string" ? res.errors : res.message,
      );
      return;
    }

    toast.success("Your trial is active");
    setStep("trial-success");
  }, [onboarding, selectedTierId]);

  const launchPaystackPopup = useCallback(
    (accessCode: string) => {
      if (!onboarding) return;
      setStep("paying");
      popupPayment({
        access_code: accessCode,
        email: onboarding.user_details.email,
        callbacks: {
          onSuccess: (tranx) => {
            verify({ reference: tranx?.reference });
          },
          onError: (err) => {
            toast.error(err?.message || "Payment setup failed");
            setStep("choose");
          },
          onCancel: () => {
            toast.warning("Payment was cancelled.");
            setStep("choose");
          },
        },
      });
    },
    [onboarding, popupPayment, verify],
  );

  const handleUseCouponNow = useCallback(async () => {
    if (!onboarding || !selectedTierId) return;

    // Retrying (popup errored/was cancelled) — the coupon is single-use, so
    // resume the transaction we already validated instead of asking again.
    if (couponAccessCode) {
      launchPaystackPopup(couponAccessCode);
      return;
    }

    setIsApplyingCoupon(true);
    const formdata = new FormData();
    formdata.append("tier_id", selectedTierId);
    formdata.append("coupon_code", onboarding.coupon_code);
    formdata.append("subscription_type", `${billingCycle}_subscription`);
    const res = await validateCouponCodeAction(formdata);
    setIsApplyingCoupon(false);

    if (!res.success) {
      toast.error(res.message || "This discount code could not be applied.");
      return;
    }

    const accessCode = res.data?.data?.access_code;
    if (!accessCode) {
      toast.error("Coupon validated but no payment access code was returned.");
      return;
    }

    setCouponAccessCode(accessCode);
    launchPaystackPopup(accessCode);
  }, [
    onboarding,
    selectedTierId,
    billingCycle,
    couponAccessCode,
    launchPaystackPopup,
  ]);

  if (step === "exchanging") {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (step === "token-error") {
    return (
      <div className="w-full flex flex-col items-center gap-4 text-center py-16">
        <p className="text-lg font-semibold text-brand-blue-dark">
          We couldn&apos;t activate your account
        </p>
        <p className="text-sm text-muted-foreground max-w-md">{tokenError}</p>
        <Button variant="brand-green" onClick={() => router.push("/signin")}>
          Go to sign in
        </Button>
      </div>
    );
  }

  if (!onboarding) return null;

  if (step === "select-plan") {
    return (
      <div className="w-full flex flex-col gap-8">
        <p className="text-sm text-muted-foreground">
          You&apos;re activating a {onboarding.partner_name} membership. Pick the
          plan you want — your discount code works on any of them.
        </p>

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

        <div className="grid gap-3 sm:grid-cols-2">
          {plans.map((plan) => {
            const planFeaturePrice = plan.features?.find(
              (f) => f.key === `${billingCycle}_subscription`,
            )?.value;
            const planPrice =
              planFeaturePrice !== undefined
                ? Number(planFeaturePrice)
                : (plan.price ?? 0);
            const isSelected = plan.id === selectedTierId;
            const isRecommended = plan.id === onboarding.tier_id;

            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedTierId(plan.id)}
                className={cn(
                  "text-left rounded-xl border-2 p-5 transition-all",
                  isSelected
                    ? "border-brand-green bg-brand-green/5"
                    : "border-black/10 hover:border-black/20",
                )}
              >
                {isRecommended && (
                  <span className="inline-block mb-2 text-[10px] font-semibold uppercase tracking-wide text-brand-green">
                    Recommended for {onboarding.partner_name} members
                  </span>
                )}
                <p className="font-semibold text-brand-blue-dark">{plan.name}</p>
                <p className="text-xl font-bold tracking-tight">
                  {formatNaira(planPrice)}
                </p>
              </button>
            );
          })}
        </div>

        <Button
          variant="brand-green"
          size="pill"
          className="text-white font-medium py-6"
          disabled={!selectedTierId}
          onClick={() => setStep("choose")}
        >
          Continue
        </Button>
      </div>
    );
  }

  if (step === "choose" || step === "paying") {
    const expiresInDays = daysUntil(onboarding.coupon_expires_at);
    const discountLabel =
      onboarding.discount_percentage > 0
        ? `${onboarding.discount_percentage}% off`
        : `${formatNaira(onboarding.discount_amount)} off`;

    return (
      <div className="w-full flex flex-col gap-8">
        {step === "choose" && (
          <button
            type="button"
            onClick={() => setStep("select-plan")}
            className="self-start text-sm font-medium text-muted-foreground hover:text-brand-blue-dark transition-colors"
          >
            ← Change plan
          </button>
        )}

        <div className="rounded-xl bg-neutral-100 p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
            {selectedPlan?.name} — {billingCycle}
          </p>
          <p className="text-2xl font-bold tracking-tight mt-1">
            {formatNaira(price)}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-black/10 p-5 flex flex-col gap-3">
            <div>
              <p className="font-semibold text-brand-blue-dark">
                Use your discount now
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {discountLabel}, code expires in {expiresInDays}{" "}
                {expiresInDays === 1 ? "day" : "days"}.
              </p>
              <p className="text-lg font-bold mt-2">
                {formatNaira(discountedPrice)}
              </p>
            </div>
            <Button
              variant="brand-green"
              size="pill"
              className="text-white font-medium mt-auto relative overflow-hidden"
              disabled={isApplyingCoupon || step === "paying"}
              onClick={handleUseCouponNow}
            >
              {(isApplyingCoupon || step === "paying") && <Spinner />}
              Pay {formatNaira(discountedPrice)}
            </Button>
          </div>

          <div className="rounded-xl border-2 border-black/10 p-5 flex flex-col gap-3">
            <div>
              <p className="font-semibold text-brand-blue-dark">
                Continue with a free trial
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {onboarding.trial_days} days, no charge. Your discount code
                still works for {expiresInDays}{" "}
                {expiresInDays === 1 ? "day" : "days"} if you decide to
                upgrade later.
              </p>
            </div>
            <Button
              variant="outline"
              size="pill"
              className="font-medium mt-auto border-2 border-black relative overflow-hidden"
              disabled={isStartingTrial || step === "paying"}
              onClick={handleContinueWithTrial}
            >
              {isStartingTrial && <Spinner />}
              Start free trial
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "trial-success") {
    return (
      <SuccessScreen
        title="Your trial is active"
        description={`Enjoy ${onboarding.trial_days} days on ${selectedPlan?.name ?? "your plan"}. Your discount code is still waiting if you decide to upgrade.`}
        onContinue={() => router.push("/dashboard/accounts")}
      />
    );
  }

  if (step === "payment-success") {
    return (
      <SuccessScreen
        title="You're all set"
        description={`Your payment for ${selectedPlan?.name ?? "your plan"} was successful.`}
        onContinue={() => router.push("/dashboard/accounts")}
      />
    );
  }

  return null;
}

function Loader() {
  return (
    <div className="flex flex-col items-center gap-3 text-muted-foreground">
      <span className="relative inline-flex h-8 w-8">
        <span className="animate-spin h-8 w-8 border-2 border-black/10 border-t-brand-green rounded-full block" />
      </span>
      <p className="text-sm">Activating your account…</p>
    </div>
  );
}

function SuccessScreen({
  title,
  description,
  onContinue,
}: {
  title: string;
  description: string;
  onContinue: () => void;
}) {
  return (
    <div className="w-full flex flex-col items-center gap-4 text-center py-16">
      <p className="text-2xl font-bold text-brand-blue-dark">{title}</p>
      <p className="text-sm text-muted-foreground max-w-md">{description}</p>
      <Button variant="brand-green" size="pill" onClick={onContinue}>
        Go to dashboard
      </Button>
    </div>
  );
}
