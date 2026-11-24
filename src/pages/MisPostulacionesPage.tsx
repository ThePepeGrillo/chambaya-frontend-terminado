import { EncabezadoPagina } from "../components/layout/EncabezadoPagina";
import { MisPostulaciones } from "../components/postulaciones/MisPostulaciones";

export function MisPostulacionesPage() {
  return (
    <>
      <EncabezadoPagina titulo="Mis postulaciones" subtitulo="Revisa el estado de cada una y cancela si no puedes asistir." />
      <div className="contenedor">
        <MisPostulaciones />
      </div>
    </>
  );
}
