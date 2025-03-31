import { GetProfileResponse } from "@/redux/account/account.type";
import { apiInstance } from "@/redux/api";

export const getProfileService = async (): Promise<GetProfileResponse> => {
  return await apiInstance.get("/account/view-profile");
};
