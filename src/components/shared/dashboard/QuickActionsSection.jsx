import React from "react";
import { Search, Calendar, FileText } from "lucide-react";
import Button from "../others/Button";

const QuickActionsSection = React.memo(({ onNavigate }) => {
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
  const getQuickActions = () => {
    if (isPatient) {
      return [
        {
          id: 1,
          icon: Search,
          label: "Buscar Médicos",
          color: "bg-blue-500",
          route: "/patient/search",
        },
        {
          id: 2,
          icon: Calendar,
          label: "Minhas Consultas",
          color: "bg-green-500",
          route: "/patient/appointments",
        },
        {
          id: 3,
          icon: FileText,
          label: "Histórico",
          color: "bg-purple-500",
          route: "/patient/history",
        },
      ];
    } else {
      return [
        {
          id: 1,
          title: "Gerenciar Médicos",
          description: "Adicione ou edite informações dos médicos",
          buttonText: "Acessar",
          route: "/clinic/doctors",
        },
        {
          id: 2,
          title: "Relatórios",
          description: "Visualize estatísticas e relatórios",
          buttonText: "Ver Relatórios",
          route: "/clinic/reports",
        },
      ];
    }
  };

  const quickActions = getQuickActions();

  const handleAction = (action) => {
    if (onNavigate && action.route) {
      onNavigate(action.route);
    }
  };

  return (
    <section>
      <h3 className="text-xl font-bold text-gray-800 mb-4">Ações Rápidas</h3>

      {isPatient ? (
        // Layout para pacientes - cards com ícones
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.id}
                variant="card"
                size="md"
                className="group flex flex-col items-center"
                onClick={() => handleAction(action)}
              >
                <div
                  className={`${action.color} rounded-full p-4 mx-auto mb-3 group-hover:scale-110 transition-transform`}
                >
                  <Icon size={24} className="text-white" />
                </div>
                <p className="font-medium text-gray-800">{action.label}</p>
              </Button>
            );
          })}
        </div>
      ) : (
        // Layout para clínicas - cards horizontais
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <div
              key={action.id}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {action.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAction(action)}
                  className="shrink-0"
                >
                  {action.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
});

QuickActionsSection.displayName = "QuickActionsSection";

export default QuickActionsSection;
