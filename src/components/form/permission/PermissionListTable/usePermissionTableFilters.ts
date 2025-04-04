import { useState } from "react";
import { GetListPermissionPayload } from "@/redux/permission/permission.type";
import { getPreviousPathnameHistory, matchPreviousHistory } from "@/utils/history";
import { getQueryFromUrl } from "@/utils/object";
import { useLocation } from "react-router-dom";
import { LIMIT_PER_PAGE } from "@/components/data-table";

export const PERMISSION_KEY_HISTORY_URL = "PERMISSION_LIST";

const initialFilters: GetListPermissionPayload = {
  page: 1,
  limit: LIMIT_PER_PAGE[3],
  keyword: "",
  sortBy: null,
  sortOrder: null,
};

export function usePermissionTableFilters() {
  const location = useLocation();

  const getInitialFilters = (): GetListPermissionPayload => {
    const previousUrl = getPreviousPathnameHistory();
    if (!previousUrl) return initialFilters;
    const query = getQueryFromUrl<Record<string, any>>(previousUrl);
    return matchPreviousHistory(location.pathname) ? (query as GetListPermissionPayload) : initialFilters;
  };

  const [filters, setFilters] = useState<GetListPermissionPayload>(getInitialFilters());

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
