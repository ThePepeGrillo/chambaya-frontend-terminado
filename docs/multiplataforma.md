# Revisión de multiplataforma

Los requisitos del proyecto piden que ChambaYa funcione en **Chrome y Firefox** y en **Android 10 o superior**. Como es una aplicación web, se cubre con un diseño que se adapta al tamaño de la pantalla y se revisa en cada navegador.

## Cómo está resuelto en el código

- **Diseño para celular primero:** los estilos base son los de una pantalla pequeña y se amplían con `@media (min-width: ...)` para tablet (640 px) y computador (960 px).
- **Etiqueta viewport** en `index.html`, para que el celular no muestre la página como si fuera de escritorio.
- **Botones y campos de al menos 44 px de alto**, para que se puedan tocar con el dedo.
- **Texto de los campos de 16 px:** evita que el celular haga zoom al escribir.
- **Teclado adecuado:** el campo de correo usa `type="email"` e `inputMode="email"`, y los de contraseña usan `autoComplete`, para que el celular ofrezca el teclado y el autocompletado correctos.
- **Rejilla de ofertas** que se acomoda sola al ancho de pantalla (1, 2 o 3 columnas).
- **Lista y detalle de ofertas:** en pantallas grandes van lado a lado; en celular el detalle se abre a pantalla completa con un botón "Volver a la lista".
- **Buscador del banner:** en celular los campos se apilan; en computador forman una sola píldora.
- **Sin dependencias de un solo navegador:** solo se usa HTML, CSS y JavaScript estándar.

## Cómo revisarlo

### 1. En el computador, con las herramientas del navegador
- **Chrome:** F12, y luego el ícono de celular y tablet (o Ctrl + Shift + M). Elegir un modelo, por ejemplo Pixel 5, y revisar también "Responsive" arrastrando el ancho.
- **Firefox:** Ctrl + Shift + M (Modo de diseño adaptable). Probar varios anchos.

### 2. En un celular Android de verdad
Hace falta que el computador y el celular estén en la **misma red Wi-Fi**.

1. Averiguar la IP del computador: en la terminal, `ipconfig`, y buscar "Dirección IPv4" (por ejemplo `192.168.1.20`).
2. En el backend, en el archivo `.env`, agregar esa dirección del frontend a `CORS_ORIGIN`, separada por coma:
   ```
   CORS_ORIGIN=http://localhost:5173,http://192.168.1.20:5173
   ```
   y reiniciar el backend.
3. En el frontend, crear el archivo `.env` con la dirección del backend en esa IP:
   ```
   VITE_API_URL=http://192.168.1.20:3000/api/v1
   ```
4. Encender el frontend aceptando conexiones de la red:
   ```
   npm run dev -- --host
   ```
5. En el celular, abrir Chrome y entrar a `http://192.168.1.20:5173`.
6. Si no carga, el firewall de Windows puede estar bloqueando Node.js: aceptar el permiso para redes privadas cuando Windows lo pregunte.

Android 10 funciona sin problema si el navegador está actualizado desde Play Store. El celular debe tener Chrome (o Firefox) en una versión reciente.

## Lista de revisión

Marcar cada punto en Chrome (computador), Firefox (computador) y Chrome en Android:

| Qué revisar | Chrome PC | Firefox PC | Chrome Android |
|---|---|---|---|
| Login: se ve completo, sin scroll horizontal | | | |
| Registro: el selector de rol cambia los campos | | | |
| Al escribir en un campo, la página no se acerca sola | | | |
| El teclado de correo muestra la arroba | | | |
| Los botones se pueden tocar sin errar | | | |
| Crear cuenta e iniciar sesión funcionan | | | |
| Al recargar, la sesión se mantiene | | | |
| "Salir" cierra la sesión y lleva al login | | | |
| El panel del trabajador muestra las ofertas en 1 columna | | | |
| El panel en tablet o computador usa 2 o 3 columnas | | | |
| Publicar oferta: el selector de fecha y hora se abre bien | | | |
| Publicar oferta: los campos numéricos abren el teclado numérico | | | |
| Los botones Aceptar y Rechazar del empleador caben sin desbordar | | | |
| La barra de enlaces (Buscar ofertas, Mis postulaciones) se ve completa | | | |
| En celular, tocar una oferta abre el detalle a pantalla completa | | | |
| En celular, "Volver a la lista" regresa a las ofertas | | | |
| En computador, el detalle aparece a la derecha y cambia al elegir otra oferta | | | |
| Las estrellas de calificación se pueden tocar sin errar (celular) y elegir con el teclado (computador) | | | |
| El enlace "¿Olvidaste tu contraseña?" se ve y se toca bien | | | |
| La página de recuperar contraseña se ve bien con el teclado abierto | | | |
| El buscador del banner se ve bien (apilado en celular, píldora en computador) | | | |
| Cancelar una participación: el campo de motivo y los botones se ven bien | | | |

## Pendiente para más adelante
- Si el profesor lo pide, convertir la página en una PWA (que se pueda instalar en el celular como una app). Hace falta un manifiesto y los íconos.
