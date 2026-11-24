import { useId } from "react";

interface SelectorEstrellasProps {
  valor: number; // 0 = todavía no eligió
  onChange: (valor: number) => void;
  error?: string;
}

// Cinco estrellas para elegir un puntaje de 1 a 5 (son botones de radio, se pueden usar con el teclado)
export function SelectorEstrellas({ valor, onChange, error }: SelectorEstrellasProps) {
  const grupo = useId();

  return (
    <fieldset className="selector-estrellas">
      <legend>Tu calificación</legend>
      <div className="selector-estrellas__fila">
        {[1, 2, 3, 4, 5].map((n) => (
          <label key={n} className={`selector-estrellas__estrella${n <= valor ? " is-activa" : ""}`}>
            <input type="radio" name={grupo} value={n} checked={valor === n} onChange={() => onChange(n)} />
            <span aria-hidden="true">★</span>
            <span className="solo-lectores">
              {n} {n === 1 ? "estrella" : "estrellas"}
            </span>
          </label>
        ))}
      </div>
      {error && <p className="campo__error">{error}</p>}
    </fieldset>
  );
}
