import { useState } from "react";
import Button from "../components/Button.jsx";
import Card from "../components/AuthCard.jsx";
import InputField from "../components/InputField.jsx";

const SignUp = ({ onSwitchToSignIn }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }

    console.log("Dados do cadastro:", formData);
  };

  const handleGoogleSignup = () => {
    console.log("Cadastro com Google");
  };

  return (
    <Card subtitle="Cuidando da sua saúde">
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Nome Completo"
          type="text"
          name="name"
          value={formData.name}
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
          label="Senha"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Sua senha"
          required
        />

        <InputField
          label="Confirmar Senha"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirme sua senha"
          required
        />

        <Button type="submit" variant="primary" size="full">
          Criar Conta
        </Button>
      </form>

      <div className="mt-6 flex items-center">
        <div className="flex-1 border-t border-gray-200" />
        <div className="px-4 text-sm text-gray-500">ou</div>
        <div className="flex-1 border-t border-gray-200" />
      </div>

      <Button
        variant="secondary"
        size="full"
        className="flex items-center justify-center mt-6"
        onClick={handleGoogleSignup}
      >
        <span className="mr-3 text-lg">G</span>
        Continuar com Google
      </Button>

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
