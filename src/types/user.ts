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

type UserRole = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

export type User = {
  id: string;
  avatar: Nullable<string>;
  name: string;
  email: string;
  phone: string;
  gender: GENDER;
  status: USER_STATUS;
  role: Nullable<UserRole>;
  verifiedAt: Nullable<Date>;
  lastLoginAt: Nullable<Date>;
};
