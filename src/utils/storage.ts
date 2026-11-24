import type { Sesion } from "../types/auth";

const CLAVE = "chambaya_sesion";

// Guarda la sesión en el navegador para que no se pierda al recargar la página.
// Todo va dentro de try/catch porque algunos navegadores bloquean el almacenamiento.
export function guardarSesion(sesion: Sesion): void {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(sesion));
  } catch {
    /* sin almacenamiento disponible: la sesión dura hasta recargar */
  }
}

export function leerSesion(): Sesion | null {
  try {
    const crudo = localStorage.getItem(CLAVE);
    if (!crudo) return null;
    const sesion = JSON.parse(crudo) as Partial<Sesion> | null;
    return sesion?.token && sesion.usuario ? (sesion as Sesion) : null;
  } catch {
    return null;
  }
}

export function borrarSesion(): void {
  try {
    localStorage.removeItem(CLAVE);
  } catch {
    /* nada que borrar */
  }
}

export function leerToken(): string | null {
  return leerSesion()?.token ?? null;
}
