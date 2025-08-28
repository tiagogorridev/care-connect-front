import { useState } from "react";
import Button from "../../components/shared/others/Button.jsx";
import Card from "../../components/shared/others/AuthCard.jsx";
import InputField from "../../components/shared/others/InputField.jsx";

const ForgotPassword = ({ onSwitchToSignIn }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsEmailSent(true);
      setIsLoading(false);
    }, 2000);
  };

  const resetForm = () => {
    setIsEmailSent(false);
    setIsLoading(false);
  };

  // CORREÇÃO: Garantir que onSwitchToSignIn sempre existe
  const handleBackToLogin = () => {
    if (typeof onSwitchToSignIn === "function") {
      onSwitchToSignIn();
    } else {
      // Fallback para navegação direta
      window.location.href = "/signin";
    }
  };

  if (isEmailSent) {
    return (
      <Card subtitle="Código enviado!">
        <div className="text-center space-y-4">
          <div className="text-gray-600">
            <p>
              Enviamos um código para{" "}
              <strong className="text-green-600">{email}</strong>
            </p>
            <p className="text-sm mt-2">
              Verifique sua caixa de entrada e spam. O código expira em 15
              minutos.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Button variant="primary" size="full" onClick={resetForm}>
              Reenviar código
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToLogin}
              type="button"
            >
              Voltar ao login
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card subtitle="Recuperar senha">
      <p className="text-center text-gray-600 text-sm mb-6">
        Digite seu email e enviaremos um código para redefinir sua senha.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="full"
          disabled={isLoading}
        >
          {isLoading ? "Enviando..." : "Enviar código"}
        </Button>
      </form>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleBackToLogin}
        className="w-full mt-6 text-sm"
        type="button"
      >
        Lembrou da senha? Fazer login
      </Button>
    </Card>
  );
};

export default ForgotPassword;
