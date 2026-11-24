import { useCallback, useEffect, useState } from "react";
import { mensajeDeError } from "../utils/errors";

interface EstadoRecurso<T> {
  cargando: boolean;
  error: string | null;
  datos: T | null;
}

// Carga un dato desde la API y avisa si está cargando o falló.
// Se vuelve a cargar cuando cambia la función `cargar` o se llama a `recargar()`.
// Ojo: `cargar` debe ser una función estable (definida fuera del componente o con useCallback).
export function useRecurso<T>(cargar: () => Promise<T>) {
  const [estado, setEstado] = useState<EstadoRecurso<T>>({ cargando: true, error: null, datos: null });
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let cancelado = false; // evita guardar una respuesta vieja si ya se pidió otra
    setEstado((previo) => ({ ...previo, cargando: true, error: null }));
    cargar()
      .then((datos) => {
        if (!cancelado) setEstado({ cargando: false, error: null, datos });
      })
      .catch((error: unknown) => {
        if (!cancelado) setEstado({ cargando: false, error: mensajeDeError(error), datos: null });
      });
    return () => {
      cancelado = true;
    };
  }, [cargar, version]);

  const recargar = useCallback(() => setVersion((v) => v + 1), []);
  return { ...estado, recargar };
}
