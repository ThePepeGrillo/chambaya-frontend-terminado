import type { Oferta } from "./oferta";

export type EstadoPostulacion = "pendiente" | "aceptada" | "rechazada" | "cancelada";

export interface Postulacion {
  id: number;
  ofertaId: number;
  trabajadorId: number;
  estado: EstadoPostulacion;
  fechaPostulacion: string;
  cancelacionTardia: boolean;
  motivoCancelacion: string | null;
  confirmadaPorEmpleador: boolean;
  confirmadaPorTrabajador: boolean;
}

// Qué puede hacer el usuario con una postulación aceptada (lo calcula el servidor)
export interface AccionesPostulacion {
  puedeConfirmar: boolean; // falta que este usuario confirme que el trabajo se completó
  puedeCalificar: boolean; // las dos partes confirmaron y este usuario todavía no califica
}

// Postulación vista por el trabajador, con un resumen de la oferta
export interface PostulacionPropia extends AccionesPostulacion {
  id: number;
  estado: EstadoPostulacion;
  fechaPostulacion: string;
  cancelacionTardia: boolean;
  confirmadaPorEmpleador: boolean;
  confirmadaPorTrabajador: boolean;
  calificado: boolean; // el trabajador ya calificó al empleador
  calificacionRecibida: number | null; // lo que el empleador le puso al trabajador
  oferta: {
    id: number;
    titulo: string;
    tipo: string;
    fecha: string;
    ubicacion: string;
    pago: number;
    duracionHoras: number;
    empleadorNombre: string;
  };
}

// Postulación vista por el empleador, con los datos del trabajador
export interface Postulante extends AccionesPostulacion {
  id: number;
  estado: EstadoPostulacion;
  fechaPostulacion: string;
  confirmadaPorEmpleador: boolean;
  confirmadaPorTrabajador: boolean;
  calificado: boolean; // el empleador ya calificó a este trabajador
  trabajador: {
    id: number;
    nombre: string;
    habilidades: string[];
    disponibilidad: string | null;
    calificacionPromedio: number | null;
    calificacionesTotal: number;
  };
}

export interface ResultadoEstado {
  postulacion: Postulacion;
  oferta: Oferta;
}

export interface ResultadoCancelacion {
  id: number;
  estado: "cancelada";
  cancelacionTardia: boolean;
}

export interface ResultadoCompletar {
  id: number;
  confirmadaPorEmpleador: boolean;
  confirmadaPorTrabajador: boolean;
  completada: boolean;
}

export interface Calificacion {
  id: number;
  postulacionId: number;
  autorId: number;
  destinatarioId: number;
  puntaje: number;
  comentario: string | null;
  fecha: string;
}
