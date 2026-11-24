import { Link, useSearchParams } from "react-router-dom";
import { RestablecerPasswordForm } from "../components/auth/RestablecerPasswordForm";
import { AuthLayout } from "../components/layout/AuthLayout";
import { Alert } from "../components/ui/Alert";

// Se llega desde el enlace del correo: /restablecer?token=...
export function RestablecerPasswordPage() {
  const [parametros] = useSearchParams();
  const token = parametros.get("token");

  return (
    <AuthLayout>
      <h1>Elige una contraseña nueva</h1>
      {token ? (
        <RestablecerPasswordForm token={token} />
      ) : (
        <>
          <Alert>El enlace no es válido: falta el código. Pide uno nuevo.</Alert>
          <Link to="/olvide-contrasena" className="btn btn--primario btn--bloque">
            Pedir un enlace nuevo
          </Link>
        </>
      )}
    </AuthLayout>
  );
}
