import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";

// Configurações de autenticação
export const AUTH_KEYS = {
  USER: "currentUser",
  DATA: "userData",
  TYPE: "userType",
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
};

export const USER_ROUTES = {
  admin: "/admin",
  clinic: "/clinic",
  patient: "/patient",
};

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Hook personalizado para localStorage
const useLocalStorage = (key, defaultValue = null) => {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const setStorageValue = useCallback(
    (newValue) => {
      try {
        setValue(newValue);
        if (newValue === null) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, JSON.stringify(newValue));
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key]
  );

  return [value, setStorageValue];
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useLocalStorage(AUTH_KEYS.USER, "");
  const [userData, setUserData] = useLocalStorage(AUTH_KEYS.DATA, null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const isLoggedIn = Boolean(currentUser && userData);

  // Limpar dados de autenticação
  const clearAuthData = useCallback(() => {
    Object.values(AUTH_KEYS).forEach((key) => localStorage.removeItem(key));
    setCurrentUser(null);
    setUserData(null);
  }, [setCurrentUser, setUserData]);

  // Login do usuário
  const handleSignIn = useCallback(
    (userName, formData) => {
      if (!userName || !formData?.userType) return false;

      try {
        localStorage.setItem(AUTH_KEYS.USER, userName);
        localStorage.setItem(AUTH_KEYS.DATA, JSON.stringify(formData));
        localStorage.setItem(AUTH_KEYS.TYPE, formData.userType);

        if (formData.accessToken) {
          localStorage.setItem(AUTH_KEYS.ACCESS_TOKEN, formData.accessToken);
        }
        if (formData.refreshToken) {
          localStorage.setItem(AUTH_KEYS.REFRESH_TOKEN, formData.refreshToken);
        }

        setCurrentUser(userName);
        setUserData(formData);
        navigate(USER_ROUTES[formData.userType] || "/signin", {
          replace: true,
        });
        return true;
      } catch {
        return false;
      }
    },
    [navigate, setCurrentUser, setUserData]
  );

  // Logout do usuário
  const handleLogout = useCallback(() => {
    clearAuthData();
    navigate("/signin", { replace: true });
  }, [clearAuthData, navigate]);

  // Inicialização da autenticação
  useEffect(() => {
    try {
      const userType = localStorage.getItem(AUTH_KEYS.TYPE);
      const accessToken = localStorage.getItem(AUTH_KEYS.ACCESS_TOKEN);

      if (!currentUser || !userData || !userType || !accessToken) {
        clearAuthData();
      }
    } catch {
      clearAuthData();
    } finally {
      setIsLoading(false);
    }
  }, [clearAuthData, currentUser, userData]);

  const value = {
    isLoggedIn,
    currentUser,
    userData,
    isLoading,
    handleSignIn,
    handleLogout,
    clearAuthData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
