import Modal from "../others/Modal";
import Button from "../others/Button";

const DeleteModal = ({ isOpen, onClose, userType, onDelete }) => {
  const getTitle = () => {
    switch (userType) {
      case "admin":
        return "Deletar Conta do Administrador";
      case "clinic":
        return "Deletar Conta da Clínica";
      case "patient":
        return "Deletar Conta";
      default:
        return "Deletar Conta";
    }
  };

  const getHeaderColor = () => {
    switch (userType) {
      case "admin":
        return "bg-red-500";
      case "clinic":
        return "bg-red-500";
      case "patient":
        return "bg-red-500";
      default:
        return "bg-red-500";
    }
  };

  const getEntityName = () => {
    switch (userType) {
      case "admin":
        return "do administrador";
      case "clinic":
        return "da clínica";
      case "patient":
        return "do paciente";
      default:
        return "";
    }
  };

  const getDeleteItems = () => {
    switch (userType) {
      case "admin":
        return [
          "Dados pessoais do administrador",
          "Histórico de ações administrativas",
          "Configurações do sistema",
          "Acesso a funcionalidades administrativas",
        ];
      case "clinic":
        return [
          "Dados da clínica",
          "Médicos cadastrados",
          "Histórico de consultas",
          "Informações de pacientes",
        ];
      case "patient":
        return [
          "Histórico de consultas",
          "Informações pessoais",
          "Configurações da conta",
        ];
      default:
        return [];
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={getTitle()}
      headerColor={getHeaderColor()}
    >
      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center mb-4">
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
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Atenção!
              </h3>
              <p className="text-gray-600">Esta ação não pode ser desfeita.</p>
            </div>
          </div>
          <p className="text-gray-700">
            Ao deletar {getEntityName()}, todos os dados serão permanentemente
            removidos, incluindo:
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
            {getDeleteItems().map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end space-x-3">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="red" size="sm" onClick={onDelete}>
            Deletar Conta
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
