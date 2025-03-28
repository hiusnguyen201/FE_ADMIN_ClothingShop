import { Nullable } from "./common";

export enum USER_STATUS {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export type User = {
  id: string;
  avatar: Nullable<string>;
  name: string;
  email: string;
  phone: string;
  gender: string;
  status: USER_STATUS;
  verifiedAt: Nullable<Date>;
  createdAt: Date;
  updatedAt: Date;
};
