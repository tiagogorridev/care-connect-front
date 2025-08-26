import { useNavigate, useLocation } from "react-router-dom";
import Navigation from "../../components/patient/PatientNavigation";
import { useState, useEffect } from "react";
import Header from "../../components/shared/others/Header";
import { useUserData } from "../../auth/useUserData";
import ProfileHeader from "../../components/shared/profile/ProfileHeader";
import ProfileConfigGrid from "../../components/shared/profile/ProfileConfigGrid";
import InfoModal from "../../components/shared/profile/InfoModal";
import PasswordModal from "../../components/shared/profile/PasswordModal";
import DeleteModal from "../../components/shared/profile/DeleteModal";

const PatientProfile = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { storedData, setStoredData } = useUserData();
  const [activeCard, setActiveCard] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [formData, setFormData] = useState({
    nome: "",
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
  });

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/appointments")) setActiveTab("appointments");
    else if (path.includes("/search")) setActiveTab("search");
    else setActiveTab("home");
  }, [location.pathname]);

  useEffect(() => {
    const userData = storedData.userData;
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        nome: userData.nome || "",
      }));
    }
  }, [storedData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveInfo = () => {
    if (!formData.nome.trim()) {
      alert("Por favor, digite um nome válido");
      return;
    }

    try {
      const currentUserData = storedData.userData;
      const updatedUserData = {
        ...currentUserData,
        nome: formData.nome,
      };

      localStorage.setItem("userData", JSON.stringify(updatedUserData));
      localStorage.setItem("currentUser", JSON.stringify(formData.nome));

      setStoredData((prev) => ({
        ...prev,
        userData: updatedUserData,
        currentUser: formData.nome,
      }));

      alert("Nome alterado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      alert("Erro ao salvar as informações. Tente novamente.");
    }

    setActiveCard(null);
  };

  const handleSavePassword = () => {
    if (
      !formData.senhaAtual ||
      !formData.novaSenha ||
      !formData.confirmarSenha
    ) {
      alert("Por favor, preencha todos os campos de senha");
      return;
    }
    if (formData.novaSenha !== formData.confirmarSenha) {
      alert("As senhas não coincidem");
      return;
    }

    alert("Senha alterada com sucesso!");
    setFormData((prev) => ({
      ...prev,
      senhaAtual: "",
      novaSenha: "",
      confirmarSenha: "",
    }));
    setActiveCard(null);
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita."
      )
    ) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userData");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("userType");

      alert("Conta deletada com sucesso!");
      setActiveCard(null);
      if (onLogout) onLogout();
    }
  };

  const closeCard = () => {
    setActiveCard(null);
    setFormData((prev) => ({
      ...prev,
      senhaAtual: "",
      novaSenha: "",
      confirmarSenha: "",
    }));
  };

  const handleNavigation = (tabId) => {
    setActiveTab(tabId);
    switch (tabId) {
      case "home":
        navigate("/patient");
        break;
      case "appointments":
        navigate("/patient/appointments");
        break;
      case "search":
        navigate("/patient/search");
        break;
      default:
        break;
    }
  };

  if (!storedData.userType || storedData.userType !== "patient") {
    return <div>Acesso restrito a pacientes</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Header
        userName={storedData.currentUser || "Paciente"}
        onLogout={onLogout}
      />
      <Navigation activeTab={activeTab} setActiveTab={handleNavigation} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader
          userType="patient"
          currentUser={storedData.currentUser}
        />

        <ProfileConfigGrid userType="patient" onOptionClick={setActiveCard} />

        <InfoModal
          isOpen={activeCard === "info"}
          onClose={closeCard}
          userType="patient"
          formData={formData}
          onInputChange={handleInputChange}
          onSave={handleSaveInfo}
        />

        <PasswordModal
          isOpen={activeCard === "password"}
          onClose={closeCard}
          userType="patient"
          formData={formData}
          onInputChange={handleInputChange}
          onSave={handleSavePassword}
        />

        <DeleteModal
          isOpen={activeCard === "delete"}
          onClose={closeCard}
          userType="patient"
          onDelete={handleDeleteAccount}
        />
      </div>
    </div>
  );
};

export default PatientProfile;
