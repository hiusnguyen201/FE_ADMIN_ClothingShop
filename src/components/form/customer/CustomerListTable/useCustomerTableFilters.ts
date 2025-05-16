import { CustomerFieldsSort, GetListCustomerPayload } from "@/redux/customer/customer.type";
import { LIMIT_PER_PAGE } from "@/components/data-table";
import { useDebouncedCallback } from "use-debounce";
import { useSearchFilters } from "@/hooks/use-search-filters";

const initialFilters: GetListCustomerPayload = {
  page: 1,
  limit: LIMIT_PER_PAGE[0],
  keyword: "",
  sortBy: null,
  sortOrder: null,
};

export function useCustomerTableFilters() {
  const { filters, handleLimitChange, handlePageChange, setFilters } = useSearchFilters({ initialFilters });

  const handleSortChange = (field?: CustomerFieldsSort, desc?: boolean) => {
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
    initialFilters,
    handleSortChange,
    handleFiltersChange,
  };
}
