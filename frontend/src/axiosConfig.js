import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://medical-8q9q.onrender.com", // Remove /api from base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/signin';
    } else {
      console.error("Response error:", error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
