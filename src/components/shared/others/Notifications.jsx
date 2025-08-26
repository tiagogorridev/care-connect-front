import { Bell } from "lucide-react";

const Notifications = ({ notifications }) => (
  <div>
    <h3 className="text-xl font-bold text-gray-800 mb-4">Notificações</h3>
    <div className="space-y-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-white rounded-lg p-4 border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-start space-x-3">
            <div
              className={`p-2 rounded-full ${
                notification.type === "reminder"
                  ? "bg-yellow-100"
                  : "bg-green-100"
              }`}
            >
              <Bell
                size={16}
                className={
                  notification.type === "reminder"
                    ? "text-yellow-600"
                    : "text-green-600"
                }
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-800">{notification.message}</p>
              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Notifications;
