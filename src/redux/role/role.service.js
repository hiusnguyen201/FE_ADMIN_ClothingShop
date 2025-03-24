import { getAccessToken } from "@/utils/jwt";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createRole = (payload) =>
  axios.post(`${BASE_URL}/roles/create-role`, payload, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });

export const getListRole = (filters) =>
  axios.get(`${BASE_URL}/roles/get-roles?${new URLSearchParams(filters)}`, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });

export default { createRole, getListRole };
