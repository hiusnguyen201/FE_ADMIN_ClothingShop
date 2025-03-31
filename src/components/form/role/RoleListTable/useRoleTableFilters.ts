import { useState } from "react";
import { GetListRolePayload } from "@/redux/role/role.type";
import { getPreviousPathnameHistory, matchPreviousHistory } from "@/utils/history";
import { getQueryFromUrl } from "@/utils/object";
import { useLocation } from "react-router-dom";

const initialFilters: GetListRolePayload = {
  page: 1,
  limit: 10,
  keyword: "",
  sortBy: null,
  sortOrder: null,
};

export function useRoleTableFilters() {
  const location = useLocation();

  const getInitialFilters = (): GetListRolePayload => {
    const previousUrl = getPreviousPathnameHistory();
    if (!previousUrl) return initialFilters;
    const query = getQueryFromUrl<Record<string, any>>(previousUrl);
    return matchPreviousHistory(location.pathname) ? (query as GetListRolePayload) : initialFilters;
  };

  const [filters, setFilters] = useState<GetListRolePayload>(getInitialFilters());

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
