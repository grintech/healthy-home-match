import axios from "axios";

const ApiUrl = import.meta.env.VITE_API_URL; 

// create axios instance
const api = axios.create({
  baseURL: ApiUrl,
  headers: {
    "X-API-DOMAIN":
      "$2y$10$Vs8ujkh6QGdPgRU4Qsub7uP6l8fu5deHcfhF/ePrPWOkVWi3lDT0u",
  },
});

// optional: intercept responses (for logging or global error handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default api;
