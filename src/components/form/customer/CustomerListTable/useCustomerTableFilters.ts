import { useState } from "react";
import { GetListCustomerPayload } from "@/redux/customer/customer.type";
import { LIMIT_PER_PAGE } from "@/components/data-table";
import { useDebouncedCallback } from "use-debounce";
import { convertToSearchParams } from "@/utils/object";

const initialFilters: GetListCustomerPayload = {
  page: 1,
  limit: LIMIT_PER_PAGE[0],
  keyword: "",
  sortBy: null,
  sortOrder: null,
};

export function useCustomerTableFilters(props?: { searchParams?: URLSearchParams }) {
  const [filters, setFilters] = useState<GetListCustomerPayload>({ ...initialFilters, ...props?.searchParams });

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

  return { filters, handlePageChange, handleLimitChange, handleKeywordChange, initialFilters, isDefault };
}
