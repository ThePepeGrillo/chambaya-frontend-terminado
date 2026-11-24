import { useId } from "react";
import type { InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  etiqueta: string;
  error?: string;
  ayuda?: string;
}

export function TextField({ etiqueta, error, ayuda, id, ...resto }: TextFieldProps) {
  const idGenerado = useId();
  const idCampo = id ?? idGenerado;
  const idError = `${idCampo}-error`;
  const idAyuda = `${idCampo}-ayuda`;
  const descritoPor = [error ? idError : null, ayuda ? idAyuda : null].filter(Boolean).join(" ") || undefined;

  return (
    <div className="campo">
      <label htmlFor={idCampo}>{etiqueta}</label>
      <input id={idCampo} aria-invalid={error ? true : undefined} aria-describedby={descritoPor} {...resto} />
      {ayuda && !error && (
        <p id={idAyuda} className="campo__ayuda">
          {ayuda}
        </p>
      )}
      {error && (
        <p id={idError} className="campo__error">
          {error}
        </p>
      )}
    </div>
  );
}
