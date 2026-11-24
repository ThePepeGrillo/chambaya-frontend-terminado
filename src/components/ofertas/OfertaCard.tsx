import type { ReactNode } from "react";
import type { Oferta } from "../../types/oferta";
import { formatearFecha, formatearPago } from "../../utils/format";

interface OfertaCardProps {
  oferta: Oferta;
  insignia?: ReactNode; // etiqueta junto al título (por ejemplo, el estado)
  acciones?: ReactNode; // botones al pie de la tarjeta
}

export function OfertaCard({ oferta, insignia, acciones }: OfertaCardProps) {
  const disponibles = Math.max(oferta.cupos - oferta.aceptados, 0);

  return (
    <article className="oferta">
      <header className="oferta__cabecera">
        <h3>{oferta.titulo}</h3>
        {insignia ?? <span className="etiqueta">{oferta.tipo}</span>}
      </header>
      <p className="oferta__descripcion">{oferta.descripcion}</p>
      <dl className="oferta__datos">
        <div>
          <dt>Pago</dt>
          <dd>{formatearPago(oferta.pago)}</dd>
        </div>
        <div>
          <dt>Duración</dt>
          <dd>{oferta.duracionHoras} h</dd>
        </div>
        <div>
          <dt>Cuándo</dt>
          <dd>{formatearFecha(oferta.fecha)}</dd>
        </div>
        <div>
          <dt>Dónde</dt>
          <dd>{oferta.ubicacion}</dd>
        </div>
      </dl>
      <p className="oferta__cupos">
        {disponibles} {disponibles === 1 ? "cupo disponible" : "cupos disponibles"}
      </p>
      {acciones && <div className="oferta__acciones">{acciones}</div>}
    </article>
  );
}
