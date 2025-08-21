import { useState } from "react";
import { Plus, Filter, Calendar, Clock, Search } from "lucide-react";
import AppointmentCard from "../components/AppointmentCard";
import Button from "../components/Button";
import InputField from "../components/InputField";
import AppointmentStatsCard from "../components/AppointmentStatsCard";
import { mockData } from "../data/index.js";

const AppointmentsPage = () => {
  const { upcomingAppointments, recentAppointments } = mockData;
  const [activeFilter, setActiveFilter] = useState("todas");

  const filters = [
    {
      id: "todas",
      label: "Todas",
      count: upcomingAppointments.length + recentAppointments.length,
    },
    { id: "proximas", label: "Próximas", count: upcomingAppointments.length },
    { id: "passadas", label: "Passadas", count: recentAppointments.length },
  ];

  const statsData = [
    {
      icon: Calendar,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
      value: upcomingAppointments.length,
      label: "Próximas Consultas",
    },
    {
      icon: Clock,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
      value: recentAppointments.length,
      label: "Consultas Realizadas",
    },
    {
      icon: Plus,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
      value: upcomingAppointments.length + recentAppointments.length,
      label: "Total de Consultas",
    },
  ];

  const getAppointments = () => {
    const upcoming = upcomingAppointments.map((app) => (
      <AppointmentCard key={app.id} appointment={app} isUpcoming />
    ));
    const recent = recentAppointments.map((app) => (
      <AppointmentCard key={app.id} appointment={app} isUpcoming={false} />
    ));

    return activeFilter === "proximas"
      ? upcoming
      : activeFilter === "passadas"
      ? recent
      : [...upcoming, ...recent];
  };

  const getTitle = () =>
    activeFilter === "proximas"
      ? "Próximas Consultas"
      : activeFilter === "passadas"
      ? "Consultas Passadas"
      : "Todas as Consultas";

  const isEmpty =
    (activeFilter === "proximas" && !upcomingAppointments.length) ||
    (activeFilter === "passadas" && !recentAppointments.length);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Minhas Consultas</h1>
          <p className="text-gray-600 mt-1">
            Gerencie suas consultas médicas e acompanhe seu histórico
          </p>
        </div>
        <Button variant="primary" size="md" className={`flex`}>
          <Plus size={20} />
          <span>Agendar Consulta</span>
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <InputField
              type="text"
              placeholder="Buscar consultas..."
              className="!pl-10 !border-gray-300 focus:!ring-green-500 focus:!border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400" size={20} />
            {filters.map((filter) => (
              <Button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                variant={activeFilter === filter.id ? "secondary" : "ghost"}
                size="sm"
                className={
                  activeFilter === filter.id
                    ? "!bg-green-100 !text-green-700 !border-green-200 hover:!no-underline"
                    : "!bg-gray-100 !text-gray-600 hover:!bg-gray-200 hover:!no-underline"
                }
              >
                {filter.label} ({filter.count})
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statsData.map((stat, index) => (
          <AppointmentStatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">{getTitle()}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {getAppointments()}
        </div>

        {isEmpty && (
          <div className="text-center py-12">
            <Calendar className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma consulta encontrada
            </h3>
            <p className="text-gray-600 mb-6">
              {activeFilter === "proximas"
                ? "Você não tem consultas agendadas no momento."
                : "Você ainda não realizou nenhuma consulta."}
            </p>
            <Button variant="primary" size="md">
              Agendar Nova Consulta
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;
