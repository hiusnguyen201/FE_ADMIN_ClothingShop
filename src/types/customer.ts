import { GENDER, User } from "@/types/user";

export { GENDER };

export interface Customer extends Exclude<User, "role"> {}
