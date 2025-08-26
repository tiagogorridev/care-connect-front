import { useState, useEffect, useCallback } from "react";
import Button from "../../components/shared/others/Button";
import InputField from "../../components/shared/others/InputField";
import ConfigCard from "../../components/shared/profile/ConfigCard";
import Modal from "../../components/shared/others/Modal";
import Header from "../../components/shared/others/Header";

const ClinicProfile = ({ onLogout }) => {
  const [activeCard, setActiveCard] = useState(null);

  const getStoredData = useCallback(() => {
    try {
      const userData = localStorage.getItem("userData");
      const currentUser = localStorage.getItem("currentUser");
      const userType = localStorage.getItem("userType");
      return {
        userData: userData ? JSON.parse(userData) : null,
        currentUser: currentUser?.replace(/"/g, "") || null,
        userType: userType || "clinic",
      };
    } catch (error) {
      console.error("Erro ao ler dados do localStorage:", error);
      return { userData: null, currentUser: null, userType: "clinic" };
    }
  }, []);

  const [storedData, setStoredData] = useState(getStoredData());
  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    telefone: "",
    email: "",
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
  });

  useEffect(() => {
    setStoredData(getStoredData());
  }, [getStoredData]);

  useEffect(() => {
    const { userData } = storedData;
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        nome: userData.nome || "",
        cnpj: userData.cnpj || "",
        telefone: userData.telefone || "",
        email: userData.email || "",
      }));
    }
  }, [storedData]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSaveInfo = useCallback(() => {
    if (!formData.nome.trim()) {
      alert("Por favor, preencha o nome da clínica");
      return;
    }

    try {
      const updatedUserData = {
        ...storedData.userData,
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

      alert("Informações da clínica atualizadas com sucesso!");
      setActiveCard(null);
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      alert("Erro ao salvar as informações. Tente novamente.");
    }
  }, [formData.nome, formData.telefone, storedData.userData]);

  const handleSavePassword = useCallback(() => {
    const { senhaAtual, novaSenha, confirmarSenha } = formData;

    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      alert("Por favor, preencha todos os campos de senha");
      return;
    }

    if (novaSenha !== confirmarSenha) {
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
  }, [formData]);

  const handleDeleteAccount = useCallback(() => {
    if (
      window.confirm(
        "Tem certeza que deseja deletar a conta da clínica? Esta ação não pode ser desfeita."
      )
    ) {
      [
        "accessToken",
        "refreshToken",
        "userData",
        "currentUser",
        "userType",
      ].forEach((key) => localStorage.removeItem(key));

      alert("Conta da clínica deletada com sucesso!");
      setActiveCard(null);
      onLogout?.();
    }
  }, [onLogout]);

  const closeCard = useCallback(() => {
    setActiveCard(null);
    setFormData((prev) => ({
      ...prev,
      senhaAtual: "",
      novaSenha: "",
      confirmarSenha: "",
    }));
  }, []);

  const configOptions = [
    {
      id: "info",
      icon: { bgColor: "bg-blue-100", svg: <InfoIcon /> },
      title: "Informações da Clínica",
      description: "Atualize os dados da sua clínica",
      buttonText: "Editar",
      buttonColor: "blue",
    },
    {
      id: "password",
      icon: { bgColor: "bg-yellow-100", svg: <LockIcon /> },
      title: "Alterar Senha",
      description: "Modifique sua senha de acesso",
      buttonText: "Alterar",
      buttonColor: "yellow",
    },
    {
      id: "delete",
      icon: { bgColor: "bg-red-100", svg: <DeleteIcon /> },
      title: "Deletar Conta",
      description: "Remover permanentemente a conta da clínica",
      buttonText: "Deletar",
      buttonColor: "red",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <Header
        userName={storedData.currentUser || "Administrador"}
        userData={storedData.userData}
        onLogout={onLogout}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Configurações da Clínica
          </h1>
          <p className="text-gray-600 mt-2">
            Gerencie as informações e configurações da sua clínica
          </p>
        </div>

        <div className="grid gap-6 mb-8">
          {configOptions.map((option) => (
            <ConfigCard
              key={option.id}
              {...option}
              onClick={() => setActiveCard(option.id)}
            />
          ))}
        </div>

        {/* Info Modal */}
        <Modal
          isOpen={activeCard === "info"}
          onClose={closeCard}
          title="Editar Informações da Clínica"
          headerColor="bg-blue-500"
        >
          <div className="p-6 space-y-4">
            <InputField
              label="Nome da Clínica"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              userType={storedData.userType}
              placeholder="Digite o nome da clínica"
            />
            <InputField
              label="Telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleInputChange}
              userType={storedData.userType}
              placeholder="Digite o telefone"
            />
            <InputField
              label="CNPJ"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleInputChange}
              userType={storedData.userType}
              placeholder="Digite o CNPJ"
              readOnly
              disabled
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              userType={storedData.userType}
              placeholder="Digite o email"
              readOnly
              disabled
            />
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="secondary" size="sm" onClick={closeCard}>
                Cancelar
              </Button>
              <Button variant="blue" size="sm" onClick={handleSaveInfo}>
                Salvar Alterações
              </Button>
            </div>
          </div>
        </Modal>

        {/* Password Modal */}
        <Modal
          isOpen={activeCard === "password"}
          onClose={closeCard}
          title="Alterar Senha"
          headerColor="bg-yellow-500"
        >
          <div className="p-6 space-y-4">
            {["senhaAtual", "novaSenha", "confirmarSenha"].map((field) => (
              <InputField
                key={field}
                label={
                  field === "senhaAtual"
                    ? "Senha Atual"
                    : field === "novaSenha"
                    ? "Nova Senha"
                    : "Confirmar Nova Senha"
                }
                type="password"
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                userType={storedData.userType}
                placeholder={`Digite sua ${
                  field === "confirmarSenha"
                    ? "confirmação da nova"
                    : field.replace("Atual", "atual").replace("Nova", "nova")
                } senha`}
              />
            ))}
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="secondary" size="sm" onClick={closeCard}>
                Cancelar
              </Button>
              <Button variant="yellow" size="sm" onClick={handleSavePassword}>
                Alterar Senha
              </Button>
            </div>
          </div>
        </Modal>

        {/* Delete Modal */}
        <Modal
          isOpen={activeCard === "delete"}
          onClose={closeCard}
          title="Deletar Conta da Clínica"
          headerColor="bg-red-500"
        >
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <WarningIcon />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    Atenção!
                  </h3>
                  <p className="text-gray-600">
                    Esta ação não pode ser desfeita.
                  </p>
                </div>
              </div>
              <p className="text-gray-700">
                Ao deletar a conta da clínica, todos os dados serão
                permanentemente removidos, incluindo:
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
                <li>Dados da clínica</li>
                <li>Médicos cadastrados</li>
                <li>Histórico de consultas</li>
                <li>Informações de pacientes</li>
              </ul>
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="secondary" size="sm" onClick={closeCard}>
                Cancelar
              </Button>
              <Button variant="red" size="sm" onClick={handleDeleteAccount}>
                Deletar Conta
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

// Icon Components
const InfoIcon = () => (
  <svg
    className="w-6 h-6 text-blue-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-4 0H9m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v12m4 0V9"
    />
  </svg>
);

const LockIcon = () => (
  <svg
    className="w-6 h-6 text-yellow-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg
    className="w-6 h-6 text-red-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const WarningIcon = () => (
  <svg
    className="w-12 h-12 text-red-500 mr-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.232 16.5c-.77.833.192 2.5 1.732 2.5z"
    />
  </svg>
);

export default ClinicProfile;
