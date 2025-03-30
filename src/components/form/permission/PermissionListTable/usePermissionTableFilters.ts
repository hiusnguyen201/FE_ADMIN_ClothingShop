import { useState } from "react";
import { GetListPermissionPayload } from "@/redux/permission/permission.type";

export const PERMISSION_KEY_HISTORY_URL = "PERMISSION_LIST";

const initialFilters: GetListPermissionPayload = {
  page: 1,
  limit: 100,
  keyword: "",
  sortBy: null,
  sortOrder: null,
};

export function usePermissionTableFilters() {
  const [filters, setFilters] = useState<GetListPermissionPayload>(initialFilters);

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
