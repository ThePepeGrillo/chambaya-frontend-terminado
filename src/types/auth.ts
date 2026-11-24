export type Rol = "empleador" | "trabajador";

export interface UsuarioSesion {
  id: number;
  nombre: string;
  rol: Rol;
}

// Lo que devuelve el login y lo que se guarda en el navegador
export interface Sesion {
  token: string;
  usuario: UsuarioSesion;
}

export interface RegistroInput {
  nombre: string;
  correo: string;
  password: string;
  rol: Rol;
  nit?: string;
  direccion?: string;
  habilidades?: string[];
  disponibilidad?: string;
}
