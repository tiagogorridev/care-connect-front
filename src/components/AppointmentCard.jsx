import { APPOINTMENT_STATUS } from "../data/index.js";

const AppointmentCard = ({ appointment, isUpcoming = true }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case APPOINTMENT_STATUS.CONFIRMED:
        return "bg-green-100 text-green-800";
      case APPOINTMENT_STATUS.PENDING:
        return "bg-yellow-100 text-yellow-800";
      case APPOINTMENT_STATUS.COMPLETED:
        return "bg-gray-100 text-gray-800";
      case APPOINTMENT_STATUS.CANCELLED:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bold text-lg text-gray-800">
            {appointment.doctor}
          </h4>
          <p className="text-gray-600">{appointment.specialty}</p>
          {appointment.clinic && (
            <p className="text-sm text-gray-500">{appointment.clinic}</p>
          )}
        </div>
        {appointment.status && (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
              appointment.status
            )}`}
          >
            {appointment.status}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-gray-600">
        <div className="flex items-center space-x-4">
          <span>{appointment.date}</span>
          <span>{appointment.time}</span>
        </div>

        {appointment.rating && (
          <div className="flex items-center space-x-1">
            <span className="text-yellow-500">★</span>
            <span className="text-sm">{appointment.rating}</span>
          </div>
        )}
      </div>

      {appointment.address && (
        <p className="text-sm text-gray-500 mt-2">{appointment.address}</p>
      )}
    </div>
  );
};

export default AppointmentCard;
