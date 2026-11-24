import type { FiltrosOfertas, ListadoOfertas, NuevaOfertaInput, Oferta } from "../types/oferta";
import { peticion } from "./http";

export function listarOfertasApi(filtros: FiltrosOfertas = {}): Promise<ListadoOfertas> {
  return peticion<ListadoOfertas>("GET", "/ofertas", { params: { ...filtros } });
}

// Ofertas del empleador que inició sesión (abiertas y cubiertas)
export function listarMisOfertasApi(): Promise<{ data: Oferta[] }> {
  return peticion<{ data: Oferta[] }>("GET", "/ofertas/mias", { auth: true });
}

export function crearOfertaApi(datos: NuevaOfertaInput): Promise<Oferta> {
  return peticion<Oferta>("POST", "/ofertas", { auth: true, cuerpo: datos });
}
