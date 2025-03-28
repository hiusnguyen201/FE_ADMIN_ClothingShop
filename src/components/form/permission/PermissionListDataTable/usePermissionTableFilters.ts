import { useState } from "react";
import { GetListPermissionPayload } from "@/redux/permission/permission.type";
import { getHistory, HistoryItem } from "@/utils/history";
import { getUrlParams } from "@/utils/object";

const initialFilters: GetListPermissionPayload = {
  page: 1,
  limit: 10,
  keyword: "",
  sortBy: null,
  sortOrder: null,
};

export function usePermissionTableFilters() {
  const [filters, setFilters] = useState<GetListPermissionPayload>(() => {
    const history: HistoryItem[] = getHistory();
    const lastHistory = history[history.length - 1];

    if (!lastHistory) return initialFilters;

    return getUrlParams<GetListPermissionPayload>(lastHistory.url);
  });

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleLimitChange = (limit: number) => {
    setFilters((prev) => ({ ...prev, limit, page: 1 }));
  };

  const handleKeywordChange = (keyword: string) => {
    setFilters((prev) => ({ ...prev, keyword, page: 1 }));
  };

  return { filters, handlePageChange, handleLimitChange, handleKeywordChange };
}
