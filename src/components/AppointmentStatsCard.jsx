const AppointmentStatsCard = ({
  icon: Icon,
  iconColor,
  bgColor,
  value,
  label,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center space-x-3">
        <div className={`${bgColor} p-3 rounded-full`}>
          <Icon className={iconColor} size={24} />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-gray-600 text-sm">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentStatsCard;
