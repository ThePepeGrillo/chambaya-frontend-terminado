import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { destinoTrasLogin } from "../utils/navigation";

// Login y registro: si ya hay sesión, se va directo al panel
export function PublicOnlyRoute() {
  const { usuario } = useAuth();
  const ubicacion = useLocation();

  if (usuario) return <Navigate to={destinoTrasLogin(ubicacion.state)} replace />;
  return <Outlet />;
}
