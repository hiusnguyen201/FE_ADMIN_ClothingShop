import { useEffect, useState } from "react";
import { GetListAssignedRolePermissionsPayload } from "@/redux/role/role.type";
import { convertToSearchParams } from "@/utils/object";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams } from "react-router-dom";
import { PermissionFieldsSort } from "@/redux/permission/permission.type";

export function useRolePermissionsTableFilters(roleId: string) {
  const initialFilters: GetListAssignedRolePermissionsPayload = {
    page: 1,
    limit: 100,
    keyword: "",
    sortBy: null,
    sortOrder: null,
    roleId: roleId,
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<GetListAssignedRolePermissionsPayload>({
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
