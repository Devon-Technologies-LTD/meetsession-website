"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { validateCouponCodeAction } from "@/server/actions";

type DiscountCodeModalProps = {
  open: boolean;
  inputId: string;
  onOpenChange: (open: boolean) => void;
  onProceed: (discountCode?: string) => Promise<void> | void;
};

export function DiscountCodeModal({
  open,
  inputId,
  onOpenChange,
  onProceed,
}: DiscountCodeModalProps) {
  const [isDiscountSheetOpen, setIsDiscountSheetOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

  const handlePromptOpenChange = useCallback(
    (nextOpen: boolean) => {
      onOpenChange(nextOpen);
      if (!nextOpen) {
        setCouponCode("");
      }
    },
    [onOpenChange],
  );

  const handleSheetOpenChange = useCallback((nextOpen: boolean) => {
    setIsDiscountSheetOpen(nextOpen);
    if (!nextOpen) {
      setCouponCode("");
    }
  }, []);

  const handleContinueWithoutDiscount = useCallback(async () => {
    handleSheetOpenChange(false);
    await onProceed();
  }, [handleSheetOpenChange, onProceed]);

  const handleDiscountConfirm = useCallback(async () => {
    const normalizedCouponCode = couponCode.trim().toUpperCase();

    if (!normalizedCouponCode) {
      toast.error("Enter a discount code to continue.");
      return;
    }

    setIsValidatingCoupon(true);
    const formdata = new FormData();
    formdata.append("code", normalizedCouponCode);

    const validationRes = await validateCouponCodeAction(formdata);
    setIsValidatingCoupon(false);

    if (!validationRes.success) {
      toast.error(validationRes.message || "Invalid coupon code.");
      return;
    }

    toast.success(validationRes.message || "Coupon code applied.");
    handleSheetOpenChange(false);
    await onProceed(normalizedCouponCode);
  }, [couponCode, handleSheetOpenChange, onProceed]);

  return (
    <>
      <Dialog open={open} onOpenChange={handlePromptOpenChange}>
        <DialogContent
          showCloseButton={false}
          className="max-w-[min(92vw,60rem)] rounded-[2rem] border-0 bg-white px-8 py-10 text-center shadow-2xl sm:px-12 sm:py-14"
        >
          <DialogTitle className="bg-gradient-to-r from-[#1fba7a] to-[#4d5fbf] bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-xl">
            Have a Discount Code?
          </DialogTitle>
          <DialogDescription className="mx-auto max-w-2xl text-md leading-relaxed text-neutral-500 sm:text-lg">
            This will grant you exclusive offer access to certain features on
            Meet Session.
          </DialogDescription>

          <div className="mt-10 grid  gap-4 grid-cols-2">
            <Button
              type="button"
              size="pill"
              className="h-15 rounded-[1rem] text-xl font-semibold"
              onClick={() => {
                onOpenChange(false);
                setIsDiscountSheetOpen(true);
              }}
            >
              Yes
            </Button>
            <Button
              type="button"
              size="pill"
              variant="outline"
              className="h-15 rounded-[1rem] border-2 border-black text-xl font-semibold"
              onClick={async () => {
                onOpenChange(false);
                await onProceed();
              }}>
              No
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Sheet open={isDiscountSheetOpen} onOpenChange={handleSheetOpenChange}>
        <SheetContent
          side="bottom"
          className="rounded-t-[2rem] border-0 bg-white px-6 pb-10 pt-6 sm:px-8"
        >
          <div className="mx-auto mb-8 h-2 w-24 rounded-full bg-black" />
          <div className="mx-auto max-w-3xl">
            <SheetTitle className="bg-gradient-to-r from-[#1fba7a] to-[#4d5fbf] bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-3xl">
              Use Discount Code
            </SheetTitle>
            <SheetDescription className="mt-1 text-lg text-neutral-500 sm:text-xl">
              Using this code grants you exclusive features.
            </SheetDescription>

            <div className="mt-8">
              <label
                htmlFor={inputId}
                className="mb-4 block text-lg font-semibold text-neutral-300"
              >
                Enter Discount Code
              </label>
              <input
                id={inputId}
                value={couponCode}
                onChange={(event) =>
                  setCouponCode(event.target.value.toUpperCase())
                }
                placeholder="Enter discount code"
                className="h-15 w-full rounded-[1rem] border-2 border-[#062634] px-8 text-md font-semibold uppercase tracking-wide text-[#062634] outline-none placeholder:text-neutral-300"
              />
            </div>

            <Button
              type="button"
              size="pill"
              className="mt-10 h-15 w-full rounded-[1rem] bg-[#1fb07b] text-xl font-medium hover:bg-[#199667]"
              disabled={isValidatingCoupon}
              onClick={handleDiscountConfirm}
            >
              {isValidatingCoupon ? "Validating..." : "Confirm"}
            </Button>

            <button
              type="button"
              className="mt-10 block w-full text-center text-sm font-medium underline underline-offset-4"
              onClick={handleContinueWithoutDiscount}
            >
              Continue Without Discount
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
