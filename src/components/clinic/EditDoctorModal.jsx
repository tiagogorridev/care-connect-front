import { useState, useEffect } from "react";
import { X, User, Save } from "lucide-react";
import Button from "../shared/others/Button.jsx";
import InputField from "../shared/others/InputField.jsx";

const EditDoctorModal = ({ doctor, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    crm: "",
    phone: "",
    email: "",
    hospital: "",
    location: "",
    price: "",
    nextAvailable: "",
    bio: "",
    image: "",
    rating: "",
    reviews: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Preenche o formulário com os dados do médico
  useEffect(() => {
    if (doctor) {
      setFormData({
        name: doctor.name || "",
        specialty: doctor.specialty || "",
        crm: doctor.crm || "",
        phone: doctor.phone || "",
        email: doctor.email || "",
        hospital: doctor.hospital || "",
        location: doctor.location || "",
        price: doctor.price || "",
        nextAvailable: doctor.nextAvailable || "",
        bio: doctor.bio || "",
        image: doctor.image || "",
        rating: doctor.rating || "",
        reviews: doctor.reviews || "",
      });
    }
  }, [doctor]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Remove erro do campo quando usuário começa a digitar
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!formData.specialty.trim()) {
      newErrors.specialty = "Especialidade é obrigatória";
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.price.trim()) {
      newErrors.price = "Preço é obrigatório";
    }

    if (!formData.hospital.trim()) {
      newErrors.hospital = "Hospital/Clínica é obrigatório";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Localização é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simula uma requisição para a API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedDoctor = {
        ...doctor,
        ...formData,
        id: doctor.id, // Mantém o ID original
      };

      onSave(updatedDoctor);
    } catch (error) {
      console.error("Erro ao salvar médico:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Editar Médico
              </h2>
              <p className="text-sm text-gray-600">
                Atualize as informações do médico
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Informações Básicas */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Informações Básicas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <InputField
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Digite o nome completo"
                  error={errors.name}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Especialidade *
                </label>
                <InputField
                  type="text"
                  value={formData.specialty}
                  onChange={(e) =>
                    handleInputChange("specialty", e.target.value)
                  }
                  placeholder="Ex: Cardiologia"
                  error={errors.specialty}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CRM
                </label>
                <InputField
                  type="text"
                  value={formData.crm}
                  onChange={(e) => handleInputChange("crm", e.target.value)}
                  placeholder="Ex: CRM/SP 123456"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preço da Consulta *
                </label>
                <InputField
                  type="text"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="Ex: R$ 250"
                  error={errors.price}
                />
              </div>
            </div>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Contato</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <InputField
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <InputField
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="medico@email.com"
                  error={errors.email}
                />
              </div>
            </div>
          </div>

          {/* Local de Trabalho */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Local de Trabalho
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hospital/Clínica *
                </label>
                <InputField
                  type="text"
                  value={formData.hospital}
                  onChange={(e) =>
                    handleInputChange("hospital", e.target.value)
                  }
                  placeholder="Nome do hospital ou clínica"
                  error={errors.hospital}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Localização *
                </label>
                <InputField
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  placeholder="Cidade, Estado"
                  error={errors.location}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Próximo Horário Disponível
                </label>
                <InputField
                  type="text"
                  value={formData.nextAvailable}
                  onChange={(e) =>
                    handleInputChange("nextAvailable", e.target.value)
                  }
                  placeholder="Ex: Hoje às 14:30"
                />
              </div>
            </div>
          </div>

          {/* Avaliação */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Avaliação
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nota (0-5)
                </label>
                <InputField
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => handleInputChange("rating", e.target.value)}
                  placeholder="Ex: 4.8"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Avaliações
                </label>
                <InputField
                  type="number"
                  min="0"
                  value={formData.reviews}
                  onChange={(e) => handleInputChange("reviews", e.target.value)}
                  placeholder="Ex: 156"
                />
              </div>
            </div>
          </div>

          {/* Biografia */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Biografia/Resumo Profissional
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Descreva a experiência e especialidades do médico..."
            />
          </div>

          {/* URL da Imagem */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL da Imagem
            </label>
            <InputField
              type="url"
              value={formData.image}
              onChange={(e) => handleInputChange("image", e.target.value)}
              placeholder="https://exemplo.com/foto.jpg"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="min-w-[120px]"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Salvando...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>Salvar</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDoctorModal;
