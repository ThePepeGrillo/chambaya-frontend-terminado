import { ApiError } from "../api/http";

// Convierte cualquier error en un mensaje para mostrarle al usuario
export function mensajeDeError(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  return "Ocurrió un error inesperado. Intenta de nuevo.";
}
