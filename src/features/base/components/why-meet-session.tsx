import { cn } from "@/lib/utils";
import { TWhyMeetSession } from "../lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MsExamIcon } from "@/components/icons/why-ms-exam-icon";
import { MsFolderIcon } from "@/components/icons/why-ms-folder-icon";
import { MsAccessIcon } from "@/components/icons/why-ms-access-icon";
import { MsSecureIcon } from "@/components/icons/why-ms-secure-icon";
import { MsTranscriptIcon } from "@/components/icons/why-ms-transcript-icon";
import { MicVocalIcon } from "lucide-react";
import { MsSpeakersIcon } from "@/components/icons/why-ms-speakers-icon";

export function WhyMeetSession() {
  return (
    <div
      id="features"
      className={cn(
        "px-7 py-8 md:py-24 lg:px-8",
        "bg-brand-blue-extralight",
        "h-full md:min-h-dvh w-full",
        "relative",
      )}
    >
      <div
        className={cn(
          "bg-[size:38px_38px] opacity-25",
          "absolute bottom-0 left-0 right-0 top-0 z-0",
          "[mask-image:radial-gradient(ellipse_80%_40%_at_50%_50%,#000_20%,transparent_110%)]",
          "bg-[linear-gradient(to_right,var(--brand-green-color-default)_1px,transparent_1px),linear-gradient(to_bottom,var(--brand-green-color-default)_1px,transparent_1px)]",
        )}
      ></div>

      <div
        className={cn(
          "mx-auto max-w-full md:max-w-7xl",
          "flex flex-col gap-8 md:gap-16 items-center",
        )}
      >
        <p className="font-dm-sans font-black text-2xl md:text-3xl z-20">
          Why MeetSession?
        </p>

        <div className="flex flex-wrap gap-4 md:gap-6 items-center justify-center z-20">
          {reasons.map((reason) => (
            <WhyMeetSessionCard key={reason.id} reason={reason} />
          ))}
        </div>
      </div>
    </div>
  );
}

type WhyMeetSessionCardProps = {
  reason: TWhyMeetSession;
};

function WhyMeetSessionCard({ reason }: WhyMeetSessionCardProps) {
  return (
    <Card
      className={cn(
        "border-none shadow-2xl rounded-2xl md:rounded-4xl",
        "h-fit md:h-64 w-full md:w-96 md:px-1.5 py-8",
      )}
    >
      <CardContent>
        <div
          className={cn(
            "h-12 md:h-14 w-16 md:w-18 rounded-md md:rounded-lg bg-brand-green text-white",
            "flex items-center justify-center",
          )}
        >
          {reason.icon}
        </div>
      </CardContent>

      <CardHeader>
        <CardTitle>{reason.title}</CardTitle>
        <CardDescription className="text-sm md:text-base text-neutral-800">
          {reason.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

const reasons: TWhyMeetSession[] = [
  {
    id: 1,
    title: "Accurate Legal Transcription",
    description:
      "Capture every word with precision, even in noisy court rooms.",
    icon: <MsTranscriptIcon className="h-6 md:h-8 w-6 md:w-8" />,
  },
  {
    id: 2,
    title: "Organized by Folders",
    description: "Easily sort and retrieve your recordings.",
    icon: <MsFolderIcon className="h-6 md:h-8 w-6 md:w-8" />,
  },
  {
    id: 3,
    title: "Coss-Examination Mode",
    description: "Tailored settings for courtroom questioning.",
    icon: <MsExamIcon className="h-6 md:h-8 w-6 md:w-8" />,
  },
  {
    id: 4,
    title: "Secure & Private",
    description: "Your data stays encrypted and confidential.",
    icon: <MsSecureIcon className="h-6 md:h-8 w-6 md:w-8" />,
  },
  {
    id: 5,
    title: "On-The-Go Access",
    description: "Work from anywhere, without missing a beat.",
    icon: <MsAccessIcon className="h-6 md:h-8 w-6 md:w-8" />,
  },
  {
    id: 6,
    title: "Microphone compatibility",
    description: "MeetSession is compatible with any pin microphone.",
    icon: <MicVocalIcon className="h-6 md:h-8 w-6 md:w-8" />,
  },
  {
    id: 7,
    title: "Speaker differentiation",
    description:
      "Automatically identify and separate voices, ensuring transcripts are clear and attributed to the right speaker.",
    icon: <MsSpeakersIcon className="h-6 md:h-8 w-6 md:w-8" />,
  },
];
