import { pingService } from "@/redux/common.service";
import { useEffect } from "react";

export function useKeepAlive() {
  useEffect(() => {
    const interval = setInterval(() => {
      pingService();
    }, 5 * 60 * 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);
}
