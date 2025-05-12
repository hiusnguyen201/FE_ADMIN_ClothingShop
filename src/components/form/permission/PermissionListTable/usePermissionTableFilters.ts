import { useEffect, useRef, useState } from "react";
import { GetListPermissionPayload, PermissionFieldsSort } from "@/redux/permission/permission.type";
import { LIMIT_PER_PAGE } from "@/components/data-table";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams } from "react-router-dom";
import { convertToSearchParams } from "@/utils/object";

const initialFilters: GetListPermissionPayload = {
  page: 1,
  limit: LIMIT_PER_PAGE[3],
  keyword: "",
  sortBy: null,
  sortOrder: null,
};

export function usePermissionTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<GetListPermissionPayload>({
    ...initialFilters,
    ...Object.fromEntries(searchParams?.entries() ?? {}),
  });

  useEffect(() => {
    setSearchParams(convertToSearchParams(filters));
  }, [filters]);

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleLimitChange = (limit: number) => {
    setFilters((prev) => ({ ...prev, limit, page: 1 }));
  };

  const handleSortChange = (field?: PermissionFieldsSort, desc?: boolean) => {
    if (!field || desc === undefined) {
      setFilters((prev) => ({ ...prev, sortBy: undefined, sortOrder: undefined, page: 1 }));
    } else {
      setFilters((prev) => ({ ...prev, sortBy: field, sortOrder: desc ? "desc" : "asc", page: 1 }));
    }
  };

  const handleKeywordChange = useDebouncedCallback((keyword: string) => {
    setFilters((prev) => ({ ...prev, keyword, page: 1 }));
  }, 500);

  return { filters, handlePageChange, handleLimitChange, handleKeywordChange, handleSortChange };
}
