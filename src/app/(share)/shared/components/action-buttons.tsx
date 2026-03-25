"use client";

import { Button } from "@/components/ui/button";
import { Download, Share2, PlayCircle, FileText } from "lucide-react";
import { SharedMeetingData } from "@/lib/types/shared-meeting";
import { toast } from "sonner";
import { openMeetSessionApp } from "./deep-link-handler";

interface ActionButtonsProps {
  meetingData: SharedMeetingData;
  meetId: string;
}

function formatTime(timestamp: string) {
  const [hours, minutes, seconds] = timestamp.split(":");
  const secs = parseFloat(seconds);
  return `${hours}:${minutes}:${secs.toFixed(0).padStart(2, "0")}`;
}

export function ActionButtons({ meetingData, meetId }: ActionButtonsProps) {
  const handlePlayRecording = () => {
    const deepLinkUrl = `meetsession://shared?meet_id=${meetId}`;
    openMeetSessionApp({
      deepLinkUrl,
      onDesktop: () => {
        toast.success("Please download the app to play the recording");
      },
    });
  };

  const handleDownloadAudio = () => {
    if (meetingData.audio_link) {
      window.open(meetingData.audio_link, "_blank");
    }
  };

  const handleViewSummary = () => {
    const transcriptText = meetingData.transcript
      .map((item) => `[${formatTime(item.start_timestamp)}] ${item.word}`)
      .join("\n\n");
    const blob = new Blob([transcriptText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${meetingData.title}-summary.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShareTranscript = () => {
    navigator.clipboard.writeText(meetingData.shared_link);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="mb-6 flex flex-wrap gap-3">
      <Button
        variant="outline"
        size="lg"
        className="flex items-center gap-2"
        onClick={handlePlayRecording}
      >
        <PlayCircle className="h-5 w-5" />
        Play Recording
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="flex items-center gap-2"
        // onClick={handleDownloadAudio}
        onClick={handlePlayRecording}

      >
        <Download className="h-5 w-5" />
        Download Audio
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="flex items-center gap-2"
        onClick={handlePlayRecording}

      >
        <FileText className="h-5 w-5" />
        View Summary
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="flex items-center gap-2"
        onClick={handlePlayRecording}
      >
        <Share2 className="h-5 w-5" />
        Share Transcript
      </Button>
    </div>
  );
}
