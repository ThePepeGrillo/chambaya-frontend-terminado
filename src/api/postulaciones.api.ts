import type {
  Calificacion,
  Postulacion,
  PostulacionPropia,
  Postulante,
  ResultadoCancelacion,
  ResultadoCompletar,
  ResultadoEstado,
} from "../types/postulacion";
import { peticion } from "./http";

export function postularseApi(ofertaId: number): Promise<Postulacion> {
  return peticion<Postulacion>("POST", `/ofertas/${ofertaId}/postulaciones`, { auth: true });
}

export function listarMisPostulacionesApi(): Promise<{ data: PostulacionPropia[] }> {
  return peticion<{ data: PostulacionPropia[] }>("GET", "/postulaciones/mias", { auth: true });
}

export function listarPostulantesApi(ofertaId: number): Promise<{ data: Postulante[] }> {
  return peticion<{ data: Postulante[] }>("GET", `/ofertas/${ofertaId}/postulaciones`, { auth: true });
}

export function cambiarEstadoApi(id: number, estado: "aceptada" | "rechazada"): Promise<ResultadoEstado> {
  return peticion<ResultadoEstado>("PATCH", `/postulaciones/${id}/estado`, { auth: true, cuerpo: { estado } });
}

export function cancelarPostulacionApi(id: number, motivo: string): Promise<ResultadoCancelacion> {
  return peticion<ResultadoCancelacion>("PATCH", `/postulaciones/${id}/cancelar`, { auth: true, cuerpo: { motivo } });
}

// Cada parte confirma que el trabajo se realizó; con las dos confirmaciones se puede calificar
export function completarApi(id: number): Promise<ResultadoCompletar> {
  return peticion<ResultadoCompletar>("PATCH", `/postulaciones/${id}/completar`, { auth: true });
}

export function calificarApi(id: number, puntaje: number, comentario: string): Promise<Calificacion> {
  return peticion<Calificacion>("POST", `/postulaciones/${id}/calificaciones`, {
    auth: true,
    cuerpo: { puntaje, ...(comentario ? { comentario } : {}) },
  });
}
