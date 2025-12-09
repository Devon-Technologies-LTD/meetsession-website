"use client";

import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChipItem } from "@/components/ui/chip-item";
import { Item, ItemContent, ItemMedia } from "@/components/ui/item";
import { cn } from "@/lib/utils";
import {
  ChevronRightIcon,
  ClockIcon,
  EyeIcon,
  YoutubeIcon,
} from "lucide-react";
import Link from "next/link";

export function VideoTutorials() {
  return (
    <div
      className={cn(
        "w-full h-full",
        "flex flex-col gap-12",
        "px-7 py-10 md:px-20 md:py-40",
        "bg-brand-green-black text-white text-center",
      )}
    >
      <div className={cn("flex flex-col gap-3 items-center")}>
        <ChipItem className="text-red-400 border-red-400 bg-red-500/20 border-[1px]">
          <YoutubeIcon className="size-4 md:size-6" />
          Video Tutorials
        </ChipItem>

        <p className="text-3xl md:text-6xl font-bold text-white font-dm-sans tracking-tighter">
          Learn MeetSession{" "}
          <span className="text-emerald-500">From Video Tutorials</span>
        </p>

        <p className="text-sm md:text-xl text-neutral-400 max-w-160 mx-auto">
          Watch step-by-step tutorials to master every feature of MeetSession.
          From beginner basics to advanced skills.
        </p>
      </div>

      <div className="max-w-screen-xl mx-auto w-full">
        <VideoTutorialCards />
      </div>

      <div className={cn("flex flex-col gap-2 md:gap-4 items-center")}>
        <Link
          href="https://www.youtube.com/@DevonTechnologiesltd"
          className={cn(
            buttonVariants({ variant: "destructive" }),
            "h-fit w-fit rounded-lg md:rounded-2xl",
            "font-dm-sans font-semibold px-2 md:px-4 py-1 md:py-2",
          )}
          target="_blank"
        >
          <Item
            className={cn(
              "text-sm md:text-lg",
              "px-1 md:px-2 py-1 md:py-2",
              "flex-row flex-nowrap gap-2 md:gap-4",
            )}
          >
            <ItemMedia>
              <YoutubeIcon className="size-4 md:size-6" />
            </ItemMedia>
            <ItemContent className="w-fit">
              Subscribe to Our YouTube Channel
            </ItemContent>
            <ItemMedia>
              <ChevronRightIcon className="size-4 md:size-6" />
            </ItemMedia>
          </Item>
        </Link>
        <p className="text-neutral-400 text-xs md:text-sm">
          Get notified when we release new tutorials feature updates
        </p>
      </div>
    </div>
  );
}

