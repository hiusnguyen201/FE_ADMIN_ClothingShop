import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OtpState {
  endTime: number | null;
  setEndTime: (seconds: number) => void;
  resetTimer: () => void;
  getRemainingSeconds: () => number;
}

export const useTimer = create<OtpState>()(
  persist(
    (set, get) => ({
      endTime: null,

      setEndTime: (seconds: number) => {
        const newEndTime = Date.now() + seconds * 1000;
        set({ endTime: newEndTime });
      },

      resetTimer: () => {
        set({ endTime: null });
      },

      getRemainingSeconds: () => {
        const { endTime } = get();

        if (!endTime) return 0;

        const now = Date.now();
        const remainingMs = endTime - now;
        return Math.max(0, Math.floor(remainingMs / 1000));
      },
    }),
    {
      name: "timer-storage",
    }
  )
);
