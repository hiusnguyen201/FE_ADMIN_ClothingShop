import { Nullable } from "@/types/common";

export enum ROLE_STATUS {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export type Role = {
  id: string;
  name: string;
  slug: string;
  status: ROLE_STATUS;
  description: string;
  createdAt: Nullable<Date>;
  updatedAt: Nullable<Date>;
};
