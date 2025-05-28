// src/api/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.PROD ? "https://api.sabers.web.id" : "/",
  headers: {
    "Content-Type": "application/json",
  },
});

// This will be set by the AuthProvider
let logoutFunction: () => void = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logoutFunction();
    }
    return Promise.reject(error);
  }
);

export const setLogoutFunction = (logout: () => void) => {
  logoutFunction = logout;
};

export default api;
