"use client";

import { useState, useEffect, useCallback } from "react";

type UseCountdownReturn = {
  timeLeft: number;
  isRunning: boolean;
  start: (seconds?: number) => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  formattedTime: string;
};

const DEFAULT_COUNTDOWN_MINUTES = 5; // in minutes
const DEFAULT_COUNTDOWN_SECONDS = DEFAULT_COUNTDOWN_MINUTES * 60; // in seconds

export const useCountdown = (initialSeconds?: number): UseCountdownReturn => {
  const COUNTDOWN_DURATION = initialSeconds ?? DEFAULT_COUNTDOWN_SECONDS;

  const [timeLeft, setTimeLeft] = useState<number>(COUNTDOWN_DURATION);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const start = useCallback(
    (seconds?: number) => {
      setTimeLeft(seconds ?? COUNTDOWN_DURATION);
      setIsRunning(true);
    },
    [COUNTDOWN_DURATION],
  );

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resume = useCallback(() => {
    if (timeLeft > 0) {
      setIsRunning(true);
    }
  }, [timeLeft]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(COUNTDOWN_DURATION);
  }, [initialSeconds, COUNTDOWN_DURATION]);

  // Format time as MM:SS
  const formattedTime = useCallback(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, [timeLeft])();

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    resume,
    reset,
    formattedTime,
  };
};
