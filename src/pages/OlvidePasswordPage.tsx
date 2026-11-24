import { Link } from "react-router-dom";
import { OlvidePasswordForm } from "../components/auth/OlvidePasswordForm";
import { AuthLayout } from "../components/layout/AuthLayout";

export function OlvidePasswordPage() {
  return (
    <AuthLayout>
      <h1>¿Olvidaste tu contraseña?</h1>
      <OlvidePasswordForm />
      <p className="cambio-pagina">
        <Link to="/login">Volver a iniciar sesión</Link>
      </p>
    </AuthLayout>
  );
}
