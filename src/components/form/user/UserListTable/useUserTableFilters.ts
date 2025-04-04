import { useState } from "react";
import { GetListUserPayload } from "@/redux/user/user.type";
import { getPreviousPathnameHistory, matchPreviousHistory } from "@/utils/history";
import { getQueryFromUrl } from "@/utils/object";
import { useLocation } from "react-router-dom";
import { LIMIT_PER_PAGE } from "@/components/data-table";

const initialFilters: GetListUserPayload = {
  page: 1,
  limit: LIMIT_PER_PAGE[0],
  keyword: "",
  sortBy: null,
  sortOrder: null,
};

export function useUserTableFilters() {
  const location = useLocation();

  const getInitialFilters = (): GetListUserPayload => {
    const previousUrl = getPreviousPathnameHistory();
    if (!previousUrl) return initialFilters;
    const query = getQueryFromUrl<Record<string, any>>(previousUrl);
    return matchPreviousHistory(location.pathname) ? (query as GetListUserPayload) : initialFilters;
  };

  const [filters, setFilters] = useState<GetListUserPayload>(getInitialFilters());

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
