import { useMemo, useCallback } from "react";
import { Home, Users } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../shared/others/Button.jsx";

const ClinicNavigation = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navItems = useMemo(
    () => [
      { path: "", label: "Início", icon: Home },
      { path: "doctors", label: "Médicos", icon: Users },
    ],
    []
  );

  const isActive = useCallback(
    (path) => {
      if (path === "") {
        return (
          pathname.endsWith("/clinic") || pathname.endsWith("/clinic/home")
        );
      }
      return pathname.endsWith(`/${path}`);
    },
    [pathname]
  );

  const handleNavigation = useCallback(
    (path) => {
      navigate(path === "" ? "/clinic" : `/clinic/${path}`);
    },
    [navigate]
  );

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="flex gap-3 bg-white rounded-xl p-2 shadow-sm border border-gray-200">
        {navItems.map(({ path, label, icon: Icon }) => {
          const active = isActive(path);
          return (
            <Button
              key={path}
              onClick={() => handleNavigation(path)}
              variant={active ? "blue" : "ghost"}
              size="sm"
              className={`flex items-center space-x-2 ${
                active
                  ? "!bg-blue-100 text-white !border-blue-200 shadow-sm"
                  : "!text-gray-600 hover:!text-gray-800 hover:!bg-gray-50 hover:!no-underline"
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export default ClinicNavigation;
