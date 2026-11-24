# ChambaYa Frontend

Interfaz web de ChambaYa, la plataforma para conseguir trabajos temporales (proyecto del semestre de Construcción de Software, UAN). Está hecha con React, TypeScript y Vite, y se conecta con la API del repositorio `chambaya-backend`.

Tiene registro, inicio de sesión, rutas protegidas y el flujo principal: el empleador publica ofertas y decide sobre los postulantes, y el trabajador busca ofertas, se postula y puede cancelar.

## Cómo correrlo

Hace falta Node.js 20 o superior y tener el backend encendido.

```
npm install
npm install react-router-dom
npm run dev
```

El segundo comando solo se necesita la primera vez, si el proyecto todavía no lo tiene en `package.json`. La página queda en `http://localhost:5173`.

Si el backend no está en `http://localhost:3000`, copiar `.env.example` como `.env` y cambiar `VITE_API_URL`.

## Scripts

- `npm run dev`: servidor de desarrollo
- `npm run build`: genera la versión para publicar
- `npm run preview`: abre esa versión localmente
- `npm run lint`: revisa el código

## Pantallas

- `/login` y `/registro`: públicas. Si ya hay sesión, llevan al panel.
- `/panel`: con sesión iniciada.
  - **Trabajador:** banner azul con el buscador (tipo de trabajo y lugar). Debajo, la lista de ofertas y, al lado, el detalle de la oferta elegida con el botón para postularse. En celular, al tocar una oferta el detalle se abre a pantalla completa.
  - **Empleador:** banner con su saludo y sus ofertas (abiertas y cubiertas). Cada una despliega la lista de postulantes con los botones Aceptar y Rechazar. El botón naranja "Publicar oferta" está siempre en la barra superior.
- `/ofertas/nueva`: solo empleadores. Formulario para publicar una oferta.
- `/olvide-contrasena` y `/restablecer`: recuperar la contraseña. Se puede entrar con o sin sesión, porque el enlace llega por correo.
- `/mis-postulaciones`: solo trabajadores. Estado de cada postulación y cancelación con motivo.
- Cualquier otra dirección muestra una página de "no encontrada".

**Confirmación y calificaciones:** cuando un trabajador es aceptado, empleador y trabajador confirman por separado que el trabajo se completó (el botón aparece desde las 00:00 del día del trabajo (hora de Colombia)). Con las dos confirmaciones, cada uno puede calificar al otro con estrellas de 1 a 5 y un comentario opcional. El promedio del trabajador se ve en la lista de postulantes.

**Olvidé mi contraseña:** en el login hay un enlace que lleva a pedir el enlace de recuperación. El enlace abre `/restablecer?token=...`, donde se elige la contraseña nueva. En desarrollo sin proveedor de correo, aparece un botón para abrir directamente el enlace de prueba; en producción se envía al correo mediante Resend.

Las reglas de cupos las aplica el backend: al aceptar al último postulante la oferta pasa a "cubierta" y deja de salir en las ofertas abiertas; si alguien aceptado cancela, se reabre. Si un trabajador cancela con menos de 24 horas de anticipación, queda como cancelación tardía.

La sesión se guarda en el navegador y se recupera al recargar, siempre que el token no haya vencido. Si el servidor responde 401, la sesión se cierra sola.

## Arquitectura

El código está separado por responsabilidades, igual que el backend:

```
src/
  main.tsx, App.tsx    arranque de la aplicación
  config/              dirección de la API
  types/               tipos de los datos (usuario, sesión, oferta)
  api/                 comunicación con el backend (cliente HTTP y una función por recurso)
  context/             estado de la sesión (AuthProvider)
  hooks/               useAuth y useOfertas
  routes/              rutas y protección (ProtectedRoute, PublicOnlyRoute)
  pages/               una pantalla por ruta
  components/
    ui/                piezas reutilizables (Button, TextField, TextArea, Alert, EstadoBadge, Icono, Logo, CampoBuscador)
    layout/            estructura de las páginas (Navbar, Layout, EncabezadoPagina, AuthLayout)
    auth/              formularios de login y registro
    ofertas/           buscador, lista y detalle de ofertas, ofertas del empleador y postulantes
    postulaciones/     postulaciones del trabajador
  utils/               validaciones, formato, token y almacenamiento
  styles/              estilos base y de componentes
docs/
  multiplataforma.md   cómo se revisó en Chrome, Firefox y Android
```

Las páginas arman la pantalla con componentes; los componentes usan hooks; los hooks llaman a `api/`, que es la única capa que habla con el backend.

## Diseño

La imagen visual está inspirada en los portales de empleo: azul marino como color base, naranja para las acciones del empleador, buscador en forma de píldora sobre un banner azul, y lista de ofertas con detalle al lado. Los colores y medidas están como variables al inicio de `src/styles/base.css` (`--azul-marino`, `--naranja`, etc.), así que se pueden cambiar en un solo lugar. Los íconos son SVG propios en `components/ui/Icono.tsx`, sin librerías externas.

## Multiplataforma

El diseño se adapta de celular a computador y se revisa en Chrome, Firefox y Android 10 o superior. El detalle y la lista de revisión están en `docs/multiplataforma.md`.

## Si algo falla

- **"No se pudo conectar con el servidor":** el backend está apagado o `VITE_API_URL` apunta a otra dirección.
- **El navegador muestra un error de CORS:** agregar la dirección del frontend en `CORS_ORIGIN` del `.env` del backend y reiniciarlo.
- **`Failed to resolve import "react-router-dom"`:** falta ejecutar `npm install react-router-dom`.
