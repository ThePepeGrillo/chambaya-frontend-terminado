import type { Oferta } from "../../types/oferta";
import { DetalleOferta } from "./DetalleOferta";
import { OfertaResumenItem } from "./OfertaResumenItem";

interface ExploradorOfertasProps {
  ofertas: Oferta[];
  ofertaActivaId: number | null;
  detalleAbierto: boolean;
  yaPostuladas: ReadonlySet<number>;
  enviando: number | null;
  onSeleccionar: (id: number) => void;
  onCerrarDetalle: () => void;
  onPostular: (id: number) => void;
}

// Lista de ofertas a la izquierda y detalle de la oferta elegida a la derecha
export function ExploradorOfertas({
  ofertas,
  ofertaActivaId,
  detalleAbierto,
  yaPostuladas,
  enviando,
  onSeleccionar,
  onCerrarDetalle,
  onPostular,
}: ExploradorOfertasProps) {
  const activa = ofertas.find((o) => o.id === ofertaActivaId) ?? ofertas[0];

  return (
    <div className="explorador">
      <div className="explorador__lista">
        {ofertas.map((oferta) => (
          <OfertaResumenItem key={oferta.id} oferta={oferta} activa={oferta.id === activa?.id} onSeleccionar={() => onSeleccionar(oferta.id)} />
        ))}
      </div>
      {activa && (
        <DetalleOferta
          oferta={activa}
          abierto={detalleAbierto}
          yaPostulado={yaPostuladas.has(activa.id)}
          enviando={enviando === activa.id}
          onPostular={() => onPostular(activa.id)}
          onCerrar={onCerrarDetalle}
        />
      )}
    </div>
  );
}
