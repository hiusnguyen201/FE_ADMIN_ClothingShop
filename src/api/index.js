import axios from "axios";

const apiInstance = axios.create({
  baseURL: import.meta.env.BASE_URL,
});

export default apiInstance;
