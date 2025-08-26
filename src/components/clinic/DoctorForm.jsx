import { useState } from "react";
import { FORM_SPECIALTIES } from "../../data/doctorsMockData.js";

const Button = ({ children, type, variant, onClick, disabled }) => {
  const variants = {
    blue: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
}) => (
  <div className="w-full">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label}
    </label>
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

const DoctorForm = ({ onSave, onCancel, doctor = {} }) => {
  const [formData, setFormData] = useState({
    name: doctor.name || "",
    specialty: doctor.specialty || "",
    crm: doctor.crm || "",
    email: doctor.email || "",
    phone: doctor.phone || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      onSave(formData);
      setLoading(false);
      setFormData({ name: "", specialty: "", crm: "", email: "", phone: "" });
    }, 1000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full max-w-lg mx-auto my-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {doctor.id ? "Editar Médico" : "Cadastrar Novo Médico"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Nome Completo"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nome do Médico"
          required
        />

        <div className="w-full">
          <label
            htmlFor="specialty"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Especialidade
          </label>
          <select
            id="specialty"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Selecione a especialidade</option>
            {FORM_SPECIALTIES.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>

        <InputField
          label="CRM"
          name="crm"
          value={formData.crm}
          onChange={handleChange}
          placeholder="Ex: CRM/SP 123456"
          required
        />

        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email@exemplo.com"
        />

        <InputField
          label="Telefone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(00) 00000-0000"
        />

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button type="submit" variant="blue" disabled={loading}>
            {loading ? "Salvando..." : "Salvar Médico"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DoctorForm;
