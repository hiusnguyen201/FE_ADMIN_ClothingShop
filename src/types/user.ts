import { Nullable } from "@/types/common";

export enum GENDER {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

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
  gender: GENDER;
  status: USER_STATUS;
  verifiedAt: Nullable<Date>;
  lastLoginAt: Nullable<Date>;
};
