import type { ReactNode } from "react";
import type { PostulacionPropia } from "../../types/postulacion";
import { formatearFecha, formatearPago } from "../../utils/format";
import { EstadoBadge } from "../ui/EstadoBadge";

interface PostulacionPropiaCardProps {
  postulacion: PostulacionPropia;
  children?: ReactNode; // acciones al pie
}

export function PostulacionPropiaCard({ postulacion, children }: PostulacionPropiaCardProps) {
  const { oferta } = postulacion;

  return (
    <article className="oferta">
      <header className="oferta__cabecera">
        <h3>{oferta.titulo}</h3>
        <EstadoBadge estado={postulacion.estado} />
      </header>
      <p className="oferta__descripcion">{oferta.empleadorNombre}</p>
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
      {postulacion.cancelacionTardia && <p className="oferta__nota">Cancelación tardía (menos de 24 horas antes)</p>}
      {children && <div className="oferta__acciones">{children}</div>}
    </article>
  );
}
