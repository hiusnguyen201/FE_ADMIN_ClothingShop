import { useState } from "react";
import { GetListRolePayload } from "@/redux/role/role.type";
import { LIMIT_PER_PAGE } from "@/components/data-table";
import { useDebouncedCallback } from "use-debounce";

const initialFilters: GetListRolePayload = {
  page: 1,
  limit: LIMIT_PER_PAGE[0],
  keyword: "",
  sortBy: null,
  sortOrder: null,
};

export function useRoleTableFilters(props?: { searchParams?: URLSearchParams }) {
  const [filters, setFilters] = useState<GetListRolePayload>({ ...initialFilters, ...props?.searchParams });

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleLimitChange = (limit: number) => {
    setFilters((prev) => ({ ...prev, limit, page: 1 }));
  };

  const handleKeywordChange = useDebouncedCallback((keyword: string) => {
    setFilters((prev) => ({ ...prev, keyword, page: 1 }));
  }, 500);

  return { filters, handlePageChange, handleLimitChange, handleKeywordChange };
}
