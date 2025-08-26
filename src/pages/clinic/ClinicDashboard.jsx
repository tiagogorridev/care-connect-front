import React, { useMemo, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Calendar, Users, BarChart2 } from "lucide-react";
import ClinicNavigation from "../../components/clinic/ClinicNavigation.jsx";
import ManageDoctors from "./ManageDoctors.jsx";
import { mockData } from "../../data/index.js";
import { DOCTORS } from "../../data/doctorsMockData.js";
import Header from "../../components/shared/others/Header";
import WelcomeSection from "../../components/shared/dashboard/WelcomeSection.jsx";
import StatsSection from "../../components/shared/dashboard/StatsSection.jsx";
import QuickActionsSection from "../../components/shared/dashboard/QuickActionsSection.jsx";
import RecentActivitySection from "../../components/shared/dashboard/RecentActivitySection.jsx";

const ClinicDashboard = ({ userName, userData, onLogout }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
    <Header userName={userName} userData={userData} onLogout={onLogout} />
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ClinicNavigation />
      <Routes>
        <Route index element={<HomeView userName={userName} />} />
        <Route path="doctors" element={<ManageDoctors />} />
      </Routes>
    </main>
  </div>
);

const HomeView = ({ userName }) => {
  const navigate = useNavigate();
  const { upcomingAppointments = [], recentAppointments = [] } = mockData || {};

  const statsData = useMemo(
    () => [
      {
        icon: Calendar,
        iconColor: "text-blue-600",
        bgColor: "bg-blue-100",
        value: upcomingAppointments.length || 8,
        label: "Consultas Agendadas",
      },
      {
        icon: Users,
        iconColor: "text-blue-600",
        bgColor: "bg-blue-100",
        value: DOCTORS.length,
        label: "Médicos Cadastrados",
      },
      {
        icon: BarChart2,
        iconColor: "text-purple-600",
        bgColor: "bg-purple-100",
        value:
          (upcomingAppointments.length || 8) +
          (recentAppointments.length || 12),
        label: "Total de Atendimentos",
      },
    ],
    [upcomingAppointments.length, recentAppointments.length]
  );

  const quickActions = useMemo(
    () => [
      {
        id: "doctors",
        title: "Equipe Médica",
        description: "Gerencie médicos e especialidades",
        buttonText: "Ver Médicos",
        onClick: () => navigate("/clinic/doctors"),
      },
    ],
    [navigate]
  );

  const handleNavigateToDoctors = useCallback(() => {
    navigate("/clinic/doctors");
  }, [navigate]);

  return (
    <div className="space-y-8">
      <WelcomeSection
        userName={userName}
        onNavigateToDoctors={handleNavigateToDoctors}
      />
      <StatsSection statsData={statsData} />
      <QuickActionsSection quickActions={quickActions} />
      <RecentActivitySection />
    </div>
  );
};

export default ClinicDashboard;
