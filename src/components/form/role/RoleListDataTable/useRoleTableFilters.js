import { getHistory } from "@/utils/history";
import { useState } from "react";

const initialFilters = {
  page: 1,
  limit: 10,
  keyword: "",
  status: null,
};

export function useRoleTableFilters() {
  const [filters, setFilters] = useState(() => {
    const history = getHistory();
    const lastHistory = history.at(-1);

    if (!lastHistory) return initialFilters;

    const parsedUrl = new URL(lastHistory.url);
    const params = Object.fromEntries(parsedUrl.searchParams.entries());

    return {
      ...params,
      page: +params.page,
      limit: +params.limit,
    };
  });

  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleLimitChange = (limit) => {
    setFilters((prev) => ({ ...prev, limit }));
  };

  const handleStatusChange = (status) => {
    setFilters((prev) => ({ ...prev, status, page: 1 }));
  };

  const handleKeywordChange = (keyword) => {
    setFilters((prev) => ({ ...prev, keyword, page: 1 }));
  };

  return { filters, handlePageChange, handleLimitChange, handleStatusChange, handleKeywordChange };
}
