"use client";

export function AudioPlayer({ audioUrl }: { audioUrl: string }) {
  return (
    <audio
      id="meeting-audio"
      controls
      className="w-full"
      src={audioUrl}
    >
      Your browser does not support the audio element.
    </audio>
  );
}
