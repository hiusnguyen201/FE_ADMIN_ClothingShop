import { Nullable } from "@/types/common";
import { GENDER, USER_STATUS } from "@/types/user";

export { GENDER, USER_STATUS };

export type Customer = {
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
