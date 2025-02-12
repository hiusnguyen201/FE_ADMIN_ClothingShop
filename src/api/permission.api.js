import apiInstance from "@/api";

const PREFIX = "/permissions";

export const getAllPermissions = (filters) => {
    return apiInstance.get(PREFIX + `/get-permissions?${new URLSearchParams(filters)}`);
  };