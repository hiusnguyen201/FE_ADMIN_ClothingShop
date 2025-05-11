import { useEffect, useState } from "react";
import { GetListProductPayload, ProductFieldsSort } from "@/redux/product/product.type";
import { LIMIT_PER_PAGE } from "@/components/data-table";
import { useDebouncedCallback } from "use-debounce";
import { PRODUCT_STATUS } from "@/types/product";
import { convertToSearchParams } from "@/utils/object";
import { useSearchParams } from "react-router-dom";

export const initialFilters: GetListProductPayload = {
  page: 1,
  limit: LIMIT_PER_PAGE[0],
  keyword: "",
  sortBy: null,
  sortOrder: null,
  minPrice: undefined,
  maxPrice: undefined,
};

export function useProductTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<GetListProductPayload>({
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

  const handleFiltersChange = (filters: any) => {
    setFilters((prev) => ({ ...prev, ...filters, page: 1 }));
  };

  const handleStatusChange = (status: PRODUCT_STATUS) => {
    setFilters((prev) => ({ ...prev, status, page: 1 }));
  };

  const handleCategoriesChange = (ids: string[]) => {
    setFilters((prev) => ({ ...prev, categoryIds: ids.join(","), page: 1 }));
  };

  const handleMinPriceChange = (price: string) => {
    setFilters((prev) => ({ ...prev, minPrice: Number.isInteger(+price) ? +price : initialFilters.minPrice, page: 1 }));
  };

  const handleSortChange = (field?: ProductFieldsSort, desc?: boolean) => {
    if (!field || desc === undefined) {
      setFilters((prev) => ({ ...prev, sortBy: undefined, sortOrder: undefined, page: 1 }));
    } else {
      setFilters((prev) => ({ ...prev, sortBy: field, sortOrder: desc ? "desc" : "asc", page: 1 }));
    }
  };

  const handleMaxPriceChange = (price: string) => {
    setFilters((prev) => ({ ...prev, maxPrice: Number.isInteger(+price) ? +price : initialFilters.maxPrice, page: 1 }));
  };

  const handleKeywordChange = useDebouncedCallback((keyword: string) => {
    setFilters((prev) => ({ ...prev, keyword, page: 1 }));
  }, 500);

  return {
    filters,
    handlePageChange,
    handleLimitChange,
    handleStatusChange,
    handleCategoriesChange,
    handleKeywordChange,
    handleSortChange,
    initialFilters,
    handleFiltersChange,
    handleMinPriceChange,
    handleMaxPriceChange,
  };
}
