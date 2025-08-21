import { Home, Calendar, Search } from "lucide-react";
import Button from "../Button";

const Navigation = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: "home", label: "Início", icon: Home },
    { id: "appointments", label: "Consultas", icon: Calendar },
    { id: "search", label: "Buscar", icon: Search },
  ];

  return (
    <nav className="flex gap-3 mb-8 bg-white rounded-xl p-2 shadow-sm border border-gray-200">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <div className="">
            <Button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              variant={isActive ? "secondary" : "ghost"}
              size="sm"
              className={`flex ${
                isActive
                  ? "!bg-green-100 !text-green-700 !border-green-200 shadow-sm"
                  : "!text-gray-600 hover:!text-gray-800 hover:!bg-gray-50 hover:!no-underline"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Button>
          </div>
        );
      })}
    </nav>
  );
};

export default Navigation;
