import { GetListAssignedRolePermissionsPayload } from "@/redux/role/role.type";
import { useDebouncedCallback } from "use-debounce";
import { PermissionFieldsSort } from "@/redux/permission/permission.type";
import { useSearchFilters } from "@/hooks/use-search-filters";

export function useRolePermissionsTableFilters(roleId: string) {
  const initialFilters: GetListAssignedRolePermissionsPayload = {
    page: 1,
    limit: 100,
    keyword: "",
    sortBy: null,
    sortOrder: null,
    roleId: roleId,
  };

  const { filters, handleLimitChange, handlePageChange, setFilters } = useSearchFilters({
    initialFilters,
    onBeforeFiltersChange: (filters: GetListAssignedRolePermissionsPayload) => ({ ...filters, roleId: undefined }),
  });

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

  return { filters, handlePageChange, handleLimitChange, handleSortChange, handleKeywordChange };
}
