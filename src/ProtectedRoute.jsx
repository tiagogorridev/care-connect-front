import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute protege rotas com base no tipo de usuário.
 * @param {ReactNode} children - O componente filho a ser renderizado.
 * @param {Array<string>} allowedTypes - Tipos de usuário permitidos (ex: ["patient", "clinic", "admin"])
 * @param {string} redirectTo - Rota para redirecionar caso não autorizado (padrão: "/signin")
 */
const ProtectedRoute = ({ children, allowedTypes, redirectTo = "/signin" }) => {
  // Validação de entrada - allowedTypes deve ser um array
  if (!Array.isArray(allowedTypes)) {
    console.error("ERRO [ProtectedRoute]: allowedTypes deve ser um array. Recebido:", allowedTypes);
    return <Navigate to={redirectTo} replace />;
  }

  // Obtém dados do localStorage
  const userType = localStorage.getItem("userType");
  const userData = localStorage.getItem("userData");
  const currentUser = localStorage.getItem("currentUser");

  // Lista de tipos válidos
  const validUserTypes = ["admin", "clinic", "patient"];

  // Função para limpar dados inválidos
  const clearInvalidData = () => {
    console.warn("[ProtectedRoute]: Limpando dados de autenticação inválidos");
    localStorage.removeItem("userType");
    localStorage.removeItem("userData");
    localStorage.removeItem("currentUser");
  };

  // 1. Verifica se todos os dados necessários estão presentes
  const hasRequiredData = userType && userData && currentUser;

  if (!hasRequiredData) {
    console.warn("[ProtectedRoute]: Dados de autenticação incompletos");
    clearInvalidData();
    return <Navigate to="/signin" replace />;
  }

  // 2. Verifica se os dados não são strings inválidas
  const hasValidData = userType !== "undefined" &&
    userType !== "null" &&
    userData !== "undefined" &&
    userData !== "null" &&
    currentUser !== "undefined" &&
    currentUser !== "null";

  if (!hasValidData) {
    console.warn("[ProtectedRoute]: Dados de autenticação corrompidos");
    clearInvalidData();
    return <Navigate to="/signin" replace />;
  }

  // 3. Verifica se o tipo de usuário é válido
  if (!validUserTypes.includes(userType)) {
    console.warn(`[ProtectedRoute]: Tipo de usuário inválido: ${userType}`);
    clearInvalidData();
    return <Navigate to="/signin" replace />;
  }

  // 4. Tenta fazer parse dos dados do usuário para validação adicional
  try {
    const parsedUserData = JSON.parse(userData);

    // Verifica consistência entre userType do localStorage e userData
    if (parsedUserData.userType && parsedUserData.userType !== userType) {
      console.warn("[ProtectedRoute]: Inconsistência nos dados do usuário");
      clearInvalidData();
      return <Navigate to="/signin" replace />;
    }
  } catch (error) {
    console.error("[ProtectedRoute]: Erro ao fazer parse dos dados do usuário:", error);
    clearInvalidData();
    return <Navigate to="/signin" replace />;
  }

  // 5. AGORA SIM: Verifica se o tipo de usuário tem permissão para acessar a rota
  if (!allowedTypes.includes(userType)) {
    console.warn(`[ProtectedRoute]: Usuário tipo '${userType}' não tem permissão. Permitidos: [${allowedTypes.join(', ')}]`);

    // Redireciona para a home correta do usuário em vez de negar acesso
    switch (userType) {
      case "admin":
        return <Navigate to="/admin/home" replace />;
      case "clinic":
        return <Navigate to="/clinic/home" replace />;
      case "patient":
        return <Navigate to="/patient/home" replace />;
      default:
        // Se chegou até aqui com um tipo inválido, algo está errado
        clearInvalidData();
        return <Navigate to="/signin" replace />;
    }
  }

  // 6. Se chegou até aqui, o usuário está autenticado e autorizado
  console.log(`[ProtectedRoute]: Acesso autorizado para usuário tipo '${userType}'`);
  return children;
};

export default ProtectedRoute;