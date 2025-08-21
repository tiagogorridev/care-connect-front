import { useState } from "react";
import Header from "../../components/ui/Header.jsx";
import Navigation from "../../components/ui/Navigation.jsx";
import Home from "./Home.jsx";
import Appointments from "./Appointments.jsx";
import SearchPage from "./SearchPage.jsx";
import { mockData } from "../../data/index.js";

const PatientDashboard = ({ userName }) => {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = {
    home: <Home userName={userName} />,
    appointments: <Appointments />,
    search: <SearchPage />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Header userName={userName} notifications={mockData.notifications} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        {tabs[activeTab] || tabs.home}
      </main>
    </div>
  );
};

export default PatientDashboard;
