import { BackAction } from "@/components/back-button";
import { Card, CardContent } from "@/components/ui/card";
import { SharedMeetingResponse } from "@/lib/types/shared-meeting";
import { BASE_URL } from "@/lib/constants";
import { AudioPlayer } from "./components/audio-player";
import { ActionButtons } from "./components/action-buttons";
import { DownloadAppButtons } from "./components/download-app-buttons";

async function getSharedMeeting(meetId: string): Promise<SharedMeetingResponse> {
  const apiUrl = `${BASE_URL}/share-hub/view-shared/${meetId}`;

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store", // Disable caching to get fresh data
  });

  console.log("API URL:", apiUrl);
  console.log("Response Status:", response.status);

  if (!response.ok) {
    throw new Error(`Failed to fetch meeting: ${response.statusText}`);
  }

  const data: SharedMeetingResponse = await response.json();

  if (!data.status) {
    throw new Error(data.message || "Failed to load meeting");
  }

  return data;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}


function formatTime(timestamp: string) {
  const [hours, minutes, seconds] = timestamp.split(":");
  const secs = parseFloat(seconds);
  return `${hours}:${minutes}:${secs.toFixed(0).padStart(2, "0")}`;
}

export default async function SharedMeetingPage({
  searchParams,
}: {
  searchParams: Promise<{ meet_id?: string }>;
}) {
  const params = await searchParams;
  const meetId = params.meet_id;

  if (!meetId) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <BackAction className="mb-8 cursor-pointer" />
        <Card className="border-destructive">
          <CardContent className="py-12 text-center">
            <p className="text-destructive text-lg font-semibold">
              Meeting ID is required
            </p>
            <p className="text-muted-foreground mt-2">
              Please check the link and try again.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  let meetingData: SharedMeetingResponse["data"];

  try {
    const response = await getSharedMeeting(meetId);
    meetingData = response.data;
  } catch (error) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <BackAction className="mb-8 cursor-pointer" />
        <Card className="border-destructive">
          <CardContent className="py-12 text-center">
            <p className="text-destructive text-lg font-semibold">
              {error instanceof Error ? error.message : "Meeting not found"}
            </p>
            <p className="text-muted-foreground mt-2">
              Please check the link and try again.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <BackAction className="mb-8 cursor-pointer" name={meetingData.title} />
      <div className="relative mb-8 overflow-hidden rounded-xl bg-linear-to-b from-[#146C94]  to-[#22AD78] p-8 text-white shadow-lg">
        <div className="row flex justify-between items-center">
          <div className="relative z-10">
            {/* <h1 className="text-3xl font-bold mb-4">{meetingData.title}</h1> */}
            <h1 className="text-2xl font-bold mb-2">Get the Full Experience</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center">
                <span className="opacity-90">
                  Download the Meetsession App to Play Audio, view Summaries, Download Audio and Access all Premium Features
                  {/* Board Meeting - {formatDate(meetingData.meeting_date)} */}
                </span>
              </div>
            </div>
          </div>
          <DownloadAppButtons />
        </div>

      </div>

      {/* Action Buttons */}
      <ActionButtons meetingData={meetingData} />
      {/* <AudioPlayer audioUrl={meetingData.audio_link} /> */}

      <Card>
        <CardContent className="py-6">
          <h2 className="text-2xl font-bold mb-6">{meetingData.title}</h2>
          <div className="space-y-6">
            {meetingData.transcript.map((item, index) => (
              <div key={index} className="space-y-2">
                {item.label && (
                  <div className="font-semibold text-base">{item.label}:</div>
                )}
                <div className="flex gap-3">
                  <span className="text-xs text-muted-foreground shrink-0 mt-1">
                    {formatTime(item.start_timestamp)}
                  </span>
                  <p className="text-sm leading-relaxed text-gray-700">
                    {item.word}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
