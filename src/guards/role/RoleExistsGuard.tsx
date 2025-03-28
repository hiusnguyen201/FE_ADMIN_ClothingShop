import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Navigate, useParams } from "react-router-dom";
import { getRole } from "@/redux/role/role.thunk";
import { RoleState } from "@/redux/role/role.type";
import { Role } from "@/types/role";
import { Nullable } from "@/types/common";
import { toast } from "@/hooks/use-toast";

export type RoleGuardChildrenProps = { role: Nullable<Role>; checkExistLoading: boolean };

export type RoleExistsGuardProps = {
  children: ({ role, checkExistLoading }: RoleGuardChildrenProps) => ReactNode;
};

export function RoleExistsGuard({ children }: RoleExistsGuardProps) {
  const { roleId } = useParams();
  if (!roleId) return <Navigate to={"/roles"} replace />;

  const dispatch = useAppDispatch();
  const { item, loading } = useAppSelector<RoleState>((selector) => selector.role);

  const initialize = async () => {
    try {
      await dispatch(getRole({ id: roleId })).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    initialize();
  }, [roleId]);

  return children({ role: item, checkExistLoading: loading.getRole });
}
