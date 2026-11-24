import { Link } from "react-router-dom";

interface LogoProps {
  claro?: boolean; // versión blanca para fondos azules
  to?: string; // si se indica, el logo es un enlace
}

export function Logo({ claro = false, to }: LogoProps) {
  const clase = `logo${claro ? " logo--claro" : ""}`;
  if (to) {
    return (
      <Link to={to} className={clase}>
        ChambaYa
      </Link>
    );
  }
  return <span className={clase}>ChambaYa</span>;
}
