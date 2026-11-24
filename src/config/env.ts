// Dirección de la API. Se cambia con la variable VITE_API_URL del archivo .env
const env = import.meta.env as { VITE_API_URL?: string } | undefined;

export const API_URL: string = env?.VITE_API_URL ?? "http://localhost:3000/api/v1";
