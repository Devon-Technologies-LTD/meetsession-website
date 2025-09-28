import { TPlan, TPlanFeature } from "@/lib/types";

import { FreePlanIcon } from "@/components/icons/free-plan-icon";
import { BasicPlanIcon } from "@/components/icons/basic-plan-icon";
import { EssentialPlanIcon } from "@/components/icons/essential-plan-icon";
import { ProPlanIcon } from "@/components/icons/pro-plan-icon";

export const PLAN_FEATURES: TPlanFeature[] = [
  { id: 1, detail: "Recording & Trascribe" },
  { id: 2, detail: "Organize Meetings" },
  { id: 3, detail: "Speaker Differentiation" },
  { id: 4, detail: "Export Notes", subDetail: "To Word, Excel, PDF" },
  { id: 5, detail: "Cross Platform (Desktop & Mobile)" },
  { id: 6, detail: "Summarization" },
  { id: 7, detail: "Chat with AI Notes" },
  { id: 8, detail: "Create Tasks from Note" },
  {
    id: 9,
    detail: "Sync Calendars (Virtual meetings)",
    subDetail: "(Google Meet, Microsoft Teams, Zoom)",
  },
];

export const PLANS: TPlan[] = [
  {
    id: 1,
    title: "Free",
    price: 0,
    description:
      "Perfect for individuals just getting started with recording and transcription",
    features: [
      { id: 1, response: "2hr" },
      { id: 2, response: "Yes" },
    ],
    link: "",
    isDefault: true,
    icon: FreePlanIcon,
    themeColor: "black",
  },
  {
    id: 2,
    title: "Basic Plan",
    price: 3999,
    description:
      "Ideal for regular users who need reliable transcription and organizational tools",
    link: "",
    features: [
      { id: 1, response: "30hr" },
      { id: 2, response: "Yes" },
      { id: 3, response: "Yes" },
    ],
    icon: BasicPlanIcon,
    themeColor: "blue",
  },
  {
    id: 3,
    title: "Essential",
    price: 7999,
    description:
      "Great for professionals managing multiple meetings with advanced features.",
    link: "",
    features: [
      { id: 1, response: "50hr" },
      { id: 2, response: "Yes" },
      { id: 3, response: "Yes" },
    ],
    icon: EssentialPlanIcon,
    isRecommended: true,
    themeColor: "green",
  },
  {
    id: 4,
    title: "Pro",
    price: 9999,
    description:
      "Best for teams and power users who need maximum storage and productivity",
    link: "",
    features: [
      { id: 1, response: "100hr" },
      { id: 2, response: "Yes" },
      { id: 3, response: "Yes" },
    ],
    icon: ProPlanIcon,
    themeColor: "midnight-blue",
  },
];
