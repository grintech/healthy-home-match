import axios from "axios";
import { toast } from "react-toastify";

const ApiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: ApiUrl,
  headers: {
    "X-API-DOMAIN":
      "$2y$10$Vs8ujkh6QGdPgRU4Qsub7uP6l8fu5deHcfhF/ePrPWOkVWi3lDT0u",
  },
});

/* ===============================
   REQUEST INTERCEPTOR
   Attach Bearer Token
================================ */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ===============================
   RESPONSE INTERCEPTOR
   Smart 401 Handling
================================ */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message?.toLowerCase() || "";

    if (status === 401) {
      //  Logout ONLY when token is expired/invalid
      if (
        message.includes("token") &&
        (message.includes("expired") || message.includes("invalid"))
      ) {
        toast.error("Session expired. Please login again");

        localStorage.removeItem("authToken");
        localStorage.removeItem("user");

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } 
      //  Other 401s (missing header, unauthorized api, etc.)
      else {
        console.warn("Unauthorized request (not logging out):", message);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
