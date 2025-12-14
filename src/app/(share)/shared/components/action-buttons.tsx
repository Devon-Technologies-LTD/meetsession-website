"use client";

import { Button } from "@/components/ui/button";
import { Download, Share2, PlayCircle, FileText } from "lucide-react";
import { SharedMeetingData } from "@/lib/types/shared-meeting";
import { toast } from "sonner";

interface ActionButtonsProps {
  meetingData: SharedMeetingData;
}

function formatTime(timestamp: string) {
  const [hours, minutes, seconds] = timestamp.split(":");
  const secs = parseFloat(seconds);
  return `${hours}:${minutes}:${secs.toFixed(0).padStart(2, "0")}`;
}

export function ActionButtons({ meetingData }: ActionButtonsProps) {
  const handlePlayRecording = () => {
    const audio = document.getElementById("meeting-audio") as HTMLAudioElement;
    if (audio) {
      // Scroll to the audio player
      audio.scrollIntoView({ behavior: "smooth", block: "center" });

      // Wait a moment for scroll, then play
      setTimeout(() => {
        audio.play();
      }, 500);
    }
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
        onClick={handleDownloadAudio}
      >
        <Download className="h-5 w-5" />
        Download Audio
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="flex items-center gap-2"
        onClick={handleViewSummary}
      >
        <FileText className="h-5 w-5" />
        View Summary
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="flex items-center gap-2"
        onClick={handleShareTranscript}
      >
        <Share2 className="h-5 w-5" />
        Share Transcript
      </Button>
    </div>
  );
}
