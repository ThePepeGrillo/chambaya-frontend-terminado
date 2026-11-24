import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";

const ENLACES = {
  trabajador: [
    { to: "/panel", texto: "Buscar ofertas" },
    { to: "/mis-postulaciones", texto: "Mis postulaciones" },
  ],
  empleador: [{ to: "/panel", texto: "Mis ofertas" }],
};

export function Navbar() {
  const { usuario, cerrarSesion } = useAuth();
  const ubicacion = useLocation();

  return (
    <header className="navbar">
      <div className="navbar__contenido">
        <Logo to="/panel" />
        {usuario && (
          <div className="navbar__usuario">
            <span className="navbar__nombre">{usuario.nombre}</span>
            <span className="etiqueta">{usuario.rol}</span>
            <Button variante="secundario" onClick={cerrarSesion}>
              Salir
            </Button>
          </div>
        )}
        {usuario && (
          <nav className="navbar__enlaces" aria-label="Principal">
            {ENLACES[usuario.rol].map((enlace) => (
              <Link
                key={enlace.to}
                to={enlace.to}
                className={ubicacion.pathname === enlace.to ? "is-activo" : undefined}
                aria-current={ubicacion.pathname === enlace.to ? "page" : undefined}
              >
                {enlace.texto}
              </Link>
            ))}
            {usuario.rol === "empleador" && (
              <Link to="/ofertas/nueva" className="btn btn--naranja">
                Publicar oferta
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
