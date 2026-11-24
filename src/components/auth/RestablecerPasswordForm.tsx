import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { restablecerPasswordApi } from "../../api/auth.api";
import { ApiError } from "../../api/http";
import { mensajeDeError } from "../../utils/errors";
import { validarRestablecer } from "../../utils/validators";
import type { ErroresFormulario } from "../../utils/validators";
import { Alert } from "../ui/Alert";
import { Button } from "../ui/Button";
import { TextField } from "../ui/TextField";

export function RestablecerPasswordForm({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [confirmacion, setConfirmacion] = useState("");
  const [errores, setErrores] = useState<ErroresFormulario>({});
  const [errorApi, setErrorApi] = useState<string | null>(null);
  const [enlaceInvalido, setEnlaceInvalido] = useState(false); // el servidor dijo que el enlace no sirve
  const [cargando, setCargando] = useState(false);
  const [listo, setListo] = useState<string | null>(null);

  async function alEnviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErrorApi(null);

    const encontrados = validarRestablecer(password, confirmacion);
    setErrores(encontrados);
    if (Object.keys(encontrados).length > 0) return;

    setCargando(true);
    try {
      const respuesta = await restablecerPasswordApi(token, password);
      setListo(respuesta.mensaje);
    } catch (error) {
      setErrorApi(mensajeDeError(error));
      setEnlaceInvalido(error instanceof ApiError && error.status === 400);
    } finally {
      setCargando(false);
    }
  }

  if (listo) {
    return (
      <div>
        <Alert tipo="info">{listo}</Alert>
        <Link to="/login" className="btn btn--primario btn--bloque">
          Iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={alEnviar} noValidate>
      {errorApi && <Alert>{errorApi}</Alert>}
      {enlaceInvalido && (
        <p>
          <Link to="/olvide-contrasena">Pedir un enlace nuevo</Link>
        </p>
      )}
      <TextField
        etiqueta="Contraseña nueva"
        type="password"
        name="password"
        autoComplete="new-password"
        ayuda="Mínimo 6 caracteres"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errores.password}
      />
      <TextField
        etiqueta="Repite la contraseña"
        type="password"
        name="confirmacion"
        autoComplete="new-password"
        value={confirmacion}
        onChange={(e) => setConfirmacion(e.target.value)}
        error={errores.confirmacion}
      />
      <Button type="submit" cargando={cargando} bloque>
        Guardar contraseña
      </Button>
    </form>
  );
}
