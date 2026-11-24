// Si el usuario fue enviado al login desde una página protegida, vuelve a ella al entrar
export function destinoTrasLogin(estado: unknown): string {
  const desde = (estado as { desde?: unknown } | null)?.desde;
  return typeof desde === "string" && desde.startsWith("/") ? desde : "/panel";
}
