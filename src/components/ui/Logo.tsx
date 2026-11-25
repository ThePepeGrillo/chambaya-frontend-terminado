import { Link } from "react-router-dom";

interface LogoProps {
  claro?: boolean;
  to?: string;
}

export function Logo({ claro = false, to }: LogoProps) {
  const clase = `logo${claro ? " logo--claro" : ""}`;
  const contenido = (
    <>
      <span className="logo__chamba">Chamba</span>
      <span className="logo__ya">Ya</span>
    </>
  );

  return to ? (
    <Link to={to} className={clase} aria-label="ChambaYa, ir al panel">
      {contenido}
    </Link>
  ) : (
    <span className={clase}>{contenido}</span>
  );
}
