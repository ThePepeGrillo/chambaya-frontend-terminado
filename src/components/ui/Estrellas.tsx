interface EstrellasProps {
  valor: number; // de 1 a 5
  total?: number; // cuántas calificaciones lo respaldan
}

// Muestra una calificación, por ejemplo: ★ 4.5 (3)
export function Estrellas({ valor, total }: EstrellasProps) {
  return (
    <span className="estrellas" aria-label={`Calificación ${valor.toFixed(1)} de 5`}>
      ★ {valor.toFixed(1)}
      {total !== undefined && <span className="estrellas__total"> ({total})</span>}
    </span>
  );
}
