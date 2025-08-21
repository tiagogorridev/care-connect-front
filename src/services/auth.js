import api from "./apiService";

export const authService = {
  signin: (email, senha) => {
    return api.post("/users/signin", { email, senha });
  },

  signup: (userData) => {
    return api.post("/users/signup", userData);
  },
};
