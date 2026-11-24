import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { olvidePasswordApi } from "../../api/auth.api";
import { mensajeDeError } from "../../utils/errors";
import { validarOlvide } from "../../utils/validators";
import type { ErroresFormulario } from "../../utils/validators";
import { Alert } from "../ui/Alert";
import { Button } from "../ui/Button";
import { TextField } from "../ui/TextField";

export function OlvidePasswordForm() {
  const [correo, setCorreo] = useState("");
  const [errores, setErrores] = useState<ErroresFormulario>({});
  const [errorApi, setErrorApi] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null); // respuesta del servidor cuando se envió la solicitud
  const [enlaceRecuperacion, setEnlaceRecuperacion] = useState<string | null>(null);

  async function alEnviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErrorApi(null);

    const encontrados = validarOlvide(correo);
    setErrores(encontrados);
    if (Object.keys(encontrados).length > 0) return;

    setCargando(true);
    try {
      const respuesta = await olvidePasswordApi(correo.trim().toLowerCase());
      setMensaje(respuesta.mensaje);
      setEnlaceRecuperacion(respuesta.enlaceRecuperacion ?? null);
    } catch (error) {
      setErrorApi(mensajeDeError(error));
    } finally {
      setCargando(false);
    }
  }

  if (mensaje) {
    return (
      <div>
        <Alert tipo="info">{mensaje}</Alert>
        <p>Revisa tu bandeja de entrada y la carpeta de spam. El enlace vale 30 minutos.</p>
        {enlaceRecuperacion && (
          <p>
            <a href={enlaceRecuperacion} className="btn btn--primario btn--bloque">
              Abrir página para cambiar contraseña
            </a>
            <small>Enlace de prueba para desarrollo. En producción se envía al correo registrado.</small>
          </p>
        )}
        <Link to="/login" className="btn btn--secundario btn--bloque">
          Volver a iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={alEnviar} noValidate>
      {errorApi && <Alert>{errorApi}</Alert>}
      <p>Escribe el correo de tu cuenta y te enviaremos un enlace para elegir una contraseña nueva.</p>
      <TextField
        etiqueta="Correo"
        type="email"
        name="correo"
        autoComplete="email"
        inputMode="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        error={errores.correo}
      />
      <Button type="submit" cargando={cargando} bloque>
        Enviar enlace
      </Button>
    </form>
  );
}
