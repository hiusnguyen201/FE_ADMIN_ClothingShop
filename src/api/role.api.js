import apiInstance from "@/api";

const PREFIX = "/roles";

export const getAllRoles = (filters) => {
  return apiInstance.get(PREFIX + `/get-roles?${new URLSearchParams(filters)}`);
};

export const getOneRoleById = (id) => {
  return apiInstance.get(PREFIX + `/get-role-by-id/${id}`)
};

export const updateRoleById = (id, updatedData) => {
  return apiInstance.patch(PREFIX + `/update-role-by-id/${id}`, updatedData);
};

export const createRole = (data)=>{
  return apiInstance.post(PREFIX + `/create-role`, data,{headers:{'Content-Type':'multipart/form-data'}})
}

export const checkRoleName = (name) =>{
  return apiInstance.post(PREFIX + `/is-exist-role-name`,{name: name})
}

export const deleteRoleById = (id) => {
  return apiInstance.delete(PREFIX + `/remove-role-by-id/${id}`)
}

export const activeRoleById = (id) => {
  return apiInstance.patch(PREFIX + `/activate-role-by-id/${id}`)
}

export const deactiveRoleById = (id) => {
  return apiInstance.patch(PREFIX + `/deactivate-role-by-id/${id}`)
}
