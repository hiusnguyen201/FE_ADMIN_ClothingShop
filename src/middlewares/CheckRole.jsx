import React, { useEffect } from "react";
import { getOneRoleById } from "@/lib/slices/role.slice";
import { useSelector } from "react-redux";
import EditRolePage from "@/pages/admin/roles/EditRolePage";
import { useLocation } from "react-router-dom";
import NotFoundPage from "@/pages/admin/errors/NotFoundPage";
import { useAppDispatch } from "@/lib/hooks";
import { getAllPermissions } from "@/lib/slices/permission.slice";

export default function CheckRole() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { id } = location.state || {};
  const { item: data, error, isLoading } = useSelector((state) => state.role);
  const { list: allPermissions } = useSelector((state) => state.permission);

  useEffect(() => {
    dispatch(getOneRoleById(id));
  }, [id, dispatch]);

  React.useEffect(() => {
    dispatch(
      getAllPermissions({
        isActive: true,
      })
    );
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <NotFoundPage />;
  }

  return <EditRolePage data={data.data} allPermissions={allPermissions} />;
}
