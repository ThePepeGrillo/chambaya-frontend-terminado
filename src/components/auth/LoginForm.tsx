import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { mensajeDeError } from "../../utils/errors";
import { validarLogin } from "../../utils/validators";
import type { ErroresFormulario } from "../../utils/validators";
import { Alert } from "../ui/Alert";
import { Button } from "../ui/Button";
import { TextField } from "../ui/TextField";

export function LoginForm() {
  const { iniciarSesion } = useAuth();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState<ErroresFormulario>({});
  const [errorApi, setErrorApi] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  async function alEnviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErrorApi(null);

    const encontrados = validarLogin(correo, password);
    setErrores(encontrados);
    if (Object.keys(encontrados).length > 0) return;

    setCargando(true);
    try {
      // Al iniciar sesión, PublicOnlyRoute detecta al usuario y lo lleva al panel
      await iniciarSesion(correo.trim().toLowerCase(), password);
    } catch (error) {
      setErrorApi(mensajeDeError(error));
    } finally {
      setCargando(false);
    }
  }

  return (
    <form onSubmit={alEnviar} noValidate>
      {errorApi && <Alert>{errorApi}</Alert>}
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
      <TextField
        etiqueta="Contraseña"
        type="password"
        name="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errores.password}
      />
      <p className="enlace-olvide">
        <Link to="/olvide-contrasena">¿Olvidaste tu contraseña?</Link>
      </p>
      <Button type="submit" cargando={cargando} bloque>
        Iniciar sesión
      </Button>
    </form>
  );
}
