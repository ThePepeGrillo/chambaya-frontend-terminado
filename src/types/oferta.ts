export interface Oferta {
  id: number;
  empleadorId: number;
  titulo: string;
  tipo: string;
  descripcion: string;
  fecha: string; // ISO 8601
  duracionHoras: number;
  pago: number;
  ubicacion: string;
  cupos: number;
  estado: "abierta" | "cubierta";
  aceptados: number;
}

export interface ListadoOfertas {
  data: Oferta[];
  page: number;
  limit: number;
  total: number;
  sugerencia?: string;
}

export interface FiltrosOfertas {
  tipo?: string;
  ubicacion?: string;
  fecha?: string; // YYYY-MM-DD
}

// Datos para publicar una oferta
export interface NuevaOfertaInput {
  titulo: string;
  tipo: string;
  descripcion: string;
  fecha: string; // ISO 8601
  duracionHoras: number;
  pago: number;
  ubicacion: string;
  cupos: number;
}
