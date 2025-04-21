import { useState } from "react";
import { GetListPermissionPayload } from "@/redux/permission/permission.type";
import { LIMIT_PER_PAGE } from "@/components/data-table";
import { useDebouncedCallback } from "use-debounce";
import { convertToSearchParams } from "@/utils/object";

const initialFilters: GetListPermissionPayload = {
  page: 1,
  limit: LIMIT_PER_PAGE[3],
  keyword: "",
  sortBy: null,
  sortOrder: null,
};

export function usePermissionTableFilters(props?: { searchParams?: URLSearchParams }) {
  const [filters, setFilters] = useState<GetListPermissionPayload>({ ...initialFilters, ...props?.searchParams });

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleLimitChange = (limit: number) => {
    setFilters((prev) => ({ ...prev, limit, page: 1 }));
  };

  const handleKeywordChange = useDebouncedCallback((keyword: string) => {
    setFilters((prev) => ({ ...prev, keyword, page: 1 }));
  }, 500);

  const isDefault = convertToSearchParams(filters).toString() === convertToSearchParams(initialFilters).toString();

  return { filters, handlePageChange, handleLimitChange, handleKeywordChange, isDefault };
}
