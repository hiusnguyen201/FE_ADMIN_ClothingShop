import apiInstance from "@/api";
const PREFIX = "/users";

export const getAllUsers = (filters = {}) => {
  const params = new URLSearchParams({
    ...filters,
    // _: Date.now().toString(),
  });
  return apiInstance.get(`${PREFIX}/get-users?${params}`);
};

export const getUserById = (id) => {
  return apiInstance.get(`${PREFIX}/get-user-by-id/${id}`);
};

export const updateUser = (id, formData) => {
  return apiInstance.patch(`${PREFIX}/update-user-by-id/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const createUser = (formData) => {
  return apiInstance.post(`${PREFIX}/create-user`, formData);
};

export const deleteUser = (id) => {
  return apiInstance.delete(`${PREFIX}/remove-user-by-id/${id}`);
};
