import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: "primario" | "secundario" | "naranja";
  cargando?: boolean;
  bloque?: boolean; // ocupa todo el ancho disponible
}

export function Button({ variante = "primario", cargando = false, bloque = false, disabled, children, ...resto }: ButtonProps) {
  return (
    <button
      type="button"
      className={`btn btn--${variante}${bloque ? " btn--bloque" : ""}`}
      disabled={disabled || cargando}
      {...resto}
    >
      {cargando ? "Un momento..." : children}
    </button>
  );
}
