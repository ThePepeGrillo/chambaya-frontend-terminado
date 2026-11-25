import { useEffect, useState } from "react";
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
  const [tema, setTema] = useState<"light" | "dark">(() => {
    const guardado = localStorage.getItem("chambaya-tema");
    return guardado === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = tema;
    localStorage.setItem("chambaya-tema", tema);
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content",
      tema === "dark" ? "#191326" : "#FFF9F2",
    );
  }, [tema]);

  function cambiarTema() {
    setTema((actual) => actual === "light" ? "dark" : "light");
  }

  return (
    <header className="navbar">
      <div className="navbar__contenido">
        <Logo to="/panel" />
        <button
          type="button"
          className="theme-toggle"
          onClick={cambiarTema}
          aria-label={tema === "light" ? "Activar modo oscuro" : "Activar modo claro"}
          title={tema === "light" ? "Activar modo oscuro" : "Activar modo claro"}
        >
          <span className="theme-toggle__icon" aria-hidden="true">{tema === "light" ? "☾" : "☀"}</span>
          <span className="theme-toggle__texto">{tema === "light" ? "Modo oscuro" : "Modo claro"}</span>
        </button>
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
