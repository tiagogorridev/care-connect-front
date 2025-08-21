import { useState } from "react";
import { toast } from 'react-toastify';
import Button from "../../components/Button.jsx";
import Card from "../../components/AuthCard.jsx";
import InputField from "../../components/InputField.jsx";
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

    // Validação de senhas
    if (formData.senha !== formData.confirmPassword) {
      toast.error("As senhas não coincidem", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Validação de campos obrigatórios
    if (!formData.nome || !formData.email || !formData.senha || !formData.cpf) {
      toast.warn("Por favor, preencha todos os campos obrigatórios", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);

    // Toast de loading usando promise
    const signupPromise = new Promise(async (resolve, reject) => {
      try {
        const { confirmPassword, ...userData } = formData;
        const response = await api.post("/users/signup", userData);
        
        console.log("Usuário criado:", response.data);
        resolve(response.data);
      } catch (error) {
        console.error("Erro no cadastro:", error);
        reject(error);
      }
    });

    toast.promise(
      signupPromise,
      {
        pending: 'Criando sua conta...',
        success: {
          render() {
            // Limpar formulário após sucesso
            setFormData({
              nome: "",
              email: "",
              senha: "",
              confirmPassword: "",
              telefone: "",
              cpf: "",
              tipo: "PACIENTE",
            });

            // Redirecionar para login após 2 segundos
            setTimeout(() => {
              onSwitchToSignIn();
            }, 2000);

            return 'Conta criada com sucesso! Redirecionando...';
          }
        },
        error: {
          render({ data }) {
            return data.response?.data?.error || "Erro ao criar conta";
          }
        }
      },
      {
        position: "top-right",
        autoClose: 3000,
      }
    );

    try {
      await signupPromise;
    } catch (error) {
      // Erro já tratado pelo toast.promise
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
          
        />

        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="seu@email.com"
          
        />

        <InputField
          label="CPF"
          type="text"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          placeholder="000.000.000-00"
          
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
          
        />

        <InputField
          label="Confirmar Senha"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirme sua senha"
          
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