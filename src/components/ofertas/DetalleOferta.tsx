import type { Oferta } from "../../types/oferta";
import { formatearFecha, formatearPago } from "../../utils/format";
import { Button } from "../ui/Button";
import { Icono } from "../ui/Icono";

interface DetalleOfertaProps {
  oferta: Oferta;
  abierto: boolean; // en celular, el detalle se abre a pantalla completa
  yaPostulado: boolean;
  enviando: boolean;
  onPostular: () => void;
  onCerrar: () => void;
}

export function DetalleOferta({ oferta, abierto, yaPostulado, enviando, onPostular, onCerrar }: DetalleOfertaProps) {
  const disponibles = Math.max(oferta.cupos - oferta.aceptados, 0);

  return (
    <section className={`detalle${abierto ? " is-abierto" : ""}`} aria-label="Detalle de la oferta">
      <div className="detalle__volver">
        <Button variante="secundario" onClick={onCerrar}>
          ← Volver a la lista
        </Button>
      </div>

      <h2>{oferta.titulo}</h2>
      <p className="detalle__subtitulo">
        <span className="etiqueta">{oferta.tipo}</span> · {oferta.ubicacion}
      </p>

      <div className="detalle__acciones">
        <Button onClick={onPostular} cargando={enviando} disabled={yaPostulado}>
          {yaPostulado ? "Ya te postulaste" : "Postularme"}
        </Button>
      </div>

      <h3>Resumen</h3>
      <ul className="detalle__resumen">
        <li>
          <Icono nombre="dinero" /> Pago: {formatearPago(oferta.pago)}
        </li>
        <li>
          <Icono nombre="reloj" /> Duración: {oferta.duracionHoras} horas
        </li>
        <li>
          <Icono nombre="calendario" /> {formatearFecha(oferta.fecha)}
        </li>
        <li>
          <Icono nombre="ubicacion" /> {oferta.ubicacion}
        </li>
        <li>
          <Icono nombre="personas" /> {disponibles} {disponibles === 1 ? "cupo disponible" : "cupos disponibles"}
        </li>
      </ul>

      <h3>Descripción de la oferta</h3>
      <p className="detalle__descripcion">{oferta.descripcion}</p>
    </section>
  );
}
