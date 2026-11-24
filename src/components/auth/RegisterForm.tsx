import { useState } from "react";
import type { FormEvent } from "react";
import { useAuth } from "../../hooks/useAuth";
import type { RegistroInput, Rol } from "../../types/auth";
import { mensajeDeError } from "../../utils/errors";
import { validarRegistro } from "../../utils/validators";
import type { ErroresFormulario } from "../../utils/validators";
import { Alert } from "../ui/Alert";
import { Button } from "../ui/Button";
import { TextField } from "../ui/TextField";

export function RegisterForm() {
  const { registrar } = useAuth();
  const [rol, setRol] = useState<Rol>("trabajador");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  // Datos opcionales según el rol
  const [nit, setNit] = useState("");
  const [direccion, setDireccion] = useState("");
  const [habilidades, setHabilidades] = useState("");
  const [disponibilidad, setDisponibilidad] = useState("");

  const [errores, setErrores] = useState<ErroresFormulario>({});
  const [errorApi, setErrorApi] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  async function alEnviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErrorApi(null);

    const encontrados = validarRegistro(nombre, correo, password);
    setErrores(encontrados);
    if (Object.keys(encontrados).length > 0) return;

    const datos: RegistroInput = {
      nombre: nombre.trim(),
      correo: correo.trim().toLowerCase(),
      password,
      rol,
    };
    if (rol === "empleador") {
      if (nit.trim()) datos.nit = nit.trim();
      if (direccion.trim()) datos.direccion = direccion.trim();
    } else {
      const lista = habilidades
        .split(",")
        .map((h) => h.trim())
        .filter(Boolean);
      if (lista.length > 0) datos.habilidades = lista;
      if (disponibilidad.trim()) datos.disponibilidad = disponibilidad.trim();
    }

    setCargando(true);
    try {
      // Crea la cuenta e inicia sesión; PublicOnlyRoute lleva al usuario al panel
      await registrar(datos);
    } catch (error) {
      setErrorApi(mensajeDeError(error));
    } finally {
      setCargando(false);
    }
  }

  return (
    <form onSubmit={alEnviar} noValidate>
      {errorApi && <Alert>{errorApi}</Alert>}

      <fieldset className="selector-rol">
        <legend>¿Qué quieres hacer?</legend>
        <label className={`selector-rol__opcion${rol === "trabajador" ? " is-activa" : ""}`}>
          <input type="radio" name="rol" value="trabajador" checked={rol === "trabajador"} onChange={() => setRol("trabajador")} />
          <span>Buscar trabajo</span>
        </label>
        <label className={`selector-rol__opcion${rol === "empleador" ? " is-activa" : ""}`}>
          <input type="radio" name="rol" value="empleador" checked={rol === "empleador"} onChange={() => setRol("empleador")} />
          <span>Contratar personal</span>
        </label>
      </fieldset>

      <TextField
        etiqueta={rol === "empleador" ? "Nombre del negocio o persona" : "Nombre completo"}
        name="nombre"
        autoComplete="name"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        error={errores.nombre}
      />
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
        autoComplete="new-password"
        ayuda="Mínimo 6 caracteres"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errores.password}
      />

      {rol === "empleador" ? (
        <>
          <TextField etiqueta="NIT (opcional)" name="nit" value={nit} onChange={(e) => setNit(e.target.value)} />
          <TextField
            etiqueta="Dirección (opcional)"
            name="direccion"
            autoComplete="street-address"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </>
      ) : (
        <>
          <TextField
            etiqueta="Habilidades (opcional)"
            name="habilidades"
            ayuda="Separadas por coma, por ejemplo: mesero, cocina"
            value={habilidades}
            onChange={(e) => setHabilidades(e.target.value)}
          />
          <TextField
            etiqueta="Disponibilidad (opcional)"
            name="disponibilidad"
            ayuda="Por ejemplo: fines de semana"
            value={disponibilidad}
            onChange={(e) => setDisponibilidad(e.target.value)}
          />
        </>
      )}

      <Button type="submit" cargando={cargando} bloque>
        Crear cuenta
      </Button>
    </form>
  );
}
