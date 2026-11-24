import type { RegistroInput, Sesion } from "../types/auth";
import { peticion } from "./http";

export function iniciarSesionApi(correo: string, password: string): Promise<Sesion> {
  return peticion<Sesion>("POST", "/auth/login", { cuerpo: { correo, password } });
}

export function registrarApi(datos: RegistroInput): Promise<unknown> {
  return peticion("POST", "/auth/register", { cuerpo: datos });
}

export interface RespuestaMensaje {
  mensaje: string;
  enlaceRecuperacion?: string;
}

// El servidor responde lo mismo exista o no el correo (así no se revela quién tiene cuenta)
export function olvidePasswordApi(correo: string): Promise<RespuestaMensaje> {
  return peticion<RespuestaMensaje>("POST", "/auth/forgot-password", { cuerpo: { correo } });
}

export function restablecerPasswordApi(token: string, password: string): Promise<RespuestaMensaje> {
  return peticion<RespuestaMensaje>("POST", "/auth/reset-password", { cuerpo: { token, password } });
}
