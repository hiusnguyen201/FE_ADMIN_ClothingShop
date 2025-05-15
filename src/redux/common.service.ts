import { apiInstance } from "./api";

export const pingService = async (): Promise<string> => {
  return await apiInstance.get("/ping");
};
