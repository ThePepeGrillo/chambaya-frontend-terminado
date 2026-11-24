import { EncabezadoPagina } from "../components/layout/EncabezadoPagina";
import { MisOfertas } from "../components/ofertas/MisOfertas";
import { OfertasAbiertas } from "../components/ofertas/OfertasAbiertas";
import { useAuth } from "../hooks/useAuth";

export function PanelPage() {
  const { usuario } = useAuth();
  if (!usuario) return null; // ProtectedRoute ya garantiza que hay usuario

  if (usuario.rol === "trabajador") return <OfertasAbiertas nombre={usuario.nombre} />;

  return (
    <>
      <EncabezadoPagina titulo={`Hola, ${usuario.nombre}`} subtitulo="Gestiona tus ofertas y decide a quién contratar." />
      <div className="contenedor">
        <MisOfertas />
      </div>
    </>
  );
}
