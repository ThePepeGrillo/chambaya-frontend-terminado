import type { Oferta } from "../../types/oferta";
import { formatearFecha, formatearPago } from "../../utils/format";
import { Icono } from "../ui/Icono";

interface OfertaResumenItemProps {
  oferta: Oferta;
  activa: boolean; // es la oferta que se está viendo en el detalle
  onSeleccionar: () => void;
}

// Tarjeta compacta de la lista de ofertas
export function OfertaResumenItem({ oferta, activa, onSeleccionar }: OfertaResumenItemProps) {
  const disponibles = Math.max(oferta.cupos - oferta.aceptados, 0);

  return (
    <article className={`item-oferta${activa ? " is-activa" : ""}`}>
      <div className="item-oferta__etiquetas">
        {disponibles === 1 && <span className="etiqueta etiqueta--urgente">Último cupo</span>}
        <span className="etiqueta">{oferta.tipo}</span>
      </div>
      <h3 className="item-oferta__titulo">
        <button type="button" className="item-oferta__boton" onClick={onSeleccionar} aria-pressed={activa}>
          {oferta.titulo}
        </button>
      </h3>
      <p className="dato-icono">
        <Icono nombre="ubicacion" tamano={16} />
        {oferta.ubicacion}
      </p>
      <p className="item-oferta__pago">
        {formatearPago(oferta.pago)} · {oferta.duracionHoras} h
      </p>
      <p className="item-oferta__pie">
        {formatearFecha(oferta.fecha)} · {disponibles} {disponibles === 1 ? "cupo" : "cupos"}
      </p>
    </article>
  );
}
