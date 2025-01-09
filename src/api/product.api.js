import apiInstance from "@/api";

const PREFIX = "/products";

export const getAllProducts = (filters) => {
  return apiInstance.get(PREFIX + `?${new URLSearchParams(filters)}`);
};
