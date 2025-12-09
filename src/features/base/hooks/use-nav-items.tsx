"use client";

import { useOS } from "@/hooks/use-os";
import { TNavItem } from "../lib/types";
import Link from "next/link";
import { Logo } from "@/components/icons/logo";
import { buttonVariants } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function useNavItems() {
  const [appLink, setAppLink] = useState<string>("");
  const os = useOS();

  useEffect(() => {
    if (os === "iOS" || os === "macOS") {
      setAppLink("https://apps.apple.com/ng/app/meetsession/id6751320453");
    } else {
      // google play store link
      setAppLink(
        "https://play.google.com/store/apps/details?id=com.meet_session.io",
      );
    }
  }, [os]);

  const navItems: TNavItem[] = [
    {
      id: 1,
      label: "MeetSession",
      render: (
        <Link href="/" className="flex items-center gap-3 w-fit">
          <Logo className="w-8 md:w-10 h-8 md:h-10" />
          <p className="font-bold font-jersey text-lg md:text-xl capitalize">
            MeetSession
          </p>
        </Link>
      ),
      type: "logo",
      link: "/",
    },
    { id: 2, label: "Home", render: "Home", type: "links", link: "/" },
    {
      id: 3,
      label: "Features",
      render: "Features",
      type: "links",
      link: "/#features",
    },
    {
      id: 4,
      label: "howItWorks",
      render: "How it Works",
      type: "links",
      link: "/#how-it-works",
    },
    /*
  {
    id: 5,
    label: "Testimonials",
    render: "Testimonials",
    type: "links",
    link: "/#testimonials",
  },
  */
    {
      id: 6,
      label: "Support",
      render: "Support",
      type: "links",
      link: "/#support",
    },
    {
      id: 7,
      label: "campusAmbassadors",
      render: "Campus Ambassador",
      type: "links",
      link: "/ambassadors",
    },
    {
      id: 8,
      label: "Download App",
      render: (
        <Link
          href={appLink}
          target={"_blank"}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          Download App
        </Link>
      ),
      type: "buttons",
      link: "",
      external: true,
    },
  ];

  return { navItems };
}

/*
      <Button
        variant="default"
        className="font-semibold"
      >
        Download App
      </Button>
      */
