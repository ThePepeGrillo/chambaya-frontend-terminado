import { EncabezadoPagina } from "../components/layout/EncabezadoPagina";
import { NuevaOfertaForm } from "../components/ofertas/NuevaOfertaForm";

export function NuevaOfertaPage() {
  return (
    <>
      <EncabezadoPagina titulo="Publicar oferta" subtitulo="Los trabajadores la verán de inmediato en la lista de ofertas abiertas." />
      <div className="contenedor">
        <section className="tarjeta tarjeta--ancha">
          <NuevaOfertaForm />
        </section>
      </div>
    </>
  );
}
