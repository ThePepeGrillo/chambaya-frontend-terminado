import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { Rol } from "../types/auth";

interface ProtectedRouteProps {
  roles?: Rol[]; // si se indica, solo entran usuarios con alguno de estos roles
}

// Deja pasar solo a quien inició sesión; los demás van al login
export function ProtectedRoute({ roles }: ProtectedRouteProps) {
  const { usuario } = useAuth();
  const ubicacion = useLocation();

  if (!usuario) return <Navigate to="/login" replace state={{ desde: ubicacion.pathname }} />;
  if (roles && !roles.includes(usuario.rol)) return <Navigate to="/panel" replace />;
  return <Outlet />;
}
