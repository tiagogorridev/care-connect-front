import api from "./apiService.js";

export const authService = {
  signin: (email, senha) => {
    return api.post("/auth/signin", { email, senha });
  },

  signup: (userData) => {
    return api.post("/auth/signup", userData);
  },

  refresh: (refreshToken) => {
    return api.post("/auth/refresh", { refreshToken });
  },

  logout: () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      return api.post("/auth/logout", { refreshToken });
    }
    return Promise.resolve();
  },
};
