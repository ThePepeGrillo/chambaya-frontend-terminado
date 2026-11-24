import { useState } from "react";
import { Button } from "../ui/Button";
import { Estrellas } from "../ui/Estrellas";
import { FormularioCalificacion } from "./FormularioCalificacion";

interface AccionesTrabajoRealizadoProps {
  otraParte: string; // "el trabajador" o "el empleador", para los textos
  nombreOtraParte: string;
  yoConfirme: boolean;
  otroConfirmo: boolean;
  puedeConfirmar: boolean;
  puedeCalificar: boolean;
  calificado: boolean; // yo ya califiqué
  calificacionRecibida?: number | null;
  ocupado: boolean;
  onConfirmar: () => void;
  onCalificar: (puntaje: number, comentario: string) => void;
}

// Después de aceptar a un trabajador: cada parte confirma que el trabajo se hizo y luego se califican entre sí.
// Lo usan tanto el empleador como el trabajador.
export function AccionesTrabajoRealizado(props: AccionesTrabajoRealizadoProps) {
  const { otraParte, nombreOtraParte, yoConfirme, otroConfirmo, puedeConfirmar, puedeCalificar, calificado, calificacionRecibida, ocupado } = props;
  const [abierto, setAbierto] = useState(false);
  const completado = yoConfirme && otroConfirmo;

  return (
    <div className="trabajo-realizado">
      {completado ? (
        <p className="trabajo-realizado__estado">
          <span className="etiqueta etiqueta--exito">Trabajo completado</span>
        </p>
      ) : (
        <ul className="trabajo-realizado__pasos">
          <li className={yoConfirme ? "is-hecho" : undefined}>{yoConfirme ? "✓ Tú confirmaste" : "Falta tu confirmación"}</li>
          <li className={otroConfirmo ? "is-hecho" : undefined}>
            {otroConfirmo ? `✓ Confirmó ${otraParte}` : `Falta que lo confirme ${otraParte}`}
          </li>
        </ul>
      )}

      {!yoConfirme && !puedeConfirmar && <p className="trabajo-realizado__nota">Podrás confirmar cuando llegue la fecha del trabajo.</p>}

      {puedeConfirmar && (
        <Button onClick={props.onConfirmar} cargando={ocupado} bloque>
          Confirmar que el trabajo se completó
        </Button>
      )}

      {puedeCalificar && !abierto && (
        <Button variante="secundario" onClick={() => setAbierto(true)} bloque>
          Calificar a {nombreOtraParte}
        </Button>
      )}
      {puedeCalificar && abierto && (
        <FormularioCalificacion destinatario={nombreOtraParte} enviando={ocupado} onEnviar={props.onCalificar} onCancelar={() => setAbierto(false)} />
      )}

      {calificado && <p className="trabajo-realizado__nota">Ya calificaste a {nombreOtraParte}.</p>}
      {calificacionRecibida !== null && calificacionRecibida !== undefined && (
        <p className="trabajo-realizado__nota">
          Te calificaron con <Estrellas valor={calificacionRecibida} />
        </p>
      )}
    </div>
  );
}
