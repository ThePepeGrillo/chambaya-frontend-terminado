import type { ReactNode } from "react";
import { Logo } from "../ui/Logo";

// Pantalla de login, registro y "no encontrada": panel azul con la marca y tarjeta blanca con el contenido
export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="auth">
      <aside className="auth__marca">
        <Logo claro />
        <h2>Trabajos temporales, sin complicaciones.</h2>
        <ul>
          <li>Encuentra chambas por días u horas</li>
          <li>Postúlate con un solo clic</li>
          <li>Publica ofertas y elige a quién contratar</li>
        </ul>
      </aside>
      <main className="auth__contenido">
        <section className="tarjeta">{children}</section>
      </main>
    </div>
  );
}
