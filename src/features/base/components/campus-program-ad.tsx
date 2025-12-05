"use client";

import { CustomBoltIcon } from "@/components/icons/icon-suit";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChipItem } from "@/components/ui/chip-item";
import { cn } from "@/lib/utils";
import {
  ArrowRightIcon,
  AwardIcon,
  TargetIcon,
  TrendingUpIcon,
  UsersRoundIcon,
} from "lucide-react";

import Link from "next/link";
import { Fragment } from "react";
/*
import Image from "next/image";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
*/

export function CampusProgramAd() {
  // const isMobile = useIsMobile("desktop");

  return (
    <div
      className={cn(
        "w-full h-full",
        "flex flex-col gap-10 md:gap-28",
        "px-7 py-10 md:px-20 md:py-40",
        "bg-brand-green-extradark font-dm-sans text-white text-center",
      )}
    >
      <div className={cn("flex flex-col gap-3 items-center")}>
        <ChipItem className="text-brand-green border-brand-green bg-brand-green/20 border-[1px]">
          <CustomBoltIcon />
          <span>Join Our Community</span>
        </ChipItem>

        <p className="text-6xl font-bold text-white font-dm-sans tracking-tighter">
          MeetSession Campus Ambassador Program
        </p>

        <p className="text-base md:text-xl text-neutral-100 max-w-200 w-full mx-auto">
          Lead the movement to transform how students capture, organise, and
          share knowledge. Join our global network of student leaders making
          real impact.
        </p>
      </div>

      <div className="flex flex-col gap-5 md:gap-6 w-full max-w-screen-xl mx-auto">
        <div className="flex items-start gap-7 md:gap-14">
          <div className="w-1/2 h-full pt-14">
            <div
              className={cn(
                "relative h-116 w-full flex flex-col justify-end",
                "rounded-3xl p-6 overflow-hidden",
                "border-[3px] border-brand-green/10",
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-between gap-10 w-full",
                  "rounded-xl py-6 px-14",
                  "bg-black/60 border border-brand-green/30",
                )}
              >
                {metrics.map((metric, idx) => (
                  <Fragment key={metric.id}>
                    <div className="flex flex-col gap-2">
                      <p className="text-2xl font-semibold text-brand-green-light">
                        {metric.value}
                      </p>
                      <p className="text-xs">{metric.name}</p>
                    </div>

                    {idx < metrics.length - 1 && (
                      <div className="h-14 w-px bg-brand-green/10" />
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
          </div>

          <div
            className={cn(
              "flex flex-col gap-8",
              "text-start items-start",
              "w-1/2 h-fit",
            )}
          >
            <p className="text-start text-3xl font-bold">
              Why Become an Ambassador?
            </p>

            <div className="flex flex-col gap-4 w-full">
              {reasons.map((reason) => (
                <div
                  key={reason.id}
                  className={cn(
                    "px-6 py-7 w-full",
                    "rounded-2xl border border-brand-green-light/20",
                    "flex gap-4 bg-white/5",
                  )}
                >
                  <div className="bg-brand-green-light/20 text-brand-green-light/70 w-fit h-fit py-3 px-3 rounded-xl">
                    {reason.icon}
                  </div>

                  <div className="text-start">
                    <p className="font-semibold text-base md:text-lg">
                      {reason.title}
                    </p>
                    <p className="text-xs md:text-sm text-neutral-400">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/ambassador"
              className={cn(
                buttonVariants(),
                "bg-brand-green hover:bg-brand-green-light",
                "py-6 text-base text-medium w-full",
                "flex items-center gap-2",
              )}
            >
              <p>Apply to Become an Ambassador</p>
              <ArrowRightIcon />
            </Link>

            <p className="text-neutral-300 text-xs md:text-sm text-center w-full">
              Join students from universities worldwide making education more
              collaborative
            </p>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "max-w-screen-xl w-full h-fit mx-auto",
          "py-10 px-12 flex flex-col gap-12",
          "rounded-3xl border border-white/10",
          "bg-linear-120 from-white/5 to-transparent",
        )}
      >
        <p className="font-bold text-3xl">
          What You&apos;ll Do as an Ambassador
        </p>

        <div className={cn("flex justify-between gap-10")}>
          {expectations.map((exp) => (
            <ExpectationCard
              key={exp.id}
              id={exp.id}
              title={exp.title}
              description={exp.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const reasons = [
  {
    id: 1,
    icon: <UsersRoundIcon />,
    title: "Build Leadership",
    description: "Develop leadership skills and manage campus initiatives",
  },
  {
    id: 2,
    icon: <AwardIcon />,
    title: "Get Recognised",
    description: "Earn certificates and LinkedIn recommendations",
  },
  {
    id: 3,
    icon: <TrendingUpIcon />,
    title: "Career Growth",
    description: "Access internships and mentorship opportunities",
  },
  {
    id: 4,
    icon: <TargetIcon />,
    title: "Make Impact",
    description: "Shape how students use MeetSession on your campus",
  },
];
const metrics = [
  { id: 1, name: "Ambassadors", value: "500+" },
  { id: 2, name: "Universities", value: "18+" },
  { id: 3, name: "Students", value: "50k" },
];
const expectations = [
  {
    id: "01",
    title: "Host Workshops",
    description:
      "Organise events and training sessions to help students get started with MeetSession",
  },
  {
    id: "02",
    title: "Build Community",
    description:
      "Create and nurture a community of MeetSession users on your campus",
  },
  {
    id: "03",
    title: "Share Feedback",
    description:
      "Provide valuable insights to help shape future features and improvements",
  },
];

function ExpectationCard({
  title,
  description,
  id,
}: {
  title: string;
  description: string;
  id: string;
}) {
  return (
    <Card className={cn("w-full", "bg-black/40", "border-none")}>
      <CardContent className="flex items-center justify-center">
        <div className="bg-brand-green-extralight/10 rounded-xl w-fit h-fit py-2 px-2.5">
          <p className="text-2xl font-bold text-brand-green">{id}</p>
        </div>
      </CardContent>
      <CardHeader className="text-white flex flex-col items-center gap-4">
        <CardTitle className="text-base md:text-lg">{title}</CardTitle>
        <CardDescription className="text-neutral-400">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
