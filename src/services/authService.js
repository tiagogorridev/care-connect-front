import api from "./apiService.js";

export const authService = {
  signin: (email, senha) => {
    return api.post("/auth/signin", { email, senha });
  },

  signup: (userData) => {
    return api.post("/auth/signup", userData);
  },
};
