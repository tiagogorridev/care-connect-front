import { useState } from "react";
import Button from "../components/Button.jsx";
import Card from "../components/AuthCard.jsx";
import InputField from "../components/InputField.jsx";
import api from "../services/apiService.js";

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
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { confirmPassword, ...userData } = formData;
      const response = await api.post("/users/signup", userData);

      console.log("Usuário criado:", response.data);
      alert("Conta criada com sucesso!");

      setFormData({
        nome: "",
        email: "",
        senha: "",
        confirmPassword: "",
        telefone: "",
        cpf: "",
        tipo: "PACIENTE",
      });

      onSwitchToSignIn();
    } catch (error) {
      console.error("Erro no cadastro:", error);
      setError(error.response?.data?.error || "Erro ao criar conta");
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

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
            {error}
          </div>
        )}

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
