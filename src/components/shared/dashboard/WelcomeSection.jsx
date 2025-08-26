import React from "react";
import Button from "../others/Button";
import { UserPlus, Plus } from "lucide-react";

const WelcomeSection = React.memo(({ userName, onNavigateToAction }) => {
  // Pega o userType do localStorage
  const getUserType = () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      return userData?.userType || "patient";
    } catch {
      return "patient";
    }
  };

  const userType = getUserType();
  const isPatient = userType === "patient";

  // Configurações baseadas no tipo de usuário
  const config = {
    patient: {
      bgColor: "bg-gradient-to-r from-green-600 to-emerald-600",
      textColor: "text-white",
      subtitleColor: "text-green-100",
      greeting: `Olá, ${userName}! 👋`,
      description:
        "Como está sua saúde hoje? Aqui você pode gerenciar suas consultas e cuidar do seu bem-estar.",
      buttonText: "Nova Consulta",
      buttonIcon: <Plus size={20} />,
    },
    clinic: {
      bgColor: "bg-blue-500",
      textColor: "text-white",
      subtitleColor: "text-white",
      greeting: `Olá, ${userName}! 👋`,
      description:
        "Gerencie sua clínica, agendamentos e equipe de forma eficiente.",
      buttonText: "Gerenciar Médicos",
      buttonIcon: <UserPlus size={20} />,
    },
  };

  const currentConfig = config[userType] || config.patient;

  return (
    <div
      className={`${currentConfig.bgColor} rounded-2xl p-8 ${
        !isPatient ? "border border-gray-200 shadow-sm" : ""
      }`}
    >
      <h2 className={`text-3xl font-bold mb-2 ${currentConfig.textColor}`}>
        {currentConfig.greeting}
      </h2>
      <p className={`${currentConfig.subtitleColor} mb-6`}>
        {currentConfig.description}
      </p>
      <Button
        variant={isPatient ? "primary" : "blue"}
        size="md"
        className="flex items-center space-x-2"
        onClick={onNavigateToAction}
      >
        {currentConfig.buttonIcon}
        <span>{currentConfig.buttonText}</span>
      </Button>
    </div>
  );
});

WelcomeSection.displayName = "WelcomeSection";

export default WelcomeSection;
