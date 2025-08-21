import { useState } from "react";
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
      <PatientDashboard
        userName={currentUser}
        userData={userData}
        onLogout={handleLogout}
      />
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
    </>
  );
}

export default App;
