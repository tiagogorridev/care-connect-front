import React from "react";
import { Users, Calendar, BarChart2 } from "lucide-react";

const ActivityItem = React.memo(({ title, description, time, type }) => {
  const getIcon = () => {
    switch (type) {
      case "doctor":
        return <Users className="w-5 h-5 text-blue-600" />;
      case "appointment":
        return <Calendar className="w-5 h-5 text-green-600" />;
      case "report":
        return <BarChart2 className="w-5 h-5 text-purple-600" />;
      default:
        return <Calendar className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex-shrink-0 mt-1">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{title}</p>
        <p className="text-sm text-gray-500 truncate">{description}</p>
      </div>
      <div className="flex-shrink-0">
        <span className="text-xs text-gray-400">{time}</span>
      </div>
    </div>
  );
});

export default ActivityItem;
