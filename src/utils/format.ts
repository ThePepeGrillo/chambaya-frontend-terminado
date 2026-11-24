const formatoFecha = new Intl.DateTimeFormat("es-CO", {
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
});

const formatoPago = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export const formatearFecha = (iso: string): string => formatoFecha.format(new Date(iso));
export const formatearPago = (valor: number): string => formatoPago.format(valor);
