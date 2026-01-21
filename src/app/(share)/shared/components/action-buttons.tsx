"use client";

import { Button } from "@/components/ui/button";
import { Download, Share2, PlayCircle, FileText } from "lucide-react";
import { SharedMeetingData } from "@/lib/types/shared-meeting";
import { toast } from "sonner";

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
    // Deep link URL for the app
    const deepLinkUrl = `meetsession://shared?meet_id=${meetId}`;

    // App Store URLs
    const playStoreUrl = "https://play.google.com/store/apps/details?id=com.meet_session.io";
    const appStoreUrl = "https://apps.apple.com/us/app/meetsession/id6751320453";

    // Detect if user is on iOS or Android
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);

    // Try to open the app
    let appOpened = false;
    const timeout = setTimeout(() => {
      if (!appOpened) {
        // App is not installed, redirect to store
        if (isIOS) {
          window.location.href = appStoreUrl;
        } else if (isAndroid) {
          window.location.href = playStoreUrl;
        }
      }
    }, 2500); // Wait 2.5 seconds to see if app opens

    // Handle visibility change - if app opens, page becomes hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        appOpened = true;
        clearTimeout(timeout);
      }
    };

    // Handle blur - if app opens, window loses focus
    const handleBlur = () => {
      appOpened = true;
      clearTimeout(timeout);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    // Attempt to open the app
    if (isIOS || isAndroid) {
      window.location.href = deepLinkUrl;
    } else {
      // For desktop, show a message or fallback behavior
      toast.success("Please download the app to play the recording");
    }

    // Cleanup after timeout
    setTimeout(() => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
    }, 3000);
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
