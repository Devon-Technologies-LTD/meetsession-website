"use client";

import { useState, useTransition, useRef, FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  chatWithMeetingAction,
  type TMeetingChatData,
  type TChatSessionItem,
} from "@/app/dashboard/folders/[folderId]/[meetingId]/ai/actions";

type Props = {
  meetingId: string;
  initialChatData: TMeetingChatData | null;
};

function renderInlineMarkdown(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let idx = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${idx}`}>
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith("*")) {
      nodes.push(
        <em key={`${keyPrefix}-i-${idx}`}>
          {token.slice(1, -1)}
        </em>,
      );
    }

    lastIndex = match.index + token.length;
    idx += 1;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function renderMarkdown(content: string): ReactNode {
  const lines = content.split("\n");
  const elements: ReactNode[] = [];
  let listType: "ul" | "ol" | null = null;
  let listItems: string[] = [];
  let listIndex = 0;

  function flushList() {
    if (!listType || listItems.length === 0) return;
    const items = listItems.map((item, index) => (
      <li key={`li-${listIndex}-${index}`}>{item}</li>
    ));
    if (listType === "ul") {
      elements.push(
        <ul key={`ul-${listIndex}`} className="list-disc ml-4 space-y-1">
          {items}
        </ul>,
      );
    } else {
      elements.push(
        <ol key={`ol-${listIndex}`} className="list-decimal ml-4 space-y-1">
          {items}
        </ol>,
      );
    }
    listType = null;
    listItems = [];
    listIndex += 1;
  }

  lines.forEach((raw, index) => {
    const line = raw.trim();
    if (line === "") {
      flushList();
      return;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      flushList();
      const headingContent = renderInlineMarkdown(text, `h-${index}`);
      const HeadingTag = level <= 3 ? ("h3" as const) : ("p" as const);
      elements.push(
        <HeadingTag
          key={`h-${index}`}
          className="font-semibold text-sm mb-1"
        >
          {headingContent}
        </HeadingTag>,
      );
      return;
    }

    const orderedMatch = line.match(/^(\d+)\.\s+(.*)$/);
    if (orderedMatch) {
      const item = orderedMatch[2];
      if (listType !== "ol") {
        flushList();
        listType = "ol";
      }
      listItems.push(item);
      return;
    }

    const unorderedMatch = line.match(/^[-*]\s+(.*)$/);
    if (unorderedMatch) {
      const item = unorderedMatch[1];
      if (listType !== "ul") {
        flushList();
        listType = "ul";
      }
      listItems.push(item);
      return;
    }

    flushList();
    elements.push(
      <p key={`p-${index}`} className="whitespace-pre-wrap">
        {renderInlineMarkdown(line, `p-${index}`)}
      </p>,
    );
  });

  flushList();

  return <>{elements}</>;
}

export function MeetingAIChatClient({ meetingId, initialChatData }: Props) {
  const [chatData, setChatData] = useState<TMeetingChatData | null>(
    initialChatData,
  );
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const value = inputRef.current?.value ?? "";
    const message = value.trim();
    if (!message) return;

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    setChatData((prev) => {
      const base: TMeetingChatData =
        prev ?? {
          meet_id: meetingId,
          user_id: "",
          organization_id: "",
          language: "en_uk",
          transcript: "",
          summary: "",
          sources: null,
          chat_session: [],
        };

      const optimisticMessage: TChatSessionItem = {
        id: `local-${Date.now()}`,
        meet_id: base.meet_id,
        user_id: base.user_id,
        role: "user",
        content: message,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      return {
        ...base,
        chat_session: [...(base.chat_session ?? []), optimisticMessage],
      };
    });

    startTransition(async () => {
      const updated = await chatWithMeetingAction(meetingId, message);
      if (updated) {
        setChatData(updated);
      }
    });
  }

  return (
    <div className="flex flex-col gap-4 border border-neutral-200 rounded-2xl p-4 h-[60vh]">
      <div className="flex-1 overflow-y-auto">
        {!chatData ||
        !chatData.chat_session ||
        chatData.chat_session.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-xs text-neutral-500 text-center">
              Ask a question about this meeting to start chatting with AI.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 text-sm">
            {chatData.chat_session.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                    msg.role === "user"
                      ? "bg-brand-blue text-white rounded-br-sm"
                      : "bg-neutral-100 text-neutral-900 rounded-bl-sm"
                  }`}
                >
                  {renderMarkdown(msg.content)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 border border-neutral-200 rounded-full px-4 py-2"
      >
        <input
          id="ai-chat-input"
          ref={inputRef}
          type="text"
          placeholder="Type or ask something"
          className="flex-1 bg-transparent outline-none text-sm"
          disabled={isPending}
        />
        <Button
          type="submit"
          variant="brand-blue"
          size="icon"
          className="rounded-full shrink-0"
          disabled={isPending}
        >
          {isPending ? (
            <span className="text-[10px] font-medium animate-pulse px-1">
              ...
            </span>
          ) : (
            <span className="-translate-y-px text-base">➤</span>
          )}
        </Button>
      </form>
    </div>
  );
}
