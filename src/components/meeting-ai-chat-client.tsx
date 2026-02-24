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
        </strong>
      );
    } else if (token.startsWith("*")) {
      nodes.push(
        <em key={`${keyPrefix}-i-${idx}`}>
          {token.slice(1, -1)}
        </em>
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

function renderMarkdown(content: string, msgId: string): ReactNode {
  const lines = content.split("\n");
  const elements: ReactNode[] = [];
  let listItems: ReactNode[] = [];
  let listKey = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`${msgId}-ul-${listKey++}`} className="list-disc list-inside space-y-0.5 my-1">
          {listItems}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, i) => {
    const key = `${msgId}-line-${i}`;

    // H3
    if (line.startsWith("### ")) {
      flushList();
      elements.push(
        <p key={key} className="font-semibold text-sm mt-2 mb-0.5">
          {renderInlineMarkdown(line.slice(4), key)}
        </p>
      );
    }
    // H2
    else if (line.startsWith("## ")) {
      flushList();
      elements.push(
        <p key={key} className="font-bold text-sm mt-2 mb-0.5">
          {renderInlineMarkdown(line.slice(3), key)}
        </p>
      );
    }
    // H1
    else if (line.startsWith("# ")) {
      flushList();
      elements.push(
        <p key={key} className="font-bold text-base mt-2 mb-1">
          {renderInlineMarkdown(line.slice(2), key)}
        </p>
      );
    }
    // Bullet list (- or *)
    else if (/^[-*]\s/.test(line)) {
      listItems.push(
        <li key={key}>
          {renderInlineMarkdown(line.slice(2), key)}
        </li>
      );
    }
    // Numbered list
    else if (/^\d+\.\s/.test(line)) {
      const text = line.replace(/^\d+\.\s/, "");
      if (listItems.length === 0) {
        // switch to ordered — flush any prior ul first
        flushList();
      }
      listItems.push(
        <li key={key} style={{ listStyleType: "decimal" }}>
          {renderInlineMarkdown(text, key)}
        </li>
      );
    }
    // Empty line
    else if (line.trim() === "") {
      flushList();
    }
    // Normal paragraph line
    else {
      flushList();
      elements.push(
        <p key={key} className="leading-snug">
          {renderInlineMarkdown(line, key)}
        </p>
      );
    }
  });

  flushList();
  return <div className="space-y-0.5">{elements}</div>;
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
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 ${msg.role === "user"
                    ? "bg-brand-blue text-white rounded-br-sm"
                    : "bg-neutral-100 text-neutral-900 rounded-bl-sm"
                    }`}
                >
                  {msg.role === "assistant"
                    ? renderMarkdown(msg.content, msg.id)
                    : msg.content}
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