import { useState } from "react";
import { GetListRolePermissionsPayload } from "@/redux/role/role.type";
import { getPreviousPathnameHistory, matchPreviousHistory } from "@/utils/history";
import { getQueryFromUrl } from "@/utils/object";
import { useLocation } from "react-router-dom";

export function useRolePermissionsTableFilters(roleId: string) {
  const location = useLocation();

  const initialFilters: GetListRolePermissionsPayload = {
    page: 1,
    limit: 500,
    keyword: "",
    sortBy: null,
    sortOrder: null,
    roleId: roleId,
  };

  const getInitialFilters = (): GetListRolePermissionsPayload => {
    const previousUrl = getPreviousPathnameHistory();
    if (!previousUrl) return initialFilters;
    const query = getQueryFromUrl<Record<string, any>>(previousUrl);
    return matchPreviousHistory(location.pathname) ? (query as GetListRolePermissionsPayload) : initialFilters;
  };

  const [filters, setFilters] = useState<GetListRolePermissionsPayload>(getInitialFilters());

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleLimitChange = (limit: number) => {
    setFilters((prev) => ({ ...prev, limit, page: 1 }));
  };

  return { filters, handlePageChange, handleLimitChange };
}
