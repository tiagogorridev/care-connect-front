import { Bell, User, LogOut, Building, Shield } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";

const Header = ({ userName, notifications = [], onLogout }) => {
  const { userData } = useAuth();
  const userType = userData?.userType || userData?.tipo?.toLowerCase();
  const navigate = useNavigate();
  const location = useLocation();

  console.log("userData:", userData);
  console.log("userType:", userType);

  const handleLogout = () => {
    localStorage.clear();
    if (onLogout) {
      onLogout();
    } else {
      navigate("/signin");
    }
  };

  const handleProfileClick = () => {
    switch (userType) {
      case "clinic":
        navigate("/clinic/profile");
        break;
      case "admin":
        navigate("/admin/profile");
        break;
      default:
        navigate("/patient/profile");
    }
  };

  const handleHomeClick = () => {
    switch (userType) {
      case "clinic":
        navigate("/clinic");
        break;
      case "admin":
        navigate("/admin");
        break;
      default:
        navigate("/patient");
    }
  };

  // NOVA FUNÇÃO PARA O SININHO DE NOTIFICAÇÕES
  const handleNotificationsClick = () => {
    switch (userType) {
      case "clinic":
        navigate("/clinic/notifications");
        break;
      case "admin":
        navigate("/admin/notifications");
        break;
      default:
        navigate("/patient/notifications");
    }
  };

  const userConfig = {
    patient: {
      icon: (
        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
          <User size={16} className="text-white" />
        </div>
      ),
      colorClass: "bg-green-600",
      label: "Paciente",
    },
    clinic: {
      icon: (
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <Building size={16} className="text-white" />
        </div>
      ),
      colorClass: "bg-blue-600",
      label: "Clínica",
    },
    admin: {
      icon: (
        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
          <Shield size={16} className="text-white" />
        </div>
      ),
      colorClass: "bg-purple-600",
      label: "Administrador",
    },
  };

  const currentConfig = userConfig[userType] || userConfig.patient;

  // SIMULAR NOTIFICAÇÕES NÃO LIDAS (você pode conectar com seus dados reais)
  const unreadNotifications = 3;

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div
            className="flex items-center space-x-4 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleHomeClick}
          >
            <div
              className={`w-10 h-10 bg-gradient-to-r ${
                userType === "clinic"
                  ? "from-blue-500 to-blue-600"
                  : userType === "admin"
                  ? "from-purple-500 to-purple-600"
                  : "from-green-500 to-emerald-600"
              } rounded-full flex items-center justify-center`}
            >
              <img
                src="../assets/icon-heart.png"
                alt="Heart Icon"
                className="w-4 h-4"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 select-none">
              CareConnect
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* BOTÃO DE NOTIFICAÇÕES ATUALIZADO */}
            <button 
              onClick={handleNotificationsClick}
              className={`relative p-2 transition-colors rounded-full ${
                location.pathname.includes('/notifications')
                  ? userType === "clinic"
                    ? 'bg-blue-100 text-blue-600'
                    : userType === "admin"
                    ? 'bg-purple-100 text-purple-600'
                    : 'bg-green-100 text-green-600'
                  : 'text-gray-600 hover:text-red-600 hover:bg-gray-100'
              }`}
              title="Notificações"
            >
              <Bell size={20} />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {unreadNotifications > 9 ? '9+' : unreadNotifications}
                </span>
              )}
            </button>

            <button
              onClick={handleProfileClick}
              className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg transition-colors"
            >
              {currentConfig.icon}
              <div className="flex flex-col items-start">
                <span className="font-medium text-gray-800">{userName}</span>
                <span className="text-xs text-gray-500 capitalize">
                  {currentConfig.label}
                </span>
              </div>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 hover:text-red-600 transition-colors"
              title="Sair"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;