import { createContext } from "react";
import type { RegistroInput, UsuarioSesion } from "../types/auth";

export interface AuthContextValue {
  usuario: UsuarioSesion | null;
  iniciarSesion: (correo: string, password: string) => Promise<void>;
  registrar: (datos: RegistroInput) => Promise<void>;
  cerrarSesion: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
