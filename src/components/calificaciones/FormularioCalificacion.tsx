import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { validarPuntaje } from "../../utils/validators";
import { Button } from "../ui/Button";
import { SelectorEstrellas } from "../ui/SelectorEstrellas";
import { TextArea } from "../ui/TextArea";

interface FormularioCalificacionProps {
  destinatario: string; // nombre de quien se califica
  enviando: boolean;
  onEnviar: (puntaje: number, comentario: string) => void;
  onCancelar: () => void;
}

export function FormularioCalificacion({ destinatario, enviando, onEnviar, onCancelar }: FormularioCalificacionProps) {
  const [puntaje, setPuntaje] = useState(0);
  const [comentario, setComentario] = useState("");
  const [errorPuntaje, setErrorPuntaje] = useState<string | undefined>(undefined);

  function alEnviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const errores = validarPuntaje(puntaje);
    setErrorPuntaje(errores.puntaje);
    if (errores.puntaje) return;
    onEnviar(puntaje, comentario.trim());
  }

  return (
    <form className="formulario-calificacion" onSubmit={alEnviar} noValidate>
      <SelectorEstrellas valor={puntaje} onChange={setPuntaje} error={errorPuntaje} />
      <TextArea
        etiqueta={`Comentario sobre ${destinatario} (opcional)`}
        name="comentario"
        maxLength={500}
        value={comentario}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setComentario(e.target.value)}
      />
      <div className="oferta__botones">
        <Button type="submit" cargando={enviando}>
          Enviar calificación
        </Button>
        <Button variante="secundario" onClick={onCancelar} disabled={enviando}>
          Volver
        </Button>
      </div>
    </form>
  );
}
