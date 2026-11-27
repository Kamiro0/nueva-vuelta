# La Nueva Vuelta

Sitio hecho con React y Vite. La sección **Blogs** incluye el video y sus comentarios, reacciones y compartidos.

## Publicar en Vercel con Neon

La API de producción usa una función Node en Vercel y una base PostgreSQL alojada en Neon. XAMPP/MySQL no está disponible para el sitio publicado.

1. Crea una cuenta en [Neon](https://neon.tech/) e inicia un proyecto PostgreSQL.
2. En Neon, abre **SQL Editor**. Abre `database/vercel_postgres.sql` en este proyecto, copia todo su contenido en el editor de Neon y pulsa **Run** para crear las tablas.
3. En Neon, pulsa **Connect** y copia la cadena de conexión PostgreSQL.
4. En Vercel, abre el proyecto y ve a **Settings → Environment Variables**. Agrega:

   - **Name:** `DATABASE_URL`
   - **Value:** la cadena de conexión de Neon
   - **Environments:** Production y Preview

   Guarda el cambio. No pegues la cadena en el código ni la subas a GitHub.
5. Si existe `VITE_API_BASE_URL` en las variables de Vercel, elimínala: solo se usa para desarrollo local con XAMPP. Después, en **Deployments**, vuelve a desplegar la versión más reciente.

Vercel sirve la función en `/api/feedback`. Cuando el despliegue termine, comentarios y reacciones se guardarán en Neon. Si ya tenías información en MySQL/XAMPP, este esquema crea las tablas vacías; esa información no se copia automáticamente.

## Desarrollo local con XAMPP

1. Inicia **Apache** y **MySQL** desde el panel de XAMPP.
2. Abre `http://localhost/phpmyadmin`, importa `database/la_nueva_vuelta.sql` y confirma que se creó la base `la_nueva_vuelta`.
3. Copia la API PHP local a la carpeta de XAMPP:

   ```powershell
   Copy-Item -Recurse -Force .\local-api\php C:\xampp\htdocs\nueva-vuelta\api
   ```

4. Crea `.env.local` junto a `package.json`:

   ```env
   VITE_API_BASE_URL=http://localhost/nueva-vuelta/api
   ```

5. Desde la carpeta del proyecto, ejecuta `npm run dev` y abre la dirección que indique Vite, normalmente `http://localhost:5173`.

Si las reacciones o comentarios muestran **Failed to fetch**, confirma que Apache y MySQL estén iniciados en XAMPP y que la API esté copiada en `C:\xampp\htdocs\nueva-vuelta\api`. Si Vite eligió otro puerto, la API local acepta orígenes `localhost` y `127.0.0.1` en cualquier puerto.

La API local usa por defecto el usuario MySQL `root` sin contraseña, habitual en XAMPP. Si cambiaste esa configuración, define `DB_HOST`, `DB_NAME`, `DB_USER` y `DB_PASSWORD` en el entorno de PHP. `.env.local` es solo para tu computadora; no lo subas a GitHub.

La API acepta comentarios y reacciones para los episodios (`podcast-01` a `podcast-03`), las historias (`historia-1` a `historia-3`) y el video (`video-principal`). Cada visitante puede elegir una de siete reacciones, cambiarla o quitarla; también se cuentan los compartidos. Cada visitante se identifica con un identificador aleatorio guardado en su navegador; no se necesita crear una cuenta.

Si la base MySQL ya existía antes de agregar las reacciones y los compartidos, importa una vez `database/migrate_reactions_and_shares.sql` desde phpMyAdmin.

## Video de Blogs

Por defecto, Blogs usa `public/videos/la-narco-cultura.mp4`. El archivo actual pesa unos 90 MB; por eso puede tardar en cargar. Puedes reducirlo con HandBrake (MP4, H.264, audio AAC y 720p) o alojarlo en un servicio de video.

La opción más sencilla es subirlo a YouTube como **No listado** y copiar el enlace para compartir. En Vercel, abre **Settings → Environment Variables** y agrega:

- **Name:** `VITE_VIDEO_URL`
- **Value:** el enlace de YouTube, por ejemplo `https://youtu.be/ID_DEL_VIDEO`
- **Environments:** Production y Preview

Guarda y vuelve a desplegar. La página convierte automáticamente los enlaces de YouTube compatibles al reproductor incrustado. También puedes usar la URL pública directa de un archivo `.mp4`, `.webm` u `.ogg` alojado en un servicio de almacenamiento que permita servir el video.

Para probarlo localmente, agrega `VITE_VIDEO_URL=https://youtu.be/ID_DEL_VIDEO` a `.env.local` junto a `package.json`. Si no defines esta variable, se seguirá usando el MP4 local. Los comentarios aparecen debajo del reproductor.

## Rutas directas en Vercel

`vercel.json` configura las rutas de la aplicación para que abrir o recargar `/blogs`, `/capitulos` y las páginas de historia cargue React en lugar de devolver un 404. La ruta `/api/feedback` no se reescribe y sigue atendida por la función de Vercel.

## Comandos

- `npm run dev`: inicia el servidor local de Vite.
- `npm run build`: crea la versión estática de producción en `dist`.
- `npm run lint`: ejecuta Oxlint.
