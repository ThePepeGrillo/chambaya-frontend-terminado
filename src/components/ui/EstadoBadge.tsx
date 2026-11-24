type Estado = "pendiente" | "aceptada" | "rechazada" | "cancelada" | "abierta" | "cubierta";

const DETALLE: Record<Estado, { texto: string; tono: "exito" | "alerta" | "error" | "neutro" }> = {
  pendiente: { texto: "Pendiente", tono: "alerta" },
  aceptada: { texto: "Aceptada", tono: "exito" },
  rechazada: { texto: "Rechazada", tono: "error" },
  cancelada: { texto: "Cancelada", tono: "neutro" },
  abierta: { texto: "Abierta", tono: "exito" },
  cubierta: { texto: "Cubierta", tono: "neutro" },
};

// Etiqueta de color para el estado de una oferta o de una postulación
export function EstadoBadge({ estado }: { estado: Estado }) {
  const { texto, tono } = DETALLE[estado];
  return <span className={`etiqueta etiqueta--${tono}`}>{texto}</span>;
}
