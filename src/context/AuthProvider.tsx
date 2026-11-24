import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { iniciarSesionApi, registrarApi } from "../api/auth.api";
import { onNoAutorizado } from "../api/http";
import type { RegistroInput, Sesion } from "../types/auth";
import { tokenVigente } from "../utils/jwt";
import { borrarSesion, guardarSesion, leerSesion } from "../utils/storage";
import { AuthContext } from "./auth-context";

// Al abrir la página se recupera la sesión guardada, siempre que el token no haya vencido
function sesionInicial(): Sesion | null {
  const guardada = leerSesion();
  if (guardada && tokenVigente(guardada.token)) return guardada;
  if (guardada) borrarSesion();
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [sesion, setSesion] = useState<Sesion | null>(sesionInicial);

  const cerrarSesion = useCallback(() => {
    borrarSesion();
    setSesion(null);
  }, []);

  const iniciarSesion = useCallback(async (correo: string, password: string) => {
    const nueva = await iniciarSesionApi(correo, password);
    guardarSesion(nueva);
    setSesion(nueva);
  }, []);

  // El backend no devuelve token al registrar, así que después de crear la cuenta se inicia sesión
  const registrar = useCallback(
    async (datos: RegistroInput) => {
      await registrarApi(datos);
      await iniciarSesion(datos.correo, datos.password);
    },
    [iniciarSesion],
  );

  // Si el servidor responde 401 con una sesión abierta, se cierra la sesión
  useEffect(() => {
    onNoAutorizado(cerrarSesion);
    return () => onNoAutorizado(null);
  }, [cerrarSesion]);

  const valor = useMemo(
    () => ({ usuario: sesion?.usuario ?? null, iniciarSesion, registrar, cerrarSesion }),
    [sesion, iniciarSesion, registrar, cerrarSesion],
  );

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}
