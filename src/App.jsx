import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./pages/shared/SignIn.jsx";
import SignUp from "./pages/shared/SignUp.jsx";
import ForgotPassword from "./pages/shared/ForgotPassword.jsx";
import PatientDashboard from "./pages/patient/PatientDashboard.jsx";
import AdminHome from "./pages/admin/HomeAdmin.jsx";
import ClinicHome from "./pages/clinic/HomeClinic.jsx";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // Verifica login ao carregar
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const savedUser = localStorage.getItem("currentUser");
        const savedUserData = localStorage.getItem("userData");
        const userType = localStorage.getItem("userType");
        const accessToken = localStorage.getItem("accessToken");

        if (
          savedUser &&
          savedUserData &&
          userType &&
          accessToken &&
          userType !== "undefined" &&
          userType !== "null"
        ) {
          const parsedUserData = JSON.parse(savedUserData);

          if (parsedUserData && parsedUserData.userType === userType) {
            setCurrentUser(savedUser);
            setUserData(parsedUserData);
            setIsLoggedIn(true);
          } else {
            clearAuthData();
          }
        } else {
          clearAuthData();
        }
      } catch (error) {
        console.error("Erro ao inicializar autenticação:", error);
        clearAuthData();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Função para limpar dados de autenticação
  const clearAuthData = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userData");
    localStorage.removeItem("userType");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  // Função de login
  const handleSignIn = (userName, formData) => {
    try {
      if (!userName || !formData || !formData.userType) {
        console.error("Dados de login inválidos");
        return;
      }

      // Armazena os dados básicos
      localStorage.setItem("currentUser", userName);
      localStorage.setItem("userData", JSON.stringify(formData));
      localStorage.setItem("userType", formData.userType);

      // Armazena os tokens se existirem
      if (formData.accessToken) {
        localStorage.setItem("accessToken", formData.accessToken);
      }
      if (formData.refreshToken) {
        localStorage.setItem("refreshToken", formData.refreshToken);
      }

      // Atualiza o estado
      setCurrentUser(userName);
      setUserData(formData);
      setIsLoggedIn(true);

      // Redireciona baseado no tipo
      const userType = formData.userType;
      switch (userType) {
        case "admin":
          navigate("/admin/home", { replace: true });
          break;
        case "clinic":
          navigate("/clinic/home", { replace: true });
          break;
        case "patient":
          navigate("/patient/home", { replace: true });
          break;
        default:
          console.error("Tipo de usuário inválido:", userType);
          navigate("/signin", { replace: true });
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
    }
  };

  // Função de logout
  const handleLogout = () => {
    try {
      clearAuthData();
      setIsLoggedIn(false);
      setCurrentUser("");
      setUserData(null);
      navigate("/signin", { replace: true });
    } catch (error) {
      console.error("Erro durante o logout:", error);
    }
  };

  // Função para determinar a home baseada no tipo de usuário
  const getHomeRoute = (userType) => {
    switch (userType) {
      case "admin":
        return "/admin/home";
      case "clinic":
        return "/clinic/home";
      case "patient":
        return "/patient/home";
      default:
        return "/signin";
    }
  };

  // Mostra loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* Rotas públicas */}
        <Route
          path="/signin"
          element={
            isLoggedIn ? (
              <Navigate to={getHomeRoute(userData?.userType)} replace />
            ) : (
              <SignIn
                onSwitchToSignUp={() => navigate("/signup")}
                onForgotPassword={() => navigate("/forgot")}
                onSignIn={handleSignIn}
              />
            )
          }
        />

        <Route
          path="/signup"
          element={
            isLoggedIn ? (
              <Navigate to={getHomeRoute(userData?.userType)} replace />
            ) : (
              <SignUp
                onSwitchToSignIn={() => navigate("/signin")}
                onSignUp={handleSignIn}
              />
            )
          }
        />

        <Route
          path="/forgot"
          element={
            isLoggedIn ? (
              <Navigate to={getHomeRoute(userData?.userType)} replace />
            ) : (
              <ForgotPassword onSwitchToSignIn={() => navigate("/signin")} />
            )
          }
        />

        {/* Rotas protegidas */}
        <Route
          path="/admin/home"
          element={
            <ProtectedRoute allowedTypes={["admin"]}>
              <AdminHome
                userName={currentUser}
                userData={userData}
                onLogout={handleLogout}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/clinic/home"
          element={
            <ProtectedRoute allowedTypes={["clinic"]}>
              <ClinicHome
                userName={currentUser}
                userData={userData}
                onLogout={handleLogout}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/home"
          element={
            <ProtectedRoute allowedTypes={["patient"]}>
              <PatientDashboard
                userName={currentUser}
                userData={userData}
                onLogout={handleLogout}
              />
            </ProtectedRoute>
          }
        />

        {/* Rota raiz */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to={getHomeRoute(userData?.userType)} replace />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />

        {/* Catch-all */}
        <Route
          path="*"
          element={
            <Navigate
              to={isLoggedIn ? getHomeRoute(userData?.userType) : "/signin"}
              replace
            />
          }
        />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
