import Modal from "../others/Modal";
import InputField from "../others/InputField";
import Button from "../others/Button";

const PasswordModal = ({
  isOpen,
  onClose,
  userType,
  formData,
  onInputChange,
  onSave,
}) => {
  const getHeaderColor = () => {
    switch (userType) {
      case "admin":
        return "bg-yellow-500";
      case "clinic":
        return "bg-yellow-500";
      case "patient":
        return "bg-yellow-500";
      default:
        return "bg-yellow-500";
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Alterar Senha"
      headerColor={getHeaderColor()}
    >
      <div className="p-6 space-y-4">
        <InputField
          label="Senha Atual"
          type="password"
          name="senhaAtual"
          value={formData.senhaAtual}
          onChange={onInputChange}
          userType={userType}
          placeholder="Digite sua senha atual"
        />
        <InputField
          label="Nova Senha"
          type="password"
          name="novaSenha"
          value={formData.novaSenha}
          onChange={onInputChange}
          userType={userType}
          placeholder="Digite sua nova senha"
        />
        <InputField
          label="Confirmar Nova Senha"
          type="password"
          name="confirmarSenha"
          value={formData.confirmarSenha}
          onChange={onInputChange}
          userType={userType}
          placeholder="Confirme sua nova senha"
        />
        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="yellow" size="sm" onClick={onSave}>
            Alterar Senha
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PasswordModal;
