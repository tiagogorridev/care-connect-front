import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import SignIn from "../pages/shared/SignIn";
import SignUp from "../pages/shared/SignUp";
import ForgotPassword from "../pages/shared/ForgotPassword";
import AdminHome from "../pages/admin/AdminHome";
import AdminProfile from "../pages/admin/AdminProfile";
import ClinicDashboard from "../pages/clinic/ClinicDashboard";
import ClinicProfile from "../pages/clinic/ClinicProfile";
import PatientDashboard from "../pages/patient/PatientDashboard";
import PatientProfile from "../pages/patient/PatientProfile";
import { useAuth } from "./AuthContext";
import { USER_ROUTES } from "./AuthContext";

const AuthRoutes = () => {
  const { isLoggedIn, userData, handleSignIn, handleLogout, currentUser } =
    useAuth();

  const userHome = userData?.userType
    ? USER_ROUTES[userData.userType]
    : "/signin";

  // Props comuns para componentes protegidos
  const commonProps = {
    userName: currentUser,
    userData,
    onLogout: handleLogout,
  };

  // Componente para rotas públicas
  const PublicRoute = ({ children }) =>
    isLoggedIn ? <Navigate to={userHome} replace /> : children;

  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route
        path="/signin"
        element={
          <PublicRoute>
            <SignIn onSignIn={handleSignIn} />
          </PublicRoute>
        }
      />

      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />

      <Route
        path="/forgot"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />

      {/* Rotas Admin */}
      <Route
        path="/admin/profile"
        element={
          <ProtectedRoute allowedTypes={["admin"]}>
            <AdminProfile {...commonProps} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedTypes={["admin"]}>
            <AdminHome {...commonProps} />
          </ProtectedRoute>
        }
      />

      {/* Rotas Clinic */}
      <Route
        path="/clinic/profile"
        element={
          <ProtectedRoute allowedTypes={["clinic"]}>
            <ClinicProfile {...commonProps} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/clinic/*"
        element={
          <ProtectedRoute allowedTypes={["clinic"]}>
            <ClinicDashboard {...commonProps} />
          </ProtectedRoute>
        }
      />

      {/* Rotas Patient */}
      <Route
        path="/patient/profile"
        element={
          <ProtectedRoute allowedTypes={["patient"]}>
            <PatientProfile {...commonProps} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/patient/*"
        element={
          <ProtectedRoute allowedTypes={["patient"]}>
            <PatientDashboard {...commonProps} />
          </ProtectedRoute>
        }
      />

      {/* Redirecionamentos padrão */}
      <Route
        path="/"
        element={<Navigate to={isLoggedIn ? userHome : "/signin"} replace />}
      />

      <Route
        path="*"
        element={<Navigate to={isLoggedIn ? userHome : "/signin"} replace />}
      />
    </Routes>
  );
};

export default AuthRoutes;
