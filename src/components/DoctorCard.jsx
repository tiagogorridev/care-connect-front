import { Star, MapPin, Clock, Calendar } from "lucide-react";
import Button from "./Button.jsx";

const DoctorCard = ({ doctor }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex items-start space-x-4 flex-1">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
          <p className="text-green-600 font-medium">{doctor.specialty}</p>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Star className="text-yellow-400 fill-current" size={16} />
              <span>
                {doctor.rating} ({doctor.reviews} avaliações)
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="text-gray-400" size={16} />
              <span>{doctor.location}</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">{doctor.hospital}</p>
        </div>
      </div>

      <div className="flex flex-col lg:items-end justify-between space-y-3">
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">{doctor.price}</p>
          <p className="text-sm text-gray-600">por consulta</p>
        </div>
        <div className="text-right lg:text-left">
          <div className="flex items-center space-x-1 text-sm text-gray-600 justify-end lg:justify-start">
            <Clock size={16} className="text-green-600" />
            <span>Próximo horário:</span>
          </div>
          <p className="text-sm font-medium text-green-600">
            {doctor.nextAvailable}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="secondary" size="sm">
            Ver Perfil
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="flex items-center space-x-1"
          >
            <Calendar size={16} />
            <span>Agendar</span>
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default DoctorCard;
