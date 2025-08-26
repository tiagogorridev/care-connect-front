import { useState, useEffect } from "react";
import Header from "../../components/shared/others/Header";
import { useUserData } from "../../auth/useUserData";
import ProfileHeader from "../../components/shared/profile/ProfileHeader";
import ProfileConfigGrid from "../../components/shared/profile/ProfileConfigGrid";
import InfoModal from "../../components/shared/profile/InfoModal";
import PasswordModal from "../../components/shared/profile/PasswordModal";
import DeleteModal from "../../components/shared/profile/DeleteModal";

const AdminProfile = ({ onLogout }) => {
  const { storedData, setStoredData } = useUserData();
  const [activeCard, setActiveCard] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
  });

  useEffect(() => {
    const userData = storedData.userData;
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        nome: userData.nome || "",
        cpf: userData.cpf || "",
        telefone: userData.telefone || "",
        email: userData.email || "",
      }));
    }
  }, [storedData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveInfo = () => {
    if (!formData.nome.trim()) {
      alert("Por favor, preencha o nome do administrador");
      return;
    }

    try {
      const currentUserData = storedData.userData;
      const updatedUserData = {
        ...currentUserData,
        nome: formData.nome,
        telefone: formData.telefone,
      };

      localStorage.setItem("userData", JSON.stringify(updatedUserData));
      localStorage.setItem("currentUser", JSON.stringify(formData.nome));

      setStoredData((prev) => ({
        ...prev,
        userData: updatedUserData,
        currentUser: formData.nome,
      }));

      alert("Informações do administrador atualizadas com sucesso!");
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
        "Tem certeza que deseja deletar a conta do administrador? Esta ação não pode ser desfeita."
      )
    ) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userData");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("userType");

      alert("Conta do administrador deletada com sucesso!");
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

  if (!storedData.userType || storedData.userType !== "admin") {
    return <div>Acesso restrito a administradores</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <Header
        userName={storedData.currentUser || "Administrador"}
        userData={storedData.userData}
        onLogout={onLogout}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader userType="admin" currentUser={storedData.currentUser} />

        <ProfileConfigGrid userType="admin" onOptionClick={setActiveCard} />

        <InfoModal
          isOpen={activeCard === "info"}
          onClose={closeCard}
          userType="admin"
          formData={formData}
          onInputChange={handleInputChange}
          onSave={handleSaveInfo}
        />

        <PasswordModal
          isOpen={activeCard === "password"}
          onClose={closeCard}
          userType="admin"
          formData={formData}
          onInputChange={handleInputChange}
          onSave={handleSavePassword}
        />

        <DeleteModal
          isOpen={activeCard === "delete"}
          onClose={closeCard}
          userType="admin"
          onDelete={handleDeleteAccount}
        />
      </div>
    </div>
  );
};

export default AdminProfile;
