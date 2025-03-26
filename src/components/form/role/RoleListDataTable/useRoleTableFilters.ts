import { useState } from "react";
import { GetListRoleParams } from "@/redux/role/role.type";
import { ROLE_STATUS } from "@/types/role";
import { getHistory, HistoryItem } from "@/utils/history";
import { getUrlParams } from "@/utils/object";

const initialFilters: GetListRoleParams = {
  page: 1,
  limit: 10,
  keyword: "",
  status: null,
  sortBy: null,
  sortOrder: null,
};

export function useRoleTableFilters() {
  const [filters, setFilters] = useState<GetListRoleParams>(() => {
    const history: HistoryItem[] = getHistory();
    const lastHistory = history[history.length - 1];

    if (!lastHistory) return initialFilters;

    return getUrlParams<GetListRoleParams>(lastHistory.url);
  });

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleLimitChange = (limit: number) => {
    setFilters((prev) => ({ ...prev, limit }));
  };

  const handleStatusChange = (status: ROLE_STATUS | null) => {
    setFilters((prev) => ({ ...prev, status, page: 1 }));
  };

  const handleKeywordChange = (keyword: string) => {
    setFilters((prev) => ({ ...prev, keyword, page: 1 }));
  };

  return { filters, handlePageChange, handleLimitChange, handleStatusChange, handleKeywordChange };
}
