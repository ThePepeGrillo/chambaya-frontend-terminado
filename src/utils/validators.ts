// Validaciones del formulario (las mismas reglas que aplica el backend).
// Devuelven un objeto { campo: "mensaje" }; si está vacío, no hay errores.
export type ErroresFormulario = Record<string, string>;

const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validarLogin(correo: string, password: string): ErroresFormulario {
  const errores: ErroresFormulario = {};
  if (!correo.trim()) errores.correo = "Escribe tu correo";
  else if (!REGEX_CORREO.test(correo.trim())) errores.correo = "El correo no tiene un formato válido";
  if (!password) errores.password = "Escribe tu contraseña";
  return errores;
}

export function validarRegistro(nombre: string, correo: string, password: string): ErroresFormulario {
  const errores: ErroresFormulario = {};
  if (!nombre.trim()) errores.nombre = "Escribe tu nombre";
  if (!correo.trim()) errores.correo = "Escribe tu correo";
  else if (!REGEX_CORREO.test(correo.trim())) errores.correo = "El correo no tiene un formato válido";
  if (!password) errores.password = "Escribe una contraseña";
  else if (password.length < 6) errores.password = "La contraseña debe tener mínimo 6 caracteres";
  return errores;
}

// Los campos de un formulario siempre son texto; aquí se revisan antes de convertirlos a número o fecha
export interface DatosNuevaOferta {
  titulo: string;
  tipo: string;
  descripcion: string;
  fecha: string; // formato del campo datetime-local, por ejemplo 2026-12-15T20:00
  duracionHoras: string;
  pago: string;
  ubicacion: string;
  cupos: string;
}

export function validarNuevaOferta(d: DatosNuevaOferta, ahora: number = Date.now()): ErroresFormulario {
  const errores: ErroresFormulario = {};
  if (!d.titulo.trim()) errores.titulo = "Escribe un título";
  if (!d.tipo.trim()) errores.tipo = "Escribe el tipo de trabajo";
  if (!d.descripcion.trim()) errores.descripcion = "Describe el trabajo";
  if (!d.ubicacion.trim()) errores.ubicacion = "Escribe el lugar";

  if (!d.fecha) errores.fecha = "Elige la fecha y la hora";
  else if (Number.isNaN(Date.parse(d.fecha))) errores.fecha = "La fecha no es válida";
  else if (Date.parse(d.fecha) <= ahora) errores.fecha = "La fecha debe ser futura";

  const horas = Number(d.duracionHoras);
  if (!d.duracionHoras.trim() || !Number.isFinite(horas) || horas <= 0) errores.duracionHoras = "Escribe una duración mayor que 0";

  const pago = Number(d.pago);
  if (!d.pago.trim() || !Number.isFinite(pago) || pago <= 0) errores.pago = "Escribe un pago mayor que 0";

  const cupos = Number(d.cupos);
  if (!d.cupos.trim() || !Number.isInteger(cupos) || cupos < 1) errores.cupos = "Los cupos deben ser un número entero, mínimo 1";
  return errores;
}

export function validarOlvide(correo: string): ErroresFormulario {
  const errores: ErroresFormulario = {};
  if (!correo.trim()) errores.correo = "Escribe tu correo";
  else if (!REGEX_CORREO.test(correo.trim())) errores.correo = "El correo no tiene un formato válido";
  return errores;
}

export function validarRestablecer(password: string, confirmacion: string): ErroresFormulario {
  const errores: ErroresFormulario = {};
  if (!password) errores.password = "Escribe tu nueva contraseña";
  else if (password.length < 6) errores.password = "La contraseña debe tener mínimo 6 caracteres";
  if (!confirmacion) errores.confirmacion = "Repite la contraseña";
  else if (password && confirmacion !== password) errores.confirmacion = "Las contraseñas no coinciden";
  return errores;
}

export function validarPuntaje(puntaje: number): ErroresFormulario {
  return puntaje >= 1 && puntaje <= 5 ? {} : { puntaje: "Elige de 1 a 5 estrellas" };
}
