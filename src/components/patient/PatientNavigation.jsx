import { Home, Calendar, Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../shared/others/Button";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/patient", label: "Início", icon: Home },
    { path: "/patient/appointments", label: "Consultas", icon: Calendar },
    { path: "/patient/search", label: "Buscar", icon: Search },
  ];

  const isActive = (path) => {
    if (path === "/patient") {
      return (
        location.pathname === "/patient" || location.pathname === "/patient/"
      );
    }
    return location.pathname === path;
  };

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="flex gap-3 bg-white rounded-xl p-2 shadow-sm border border-gray-200">
        {navItems.map(({ path, label, icon: Icon }) => (
          <Button
            key={path}
            onClick={() => navigate(path)}
            variant={isActive(path) ? "secondary" : "ghost"}
            size="sm"
            className={`flex items-center space-x-2 ${
              isActive(path)
                ? "!bg-green-100 !text-green-700 !border-green-200 shadow-sm"
                : "!text-gray-600 hover:!text-gray-800 hover:!bg-gray-50 hover:!no-underline"
            }`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
