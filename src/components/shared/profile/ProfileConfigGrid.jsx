import ConfigCard from "./ConfigCard";

const ProfileConfigGrid = ({ userType, onOptionClick }) => {
  const getConfigOptions = () => {
    const baseOptions = [
      {
        id: "info",
        icon: {
          bgColor: "bg-blue-100",
          svg: (
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          ),
        },
        title:
          userType === "patient"
            ? "Alterar Nome"
            : `Informações ${getEntityName()}`,
        description:
          userType === "patient"
            ? "Atualize seu nome de exibição"
            : `Atualize os dados ${getEntityName()}`,
        buttonText: userType === "patient" ? "Alterar" : "Editar",
        buttonColor: "blue",
      },
      {
        id: "password",
        icon: {
          bgColor: "bg-yellow-100",
          svg: (
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
          ),
        },
        title: "Alterar Senha",
        description: "Modifique sua senha de acesso",
        buttonText: "Alterar",
        buttonColor: "yellow",
      },
      {
        id: "delete",
        icon: {
          bgColor: "bg-red-100",
          svg: (
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
          ),
        },
        title: "Deletar Conta",
        description: `Remover permanentemente ${getEntityName(true)}`,
        buttonText: "Deletar",
        buttonColor: "red",
      },
    ];

    return baseOptions;
  };

  const getEntityName = (withArticle = false) => {
    switch (userType) {
      case "admin":
        return withArticle ? "do administrador" : "do administrador";
      case "clinic":
        return withArticle ? "da clínica" : "da clínica";
      case "patient":
        return withArticle ? "do paciente" : "do paciente";
      default:
        return "";
    }
  };

  return (
    <div className="grid gap-6 mb-8">
      {getConfigOptions().map((option) => (
        <ConfigCard
          key={option.id}
          icon={option.icon}
          title={option.title}
          description={option.description}
          buttonText={option.buttonText}
          buttonColor={option.buttonColor}
          onClick={() => onOptionClick(option.id)}
        />
      ))}
    </div>
  );
};

export default ProfileConfigGrid;
