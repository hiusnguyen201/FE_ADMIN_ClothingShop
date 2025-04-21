import { useState } from "react";
import { GetListAssignedRolePermissionsPayload } from "@/redux/role/role.type";
import { convertToSearchParams } from "@/utils/object";

export function useRolePermissionsTableFilters(props: { searchParams?: URLSearchParams; roleId: string }) {
  const initialFilters: GetListAssignedRolePermissionsPayload = {
    page: 1,
    limit: 100,
    keyword: "",
    sortBy: null,
    sortOrder: null,
    roleId: props.roleId,
  };

  const [filters, setFilters] = useState<GetListAssignedRolePermissionsPayload>({
    ...initialFilters,
    ...props?.searchParams,
  });

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleLimitChange = (limit: number) => {
    setFilters((prev) => ({ ...prev, limit, page: 1 }));
  };

  const isDefault = convertToSearchParams(filters).toString() === convertToSearchParams(initialFilters).toString();

  return { filters, handlePageChange, handleLimitChange, isDefault };
}
