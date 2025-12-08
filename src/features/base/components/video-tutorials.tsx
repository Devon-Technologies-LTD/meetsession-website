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
        "bg-brand-black-dark text-white text-center",
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
  return (
    <div
      className={cn(
        "flex flex-wrap gap-2.5 md:gap-5 items-center justify-center",
      )}
    >
      {Array.from({ length: 6 }).map((_, idx) => (
        <VideoTutorialCard key={idx} />
      ))}
    </div>
  );
}

function VideoTutorialCard() {
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
            "h-40 md:h-60 w-full",
            "bg-brand-black text-sm font-medium",
            "relative flex items-center justify-center",
          )}
        >
          <p className="text-neutral-400">Image go here</p>

          {/* floating items*/}
          <p
            className={cn(
              "text-xs md:text-base",
              "absolute top-4 left-4",
              "py-1 md:py-2 px-2 md:px-4",
              "bg-brand-green/70 rounded-md",
            )}
          >
            Getting started
          </p>
          <div
            className={cn(
              "text-xs md:text-base",
              "rounded-lg bg-black/70",
              "absolute top-5 right-4",
              "flex items-center gap-2",
              "px-1.5 md:px-2.5 py-0.5 md:py-1.5",
            )}
          >
            <ClockIcon className="size-4" />
            <span>6:20</span>
          </div>
          <div
            className={cn(
              "pl-4 py-4",
              "text-xs md:text-base",
              "absolute bottom-0 left-0",
              "flex items-center gap-1 md:gap-2",
              "bg-linear-to-b from-transparent to-foreground/90 w-full",
            )}
          >
            <EyeIcon className="size-4" />
            <p>45K views</p>
          </div>
        </div>
      </CardContent>
      <CardHeader className="flex flex-col gap-1 md:gap-4 items-start text-start text-white">
        <CardTitle className="text-sm md:text-base">
          Title goes here please
        </CardTitle>
        <CardDescription className="text-xs md:text-sm text-neutral-400">
          Ut, quisque nibh quisque, id consectetur ante efficitur etiam turpis.
        </CardDescription>
        <Link
          href="#"
          className="flex items-center gap-2 text-xs md:text-sm text-brand-green font-medium"
        >
          <p>Watch Tutorial</p>
          <ChevronRightIcon className="w-4 h-4" />
        </Link>
      </CardHeader>
    </Card>
  );
}
