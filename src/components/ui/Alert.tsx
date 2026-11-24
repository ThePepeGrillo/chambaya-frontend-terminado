import type { ReactNode } from "react";

interface AlertProps {
  tipo?: "error" | "info";
  children: ReactNode;
}

export function Alert({ tipo = "error", children }: AlertProps) {
  return (
    <div className={`alerta alerta--${tipo}`} role={tipo === "error" ? "alert" : "status"}>
      {children}
    </div>
  );
}
