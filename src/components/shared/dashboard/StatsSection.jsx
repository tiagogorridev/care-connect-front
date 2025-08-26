import React from "react";
import { Calendar, Clock, CheckCircle, Users, TrendingUp } from "lucide-react";

const AppointmentStatsCard = React.memo(
  ({ title, value, subtitle, icon: Icon, color, userType }) => {
    // Cores baseadas no tipo de usuário
    const getColorClass = () => {
      if (userType === "patient") {
        switch (color) {
          case "blue":
            return "text-green-600 bg-green-100";
          case "green":
            return "text-emerald-600 bg-emerald-100";
          case "purple":
            return "text-green-700 bg-green-200";
          default:
            return "text-green-600 bg-green-100";
        }
      } else {
        // Cores originais para clínicas
        switch (color) {
          case "blue":
            return "text-blue-600 bg-blue-100";
          case "green":
            return "text-green-600 bg-green-100";
          case "purple":
            return "text-purple-600 bg-purple-100";
          default:
            return "text-blue-600 bg-blue-100";
        }
      }
    };

    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          <div className={`p-3 rounded-full ${getColorClass()}`}>
            <Icon size={24} />
          </div>
        </div>
      </div>
    );
  }
);

const StatsSection = React.memo(({ statsData }) => {
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

  // Stats padrão baseadas no tipo de usuário
  const getDefaultStats = () => {
    if (isPatient) {
      return [
        {
          title: "Próximas Consultas",
          value: "3",
          subtitle: "Este mês",
          icon: Calendar,
          color: "blue",
        },
        {
          title: "Consultas Realizadas",
          value: "12",
          subtitle: "Este ano",
          icon: CheckCircle,
          color: "green",
        },
        {
          title: "Tempo Médio",
          value: "45min",
          subtitle: "Por consulta",
          icon: Clock,
          color: "purple",
        },
      ];
    } else {
      return [
        {
          title: "Total de Médicos",
          value: "15",
          subtitle: "Ativos na clínica",
          icon: Users,
          color: "blue",
        },
        {
          title: "Consultas Hoje",
          value: "24",
          subtitle: "8 em andamento",
          icon: Calendar,
          color: "green",
        },
        {
          title: "Taxa de Ocupação",
          value: "85%",
          subtitle: "+12% vs ontem",
          icon: TrendingUp,
          color: "purple",
        },
      ];
    }
  };

  const displayStats = statsData || getDefaultStats();

  return (
    <section>
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        {isPatient ? "Resumo das Consultas" : "Visão Geral"}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {displayStats.map((stat, index) => (
          <AppointmentStatsCard key={index} {...stat} userType={userType} />
        ))}
      </div>
    </section>
  );
});

StatsSection.displayName = "StatsSection";

export default StatsSection;
