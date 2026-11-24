import { useId } from "react";
import type { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  etiqueta: string;
  error?: string;
}

export function TextArea({ etiqueta, error, id, ...resto }: TextAreaProps) {
  const idGenerado = useId();
  const idCampo = id ?? idGenerado;
  const idError = `${idCampo}-error`;

  return (
    <div className="campo">
      <label htmlFor={idCampo}>{etiqueta}</label>
      <textarea id={idCampo} rows={4} aria-invalid={error ? true : undefined} aria-describedby={error ? idError : undefined} {...resto} />
      {error && (
        <p id={idError} className="campo__error">
          {error}
        </p>
      )}
    </div>
  );
}
