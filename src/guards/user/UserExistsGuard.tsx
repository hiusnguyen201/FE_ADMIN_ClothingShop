import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Navigate, useParams } from "react-router-dom";
import { getUser } from "@/redux/user/user.thunk";
import { UserState } from "@/redux/user/user.type";
import { User } from "@/types/user";
import { Nullable } from "@/types/common";
import { toast } from "@/hooks/use-toast";

export type UserGuardChildrenProps = { user: Nullable<User>; checkExistLoading: boolean };

export type UserExistsGuardProps = {
  children: ({ user, checkExistLoading }: UserGuardChildrenProps) => ReactNode;
};

export function UserExistsGuard({ children }: UserExistsGuardProps) {
  const { userId } = useParams();
  if (!userId) return <Navigate to="/users" />;

  const dispatch = useAppDispatch();
  const { item, loading } = useAppSelector<UserState>((selector) => selector.user);

  const initialize = async () => {
    try {
      await dispatch(getUser({ id: userId })).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    initialize();
  }, [userId]);

  return children({ user: item, checkExistLoading: loading.getUser });
}
