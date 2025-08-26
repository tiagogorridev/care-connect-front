import Modal from "../others/Modal";
import InputField from "../others/InputField";
import Button from "../others/Button";

const InfoModal = ({
  isOpen,
  onClose,
  userType,
  formData,
  onInputChange,
  onSave,
}) => {
  const getTitle = () => {
    switch (userType) {
      case "admin":
        return "Editar Informações do Administrador";
      case "clinic":
        return "Editar Informações da Clínica";
      case "patient":
        return "Alterar Nome";
      default:
        return "Editar Informações";
    }
  };

  const getHeaderColor = () => {
    switch (userType) {
      case "admin":
        return "bg-purple-500";
      case "clinic":
        return "bg-blue-500";
      case "patient":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={getTitle()}
      headerColor={getHeaderColor()}
    >
      <div className="p-6 space-y-4">
        <InputField
          label={userType === "patient" ? "Nome Completo" : "Nome"}
          name="nome"
          value={formData.nome}
          onChange={onInputChange}
          userType={userType}
          placeholder={
            userType === "patient"
              ? "Digite seu nome completo"
              : `Digite o nome ${
                  userType === "admin" ? "do administrador" : "da clínica"
                }`
          }
        />

        {userType !== "patient" && (
          <>
            <InputField
              label="Telefone"
              name="telefone"
              value={formData.telefone}
              onChange={onInputChange}
              userType={userType}
              placeholder="Digite o telefone"
            />

            <InputField
              label={userType === "admin" ? "CPF" : "CNPJ"}
              name={userType === "admin" ? "cpf" : "cnpj"}
              value={userType === "admin" ? formData.cpf : formData.cnpj}
              onChange={onInputChange}
              userType={userType}
              placeholder={`Digite o ${userType === "admin" ? "CPF" : "CNPJ"}`}
              readOnly={true}
              disabled={true}
            />

            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={onInputChange}
              userType={userType}
              placeholder="Digite o email"
              readOnly={true}
              disabled={true}
            />
          </>
        )}

        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant={
              userType === "admin"
                ? "purple"
                : userType === "clinic"
                ? "blue"
                : "green"
            }
            size="sm"
            onClick={onSave}
          >
            Salvar Alterações
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default InfoModal;
