import { useState } from "react";
import { toast } from "react-toastify";
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Por favor, digite seu email");
      return false;
    }
    if (!formData.senha.trim()) {
      toast.error("Por favor, digite sua senha");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await authService.signin(formData.email, formData.senha);
      const { user } = response.data;

      if (!user || !user.tipo) {
        toast.error(
          "Erro: Dados do usuário inválidos. Entre em contato com o suporte."
        );
        return;
      }

      const typeMap = {
        paciente: "patient",
        clinica: "clinic",
        admin: "admin",
      };
      const userTypeRaw = user.tipo.toLowerCase().trim();
      const userType = typeMap[userTypeRaw] || userTypeRaw;

      const validTypes = ["admin", "clinic", "patient"];
      if (!validTypes.includes(userType)) {
        toast.error(
          `Erro: Tipo de usuário inválido. Entre em contato com o suporte.`
        );
        return;
      }

      const userName = user.nome;

      const userDataForApp = {
        ...user,
        userType: userType,
        loginType: "backend",
        rememberMe: formData.rememberMe,
        loginTimestamp: new Date().toISOString(),
        accessToken: response.data.accessToken || user.accessToken,
        refreshToken: response.data.refreshToken || user.refreshToken,
      };

      toast.success(`Bem-vindo, ${userName}!`);

      if (onSignIn) {
        onSignIn(userName, userDataForApp);
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || "Erro desconhecido";

        switch (status) {
          case 401:
            toast.error("Email ou senha incorretos");
            break;
          case 404:
            toast.error("Usuário não encontrado");
            break;
          case 403:
            toast.error("Acesso negado. Verifique suas credenciais.");
            break;
          case 500:
            toast.error(
              "Erro interno do servidor. Tente novamente mais tarde."
            );
            break;
          default:
            toast.error(`Erro: ${message}`);
        }
      } else if (error.request) {
        toast.error(
          "Erro de conexão. Verifique sua internet e tente novamente."
        );
      } else {
        toast.error("Erro ao fazer login. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.info("Entrando com Google...");

    const googleUserData = {
      email: "usuario@gmail.com",
      nome: "Usuário Google",
      userType: "patient",
      loginType: "google",
      loginTimestamp: new Date().toISOString(),
    };

    if (onSignIn) {
      onSignIn("Usuário Google", googleUserData);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      handleSubmit(e);
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
          onKeyPress={handleKeyPress}
          placeholder="seu@email.com"
          required
          disabled={loading}
        />

        <InputField
          label="Senha"
          type="password"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Sua senha"
          required
          disabled={loading}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              disabled={loading}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded disabled:opacity-50"
            />
            <span className="ml-2 text-sm text-gray-600">Lembrar de mim</span>
          </label>

          <Button
            variant="ghost"
            size="sm"
            onClick={onForgotPassword}
            disabled={loading}
            type="button"
          >
            Esqueceu a senha?
          </Button>
        </div>

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
        type="button"
      >
        <span className="mr-3 text-lg">G</span>
        Continuar com Google
      </Button>

      <p className="text-center mt-6 text-sm text-green-700">
        Não tem uma conta?{" "}
        <Button
          variant="ghost"
          size="sm"
          onClick={onSwitchToSignUp}
          disabled={loading}
          type="button"
        >
          Cadastre-se aqui
        </Button>
      </p>
    </Card>
  );
};

export default SignIn;
