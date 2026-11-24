// Revisa si un token todavía no ha vencido (solo lee la fecha; la firma la valida el servidor)
export function tokenVigente(token: string): boolean {
  try {
    const parteCentral = token.split(".")[1];
    if (!parteCentral) return false;
    const base64 = parteCentral.replace(/-/g, "+").replace(/_/g, "/");
    const relleno = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const datos = JSON.parse(atob(relleno)) as { exp?: number };
    return typeof datos.exp === "number" && datos.exp > Date.now() / 1000;
  } catch {
    return false;
  }
}
