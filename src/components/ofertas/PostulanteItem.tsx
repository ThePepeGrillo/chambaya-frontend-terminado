import type { Postulante } from "../../types/postulacion";
import { AccionesTrabajoRealizado } from "../calificaciones/AccionesTrabajoRealizado";
import { Button } from "../ui/Button";
import { EstadoBadge } from "../ui/EstadoBadge";
import { Estrellas } from "../ui/Estrellas";

interface PostulanteItemProps {
  postulante: Postulante;
  ocupado: boolean; // true mientras se procesa una acción
  onAceptar: () => void;
  onRechazar: () => void;
  onConfirmar: () => void;
  onCalificar: (puntaje: number, comentario: string) => void;
}

export function PostulanteItem({ postulante, ocupado, onAceptar, onRechazar, onConfirmar, onCalificar }: PostulanteItemProps) {
  const { trabajador } = postulante;

  return (
    <li className="postulante">
      <div className="postulante__principal">
        <span className="avatar" aria-hidden="true">
          {trabajador.nombre.trim().charAt(0).toUpperCase()}
        </span>
        <div className="postulante__info">
          <div className="postulante__nombre">
            <strong>{trabajador.nombre}</strong>
            <EstadoBadge estado={postulante.estado} />
          </div>
          <p>
            {trabajador.calificacionPromedio !== null ? (
              <Estrellas valor={trabajador.calificacionPromedio} total={trabajador.calificacionesTotal} />
            ) : (
              "Sin calificaciones"
            )}
          </p>
          {trabajador.habilidades.length > 0 && <p>Habilidades: {trabajador.habilidades.join(", ")}</p>}
          {trabajador.disponibilidad && <p>Disponibilidad: {trabajador.disponibilidad}</p>}
        </div>
      </div>

      {postulante.estado === "pendiente" && (
        <div className="postulante__acciones">
          <Button onClick={onAceptar} disabled={ocupado}>
            Aceptar
          </Button>
          <Button variante="secundario" onClick={onRechazar} disabled={ocupado}>
            Rechazar
          </Button>
        </div>
      )}

      {postulante.estado === "aceptada" && (
        <AccionesTrabajoRealizado
          otraParte="el trabajador"
          nombreOtraParte={trabajador.nombre}
          yoConfirme={postulante.confirmadaPorEmpleador}
          otroConfirmo={postulante.confirmadaPorTrabajador}
          puedeConfirmar={postulante.puedeConfirmar}
          puedeCalificar={postulante.puedeCalificar}
          calificado={postulante.calificado}
          ocupado={ocupado}
          onConfirmar={onConfirmar}
          onCalificar={onCalificar}
        />
      )}
    </li>
  );
}
