import { Bell, Plus, Search, Calendar, FileText } from "lucide-react";
import AppointmentCard from "../components/AppointmentCard";
import Button from "../components/Button";
import { mockData, NOTIFICATION_TYPES } from "../data/index.js";

const Home = ({ userName }) => {
  const {
    upcomingAppointments,
    recentAppointments,
    notifications,
    quickActions,
  } = mockData;
  const iconMap = { Search, Calendar, FileText };

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

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Olá, {userName}! 👋</h2>
        <p className="text-green-100 mb-6">
          Como está sua saúde hoje? Aqui você pode gerenciar suas consultas e
          cuidar do seu bem-estar.
        </p>
        <Button
          variant="primary"
          size="md"
          className="flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Nova Consulta</span>
        </Button>
      </div>

      {/* Quick Actions */}
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions
            .filter((action) => action.icon !== "MessageCircle")
            .map((action, index) => {
              const Icon = iconMap[action.icon];
              return (
                <Button
                  key={index}
                  variant="card"
                  size="md"
                  className="group flex flex-col items-center"
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
      </section>

      {/* Upcoming Appointments */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            Próximas Consultas
          </h3>
          <Button variant="ghost" size="sm">
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
        {/* Recent Appointments */}
        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Histórico Recente
          </h3>
          <div className="space-y-4">
            {recentAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                isUpcoming={false}
              />
            ))}
          </div>
        </section>

        {/* Notifications */}
        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Notificações</h3>
          <div className="space-y-3">
            {notifications.map((notification) => {
              const { bg, text } = getNotificationStyles(notification.type);
              return (
                <div
                  key={notification.id}
                  className="bg-white rounded-lg p-4 border border-gray-200 hover:bg-gray-50 transition-colors"
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
        </section>
      </div>
    </div>
  );
};

export default Home;
