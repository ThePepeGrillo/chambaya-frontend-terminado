import { API_URL } from "../config/env";
import { leerToken } from "../utils/storage";

export class ApiError extends Error {
  status: number; // 0 significa que no hubo conexión con el servidor

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type Metodo = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface Opciones {
  cuerpo?: unknown;
  params?: Record<string, string | number | undefined>;
  auth?: boolean; // envía el token; si el servidor responde 401, la sesión venció
}

// Función que se ejecuta cuando el servidor dice que la sesión ya no es válida
let alNoAutorizado: (() => void) | null = null;

export function onNoAutorizado(funcion: (() => void) | null): void {
  alNoAutorizado = funcion;
}

export async function peticion<T>(metodo: Metodo, ruta: string, opciones: Opciones = {}): Promise<T> {
  const consulta = new URLSearchParams();
  for (const [clave, valor] of Object.entries(opciones.params ?? {})) {
    if (valor !== undefined && valor !== "") consulta.set(clave, String(valor));
  }
  const cadena = consulta.toString();
  const url = `${API_URL}${ruta}${cadena ? `?${cadena}` : ""}`;

  const cabeceras: Record<string, string> = {};
  if (opciones.cuerpo !== undefined) cabeceras["Content-Type"] = "application/json";
  if (opciones.auth) {
    const token = leerToken();
    if (token) cabeceras.Authorization = `Bearer ${token}`;
  }

  let respuesta: Response;
  try {
    respuesta = await fetch(url, {
      method: metodo,
      headers: cabeceras,
      body: opciones.cuerpo !== undefined ? JSON.stringify(opciones.cuerpo) : undefined,
    });
  } catch {
    throw new ApiError(0, "No se pudo conectar con el servidor. Revisa que el backend esté encendido.");
  }

  const texto = await respuesta.text();
  let datos: unknown = null;
  try {
    datos = texto ? JSON.parse(texto) : null;
  } catch {
    datos = null;
  }

  if (!respuesta.ok) {
    if (respuesta.status === 401 && opciones.auth) alNoAutorizado?.();
    const mensaje = (datos as { error?: string } | null)?.error ?? `Error ${respuesta.status} del servidor`;
    throw new ApiError(respuesta.status, mensaje);
  }
  return datos as T;
}
