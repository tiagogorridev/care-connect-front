import { Navigate } from "react-router-dom";
import { AUTH_KEYS } from "./AuthContext";

const USER_ROUTES = {
  admin: "/admin",
  clinic: "/clinic",
  patient: "/patient",
};

const ProtectedRoute = ({ children, allowedTypes, redirectTo = "/signin" }) => {
  const userType = localStorage.getItem(AUTH_KEYS.TYPE);
  const userData = localStorage.getItem(AUTH_KEYS.DATA);

  // Verificar se usuário está autenticado
  if (!userType || !userData) {
    return <Navigate to={redirectTo} replace />;
  }

  try {
    const parsedData = JSON.parse(userData);

    // Validar consistência dos dados
    if (parsedData.userType !== userType) {
      return <Navigate to={redirectTo} replace />;
    }

    // Verificar permissões
    if (!allowedTypes.includes(userType)) {
      return <Navigate to={USER_ROUTES[userType] || redirectTo} replace />;
    }

    return children;
  } catch {
    return <Navigate to={redirectTo} replace />;
  }
};

export default ProtectedRoute;
