import { pingService } from "@/redux/common.service";
import { useEffect } from "react";

export function useKeepAlive() {
  const ping = async () => {
    await pingService();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      ping();
    }, 5 * 60 * 5000); // 1000 = 1s

    return () => {
      clearInterval(interval);
    };
  }, []);
}
