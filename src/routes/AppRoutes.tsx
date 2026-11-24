import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { LoginPage } from "../pages/LoginPage";
import { MisPostulacionesPage } from "../pages/MisPostulacionesPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { NuevaOfertaPage } from "../pages/NuevaOfertaPage";
import { OlvidePasswordPage } from "../pages/OlvidePasswordPage";
import { PanelPage } from "../pages/PanelPage";
import { RegisterPage } from "../pages/RegisterPage";
import { RestablecerPasswordPage } from "../pages/RestablecerPasswordPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicOnlyRoute } from "./PublicOnlyRoute";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/panel" replace />} />

      {/* Recuperar contraseña: se puede entrar con o sin sesión, porque el enlace llega por correo */}
      <Route path="/olvide-contrasena" element={<OlvidePasswordPage />} />
      <Route path="/restablecer" element={<RestablecerPasswordPage />} />

      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
      </Route>

      {/* Cualquier usuario con sesión */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/panel" element={<PanelPage />} />
        </Route>
      </Route>

      {/* Solo empleadores */}
      <Route element={<ProtectedRoute roles={["empleador"]} />}>
        <Route element={<Layout />}>
          <Route path="/ofertas/nueva" element={<NuevaOfertaPage />} />
        </Route>
      </Route>

      {/* Solo trabajadores */}
      <Route element={<ProtectedRoute roles={["trabajador"]} />}>
        <Route element={<Layout />}>
          <Route path="/mis-postulaciones" element={<MisPostulacionesPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
