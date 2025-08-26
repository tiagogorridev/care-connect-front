import { X, Mail, Phone, Award, MapPin } from "lucide-react";
import Button from "./Button";

const DoctorDetailsModal = ({ doctor, onClose }) => {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-blue-200"
            />
            <h2 className="text-2xl font-bold text-gray-900">{doctor.name}</h2>
            <p className="text-blue-600 font-medium text-lg">
              {doctor.specialty}
            </p>
          </div>

          <div className="space-y-4 text-left">
            <div className="flex items-center">
              <Award size={20} className="text-gray-500 mr-3 shrink-0" />
              <span className="text-gray-700">
                <strong>CRM:</strong> {doctor.crm || "Não informado"}
              </span>
            </div>

            {doctor.email && (
              <div className="flex items-center">
                <Mail size={20} className="text-gray-500 mr-3 shrink-0" />
                <span className="text-gray-700 break-all">{doctor.email}</span>
              </div>
            )}

            {doctor.phone && (
              <div className="flex items-center">
                <Phone size={20} className="text-gray-500 mr-3 shrink-0" />
                <span className="text-gray-700">{doctor.phone}</span>
              </div>
            )}

            {doctor.location && (
              <div className="flex items-center">
                <MapPin size={20} className="text-gray-500 mr-3 shrink-0" />
                <span className="text-gray-700">{doctor.location}</span>
              </div>
            )}
          </div>

          {doctor.experience && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">
                Informações Adicionais
              </h3>
              <p className="text-gray-600 text-sm">{doctor.experience}</p>
            </div>
          )}

          <div className="mt-6 flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
            <Button variant="blue">Editar</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailsModal;
