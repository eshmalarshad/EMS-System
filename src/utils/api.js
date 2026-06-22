import axios from "axios";

const api = axios.create({
  baseURL: "https://tender-wholeness-production-d6f4.up.railway.app/api",
});

export default api;
