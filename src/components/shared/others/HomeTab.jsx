import WelcomeSection from "./WelcomeSection";
import QuickActions from "./QuickActions";
import AppointmentCard from "../AppointmentCard";
import Notifications from "./Notifications";
import Button from "./Button";

const HomeTab = ({
  userName,
  quickActions,
  upcomingAppointments,
  recentAppointments,
  notifications,
}) => (
  <div className="space-y-8">
    <WelcomeSection userName={userName} />
    <QuickActions actions={quickActions} />

    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Próximas Consultas</h3>
        <Button variant="ghost" size="sm">
          Ver todas
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {upcomingAppointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
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
      </div>
      <Notifications notifications={notifications} />
    </div>
  </div>
);

export default HomeTab;
