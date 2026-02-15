import { BackButton } from "@/components/back-button";
import { Button } from "@/components/ui/button";
import { MeetingAIQuestionPicker } from "@/components/ai-question-picker";
import { MeetingAIChatClient } from "@/components/meeting-ai-chat-client";
import { retrieveTierAction } from "@/features/dashboard/server/actions";
import { createApiClient } from "@/lib/api-client";
import { BASE_URL } from "@/lib/constants";
import Link from "next/link";
import { Suspense } from "react";
import {
  getMeetingChatHistoryAction,
  type TMeetingChatData,
} from "./actions";

type TGenerateMeetingResponse = {
  message: string;
  data: {
    questions: string;
    list_questions: string[];
  };
};

const apiClient = createApiClient({
  baseURL: BASE_URL,
});

function QuestionsSkeleton() {
  const items = [0, 1, 2, 3];
  return (
    <div className="flex flex-col gap-3 text-sm animate-pulse">
      {items.map((item) => (
        <div key={item} className="flex gap-3 items-start">
          <span className="w-1.5 h-6 rounded-full bg-neutral-200 mt-1" />
          <div className="flex-1 h-4 rounded-full bg-neutral-200" />
        </div>
      ))}
    </div>
  );
}

async function SuggestedQuestions({ meetingId }: { meetingId: string }) {
  const res = await apiClient.authenticated<TGenerateMeetingResponse>(
    `/generate-meeting/${meetingId}`,
    {
      method: "GET",
    },
  );

  if (!res.ok || !res.data?.data?.list_questions?.length) {
    return null;
  }

  const items = res.data.data.list_questions;
  const colors = ["bg-yellow-400", "bg-sky-400", "bg-blue-500", "bg-green-500"];

  return <MeetingAIQuestionPicker items={items} colors={colors} />;
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ folderId: string; meetingId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { folderId, meetingId } = await params;
  const search = await searchParams;

  const tier = await retrieveTierAction();

  if (!tier.success) {
    return (
      <section className="h-full w-full flex flex-col gap-10 pt-32 pb-7 px-7 md:px-10">
        <BackButton
          href={`/dashboard/folders/${folderId}/${meetingId}`}
          className="h-12 w-fit self-end fixed top-10"
        />

        <div className="w-full max-w-md mx-auto mt-10">
          <div className="rounded-3xl bg-gradient-to-b from-brand-blue to-brand-green text-white px-6 py-8 flex flex-col items-center gap-4">
            <p className="text-lg font-black">Opps!! Upgrade to Enjoy</p>
            <p className="text-sm text-center">
              Ask questions, generate summaries, and extract key decisions
              directly from your meetings using Meet AI.
            </p>
            <p className="text-xs text-center">
              This feature is available on Professional, Team and Enterprise
              plans.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Button asChild variant="brand-blue" size="lg">
              <Link href="/dashboard/accounts/plans">
                Upgrade to Unlock AI Chat
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/dashboard/accounts/plans">View Plans</Link>
            </Button>
          </div>

          <div className="mt-6">
            <Button
              variant="outline"
              size="lg"
              className="w-full justify-center"
              disabled
            >
              Upgrade to ask your questions
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const chatData: TMeetingChatData | null =
    (await getMeetingChatHistoryAction(meetingId)) ?? null;

  return (
    <section className="h-full w-full flex flex-col gap-10 pt-32 pb-7 px-7 md:px-10">
      <BackButton
        href={`/dashboard/folders/${folderId}/${meetingId}`}
        className="h-12 w-fit self-end fixed top-10"
      />

      <div className="w-full max-w-2xl mx-auto mt-10 flex flex-col gap-6">
        <div className="rounded-3xl bg-gradient-to-b from-brand-blue to-brand-green text-white px-6 py-8 flex flex-col gap-3">
          <p className="text-lg font-black">Chat With Your Transcript</p>
          <p className="text-sm">
            To supercharge your workflow, MeetSession introduces Chat with Meet
            AI — an intelligent assistant that helps you understand meetings
            faster, extract key decisions, generate summaries, and turn
            conversations into clear, actionable outcomes.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-lg font-black text-center">
            What Can I Help With ?
          </p>

          <Suspense fallback={<QuestionsSkeleton />}>
            <SuggestedQuestions meetingId={meetingId} />
          </Suspense>
        </div>

        <MeetingAIChatClient
          meetingId={meetingId}
          initialChatData={chatData}
        />
      </div>
    </section>
  );
}
