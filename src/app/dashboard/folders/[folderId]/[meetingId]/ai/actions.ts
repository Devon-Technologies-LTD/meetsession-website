"use server";

import { createApiClient } from "@/lib/api-client";
import { BASE_URL } from "@/lib/constants";

const apiClient = createApiClient({
  baseURL: BASE_URL,
});

export type TChatSessionItem = {
  id: string;
  meet_id: string;
  user_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
  updated_at: string;
};

export type TMeetingChatData = {
  meet_id: string;
  user_id: string;
  organization_id: string;
  language: string;
  transcript: string;
  summary: string;
  sources: unknown;
  chat_session: TChatSessionItem[];
};

type TMeetingChatResponse = {
  message: string;
  data: TMeetingChatData;
};

export async function getMeetingChatHistoryAction(meetingId: string) {
  const res = await apiClient.authenticated<TMeetingChatResponse>(
    `/meeting/${meetingId}/chat-history`,
    {
      method: "POST",
      data: {
        meet_id: meetingId,
      },
    },
  );

  if (!res.ok) {
    return null;
  }

  return res.data.data;
}

export async function chatWithMeetingAction(meetingId: string, message: string) {
  if (!message.trim()) {
    return null;
  }

  const res = await apiClient.authenticated<TMeetingChatResponse>(
    `/meeting/${meetingId}/chat`,
    {
      method: "POST",
      data: {
        meet_id: meetingId,
        message,
      },
    },
  );

  if (!res.ok) {
    return null;
  }

  return res.data.data;
}

