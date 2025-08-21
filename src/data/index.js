export const APPOINTMENT_STATUS = {
  CONFIRMED: "Confirmada",
  COMPLETED: "Concluída",
  PENDING: "Pendente",
  CANCELLED: "Cancelada",
};

export const NOTIFICATION_TYPES = {
  REMINDER: "reminder",
  CONFIRMATION: "confirmation",
  CANCELLATION: "cancellation",
};

export const mockData = {
  upcomingAppointments: [
    {
      id: 1,
      doctor: "Dr. Maria Santos",
      specialty: "Cardiologia",
      clinic: "Clínica São Paulo",
      date: "2025-08-25",
      time: "14:30",
      address: "Rua das Flores, 123 - Centro",
    },
    {
      id: 2,
      doctor: "Dr. Carlos Lima",
      specialty: "Dermatologia",
      clinic: "Clínica Medicina Avançada",
      date: "2025-08-28",
      time: "09:00",
      address: "Av. Paulista, 456 - Bela Vista",
    },
  ],

  recentAppointments: [
    {
      id: 3,
      doctor: "Dr. Ana Rodrigues",
      specialty: "Clínico Geral",
      date: "2025-08-15",
      rating: 5,
      status: "Concluída",
    },
  ],

  notifications: [
    {
      id: 1,
      message: "Lembrete: Consulta com Dr. Maria Santos amanhã às 14:30",
      type: "reminder",
      time: "2h atrás",
    },
    {
      id: 2,
      message: "Sua consulta foi confirmada pela Clínica São Paulo",
      type: "confirmation",
      time: "1 dia atrás",
    },
  ],

  quickActions: [
    { icon: "Search", label: "Buscar Médicos", color: "bg-green-500" },
    { icon: "Calendar", label: "Meus Agendamentos", color: "bg-blue-500" },
    { icon: "MessageCircle", label: "Chat Clínica", color: "bg-purple-500" },
    { icon: "FileText", label: "Histórico Médico", color: "bg-orange-500" },
  ],
};
