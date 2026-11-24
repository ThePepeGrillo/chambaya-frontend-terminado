import { Link } from "react-router-dom";
import { LoginForm } from "../components/auth/LoginForm";
import { AuthLayout } from "../components/layout/AuthLayout";

export function LoginPage() {
  return (
    <AuthLayout>
      <h1>Iniciar sesión</h1>
      <LoginForm />
      <p className="cambio-pagina">
        ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
      </p>
    </AuthLayout>
  );
}
