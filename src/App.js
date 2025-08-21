import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignIn from "./pages/shared/SignIn.jsx";
import SignUp from "./pages/shared/SignUp.jsx";
import ForgotPassword from "./pages/shared/ForgotPassword.jsx";
import PatientDashboard from "./pages/patient/PatientDashboard.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState("signin");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [userData, setUserData] = useState(null);

  // Função chamada quando o login é bem-sucedido
  const handleSignIn = (userName, formData) => {
    console.log("Login realizado:", { userName, formData });

    // Salvar dados do usuário
    setCurrentUser(userName);
    setUserData(formData);

    // Marcar como logado
    setIsLoggedIn(true);
  };

  // Função para fazer logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser("");
    setUserData(null);
    setCurrentPage("signin"); // Volta para a tela de login
    console.log("Logout realizado");
  };

  // Se estiver logado, mostra o dashboard
  if (isLoggedIn) {
    return (
      <>
        <PatientDashboard
          userName={currentUser}
          userData={userData}
          onLogout={handleLogout}
        />
        
        {/* ToastContainer para o dashboard */}
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
          theme="light"
        />
      </>
    );
  }

  // Se não estiver logado, mostra as páginas de autenticação
  return (
    <>
      {currentPage === "signin" && (
        <SignIn
          onSwitchToSignUp={() => setCurrentPage("signup")}
          onForgotPassword={() => setCurrentPage("forgot")}
          onSignIn={handleSignIn} // Nova prop
        />
      )}

      {currentPage === "signup" && (
        <SignUp
          onSwitchToSignIn={() => setCurrentPage("signin")}
          onSignUp={handleSignIn} // Opcional: redirecionar após cadastro
        />
      )}

      {currentPage === "forgot" && (
        <ForgotPassword onSwitchToSignIn={() => setCurrentPage("signin")} />
      )}

      {/* ToastContainer global para as páginas de autenticação */}
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
        theme="light"
        className="mt-16" // Margem superior para não sobrepor elementos
      />
    </>
  );
}

export default App;