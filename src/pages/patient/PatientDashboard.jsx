import { Routes, Route } from "react-router-dom";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/shared/others/Header.jsx";
import Navigation from "../../components/patient/PatientNavigation.jsx";
import AppointmentCard from "../../components/shared/others/AppointmentCard.jsx";
import Button from "../../components/shared/others/Button.jsx";
import WelcomeSection from "../../components/shared/dashboard/WelcomeSection.jsx";
import QuickActionsSection from "../../components/shared/dashboard/QuickActionsSection.jsx";
import StatsSection from "../../components/shared/dashboard/StatsSection.jsx";
import RecentActivitySection from "../../components/shared/dashboard/RecentActivitySection.jsx";
import Appointments from "./Appointments";
import SearchDoctors from "./SearchDoctors";
import PatientNotifications from "./PatientNotifications";
import ConsultationDetails from "./ConsultationDetails.jsx"; // Adicione esta linha
import { NOTIFICATION_TYPES, mockData } from "../../data/index.js";

const PatientDashboard = ({ userName, userData, onLogout }) => {
  const navigate = useNavigate();
  const { upcomingAppointments, notifications } = mockData;

  const getNotificationStyles = (type) => {
    const styles = {
      [NOTIFICATION_TYPES.REMINDER]: {
        bg: "bg-yellow-100",
        text: "text-yellow-600",
      },
      [NOTIFICATION_TYPES.CONFIRMATION]: {
        bg: "bg-green-100",
        text: "text-green-600",
      },
      default: { bg: "bg-red-100", text: "text-red-600" },
    };
    return styles[type] || styles.default;
  };

  const handleNavigate = (route) => {
    navigate(route);
  };

  const handleWelcomeAction = () => {
    navigate("/patient/appointments");
  };

  // Componente Home integrado
  const HomeContent = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <WelcomeSection
        userName={userName}
        onNavigateToAction={handleWelcomeAction}
      />

      {/* Stats Section */}
      <StatsSection />

      {/* Quick Actions */}
      <QuickActionsSection onNavigate={handleNavigate} />

      {/* Upcoming Appointments */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            Próximas Consultas
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/patient/appointments")}
          >
            Ver todas
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {upcomingAppointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      </section>

      {/* Recent Activity & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <RecentActivitySection />

        {/* Notifications */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Notificações</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/patient/notifications")}
            >
              Ver todas
            </Button>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="space-y-3">
              {notifications.slice(0, 3).map((notification) => {
                const { bg, text } = getNotificationStyles(notification.type);
                return (
                  <div
                    key={notification.id}
                    className="hover:bg-gray-50 transition-colors rounded-lg p-3 cursor-pointer"
                    onClick={() => navigate("/patient/notifications")}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${bg}`}>
                        <Bell size={16} className={text} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <Header
        userName={userName}
        userData={userData}
        onLogout={onLogout}
        userType="patient"
      />
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route
            path="/appointments"
            element={<Appointments mockData={mockData} />}
          />
          <Route
            path="/appointments/details/:id"
            element={<ConsultationDetails />}
          />
          <Route path="/search" element={<SearchDoctors />} />
          <Route path="/notifications" element={<PatientNotifications />} />
        </Routes>
      </main>
    </div>
  );
};

export default PatientDashboard;
