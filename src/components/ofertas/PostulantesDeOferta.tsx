import { useCallback, useState } from "react";
import { calificarApi, cambiarEstadoApi, completarApi, listarPostulantesApi } from "../../api/postulaciones.api";
import { useRecurso } from "../../hooks/useRecurso";
import { mensajeDeError } from "../../utils/errors";
import { Alert } from "../ui/Alert";
import { PostulanteItem } from "./PostulanteItem";

interface PostulantesDeOfertaProps {
  ofertaId: number;
  onCambio: () => void; // se llama después de aceptar o rechazar, para actualizar las ofertas
}

export function PostulantesDeOferta({ ofertaId, onCambio }: PostulantesDeOfertaProps) {
  const cargar = useCallback(() => listarPostulantesApi(ofertaId), [ofertaId]);
  const { cargando, error, datos, recargar } = useRecurso(cargar);
  const [procesando, setProcesando] = useState<number | null>(null);
  const [errorAccion, setErrorAccion] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  // Ejecuta una acción sobre un postulante y vuelve a cargar la lista
  async function ejecutar(postulacionId: number, accion: () => Promise<unknown>, mensajeExito: string | null, avisarCambio: boolean) {
    setErrorAccion(null);
    setAviso(null);
    setProcesando(postulacionId);
    try {
      await accion();
      if (mensajeExito) setAviso(mensajeExito);
      recargar();
      if (avisarCambio) onCambio();
    } catch (e) {
      setErrorAccion(mensajeDeError(e));
    } finally {
      setProcesando(null);
    }
  }

  const decidir = (id: number, estado: "aceptada" | "rechazada") => ejecutar(id, () => cambiarEstadoApi(id, estado), null, true);
  const confirmar = (id: number) => ejecutar(id, () => completarApi(id), "Confirmaste que el trabajo se completó.", false);
  const calificar = (id: number, puntaje: number, comentario: string) =>
    ejecutar(id, () => calificarApi(id, puntaje, comentario), "Gracias por tu calificación.", false);

  return (
    <div className="postulantes">
      <h4>Postulantes</h4>
      {aviso && <Alert tipo="info">{aviso}</Alert>}
      {errorAccion && <Alert>{errorAccion}</Alert>}
      {error && <Alert>{error}</Alert>}
      {cargando && !datos && <p className="estado-vacio">Cargando postulantes...</p>}
      {datos && datos.data.length === 0 && <p className="estado-vacio">Todavía no hay postulantes.</p>}
      {datos && datos.data.length > 0 && (
        <ul className="lista-limpia">
          {datos.data.map((postulante) => (
            <PostulanteItem
              key={postulante.id}
              postulante={postulante}
              ocupado={procesando !== null}
              onAceptar={() => decidir(postulante.id, "aceptada")}
              onRechazar={() => decidir(postulante.id, "rechazada")}
              onConfirmar={() => confirmar(postulante.id)}
              onCalificar={(puntaje, comentario) => calificar(postulante.id, puntaje, comentario)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
