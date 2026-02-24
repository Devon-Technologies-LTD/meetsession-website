"use client";

import { useCallback } from "react";

type Props = {
  items: string[];
  colors: string[];
};

export function MeetingAIQuestionPicker({ items, colors }: Props) {
  const handleClick = useCallback((question: string) => {
    const input = document.getElementById(
      "ai-chat-input",
    ) as HTMLInputElement | null;
    if (input) {
      input.value = question;
      input.focus();
    }
  }, []);

  return (
    <div className="flex flex-col gap-3 text-sm">
      {items.map((question, index) => (
        <button
          key={question}
          type="button"
          onClick={() => handleClick(question)}
          className="flex gap-3 items-start text-left w-full rounded-2xl px-2 py-1 hover:bg-neutral-50"
        >
          <span
            className={`w-1.5 h-6 rounded-full mt-1 ${
              colors[index % colors.length]
            }`}
          />
          <span>{question}</span>
        </button>
      ))}
    </div>
  );
}

