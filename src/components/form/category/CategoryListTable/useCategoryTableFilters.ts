import { useEffect, useState } from "react";
import { CategoryFieldsSort, GetListCategoryPayload } from "@/redux/category/category.type";
import { LIMIT_PER_PAGE } from "@/components/data-table";
import { useDebouncedCallback } from "use-debounce";
import { convertToSearchParams } from "@/utils/object";
import { useSearchParams } from "react-router-dom";

const initialFilters: GetListCategoryPayload = {
  page: 1,
  limit: LIMIT_PER_PAGE[0],
  keyword: "",
  sortBy: null,
  sortOrder: null,
};

export function useCategoryTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<GetListCategoryPayload>({
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

  const handleSortChange = (field?: CategoryFieldsSort, desc?: boolean) => {
    if (!field || desc === undefined) {
      setFilters((prev) => ({ ...prev, sortBy: undefined, sortOrder: undefined, page: 1 }));
    } else {
      setFilters((prev) => ({ ...prev, sortBy: field, sortOrder: desc ? "desc" : "asc", page: 1 }));
    }
  };

  const handleKeywordChange = useDebouncedCallback((keyword: string) => {
    setFilters((prev) => ({ ...prev, keyword, page: 1 }));
  }, 500);

  return { filters, handlePageChange, handleSortChange, handleLimitChange, handleKeywordChange };
}
