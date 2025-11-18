import { TSubscriptionPlan } from "@/lib/types";
import { RefObject } from "react";

export type TPaymentDetails = {
  transactionId?: string;
  date?: string | Date;
  planName?: string;
  amount?: number;
  status: "idle" | "pending" | "successful" | "failed";
  nextAction?: () => void;
};

export type TStatus =
  | "idle"
  | "not_paying"
  | "payment_initiated"
  | "payment_pending"
  | "payment_success"
  | "payment_failed";

export type TPlanManagementContext = {
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
  updatePlans: (plans: TSubscriptionPlan[]) => void;
};

export type TPaymentInitResponse = {
  paystack_request_status: number;
  meta: Record<string, string> | null;
  code: string;
  type: string;
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
};

export type TPaymnetVerifyResponse = {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    receipt_number: string | null;
    amount: number;
    message: string | null;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata: string;
    log: {
      start_time: number;
      time_spent: number;
      attempts: number;
      errors: number;
      success: boolean;
      mobile: boolean;
      input: string[];
      history: {
        type: string;
        message: string;
        time: number;
      }[];
    };
    fees: number;
    fees_split: string | null;
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
      signature: string;
      account_name: string | null;
    };
    customer: {
      id: number;
      first_name: string | null;
      last_name: string | null;
      email: string;
      customer_code: string;
      phone: string | null;
      metadata: string | null;
      risk_action: string;
      international_format_phone: string | null;
    };
    plan: string | null;
    split: Record<string, string>;
    order_id: string | null;
    paidAt: string;
    createdAt: string;
    requested_amount: number;
    pos_transaction_data: string | null;
    source: string | null;
    fees_breakdown: string | null;
    connect: string | null;
    transaction_date: string;
    plan_object: Record<string, string>;
    subaccount: Record<string, string>;
  };
};
