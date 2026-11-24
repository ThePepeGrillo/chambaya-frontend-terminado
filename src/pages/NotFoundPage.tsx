import { Link } from "react-router-dom";
import { AuthLayout } from "../components/layout/AuthLayout";

export function NotFoundPage() {
  return (
    <AuthLayout>
      <h1>Página no encontrada</h1>
      <p>La dirección que buscas no existe.</p>
      <p className="cambio-pagina">
        <Link to="/panel">Volver al inicio</Link>
      </p>
    </AuthLayout>
  );
}
