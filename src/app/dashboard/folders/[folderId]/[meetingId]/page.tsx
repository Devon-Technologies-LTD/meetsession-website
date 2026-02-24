import { BackButton } from "@/components/back-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createApiClient } from "@/lib/api-client";
import { BASE_URL } from "@/lib/constants";
import { TMeetSessionWithTranscript } from "@/lib/types";

const apiClient = createApiClient({
  baseURL: BASE_URL,
});

async function getMeetingWithTranscript(folderId: string, meetingId: string) {
  const res = await apiClient.authenticated<{
    message: string;
    data: TMeetSessionWithTranscript;
  }>(`/${folderId}/meetings/${meetingId}?with_transcript=true`, {
    method: "GET",
  });

  return res;
}

export default async function Page({
  params,
}: {
  params: Promise<{ folderId: string; meetingId: string }>;
}) {
  const { folderId, meetingId } = await params;

  const res = await getMeetingWithTranscript(folderId, meetingId);

  if (!res.ok) {
    return (
      <section className="h-full w-full flex flex-col gap-10 pt-32 pb-7 px-7 md:px-10">
        <BackButton
          href={`/dashboard/folders/${folderId}`}
          className="h-12 w-fit self-end fixed top-10"
        />

        <div className="text-brand-blue-dark font-dm-sans w-full h-fit">
          <p className="font-black text-3xl tracking-tight">Meeting</p>
        </div>

        <p className="text-sm text-red-600">
          Failed to load meeting: {res.error}
        </p>
      </section>
    );
  }

  const meeting = res.data.data;

  return (
    <section className="h-full w-full flex flex-col gap-10 pt-32 pb-7 px-7 md:px-10 relative">
      <BackButton
        href={`/dashboard/folders/${folderId}`}
        className="h-12 w-fit self-end fixed top-10"
      />

      <div className="text-brand-blue-dark font-dm-sans w-full h-fit">
        <p className="font-black text-3xl tracking-tight">{meeting.title}</p>
        <p className="text-sm text-muted-foreground">
          {meeting.attendees}
        </p>
      </div>

      {!Array.isArray(meeting.labelled_transcript) ||
      meeting.labelled_transcript.length === 0 ? (
        <div className="flex items-center justify-center h-40">
          <p className="text-sm text-muted-foreground">
            No labelled transcript available for this meeting.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2">
          {meeting.labelled_transcript.map((item, index) => (
            <div
              key={`${item.start_timestamp}-${index}`}
              className="flex flex-col gap-1 rounded-md border border-neutral-200 px-3 py-2 bg-white"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-brand-blue-dark">
                  {item.label}
                </span>
                <span className="text-[10px] text-neutral-500">
                  {item.start_timestamp} - {item.end_timestamp}
                </span>
              </div>
              <p className="text-sm text-neutral-800 leading-relaxed">
                {item.word}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-20">
        <Button asChild variant="brand-blue" size="pill">
          <Link href={`/dashboard/folders/${folderId}/${meetingId}/ai`}>
            Chat with AI
          </Link>
        </Button>
      </div>
    </section>
  );
}
