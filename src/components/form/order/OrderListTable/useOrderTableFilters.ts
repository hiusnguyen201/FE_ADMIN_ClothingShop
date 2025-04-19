import { useState } from "react";
import { GetListOrderPayload } from "@/redux/order/order.type";
import { LIMIT_PER_PAGE } from "@/components/data-table";
import { useDebouncedCallback } from "use-debounce";
import { ORDER_STATUS } from "@/types/order";

const initialFilters: GetListOrderPayload = {
  page: 1,
  limit: LIMIT_PER_PAGE[0],
  keyword: "",
  sortBy: null,
  sortOrder: null,
  status: null,
};

export function useOrderTableFilters(props?: { searchParams?: URLSearchParams }) {
  const [filters, setFilters] = useState<GetListOrderPayload>({ ...initialFilters, ...props?.searchParams });

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleLimitChange = (limit: number) => {
    setFilters((prev) => ({ ...prev, limit, page: 1 }));
  };

  const handleStatusChange = (status: string) => {
    setFilters((prev) => ({ ...prev, status: status === "all" ? undefined : (status as ORDER_STATUS), page: 1 }));
  };

  const handleKeywordChange = useDebouncedCallback((keyword: string) => {
    setFilters((prev) => ({ ...prev, keyword, page: 1 }));
  }, 500);

  return { filters, handlePageChange, handleLimitChange, handleKeywordChange, handleStatusChange };
}
