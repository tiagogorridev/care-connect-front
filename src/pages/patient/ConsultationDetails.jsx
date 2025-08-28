import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  User,
  FileText,
  Star,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { APPOINTMENT_STATUS } from "../../data/index.js";
import Button from "../../components/shared/others/Button.jsx";

const ConsultationDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Pega os dados da consulta do state ou poderia buscar por ID
  const { appointment, isUpcoming } = location.state || {};

  if (!appointment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Consulta não encontrada
          </h2>
          <p className="text-gray-600 mb-4">
            Não foi possível carregar os detalhes desta consulta.
          </p>
          <Button
            variant="primary"
            onClick={() => navigate("/patient/appointments")}
          >
            Voltar para Consultas
          </Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case APPOINTMENT_STATUS.CONFIRMED:
        return "bg-green-100 text-green-800";
      case APPOINTMENT_STATUS.PENDING:
        return "bg-yellow-100 text-yellow-800";
      case APPOINTMENT_STATUS.COMPLETED:
        return "bg-gray-100 text-gray-800";
      case APPOINTMENT_STATUS.CANCELLED:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case APPOINTMENT_STATUS.CONFIRMED:
        return <CheckCircle className="w-4 h-4" />;
      case APPOINTMENT_STATUS.PENDING:
        return <Clock className="w-4 h-4" />;
      case APPOINTMENT_STATUS.COMPLETED:
        return <CheckCircle className="w-4 h-4" />;
      case APPOINTMENT_STATUS.CANCELLED:
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/patient/appointments")}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar
              </button>
              <h1 className="text-2xl font-semibold text-gray-900">
                Detalhes da Consulta
              </h1>
            </div>
            {appointment.status && (
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(
                  appointment.status
                )}`}
              >
                {getStatusIcon(appointment.status)}
                <span>{appointment.status}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informações da Consulta */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Informações da Consulta
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Data</p>
                    <p className="font-medium">
                      {appointment.date || "Data não informada"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Horário</p>
                    <p className="font-medium">
                      {appointment.time || "Horário não informado"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Especialidade</p>
                    <p className="font-medium">
                      {appointment.specialty || "Especialidade não informada"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Local</p>
                    <p className="font-medium">
                      {appointment.clinic || "Local não informado"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Localização */}
            {appointment.address && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Localização
                </h2>
                <div className="space-y-2">
                  <p className="text-gray-700">{appointment.address}</p>
                </div>
                <Button variant="secondary" size="sm" className="mt-4">
                  Ver no Mapa
                </Button>
              </div>
            )}

            {/* Informações Adicionais */}
            {(appointment.notes ||
              appointment.symptoms ||
              appointment.medications) && (
              <div className="space-y-6">
                {appointment.notes && (
                  <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                      Observações
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      {appointment.notes}
                    </p>
                  </div>
                )}

                {appointment.symptoms && appointment.symptoms.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                      Sintomas Relatados
                    </h2>
                    <div className="space-y-2">
                      {appointment.symptoms.map((symptom, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                          <span className="text-gray-700">{symptom}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {appointment.medications &&
                  appointment.medications.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Medicamentos
                      </h2>
                      <div className="space-y-3">
                        {appointment.medications.map((medication, index) => (
                          <div
                            key={index}
                            className="bg-blue-50 rounded-lg p-3"
                          >
                            <span className="text-blue-900 font-medium">
                              {medication}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Informações do Médico */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Médico
              </h2>
              <div className="flex items-start space-x-4">
                <div className="w-15 h-15 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {appointment.doctor || "Nome não informado"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {appointment.specialty || "Especialidade não informada"}
                  </p>
                  {appointment.clinic && (
                    <p className="text-sm text-gray-500 mt-1">
                      {appointment.clinic}
                    </p>
                  )}
                  {appointment.rating && (
                    <div className="flex items-center mt-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">
                        {appointment.rating}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Button variant="primary" size="sm" className="w-full">
                  Contatar Médico
                </Button>
                <Button variant="ghost" size="sm" className="w-full">
                  Ver Perfil
                </Button>
              </div>
            </div>

            {/* Ações */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Ações
              </h2>
              <div className="space-y-3">
                {isUpcoming &&
                  appointment.status !== APPOINTMENT_STATUS.CANCELLED && (
                    <>
                      <Button variant="secondary" size="sm" className="w-full">
                        Reagendar Consulta
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full !text-red-600 hover:!bg-red-50"
                      >
                        Cancelar Consulta
                      </Button>
                    </>
                  )}
                <Button variant="ghost" size="sm" className="w-full">
                  Imprimir Detalhes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationDetails;
