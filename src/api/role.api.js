import apiInstance from "@/api";

const PREFIX = "/roles";

export const getAllRoles = (filters) => {
  return apiInstance.get(PREFIX + `/get-roles?${new URLSearchParams(filters)}`);
};

export const getOneRoles = (id) => {
  return apiInstance.get(PREFIX + `get-role-by-id/${id}`)
};

export const updateRole = (filters) => {
  return apiInstance.patch(PREFIX + `update-role-by-id/${filters._id}`, role);
};

