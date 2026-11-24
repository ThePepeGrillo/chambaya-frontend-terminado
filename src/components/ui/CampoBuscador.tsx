import { useId } from "react";
import type { ChangeEvent } from "react";
import { Icono } from "./Icono";
import type { NombreIcono } from "./Icono";

interface CampoBuscadorProps {
  icono: NombreIcono;
  etiqueta: string; // se lee con lector de pantalla aunque no se vea
  name: string;
  placeholder?: string;
  value: string;
  onChange: (valor: string) => void;
}

export function CampoBuscador({ icono, etiqueta, name, placeholder, value, onChange }: CampoBuscadorProps) {
  const id = useId();
  return (
    <div className="campo-buscador">
      <Icono nombre={icono} />
      <label className="solo-lectores" htmlFor={id}>
        {etiqueta}
      </label>
      <input id={id} name={name} placeholder={placeholder} value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} />
    </div>
  );
}
