import api from "./apiService.js";

export const authService = {
  signin: (email, senha) => api.post("/auth/signin", { email, senha }),

  signup: (userData) => api.post("/auth/signup", userData),

  refresh: (refreshToken) => api.post("/auth/refresh", { refreshToken }),

  logout: () => {
    const refreshToken = localStorage.getItem("refreshToken");
    return refreshToken
      ? api.post("/auth/logout", { refreshToken })
      : Promise.resolve();
  },
};
