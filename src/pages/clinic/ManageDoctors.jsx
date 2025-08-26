import React, { useState, useEffect, useCallback, useMemo } from "react";
import { UserPlus, Search, Filter } from "lucide-react";
import { useLocation } from "react-router-dom";
import Button from "../../components/shared/others/Button";
import DoctorCard from "../../components/shared/others/DoctorCard";
import DoctorForm from "../../components/clinic/DoctorForm";
import DoctorDetailsModal from "../../components/shared/others/DoctorDetailsModal";
import {
  DOCTORS,
  FORM_SPECIALTIES,
  FORM_LOCATIONS,
} from "../../data/doctorsMockData";

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState(DOCTORS);
  const [filteredDoctors, setFilteredDoctors] = useState(DOCTORS);
  const [showForm, setShowForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const location = useLocation();

  // Abrir formulário se vier da navegação
  useEffect(() => {
    if (location.state?.openForm) {
      setShowForm(true);
    }
  }, [location.state?.openForm]);

  // Filtrar médicos baseado nos filtros ativos
  useEffect(() => {
    let filtered = doctors;

    // Filtro por texto de busca
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por especialidade
    if (selectedSpecialty !== "all") {
      filtered = filtered.filter(
        (doctor) => doctor.specialty === selectedSpecialty
      );
    }

    // Filtro por localização
    if (selectedLocation !== "all") {
      filtered = filtered.filter(
        (doctor) => doctor.location === selectedLocation
      );
    }

    setFilteredDoctors(filtered);
  }, [doctors, searchTerm, selectedSpecialty, selectedLocation]);

  const handleSaveDoctor = useCallback((newDoctor) => {
    const doctorWithId = {
      id: Date.now(),
      ...newDoctor,
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      rating: (4.5 + Math.random() * 0.4).toFixed(1), // Rating aleatório entre 4.5 e 4.9
      reviews: Math.floor(Math.random() * 200) + 50, // Reviews aleatórias entre 50 e 250
      nextAvailable: "Disponível hoje",
    };

    setDoctors((prev) => [...prev, doctorWithId]);
    setShowForm(false);
  }, []);

  const handleEditDoctor = useCallback((doctorId, updatedData) => {
    setDoctors((prev) =>
      prev.map((doctor) =>
        doctor.id === doctorId ? { ...doctor, ...updatedData } : doctor
      )
    );
  }, []);

  const handleDeleteDoctor = useCallback((doctorId) => {
    if (window.confirm("Tem certeza que deseja remover este médico?")) {
      setDoctors((prev) => prev.filter((doctor) => doctor.id !== doctorId));
      setSelectedDoctor(null);
    }
  }, []);

  const handleViewProfile = useCallback((doctor) => {
    setSelectedDoctor(doctor);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedDoctor(null);
  }, []);

  const toggleForm = useCallback(() => {
    setShowForm((prev) => !prev);
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedSpecialty("all");
    setSelectedLocation("all");
  }, []);

  const hasDoctors = useMemo(() => doctors.length > 0, [doctors.length]);
  const hasFilteredResults = useMemo(
    () => filteredDoctors.length > 0,
    [filteredDoctors.length]
  );

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Gerenciar Médicos
            </h1>
            <p className="text-gray-600 mt-1">
              Adicione, edite ou remova médicos da sua clínica ({doctors.length}{" "}
              médicos)
            </p>
          </div>
          {!showForm && (
            <Button
              variant="blue"
              size="md"
              onClick={toggleForm}
              className="flex items-center gap-2"
            >
              <UserPlus size={20} />
              <span>Cadastrar Médico</span>
            </Button>
          )}
        </div>

        {/* Form Section */}
        {showForm && (
          <div className="mb-8">
            <DoctorForm
              onSave={handleSaveDoctor}
              onCancel={toggleForm}
              specialties={FORM_SPECIALTIES}
              locations={FORM_LOCATIONS}
            />
          </div>
        )}

        {/* Filters Section */}
        {hasDoctors && !showForm && (
          <FiltersSection
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedSpecialty={selectedSpecialty}
            setSelectedSpecialty={setSelectedSpecialty}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            onClearFilters={clearFilters}
            specialties={FORM_SPECIALTIES}
            locations={FORM_LOCATIONS}
          />
        )}

        {/* Results Section */}
        {hasDoctors ? (
          hasFilteredResults ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onViewProfile={handleViewProfile}
                  onEdit={handleEditDoctor}
                  onDelete={handleDeleteDoctor}
                  showActions
                />
              ))}
            </div>
          ) : (
            <NoResultsFound onClearFilters={clearFilters} />
          )
        ) : (
          <EmptyDoctorsList onShowForm={toggleForm} />
        )}
      </div>

      <DoctorDetailsModal
        doctor={selectedDoctor}
        onClose={handleCloseModal}
        onEdit={handleEditDoctor}
        onDelete={handleDeleteDoctor}
        showActions
      />
    </>
  );
};

const FiltersSection = React.memo(
  ({
    searchTerm,
    setSearchTerm,
    selectedSpecialty,
    setSelectedSpecialty,
    selectedLocation,
    setSelectedLocation,
    onClearFilters,
    specialties,
    locations,
  }) => {
    const hasActiveFilters =
      searchTerm || selectedSpecialty !== "all" || selectedLocation !== "all";

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar médicos por nome, especialidade ou hospital..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Specialty Filter */}
          <div className="lg:w-48">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todas as especialidades</option>
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div className="lg:w-48">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todas as regiões</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="secondary"
              size="md"
              onClick={onClearFilters}
              className="flex items-center gap-2"
            >
              <Filter size={16} />
              Limpar Filtros
            </Button>
          )}
        </div>
      </div>
    );
  }
);

FiltersSection.displayName = "FiltersSection";

const EmptyDoctorsList = React.memo(({ onShowForm }) => (
  <div className="text-center py-12">
    <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
      <UserPlus size={32} className="text-gray-400" />
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">
      Nenhum médico cadastrado
    </h3>
    <p className="text-gray-600 mb-4">
      Comece cadastrando o primeiro médico da sua clínica.
    </p>
    <Button
      variant="primary"
      size="md"
      onClick={onShowForm}
      className="flex items-center gap-2 mx-auto"
    >
      <UserPlus size={20} />
      <span>Cadastrar Primeiro Médico</span>
    </Button>
  </div>
));

EmptyDoctorsList.displayName = "EmptyDoctorsList";

const NoResultsFound = React.memo(({ onClearFilters }) => (
  <div className="text-center py-12">
    <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
      <Search size={32} className="text-gray-400" />
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">
      Nenhum médico encontrado
    </h3>
    <p className="text-gray-600 mb-4">
      Tente ajustar os filtros de busca para encontrar médicos.
    </p>
    <Button
      variant="secondary"
      size="md"
      onClick={onClearFilters}
      className="flex items-center gap-2 mx-auto"
    >
      <Filter size={20} />
      <span>Limpar Filtros</span>
    </Button>
  </div>
));

NoResultsFound.displayName = "NoResultsFound";

export default ManageDoctors;
