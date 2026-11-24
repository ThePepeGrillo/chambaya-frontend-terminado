import { useState } from "react";
import { calificarApi, cancelarPostulacionApi, completarApi, listarMisPostulacionesApi } from "../../api/postulaciones.api";
import { useRecurso } from "../../hooks/useRecurso";
import { mensajeDeError } from "../../utils/errors";
import { AccionesTrabajoRealizado } from "../calificaciones/AccionesTrabajoRealizado";
import { Alert } from "../ui/Alert";
import { Button } from "../ui/Button";
import { TextField } from "../ui/TextField";
import { PostulacionPropiaCard } from "./PostulacionPropiaCard";

export function MisPostulaciones() {
  const { cargando, error, datos, recargar } = useRecurso(listarMisPostulacionesApi);
  const [cancelando, setCancelando] = useState<number | null>(null); // postulación con el formulario de motivo abierto
  const [motivo, setMotivo] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [errorCancelacion, setErrorCancelacion] = useState<string | null>(null);
  const [procesando, setProcesando] = useState<number | null>(null); // confirmando o calificando
  const [errorGeneral, setErrorGeneral] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  function abrirCancelacion(id: number) {
    setCancelando(id);
    setMotivo("");
    setErrorCancelacion(null);
    setAviso(null);
  }

  async function confirmarCancelacion(id: number) {
    if (!motivo.trim()) {
      setErrorCancelacion("Escribe el motivo de la cancelación");
      return;
    }
    setErrorCancelacion(null);
    setEnviando(true);
    try {
      const resultado = await cancelarPostulacionApi(id, motivo.trim());
      setAviso(
        resultado.cancelacionTardia
          ? "Cancelaste con menos de 24 horas de anticipación: queda registrado como cancelación tardía."
          : "Cancelaste tu participación.",
      );
      setCancelando(null);
      recargar();
    } catch (e) {
      setErrorCancelacion(mensajeDeError(e));
    } finally {
      setEnviando(false);
    }
  }

  // Confirmar el trabajo o calificar: ejecuta la acción y vuelve a cargar la lista
  async function ejecutar(id: number, accion: () => Promise<unknown>, mensajeExito: string) {
    setErrorGeneral(null);
    setAviso(null);
    setProcesando(id);
    try {
      await accion();
      setAviso(mensajeExito);
      recargar();
    } catch (e) {
      setErrorGeneral(mensajeDeError(e));
    } finally {
      setProcesando(null);
    }
  }

  return (
    <section>
      {aviso && <Alert tipo="info">{aviso}</Alert>}
      {errorGeneral && <Alert>{errorGeneral}</Alert>}
      {error && <Alert>{error}</Alert>}
      {cargando && !datos && <p className="estado-vacio">Cargando tus postulaciones...</p>}
      {datos && datos.data.length === 0 && <p className="estado-vacio">Todavía no te has postulado a ninguna oferta.</p>}

      {datos && datos.data.length > 0 && (
        <div className="rejilla">
          {datos.data.map((postulacion) => {
            const aceptada = postulacion.estado === "aceptada";
            const hayConfirmacion = postulacion.confirmadaPorEmpleador || postulacion.confirmadaPorTrabajador;
            // Una vez que alguien confirmó que el trabajo se hizo, ya no tiene sentido cancelar
            const sePuedeCancelar = (postulacion.estado === "pendiente" || aceptada) && !hayConfirmacion;
            return (
              <PostulacionPropiaCard key={postulacion.id} postulacion={postulacion}>
                {aceptada && (
                  <AccionesTrabajoRealizado
                    otraParte="el empleador"
                    nombreOtraParte={postulacion.oferta.empleadorNombre}
                    yoConfirme={postulacion.confirmadaPorTrabajador}
                    otroConfirmo={postulacion.confirmadaPorEmpleador}
                    puedeConfirmar={postulacion.puedeConfirmar}
                    puedeCalificar={postulacion.puedeCalificar}
                    calificado={postulacion.calificado}
                    calificacionRecibida={postulacion.calificacionRecibida}
                    ocupado={procesando === postulacion.id}
                    onConfirmar={() => ejecutar(postulacion.id, () => completarApi(postulacion.id), "Confirmaste que el trabajo se completó.")}
                    onCalificar={(puntaje, comentario) =>
                      ejecutar(postulacion.id, () => calificarApi(postulacion.id, puntaje, comentario), "Gracias por tu calificación.")
                    }
                  />
                )}
                {sePuedeCancelar && cancelando !== postulacion.id && (
                  <Button variante="secundario" onClick={() => abrirCancelacion(postulacion.id)}>
                    Cancelar participación
                  </Button>
                )}
                {cancelando === postulacion.id && (
                  <div>
                    {errorCancelacion && <Alert>{errorCancelacion}</Alert>}
                    <TextField etiqueta="Motivo de la cancelación" name="motivo" maxLength={200} value={motivo} onChange={(e) => setMotivo(e.target.value)} />
                    <div className="oferta__botones">
                      <Button onClick={() => confirmarCancelacion(postulacion.id)} cargando={enviando}>
                        Confirmar
                      </Button>
                      <Button variante="secundario" onClick={() => setCancelando(null)} disabled={enviando}>
                        Volver
                      </Button>
                    </div>
                  </div>
                )}
              </PostulacionPropiaCard>
            );
          })}
        </div>
      )}
    </section>
  );
}
