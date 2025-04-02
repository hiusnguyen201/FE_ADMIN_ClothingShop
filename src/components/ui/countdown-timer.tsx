"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTimer } from "@/hooks/use-timer";

interface CountdownTimerProps {
  initialSeconds?: number;
  onClickAgain?: () => Promise<void>;
  className?: string;
  disabled?: boolean;
}

export function CountdownTimer({
  initialSeconds = 60,
  disabled = false,
  onClickAgain,
  className,
}: CountdownTimerProps) {
  const { resetTimer, setEndTime, getRemainingSeconds } = useTimer();
  const [remainingTime, setRemainingTime] = useState(getRemainingSeconds());

  // Memoized format time function
  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  }, []);

  // Initialize timer
  useEffect(() => {
    const timerState = useTimer.getState();
    if (!timerState.endTime) {
      setEndTime(initialSeconds);
      setRemainingTime(initialSeconds);
    }

    const interval = setInterval(() => {
      setRemainingTime(getRemainingSeconds());
    }, 1000);

    return () => clearInterval(interval);
  }, [initialSeconds, getRemainingSeconds, setEndTime]);

  const handleResend = useCallback(async () => {
    if (remainingTime > 0) return;
    if (disabled) return;

    await onClickAgain?.();
    resetTimer();
    setEndTime(initialSeconds);
    setRemainingTime(initialSeconds);
  }, [initialSeconds, onClickAgain, remainingTime, resetTimer, setEndTime]);

  const isDisabled = remainingTime > 0;

  return (
    <div className={cn("flex items-center gap-2 mt-2", className)}>
      <div className="text-sm">
        {isDisabled ? (
          <span>
            Resend code in <span className="font-medium">{formatTime(remainingTime)}</span>
          </span>
        ) : (
          <span>Didn't receive the code?</span>
        )}
      </div>
      <Button
        type="button"
        variant="link"
        size="sm"
        className="p-0 h-auto"
        onClick={handleResend}
        disabled={isDisabled || disabled}
      >
        Resend
      </Button>
    </div>
  );
}
