import { Link } from "react-router-dom";
import { RegisterForm } from "../components/auth/RegisterForm";
import { AuthLayout } from "../components/layout/AuthLayout";

export function RegisterPage() {
  return (
    <AuthLayout>
      <h1>Crear cuenta</h1>
      <RegisterForm />
      <p className="cambio-pagina">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </AuthLayout>
  );
}
