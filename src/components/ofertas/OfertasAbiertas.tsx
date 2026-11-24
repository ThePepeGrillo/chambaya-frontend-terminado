import { useState } from "react";
import type { FormEvent } from "react";
import { listarMisPostulacionesApi, postularseApi } from "../../api/postulaciones.api";
import { useOfertas } from "../../hooks/useOfertas";
import { useRecurso } from "../../hooks/useRecurso";
import type { FiltrosOfertas } from "../../types/oferta";
import { mensajeDeError } from "../../utils/errors";
import { Alert } from "../ui/Alert";
import { BuscadorHero } from "./BuscadorHero";
import { ExploradorOfertas } from "./ExploradorOfertas";

export function OfertasAbiertas({ nombre }: { nombre: string }) {
  // Lo que se escribe en los campos y los filtros ya aplicados son cosas distintas:
  // la búsqueda solo se hace al presionar "Buscar ofertas"
  const [tipo, setTipo] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [filtros, setFiltros] = useState<FiltrosOfertas>({});
  const { cargando, error, listado } = useOfertas(filtros);

  const [seleccionada, setSeleccionada] = useState<number | null>(null);
  const [detalleAbierto, setDetalleAbierto] = useState(false);

  // Postulaciones del trabajador, para saber a qué ofertas ya se postuló
  const misPostulaciones = useRecurso(listarMisPostulacionesApi);
  const yaPostuladas = new Set(
    (misPostulaciones.datos?.data ?? []).filter((p) => p.estado !== "cancelada").map((p) => p.oferta.id),
  );

  const [enviando, setEnviando] = useState<number | null>(null);
  const [errorAccion, setErrorAccion] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  function alBuscar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setFiltros({ tipo: tipo.trim() || undefined, ubicacion: ubicacion.trim() || undefined });
    setSeleccionada(null);
    setDetalleAbierto(false);
  }

  function seleccionar(id: number) {
    setSeleccionada(id);
    setDetalleAbierto(true); // en celular abre el detalle; en pantallas grandes ya estaba visible
  }

  async function postularse(ofertaId: number) {
    setErrorAccion(null);
    setAviso(null);
    setEnviando(ofertaId);
    try {
      await postularseApi(ofertaId);
      setAviso("Te postulaste. Puedes ver el estado en «Mis postulaciones».");
      misPostulaciones.recargar();
      setDetalleAbierto(false); // en celular vuelve a la lista, donde se ve el aviso
    } catch (e) {
      setErrorAccion(mensajeDeError(e));
      setDetalleAbierto(false);
    } finally {
      setEnviando(null);
    }
  }

  return (
    <>
      <BuscadorHero nombre={nombre} tipo={tipo} ubicacion={ubicacion} onTipo={setTipo} onUbicacion={setUbicacion} onBuscar={alBuscar} />

      <div className="contenedor">
        {aviso && <Alert tipo="info">{aviso}</Alert>}
        {errorAccion && <Alert>{errorAccion}</Alert>}
        {error && <Alert>{error}</Alert>}
        {cargando && !listado && <p className="estado-vacio">Cargando ofertas...</p>}

        {listado && listado.data.length === 0 && (
          <p className="estado-vacio">{listado.sugerencia ?? "No hay ofertas por ahora."}</p>
        )}
        {listado && listado.data.length > 0 && (
          <>
            <p className="resultados__resumen">
              <strong>{listado.total}</strong> {listado.total === 1 ? "oferta de empleo" : "ofertas de empleo"}
            </p>
            <ExploradorOfertas
              ofertas={listado.data}
              ofertaActivaId={seleccionada}
              detalleAbierto={detalleAbierto}
              yaPostuladas={yaPostuladas}
              enviando={enviando}
              onSeleccionar={seleccionar}
              onCerrarDetalle={() => setDetalleAbierto(false)}
              onPostular={postularse}
            />
          </>
        )}
      </div>
    </>
  );
}
