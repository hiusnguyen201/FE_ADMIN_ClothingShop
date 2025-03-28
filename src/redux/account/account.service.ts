import axios, { AxiosResponse } from "axios";
import { getAccessToken } from "@/utils/jwt";
import { GetProfileResponse } from "@/redux/account/account.type";

const apiUrl: string = import.meta.env.VITE_API_URL;

export const getProfileService = async (): Promise<GetProfileResponse> => {
  const response: AxiosResponse = await axios.get(`${apiUrl}/account/view-profile`, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
  return response.data;
};
