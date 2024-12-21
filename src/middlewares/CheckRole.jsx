import React, { useEffect } from "react";
import { getOneRoleById } from "@/lib/slices/role.slice";
import { useSelector } from "react-redux";
import EditRolePage from "@/pages/admin/roles/EditRolePage";
import { useLocation } from "react-router-dom";
import NotFoundPage from "@/pages/admin/errors/NotFoundPage";
import { useAppDispatch } from "@/lib/hooks";

export default function CheckRole() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { id } = location.state || {};
  const { item: data, error, isLoading } = useSelector((state) => state.role);

  useEffect(() => {
    dispatch(getOneRoleById(id));
  }, [id, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <NotFoundPage/>;
  }
  const ROLE_PERMISSIONS = [
    { value: "6751aead482b468e0a350118", label: "update new 1" },
    { value: "6751b0e53fd7adbb4a5f8030", label: "delete user2" },
    { value: "6752fb037e4be1b3264733be", label: "delete user5" },
    { value: "6752fb395bc687bd4e693d74", label: "delete user6" },
  ];

  

  return (
    <EditRolePage
      data={data.data}
      fakePermissions={ROLE_PERMISSIONS}

    />
  );
}
