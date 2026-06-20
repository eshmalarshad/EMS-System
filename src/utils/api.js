import axios from "axios";

const api = axios.create({
  baseURL: "https://ems-system-production-45bc.up.railway.app/api",
});

export default api;
