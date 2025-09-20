import { cn } from "@/lib/utils";
import { NoiseElement } from "@/components/noise-element";
import { TTier } from "../lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generateTierColor } from "../lib/utils";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FreePlanIcon } from "@/components/icons/free-plan-icon";
/*
import { BasicPlanIcon } from "@/components/icons/basic-plan-icon";
import { EssentialPlanIcon } from "@/components/icons/essential-plan-icon";
import { ProPlanIcon } from "@/components/icons/pro-plan-icon";
*/

export function Pricing() {
  return (
    <div
      id="waitlist"
      className={cn(
        "bg-brand-black text-white",
        "px-7 py-8 md:py-32 lg:px-8 h-fit",
        "flex justify-center",
        "relative overflow-hidden",
      )}
    >
      <div className="flex flex-col gap-6 sm:gap-10 md:gap-16 lg:gap-24 items-center justify-center w-max h-fit z-10">
        <div
          className={cn(
            "mx-auto max-w-full md:max-w-120 text-center",
            "flex flex-col gap-2 md:gap-3 items-center",
          )}
        >
          <p className="font-dm-sans font-black text-2xl md:text-3xl">
            Find the Right Plan for You
          </p>
          <p className="text-sm md:text-base lg:text-lg text-neutral-400">
            Every tier includes our core features. Choose the one that fits your
            needs.
          </p>
        </div>

        <div className="h-fit w-fit flex gap-5 flex-wrap justify-center">
          {priceList.map((itr) => (
            <Card
              key={itr.id}
              className={cn(
                generateTierColor(itr.themeColor),
                "py-2 px-2 rounded-3xl",
                "shadow-none border-none text-white",
                "min-h-120 h-fit w-fit min-w-full max-w-full sm:min-w-64 sm:max-w-68 md:min-w-72 md:max-w-76 lg:min-w-90 lg:max-w-90",
              )}
            >
              <CardHeader className="rounded-2xl p-4 bg-neutral-700/20 font-dm-sans relative">
                {itr.isRecommended && (
                  <div className="absolute top-1 right-4 text-[9px] bg-black rounded-full py-0.5 px-1.5">
                    Recommended plan
                  </div>
                )}
                <div
                  className={cn(
                    "w-full h-full",
                    "flex items-center justify-between gap-2",
                  )}
                >
                  <div className="flex gap-2 items-center">
                    <div className="flex items-center justify-center h-12 w-12 bg-white/10 rounded-xl">
                      {itr.icon}
                    </div>
                    <CardTitle className="font-bold text-sm md:text-base">
                      {itr.title}
                    </CardTitle>
                  </div>
                  <div className="w-fit flex items-center gap-2.5">
                    {itr.isDefault && (
                      <span
                        className={cn(
                          generateTierColor("green"),
                          "font-light text-[9px] py-0.5 px-1.5 rounded-full",
                        )}
                      >
                        Default plan
                      </span>
                    )}
                    <CardDescription className="text-2xl font-bold text-white">
                      ₦{itr.price}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent
                className={cn(
                  "font-poppins text-xs md:text-sm",
                  "flex flex-col gap-8 flex-1",
                )}
              >
                <div className="w-full h-fit">{itr.description}</div>

                <ul className="w-full h-fit flex flex-col gap-3">
                  {itr.features.map((feat, idx) => (
                    <li key={idx} className="flex gap-2.5 items-center">
                      <span className="rounded-full bg-white/10 p-1">
                        <CheckIcon className="w-2.5 md:w-4 h-2.5 md:h-4" />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="py-4">
                <Button
                  className={cn(
                    generateTierColor(
                      itr.themeColor === "blue" || itr.themeColor === "green"
                        ? "black"
                        : "green",
                    ),
                    "w-full py-5 hover:bg-neutral-600 rounded-lg",
                  )}
                >
                  Choose plan
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* filters */}
      <NoiseElement
        className="hidden md:block absolute -left-148 top-1/2 translate-y-1/2"
        intensity={40}
        opacity={0.2}
      >
        <div
          className={cn(
            "h-full w-full relative",
            "before:w-204 before:h-204",
            "before:bg-brand-blue before:opacity-40 before:rounded-full before:blur-3xl",
            "before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-12",
          )}
        ></div>
      </NoiseElement>
      <NoiseElement className="absolute -right-148 bottom-0 md:bottom-1/2 -translate-y-1/2">
        <div
          className={cn(
            "h-full w-full relative",
            "before:bg-brand-blue before:opacity-40 before:rounded-full before:blur-3xl",
            "before:w-120 md:before:w-204 before:h-120 md:before:h-204",
            "before:absolute before:-bottom-64 md:before:bottom-1/2 before:right-1/2 md:before:-right-12",
            "before:-translate-x-1/2 md:before:translate-x-0 before:-translate-y-0 md:before:translate-y-1/2",
          )}
        ></div>
      </NoiseElement>
    </div>
  );
}

const priceList: TTier[] = [
  {
    id: 1,
    title: "Free",
    price: "0",
    description:
      "Perfect for individuals just getting started with recording and transcription",
    features: [
      "8hrs+ recording & Transcription",
      "Meeting Organization",
      "Speaker Differentiation",
    ],
    link: "",
    isDefault: true,
    icon: <FreePlanIcon />,
    themeColor: "black",
  },
  /*
  {
    id: 2,
    title: "Basic Plan",
    price: "3999",
    description:
      "Ideal for regular users who need reliable transcription and organizational tools",
    link: "",
    features: [
      "30hr+ recording and transcription",
      "Meeting organization",
      "Speaker differentiation",
    ],
    icon: <BasicPlanIcon />,
    themeColor: "blue",
  },
  {
    id: 3,
    title: "Essential",
    price: "7999",
    description:
      "Great for professionals managing multiple meetings with advanced features.",
    link: "",
    features: [
      "50hr+ recording and transcript",
      "Meeting organization",
      "Speaker differentiation",
    ],
    icon: <EssentialPlanIcon />,
    isRecommended: true,
    themeColor: "green",
  },
  {
    id: 4,
    title: "Pro",
    price: "9999",
    description:
      "Best for teams and power users who need maximum storage and productivity",
    link: "",
    features: [
      "60hr+ recording and transcript",
      "Meeting organization",
      "Speaker differentiation",
    ],
    icon: <ProPlanIcon />,
    themeColor: "midnight-blue",
  },
  */
];
