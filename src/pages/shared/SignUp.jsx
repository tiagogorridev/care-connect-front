import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../components/shared/others/Button.jsx";
import Card from "../../components/shared/others/AuthCard.jsx";
import InputField from "../../components/shared/others/InputField.jsx";
import api from "../../services/apiService.js";

const SignUp = ({ onSwitchToSignIn }) => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmPassword: "",
    telefone: "",
    cpf: "",
    tipo: "PACIENTE",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    if (!formData.nome || !formData.email || !formData.senha || !formData.cpf) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...userData } = formData;
      await api.post("/users/signup", userData);

      toast.success("Conta criada com sucesso! Redirecionando...");

      setFormData({
        nome: "",
        email: "",
        senha: "",
        confirmPassword: "",
        telefone: "",
        cpf: "",
        tipo: "PACIENTE",
      });

      setTimeout(() => onSwitchToSignIn?.(), 2000);
    } catch (error) {
      toast.error(error.response?.data?.error || "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card subtitle="Cuidando da sua saúde">
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Nome Completo"
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          placeholder="Seu nome completo"
          required
        />

        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="seu@email.com"
          required
        />

        <InputField
          label="CPF"
          type="text"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          placeholder="000.000.000-00"
          required
        />

        <InputField
          label="Telefone"
          type="tel"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          placeholder="(11) 99999-9999"
        />

        <InputField
          label="Senha"
          type="password"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
          placeholder="Sua senha"
          required
        />

        <InputField
          label="Confirmar Senha"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirme sua senha"
          required
        />

        <Button type="submit" variant="primary" size="full" disabled={loading}>
          {loading ? "Criando conta..." : "Criar Conta"}
        </Button>
      </form>

      <p className="text-center mt-6 text-sm text-green-700">
        Já tem uma conta?{" "}
        <Button variant="ghost" size="sm" onClick={onSwitchToSignIn}>
          Fazer login
        </Button>
      </p>
    </Card>
  );
};

export default SignUp;