function VideoTutorialCards() {
  const [categories, setCategories] = useState<
    { id: number; name: string; active: boolean }[]
  >(() => {
    const set = new Set(videos.map((vid) => vid.category));
    let id = 1;
    const items = [{ id, name: "All", active: true }];
    set.forEach((i) => {
      id++;
      items.push({ id, name: i, active: false });
    });
    return items;
  });
  const [filteredVideos, setFilteredVideos] = useState<typeof videos>(videos);

  function filterVideos(category: string) {
    setCategories((prev) => {
      return prev.map((i) =>
        i.name.toLowerCase() === category.toLowerCase()
          ? { ...i, active: true }
          : { ...i, active: false },
      );
    });

    if (category.toLowerCase() === "all") {
      setFilteredVideos(videos);
    } else {
      const filtered = videos.filter(
        (video) => video.category.toLowerCase() === category.toLowerCase(),
      );
      setFilteredVideos(filtered);
    }
  }

  return (
    <div className="flex flex-col gap-10 w-full items-center">
      <div className="flex flex-wrap items-center gap-4">
        {categories.map((cat) => (
          <button
            key={cat.name}
            className={cn(
              "transition-all rounded-2xl",
              "text-white py-3 px-6 cursor-pointer",
              [
                cat.active
                  ? "bg-brand-green shadow-lg shadow-brand-green-light/40 font-semibold"
                  : "border border-slate-700 bg-white/5 font-medium text-slate-400",
              ],
            )}
            onClick={() => filterVideos(cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div
        className={cn(
          "flex flex-wrap gap-2.5 md:gap-5 items-normal justify-center",
        )}
      >
        {filteredVideos.map((vid, idx) => (
          <VideoTutorialCard
            key={idx}
            name={vid.title}
            description={vid.description}
            category={vid.category}
            link={vid.link}
            views={vid.views}
            duration={vid.duration}
          />
        ))}
      </div>
    </div>
  );
}

function VideoTutorialCard({
  link,
  name,
  views,
  category,
  duration,
  description,
}: {
  name: string;
  link: string;
  views: string;
  category: string;
  duration: string;
  description?: string;
}) {
  return (
    <Card
      className={cn(
        "bg-brand-black-foreground",
        "border border-white/10 overflow-hidden",
        "w-full sm:w-80 md:w-102 pt-0 font-dm-sans",
      )}
    >
      <CardContent className="p-0 text-white">
        <div
          className={cn(
            "h-40 md:h-52 w-full",
            "bg-brand-black text-sm font-medium",
            "relative flex items-center justify-center",
          )}
        >
          <iframe
            src={link}
            title="How to Use Drafts in MeetSession"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="h-full w-full"
          ></iframe>

          {/* floating items*/}
          <p
            className={cn(
              "pointer-events-none",
              "text-xs md:text-base",
              "absolute top-4 left-4",
              "py-1 md:py-2 px-2 md:px-4",
              "bg-brand-green/70 rounded-md",
            )}
          >
            {category}
          </p>
          <div
            className={cn(
              "pointer-events-none",
              "text-xs md:text-base",
              "rounded-lg bg-black/70",
              "absolute top-5 right-4",
              "flex items-center gap-2",
              "px-1.5 md:px-2.5 py-0.5 md:py-1.5",
            )}
          >
            <ClockIcon className="size-4" />
            <span>{duration}</span>
          </div>
          <div
            className={cn(
              "pl-4 py-4",
              "pointer-events-none",
              "text-xs md:text-base",
              "absolute bottom-0 left-0",
              "flex items-center gap-1 md:gap-2",
              "bg-linear-to-b from-transparent to-foreground/90 w-full",
            )}
          >
            <EyeIcon className="size-4" />
            <p>{views}</p>
          </div>
        </div>
      </CardContent>
      <CardHeader className="flex flex-col gap-1 md:gap-4 items-start text-start text-white">
        <CardTitle className="text-sm md:text-base">{name}</CardTitle>
        <CardDescription className="text-xs md:text-sm text-neutral-400">
          {description}
        </CardDescription>
        <Link
          href={link}
          className="flex items-center gap-2 text-xs md:text-sm text-brand-green font-medium"
        >
          <p>Watch Tutorial</p>
          <ChevronRightIcon className="w-4 h-4" />
        </Link>
      </CardHeader>
    </Card>
  );
}

const videos = [
  {
    id: 1,
    link: "https://www.youtube.com/embed/8XOVWs3ghYY",
    title: "How to use Drafts in MeetSession",
    duration: "01:53",
    category: "Draft",
    views: "30",
    description: "",
  },

  {
    id: 2,
    link: "https://www.youtube.com/embed/Dox8LqcK1Uc",
    title: "How To use AI Summarisation Feature in MeetSession",
    duration: "01:04",
    category: "Summary",
    views: "104",
    description: "",
  },

  {
    id: 3,
    link: "https://www.youtube.com/embed/cWZoZCgdH4k",
    title: "How to Import Audio on MeetSession",
    duration: "01:14",
    category: "Recording",
    views: "3",
    description: "",
  
  },

  {
    id: 4,
    link: "https://www.youtube.com/embed/TN-JAMX_GAw",
    title: "How to Enable Biometric on MeetSession",
    duration: "00:32",
    category: "Biometrics",
    views: "89",
    description: "",
  },

  {
    id: 5,
    link: "https://www.youtube.com/embed/PLoZzbd141c",
    title: "How to Export Trancripts in MeetSession",
    duration: "01:37",
    category: "Transcripts",
    views: "199",
    description: "",
  },

  {
    id: 6,
    link: "https://www.youtube.com/embed/ZWf4-Fdeivw",
    title: "Manage your Transcripts on MeetSession",
    duration: "01:25",
    category: "Transcripts",
    views: "248",
    description: "",
  },

];

