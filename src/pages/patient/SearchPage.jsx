import { useState } from "react";
import { Search } from "lucide-react";
import Button from "../../components/Button";
import DoctorCard from "../../components/DoctorCard";
import InputField from "../../components/InputField";
import { DOCTORS, SPECIALTIES } from "../../data/doctorsMockData";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const filteredDoctors = DOCTORS.filter((doctor) => {
    const searchMatch =
      !searchTerm ||
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());

    const specialtyMatch =
      !selectedSpecialty || doctor.specialty === selectedSpecialty;

    return searchMatch && specialtyMatch;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSpecialty("");
  };

  const availableSpecialties = SPECIALTIES.filter(
    (s) => s !== "Todas as especialidades"
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Buscar Médicos</h1>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
        <InputField
          label="Buscar Médico"
          placeholder="Digite o nome do médico ou especialidade..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Especialidade
          </label>
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
          >
            <option value="">Todas as especialidades</option>
            {availableSpecialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-gray-600">
        {filteredDoctors.length} médico{filteredDoctors.length !== 1 ? "s" : ""}{" "}
        encontrado{filteredDoctors.length !== 1 ? "s" : ""}
      </p>

      {/* Results */}
      <div className="space-y-4">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))
        ) : (
          <div className="text-center py-12">
            <Search className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum médico encontrado
            </h3>
            <Button variant="secondary" size="md" onClick={clearFilters}>
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
