import Header from "../../components/shared/others/Header.jsx";
import {
  Users,
  Calendar,
  Activity,
  Building2,
  UserCheck,
  AlertCircle,
  DollarSign,
  Shield,
  Settings,
  BarChart3,
} from "lucide-react";

const AdminHome = ({ userName, userData, onLogout }) => {
  const adminStats = {
    totalClinics: 25,
    totalDoctors: 150,
    totalPatients: 3250,
    todayAppointments: 89,
    monthlyRevenue: 125000,
    systemHealth: 98.5,
    activeUsers: 1580,
    pendingApprovals: 12,
  };

  const recentActivity = [
    {
      id: 1,
      type: "clinic_registration",
      message: 'Nova clínica "Saúde Total" cadastrada',
      time: "2 horas atrás",
      status: "pending",
    },
    {
      id: 2,
      type: "doctor_approval",
      message: "Dr. João Silva aprovado para a Clínica Central",
      time: "4 horas atrás",
      status: "approved",
    },
    {
      id: 3,
      type: "system_alert",
      message: "Manutenção programada para domingo às 02:00",
      time: "6 horas atrás",
      status: "info",
    },
    {
      id: 4,
      type: "revenue",
      message: "Meta mensal de faturamento atingida em 85%",
      time: "1 dia atrás",
      status: "success",
    },
  ];

  const pendingApprovals = [
    {
      id: 1,
      type: "clinic",
      name: "Clínica Bem Viver",
      requestDate: "28/08/2025",
      description: "Solicitação de cadastro de nova clínica",
    },
    {
      id: 2,
      type: "doctor",
      name: "Dra. Maria Oliveira",
      requestDate: "27/08/2025",
      description: "Solicitação de credenciamento médico",
    },
    {
      id: 3,
      type: "clinic",
      name: "Centro Médico Norte",
      requestDate: "26/08/2025",
      description: "Solicitação de cadastro de nova clínica",
    },
  ];

  const topClinics = [
    { name: "Clínica Central", appointments: 245, revenue: 35000 },
    { name: "Hospital Santa Maria", appointments: 198, revenue: 28000 },
    { name: "Clínica Vida", appointments: 167, revenue: 22000 },
    { name: "Centro Médico Sul", appointments: 134, revenue: 18500 },
    { name: "Clínica Esperança", appointments: 89, revenue: 12000 },
  ];

  const getActivityIcon = (type) => {
    const icons = {
      clinic_registration: Building2,
      doctor_approval: UserCheck,
      system_alert: AlertCircle,
      revenue: DollarSign,
    };
    return icons[type] || Activity;
  };

  const getActivityColor = (status) => {
    const colors = {
      pending: "text-yellow-600 bg-yellow-100",
      approved: "text-green-600 bg-green-100",
      info: "text-blue-600 bg-blue-100",
      success: "text-green-600 bg-green-100",
    };
    return colors[status] || "text-gray-600 bg-gray-100";
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="space-y-8">
      {/* Header corrigido com todas as props necessárias */}
      <Header
        userName={userName}
        userData={userData}
        onLogout={onLogout}
        userType="admin"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Bem-vindo, {userName}
          </h1>
          <p className="text-gray-600 mt-2">
            Painel administrativo do sistema de gerenciamento de clínicas
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total de Clínicas
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {adminStats.totalClinics}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total de Médicos
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {adminStats.totalDoctors}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total de Pacientes
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {adminStats.totalPatients.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <UserCheck className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Consultas Hoje
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {adminStats.todayAppointments}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Revenue and System Health */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Faturamento Mensal
              </h3>
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600 mb-2">
              {formatCurrency(adminStats.monthlyRevenue)}
            </p>
            <p className="text-sm text-gray-600">
              +12% em relação ao mês anterior
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Saúde do Sistema
              </h3>
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600 mb-2">
              {adminStats.systemHealth}%
            </p>
            <p className="text-sm text-gray-600">
              Todos os serviços operacionais
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Usuários Ativos
              </h3>
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600 mb-2">
              {adminStats.activeUsers.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Nas últimas 24 horas</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Ações Rápidas
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 text-center hover:bg-gray-50 rounded-lg transition-colors">
              <Building2 className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">
                Gerenciar Clínicas
              </span>
            </button>
            <button className="flex flex-col items-center p-4 text-center hover:bg-gray-50 rounded-lg transition-colors">
              <Users className="h-8 w-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">
                Gerenciar Usuários
              </span>
            </button>
            <button className="flex flex-col items-center p-4 text-center hover:bg-gray-50 rounded-lg transition-colors">
              <BarChart3 className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">
                Relatórios
              </span>
            </button>
            <button className="flex flex-col items-center p-4 text-center hover:bg-gray-50 rounded-lg transition-colors">
              <Settings className="h-8 w-8 text-orange-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">
                Configurações
              </span>
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Approvals */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Aprovações Pendentes
                <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {adminStats.pendingApprovals}
                </span>
              </h3>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Ver todas
              </button>
            </div>
            <div className="space-y-3">
              {pendingApprovals.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.type === "clinic"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {item.type === "clinic" ? "Clínica" : "Médico"}
                        </span>
                        <span className="text-xs text-gray-500">
                          {item.requestDate}
                        </span>
                      </div>
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700">
                        Aprovar
                      </button>
                      <button className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700">
                        Rejeitar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Atividade Recente
              </h3>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Ver todas
              </button>
            </div>
            <div className="space-y-3">
              {recentActivity.map((activity) => {
                const IconComponent = getActivityIcon(activity.type);
                const colorClasses = getActivityColor(activity.status);
                return (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${colorClasses}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Performing Clinics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Top 5 Clínicas do Mês
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-sm font-medium text-gray-600">
                    Clínica
                  </th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">
                    Consultas
                  </th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">
                    Faturamento
                  </th>
                </tr>
              </thead>
              <tbody>
                {topClinics.map((clinic, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            index === 0
                              ? "bg-yellow-100 text-yellow-800"
                              : index === 1
                              ? "bg-gray-100 text-gray-800"
                              : index === 2
                              ? "bg-orange-100 text-orange-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <span className="font-medium text-gray-900">
                          {clinic.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-700">
                      {clinic.appointments}
                    </td>
                    <td className="py-3 text-gray-700">
                      {formatCurrency(clinic.revenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminHome;
