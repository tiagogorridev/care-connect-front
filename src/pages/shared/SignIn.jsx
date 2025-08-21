import { useState } from "react";
import Button from "../../components/Button.jsx";
import Card from "../../components/AuthCard.jsx";
import InputField from "../../components/InputField.jsx";
import { authService } from "../../services/authService.js";

const SignIn = ({ onSwitchToSignUp, onForgotPassword, onSignIn }) => {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    rememberMe: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.senha) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await authService.signin(formData.email, formData.senha);

      console.log("Login realizado:", response.data);

      const { user } = response.data;

      localStorage.setItem("user", JSON.stringify(user));

      if (onSignIn) {
        onSignIn(user.nome, {
          ...user,
          loginType: "backend",
          rememberMe: formData.rememberMe,
        });
      }
    } catch (error) {
      console.error("Erro no login:", error);

      if (error.response?.status === 401) {
        setError("Email ou senha incorretos");
      } else if (error.response?.status === 500) {
        setError("Erro no servidor. Tente novamente");
      } else {
        setError(error.response?.data?.error || "Erro ao fazer login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    if (onSignIn) {
      onSignIn("Usuário Google", {
        email: "usuario@gmail.com",
        loginType: "google",
      });
    }
  };

  return (
    <Card subtitle="Bem-vindo de volta!">
      <form onSubmit={handleSubmit} className="space-y-6">
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
          type="password"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
          placeholder="Sua senha"
          required
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">Lembrar de mim</span>
          </label>

          <Button variant="ghost" size="sm" onClick={onForgotPassword}>
            Esqueceu a senha?
          </Button>
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
            {error}
          </div>
        )}

        <Button type="submit" variant="primary" size="full" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
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
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        <span className="mr-3 text-lg">G</span>
        Continuar com Google
      </Button>

      <p className="text-center mt-6 text-sm text-green-700">
        Não tem uma conta?{" "}
        <Button variant="ghost" size="sm" onClick={onSwitchToSignUp}>
          Cadastre-se aqui
        </Button>
      </p>
    </Card>
  );
};

export default SignIn;
