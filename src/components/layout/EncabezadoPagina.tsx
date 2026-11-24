interface EncabezadoPaginaProps {
  titulo: string;
  subtitulo?: string;
}

// Banner azul con el título de la pantalla
export function EncabezadoPagina({ titulo, subtitulo }: EncabezadoPaginaProps) {
  return (
    <section className="encabezado-pagina">
      <div className="encabezado-pagina__contenido">
        <h1>{titulo}</h1>
        {subtitulo && <p>{subtitulo}</p>}
      </div>
    </section>
  );
}
