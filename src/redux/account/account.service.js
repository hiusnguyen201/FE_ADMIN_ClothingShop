import { getAccessToken } from "@/utils/jwt";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getProfile = () =>
  axios.get(`${BASE_URL}/account/view-profile`, { headers: { Authorization: `Bearer ${getAccessToken()}` } });

export default { getProfile };
