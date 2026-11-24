import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { crearOfertaApi } from "../../api/ofertas.api";
import { mensajeDeError } from "../../utils/errors";
import { validarNuevaOferta } from "../../utils/validators";
import type { DatosNuevaOferta, ErroresFormulario } from "../../utils/validators";
import { Alert } from "../ui/Alert";
import { Button } from "../ui/Button";
import { TextArea } from "../ui/TextArea";
import { TextField } from "../ui/TextField";

const VACIO: DatosNuevaOferta = {
  titulo: "",
  tipo: "",
  descripcion: "",
  fecha: "",
  duracionHoras: "",
  pago: "",
  ubicacion: "",
  cupos: "1",
};

export function NuevaOfertaForm() {
  const navigate = useNavigate();
  const [valores, setValores] = useState<DatosNuevaOferta>(VACIO);
  const [errores, setErrores] = useState<ErroresFormulario>({});
  const [errorApi, setErrorApi] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  // Devuelve la función que guarda lo escrito en el campo indicado
  const cambiar = (campo: keyof DatosNuevaOferta) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const texto = e.target.value;
    setValores((previo) => ({ ...previo, [campo]: texto }));
  };

  async function alEnviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErrorApi(null);

    const encontrados = validarNuevaOferta(valores);
    setErrores(encontrados);
    if (Object.keys(encontrados).length > 0) return;

    setCargando(true);
    try {
      await crearOfertaApi({
        titulo: valores.titulo.trim(),
        tipo: valores.tipo.trim(),
        descripcion: valores.descripcion.trim(),
        fecha: new Date(valores.fecha).toISOString(),
        duracionHoras: Number(valores.duracionHoras),
        pago: Number(valores.pago),
        ubicacion: valores.ubicacion.trim(),
        cupos: Number(valores.cupos),
      });
      navigate("/panel");
    } catch (e) {
      setErrorApi(mensajeDeError(e));
    } finally {
      setCargando(false);
    }
  }

  return (
    <form onSubmit={alEnviar} noValidate>
      {errorApi && <Alert>{errorApi}</Alert>}
      <TextField etiqueta="Título" name="titulo" placeholder="Ej: Meseros para evento" value={valores.titulo} onChange={cambiar("titulo")} error={errores.titulo} />
      <TextField etiqueta="Tipo de trabajo" name="tipo" placeholder="Ej: mesero" value={valores.tipo} onChange={cambiar("tipo")} error={errores.tipo} />
      <TextArea etiqueta="Descripción" name="descripcion" value={valores.descripcion} onChange={cambiar("descripcion")} error={errores.descripcion} />
      <TextField etiqueta="Fecha y hora" type="datetime-local" name="fecha" value={valores.fecha} onChange={cambiar("fecha")} error={errores.fecha} />
      <div className="grupo-campos">
        <TextField
          etiqueta="Duración (horas)"
          type="number"
          inputMode="decimal"
          min="0.5"
          step="0.5"
          name="duracionHoras"
          value={valores.duracionHoras}
          onChange={cambiar("duracionHoras")}
          error={errores.duracionHoras}
        />
        <TextField
          etiqueta="Pago (COP)"
          type="number"
          inputMode="numeric"
          min="1"
          step="1000"
          name="pago"
          value={valores.pago}
          onChange={cambiar("pago")}
          error={errores.pago}
        />
        <TextField
          etiqueta="Cupos"
          type="number"
          inputMode="numeric"
          min="1"
          step="1"
          name="cupos"
          value={valores.cupos}
          onChange={cambiar("cupos")}
          error={errores.cupos}
        />
      </div>
      <TextField etiqueta="Ubicación" name="ubicacion" placeholder="Ej: Chapinero, Bogotá" value={valores.ubicacion} onChange={cambiar("ubicacion")} error={errores.ubicacion} />
      <Button type="submit" cargando={cargando} bloque>
        Publicar oferta
      </Button>
    </form>
  );
}
