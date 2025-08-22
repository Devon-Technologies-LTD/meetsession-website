import { cn } from "@/lib/utils";
import { TWhyMeetSession } from "../lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MsExamIcon } from "@/components/icons/why-ms-exam-icon";
import { MsFolderIcon } from "@/components/icons/why-ms-folder-icon";
import { MsAccessIcon } from "@/components/icons/why-ms-access-icon";
import { MsSecureIcon } from "@/components/icons/why-ms-secure-icon";
import { MsTranscriptIcon } from "@/components/icons/why-ms-transcript-icon";
import { MicVocalIcon } from "lucide-react";

export function WhyMeetSession() {
  return (
    <div
      id="features"
      className={cn(
        "bg-brand-blue-extralight",
        "px-4 py-8 md:py-24 sm:px-6 lg:px-8",
      )}
    >
      <div className={cn(
        "mx-auto max-w-7xl",
        "flex flex-col gap-16 items-center",
      )}>
        <p className="font-dm-sans font-black text-3xl">Why Meet Session?</p>

        <div className="flex flex-wrap gap-6 items-center justify-center">
          {reasons.map(reason => (
            <WhyMeetSessionCard
              key={reason.id}
              reason={reason}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

type WhyMeetSessionCardProps = {
  reason: TWhyMeetSession;
}
function WhyMeetSessionCard({ reason }: WhyMeetSessionCardProps) {
  return (
    <Card
      className={cn(
        "border-none shadow-none rounded-4xl",
        "h-72 w-96 px-1.5 py-8",
      )}
    >
      <CardContent>
        <div
          className={cn(
            "h-16 w-18 rounded-lg bg-brand-green text-white",
            "flex items-center justify-center",
          )}
        >
          {reason.icon}
        </div>
      </CardContent>

      <CardHeader>
        <CardTitle>{reason.title}</CardTitle>
        <CardDescription>{reason.description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

const reasons: TWhyMeetSession[] = [
  { id: 1, title: "Accurate Legal Transcription", description: "Capture every word with precision, even in noisy court rooms.", icon: <MsTranscriptIcon className="h-8 w-8" />, },
  { id: 2, title: "Organized by Folders", description: "Easily sort and retrieve your recordings.", icon: <MsFolderIcon className="h-8 w-8" />, },
  { id: 3, title: "Coss-Examination Mode", description: "Tailored settings for courtroom questioning.", icon: <MsExamIcon className="h-8 w-8" />, },
  { id: 4, title: "Secure & Private", description: "Your data stays encrypted and confidential.", icon: <MsSecureIcon className="h-8 w-8" />, },
  { id: 5, title: "On-The-Go Access", description: "Work from anywhere, without missing a beat.", icon: <MsAccessIcon className="h-8 w-8" />, },
  { id: 6, title: "Microphone compatibility", description: "MeetSession is compatible with any pin microphone.", icon: <MicVocalIcon className="h-8 w-8" />, },
];
