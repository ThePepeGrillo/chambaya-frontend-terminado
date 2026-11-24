import type { FormEvent } from "react";
import { Button } from "../ui/Button";
import { CampoBuscador } from "../ui/CampoBuscador";
import { Icono } from "../ui/Icono";

interface BuscadorHeroProps {
  nombre: string;
  tipo: string;
  ubicacion: string;
  onTipo: (valor: string) => void;
  onUbicacion: (valor: string) => void;
  onBuscar: (evento: FormEvent<HTMLFormElement>) => void;
}

// Banner azul con el buscador de ofertas
export function BuscadorHero({ nombre, tipo, ubicacion, onTipo, onUbicacion, onBuscar }: BuscadorHeroProps) {
  return (
    <section className="hero">
      <div className="hero__contenido">
        <h1>¡Encuentra tu próxima chamba, {nombre}!</h1>
        <p>Busca entre las ofertas abiertas y postúlate con un clic.</p>
        <form className="buscador" onSubmit={onBuscar} role="search">
          <CampoBuscador icono="maletin" etiqueta="Tipo de trabajo" name="tipo" placeholder="Tipo de trabajo (ej: mesero)" value={tipo} onChange={onTipo} />
          <CampoBuscador icono="ubicacion" etiqueta="Ubicación" name="ubicacion" placeholder="Lugar (ej: Chapinero)" value={ubicacion} onChange={onUbicacion} />
          <Button type="submit">
            <Icono nombre="buscar" />
            Buscar ofertas
          </Button>
        </form>
      </div>
    </section>
  );
}
