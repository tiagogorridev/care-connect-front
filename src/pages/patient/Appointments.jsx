import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Filter, Calendar, Clock } from "lucide-react";
import AppointmentCard from "../../components/shared/others/AppointmentCard.jsx";
import Button from "../../components/shared/others/Button.jsx";
import InputField from "../../components/shared/others/InputField.jsx";
import AppointmentStatsCard from "../../components/shared/others/AppointmentStatsCard.jsx";
import { mockData } from "../../data/index.js";

const Appointments = () => {
  const navigate = useNavigate();
  const { upcomingAppointments = [], recentAppointments = [] } = mockData;
  const [activeFilter, setActiveFilter] = useState("todas");
  const [searchTerm, setSearchTerm] = useState("");

  const validUpcomingAppointments = upcomingAppointments.filter((app) => app);
  const validRecentAppointments = recentAppointments.filter((app) => app);

  const filters = [
    {
      id: "todas",
      label: "Todas",
      count: validUpcomingAppointments.length + validRecentAppointments.length,
    },
    {
      id: "proximas",
      label: "Próximas",
      count: validUpcomingAppointments.length,
    },
    {
      id: "passadas",
      label: "Passadas",
      count: validRecentAppointments.length,
    },
  ];

  const statsData = [
    {
      icon: Calendar,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
      value: validUpcomingAppointments.length,
      label: "Próximas Consultas",
    },
    {
      icon: Clock,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
      value: validRecentAppointments.length,
      label: "Consultas Realizadas",
    },
    {
      icon: Plus,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
      value: validUpcomingAppointments.length + validRecentAppointments.length,
      label: "Total de Consultas",
    },
  ];

  const filterAppointments = (appointments) => {
    if (!searchTerm) return appointments;
    return appointments.filter(
      (app) =>
        app.doctor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getAppointments = () => {
    const upcoming = filterAppointments(validUpcomingAppointments);
    const recent = filterAppointments(validRecentAppointments);

    switch (activeFilter) {
      case "proximas":
        return upcoming;
      case "passadas":
        return recent;
      default:
        return [...upcoming, ...recent];
    }
  };

  const getTitle = () => {
    const titles = {
      proximas: "Próximas Consultas",
      passadas: "Consultas Passadas",
      todas: "Todas as Consultas",
    };
    return titles[activeFilter];
  };

  const appointments = getAppointments();
  const isEmpty = appointments.length === 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Minhas Consultas</h1>
          <p className="text-gray-600 mt-1">
            Gerencie suas consultas médicas e acompanhe seu histórico
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => navigate("/patient/search")}
        >
          Agendar Nova Consulta
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <InputField
              type="text"
              placeholder="Buscar consultas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statsData.map((stat, index) => (
          <AppointmentStatsCard key={`stat-${index}`} {...stat} />
        ))}
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">{getTitle()}</h2>
        {!isEmpty ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                isUpcoming={activeFilter !== "passadas"}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm
                ? "Nenhuma consulta encontrada"
                : "Nenhuma consulta encontrada"}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm
                ? `Nenhuma consulta corresponde à busca "${searchTerm}"`
                : activeFilter === "proximas"
                ? "Você não tem consultas agendadas no momento."
                : activeFilter === "passadas"
                ? "Você ainda não realizou nenhuma consulta."
                : "Você não tem nenhuma consulta registrada."}
            </p>
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate("/patient/search")}
            >
              Agendar Nova Consulta
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
