import { useState } from "react";
import { GetListRolePayload } from "@/redux/role/role.type";
import { getHistory, HistoryItem } from "@/utils/history";
import { getUrlParams } from "@/utils/object";

const initialFilters: GetListRolePayload = {
  page: 1,
  limit: 10,
  keyword: "",
  sortBy: null,
  sortOrder: null,
};

export function useRoleTableFilters() {
  const [filters, setFilters] = useState<GetListRolePayload>(initialFilters);

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
