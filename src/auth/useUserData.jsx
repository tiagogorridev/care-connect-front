// hooks/useUserData.js
import { useState, useEffect, useCallback } from "react";

export const useUserData = () => {
  const [storedData, setStoredData] = useState({
    userData: null,
    currentUser: null,
    userType: null,
  });

  const getStoredData = useCallback(() => {
    try {
      const userData = localStorage.getItem("userData");
      const currentUser = localStorage.getItem("currentUser");
      const userType = localStorage.getItem("userType");

      return {
        userData: userData ? JSON.parse(userData) : null,
        currentUser: currentUser ? currentUser.replace(/"/g, "") : null,
        userType: userType || null,
      };
    } catch (error) {
      console.error("Erro ao ler dados do localStorage:", error);
      return {
        userData: null,
        currentUser: null,
        userType: null,
      };
    }
  }, []);

  useEffect(() => {
    setStoredData(getStoredData());
  }, [getStoredData]);

  return { storedData, setStoredData, getStoredData };
};
