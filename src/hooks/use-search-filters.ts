import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getTypedParams, convertToSearchParams } from "@/utils/object";

export function useSearchFilters<T extends object>({
  initialFilters,
  onBeforeFiltersChange,
}: {
  initialFilters: T;
  onBeforeFiltersChange?: (filters: T) => Record<string, any> | null;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<T>({
    ...initialFilters,
    ...getTypedParams(searchParams),
  });

  useEffect(() => {
    const updatedFilters = onBeforeFiltersChange?.(filters);
    setSearchParams(convertToSearchParams(updatedFilters ? updatedFilters : filters));
  }, [filters]);

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleLimitChange = (limit: number) => {
    setFilters((prev) => ({ ...prev, limit, page: 1 }));
  };

  return { filters, setFilters, handlePageChange, handleLimitChange };
}
