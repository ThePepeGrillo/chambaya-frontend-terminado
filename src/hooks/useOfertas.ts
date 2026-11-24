import { useCallback } from "react";
import { listarOfertasApi } from "../api/ofertas.api";
import type { FiltrosOfertas } from "../types/oferta";
import { useRecurso } from "./useRecurso";

// Pide las ofertas abiertas a la API cada vez que cambian los filtros
export function useOfertas(filtros: FiltrosOfertas) {
  const { tipo, ubicacion, fecha } = filtros;
  const cargar = useCallback(() => listarOfertasApi({ tipo, ubicacion, fecha }), [tipo, ubicacion, fecha]);
  const { cargando, error, datos } = useRecurso(cargar);
  return { cargando, error, listado: datos };
}
