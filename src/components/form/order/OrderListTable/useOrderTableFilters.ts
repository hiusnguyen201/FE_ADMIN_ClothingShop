import { GetListOrderPayload, OrderFieldsSort } from "@/redux/order/order.type";
import { LIMIT_PER_PAGE } from "@/components/data-table";
import { useDebouncedCallback } from "use-debounce";
import { ORDER_STATUS } from "@/types/order";
import { useSearchFilters } from "@/hooks/use-search-filters";

const initialFilters: GetListOrderPayload = {
  page: 1,
  limit: LIMIT_PER_PAGE[0],
  keyword: "",
  sortBy: null,
  sortOrder: null,
  status: null,
  minTotal: undefined,
  maxTotal: undefined,
};

export function useOrderTableFilters() {
  const { filters, handleLimitChange, handlePageChange, setFilters } = useSearchFilters({ initialFilters });

  const handleStatusChange = (status: string) => {
    setFilters((prev) => ({ ...prev, status: status === "all" ? undefined : (status as ORDER_STATUS), page: 1 }));
  };

  const handleSortChange = (field?: OrderFieldsSort, desc?: boolean) => {
    if (!field || desc === undefined) {
      setFilters((prev) => ({ ...prev, sortBy: undefined, sortOrder: undefined, page: 1 }));
    } else {
      setFilters((prev) => ({ ...prev, sortBy: field, sortOrder: desc ? "desc" : "asc", page: 1 }));
    }
  };

  const handleFiltersChange = (filters: any) => {
    setFilters((prev) => ({ ...prev, ...filters, page: 1 }));
  };

  const handleKeywordChange = useDebouncedCallback((keyword: string) => {
    setFilters((prev) => ({ ...prev, keyword, page: 1 }));
  }, 500);

  return {
    filters,
    handlePageChange,
    handleLimitChange,
    handleKeywordChange,
    handleStatusChange,
    handleSortChange,
    handleFiltersChange,
  };
}
