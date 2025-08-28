import React, { useState } from "react";
import { Bell, Check, Clock, AlertCircle, Calendar, FileText, X } from "lucide-react";

const PatientNotifications = () => {
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "appointment_confirmed",
      title: "Consulta confirmada",
      message: "Sua consulta com Dr. João Silva foi confirmada para 15/09/2024 às 14:30",
      time: "2 horas atrás",
      isRead: false,
      priority: "high"
    },
    {
      id: 2,
      type: "appointment_reminder",
      title: "Lembrete de consulta",
      message: "Sua consulta com Dra. Maria Santos é amanhã às 10:00. Não esqueça!",
      time: "5 horas atrás",
      isRead: false,
      priority: "high"
    },
    {
      id: 3,
      type: "appointment_cancelled",
      title: "Consulta cancelada",
      message: "Sua consulta de hoje às 16:00 foi cancelada. Entre em contato para reagendar.",
      time: "1 dia atrás",
      isRead: true,
      priority: "high"
    },
    {
      id: 4,
      type: "exam_result",
      title: "Resultado de exame disponível",
      message: "O resultado do seu exame de sangue já está disponível no sistema.",
      time: "2 dias atrás",
      isRead: false,
      priority: "medium"
    },
    {
      id: 5,
      type: "prescription_ready",
      title: "Receita disponível",
      message: "Sua receita médica está pronta para retirada na farmácia da clínica.",
      time: "3 dias atrás",
      isRead: true,
      priority: "medium"
    },
    {
      id: 6,
      type: "appointment_scheduled",
      title: "Nova consulta agendada",
      message: "Consulta com Dr. Pedro Costa agendada para 20/09/2024 às 09:15",
      time: "4 dias atrás",
      isRead: true,
      priority: "medium"
    },
    {
      id: 7,
      type: "system_maintenance",
      title: "Manutenção do sistema",
      message: "O sistema estará em manutenção no domingo das 02:00 às 06:00",
      time: "1 semana atrás",
      isRead: true,
      priority: "low"
    }
  ]);

  const getNotificationIcon = (type) => {
    const iconMap = {
      appointment_confirmed: <Check size={20} />,
      appointment_reminder: <Clock size={20} />,
      appointment_cancelled: <X size={20} />,
      appointment_scheduled: <Calendar size={20} />,
      exam_result: <FileText size={20} />,
      prescription_ready: <FileText size={20} />,
      system_maintenance: <AlertCircle size={20} />
    };
    return iconMap[type] || <Bell size={20} />;
  };

  const getNotificationStyles = (type, priority) => {
    const typeStyles = {
      appointment_confirmed: {
        bg: "bg-green-100",
        text: "text-green-600",
        border: "border-green-200"
      },
      appointment_reminder: {
        bg: "bg-blue-100",
        text: "text-blue-600",
        border: "border-blue-200"
      },
      appointment_cancelled: {
        bg: "bg-red-100",
        text: "text-red-600",
        border: "border-red-200"
      },
      appointment_scheduled: {
        bg: "bg-purple-100",
        text: "text-purple-600",
        border: "border-purple-200"
      },
      exam_result: {
        bg: "bg-orange-100",
        text: "text-orange-600",
        border: "border-orange-200"
      },
      prescription_ready: {
        bg: "bg-teal-100",
        text: "text-teal-600",
        border: "border-teal-200"
      },
      system_maintenance: {
        bg: "bg-gray-100",
        text: "text-gray-600",
        border: "border-gray-200"
      }
    };

    return typeStyles[type] || {
      bg: "bg-gray-100",
      text: "text-gray-600",
      border: "border-gray-200"
    };
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === "all") return true;
    if (filter === "unread") return !notif.isRead;
    if (filter === "high") return notif.priority === "high";
    if (filter === "appointments") return notif.type.includes("appointment");
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notificações</h1>
          <p className="text-gray-600 mt-1">
            {unreadCount > 0 
              ? `Você tem ${unreadCount} notificação${unreadCount > 1 ? 'ões' : ''} não lida${unreadCount > 1 ? 's' : ''}`
              : "Todas as notificações foram lidas"
            }
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Marcar todas como lidas
          </button>
        )}
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "all"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Todas ({notifications.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "unread"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Não lidas ({unreadCount})
          </button>
          <button
            onClick={() => setFilter("high")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "high"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Alta prioridade
          </button>
          <button
            onClick={() => setFilter("appointments")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "appointments"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Consultas
          </button>
        </div>
      </div>

      {/* Lista de Notificações */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <Bell size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma notificação encontrada
            </h3>
            <p className="text-gray-600">
              {filter === "all" 
                ? "Você não tem notificações no momento."
                : "Não há notificações para este filtro."
              }
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => {
            const { bg, text, border } = getNotificationStyles(notification.type, notification.priority);
            
            return (
              <div
                key={notification.id}
                className={`bg-white rounded-lg border shadow-sm transition-all hover:shadow-md ${
                  notification.isRead ? "border-gray-200" : `${border} border-l-4`
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      {/* Ícone */}
                      <div className={`p-3 rounded-full ${bg} ${text} flex-shrink-0`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      {/* Conteúdo */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={`font-semibold ${
                            notification.isRead ? "text-gray-700" : "text-gray-900"
                          }`}>
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                          )}
                          {notification.priority === "high" && (
                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                              Prioridade Alta
                            </span>
                          )}
                        </div>
                        <p className={`text-sm ${
                          notification.isRead ? "text-gray-600" : "text-gray-800"
                        }`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                    
                    {/* Ações */}
                    <div className="flex items-center space-x-2 ml-4">
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                          title="Marcar como lida"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        title="Excluir notificação"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};

export default PatientNotifications;