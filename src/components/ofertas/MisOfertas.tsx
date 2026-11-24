import { useState } from "react";
import { Link } from "react-router-dom";
import { listarMisOfertasApi } from "../../api/ofertas.api";
import { useRecurso } from "../../hooks/useRecurso";
import { Alert } from "../ui/Alert";
import { Button } from "../ui/Button";
import { EstadoBadge } from "../ui/EstadoBadge";
import { OfertaCard } from "./OfertaCard";
import { PostulantesDeOferta } from "./PostulantesDeOferta";

export function MisOfertas() {
  const { cargando, error, datos, recargar } = useRecurso(listarMisOfertasApi);
  const [abierta, setAbierta] = useState<number | null>(null); // oferta con la lista de postulantes desplegada

  return (
    <section>
      {error && <Alert>{error}</Alert>}
      {cargando && !datos && <p className="estado-vacio">Cargando tus ofertas...</p>}

      {datos && datos.data.length === 0 && (
        <div className="estado-vacio">
          <p>Todavía no has publicado ofertas.</p>
          <Link to="/ofertas/nueva" className="btn btn--naranja">
            Publicar mi primera oferta
          </Link>
        </div>
      )}

      {datos && datos.data.length > 0 && (
        <>
          <p className="resultados__resumen">
            <strong>{datos.data.length}</strong> {datos.data.length === 1 ? "oferta publicada" : "ofertas publicadas"}
          </p>
          <div className="rejilla">
            {datos.data.map((oferta) => (
              <div key={oferta.id} className="oferta-bloque">
                <OfertaCard
                  oferta={oferta}
                  insignia={<EstadoBadge estado={oferta.estado} />}
                  acciones={
                    <Button variante="secundario" onClick={() => setAbierta(abierta === oferta.id ? null : oferta.id)}>
                      {abierta === oferta.id ? "Ocultar postulantes" : "Ver postulantes"}
                    </Button>
                  }
                />
                {abierta === oferta.id && <PostulantesDeOferta ofertaId={oferta.id} onCambio={recargar} />}
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
