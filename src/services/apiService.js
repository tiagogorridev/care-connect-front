import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

const clearAuth = () => {
  const keys = [
    "currentUser",
    "userData",
    "userType",
    "accessToken",
    "refreshToken",
  ];
  keys.forEach((key) => localStorage.removeItem(key));
  window.location.href = "/signin";
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const { data } = await axios.post(
            "http://localhost:8080/api/auth/refresh",
            { refreshToken }
          );

          localStorage.setItem("accessToken", data.accessToken);
          if (data.refreshToken) {
            localStorage.setItem("refreshToken", data.refreshToken);
          }

          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        } catch {
          clearAuth();
        }
      } else {
        clearAuth();
      }
    }

    return Promise.reject(error);
  }
);

export default api;
