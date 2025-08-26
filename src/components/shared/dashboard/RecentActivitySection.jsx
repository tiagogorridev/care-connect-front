import React from "react";
import { Bell, Users, Calendar, FileText, BarChart2 } from "lucide-react";

const ActivityItem = React.memo(
  ({ title, description, time, type, userType }) => {
    const getIcon = () => {
      const iconProps = { className: "w-5 h-5" };

      if (userType === "patient") {
        // Cores para paciente (tons de verde)
        switch (type) {
          case "appointment":
            return (
              <Calendar {...iconProps} className="w-5 h-5 text-green-600" />
            );
          case "notification":
            return <Bell {...iconProps} className="w-5 h-5 text-emerald-600" />;
          case "document":
            return (
              <FileText {...iconProps} className="w-5 h-5 text-green-700" />
            );
          default:
            return (
              <Calendar {...iconProps} className="w-5 h-5 text-green-600" />
            );
        }
      } else {
        // Cores para clínica (tons de azul)
        switch (type) {
          case "doctor":
            return <Users {...iconProps} className="w-5 h-5 text-blue-600" />;
          case "appointment":
            return (
              <Calendar {...iconProps} className="w-5 h-5 text-green-600" />
            );
          case "report":
            return (
              <BarChart2 {...iconProps} className="w-5 h-5 text-purple-600" />
            );
          default:
            return (
              <Calendar {...iconProps} className="w-5 h-5 text-gray-600" />
            );
        }
      }
    };

    return (
      <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
        <div className="flex-shrink-0 mt-1">{getIcon()}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{title}</p>
          <p className="text-sm text-gray-500 truncate">{description}</p>
        </div>
        <div className="flex-shrink-0">
          <span className="text-xs text-gray-400">{time}</span>
        </div>
      </div>
    );
  }
);

const RecentActivitySection = React.memo(({ activities }) => {
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

  // Atividades padrão baseadas no tipo de usuário
  const getDefaultActivities = () => {
    if (isPatient) {
      return [
        {
          id: 1,
          title: "Consulta agendada",
          description: "Dr. João Silva - Cardiologia",
          time: "Há 1 hora",
          type: "appointment",
        },
        {
          id: 2,
          title: "Lembrete de consulta",
          description: "Consulta amanhã às 14:00",
          time: "Há 2 horas",
          type: "notification",
        },
        {
          id: 3,
          title: "Resultado de exame",
          description: "Exame de sangue disponível",
          time: "Há 1 dia",
          type: "document",
        },
      ];
    } else {
      return [
        {
          id: 1,
          title: "Dr. João Silva cadastrado",
          description: "Novo médico adicionado à equipe - Cardiologia",
          time: "Há 2 horas",
          type: "doctor",
        },
        {
          id: 2,
          title: "8 consultas agendadas hoje",
          description: "Agenda do dia com boa ocupação",
          time: "Há 3 horas",
          type: "appointment",
        },
      ];
    }
  };

  const displayActivities = activities || getDefaultActivities();

  return (
    <section>
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        {isPatient ? "Atividades Recentes" : "Atividade Recente"}
      </h3>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="space-y-4">
          {displayActivities.map((activity) => (
            <ActivityItem
              key={activity.id}
              title={activity.title}
              description={activity.description}
              time={activity.time}
              type={activity.type}
              userType={userType}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

RecentActivitySection.displayName = "RecentActivitySection";

export default RecentActivitySection;
