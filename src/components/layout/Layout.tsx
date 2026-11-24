import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

// Estructura de las páginas internas: barra superior y contenido.
// Cada página decide si usa un banner a todo el ancho y su propio contenedor.
export function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
