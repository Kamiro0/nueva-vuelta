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

La API local usa por defecto el usuario MySQL `root` sin contraseña, habitual en XAMPP. Si cambiaste esa configuración, define `DB_HOST`, `DB_NAME`, `DB_USER` y `DB_PASSWORD` en el entorno de PHP. `.env.local` es solo para tu computadora; no lo subas a GitHub.

La API acepta comentarios y reacciones para los episodios (`podcast-01` a `podcast-03`), las historias (`historia-1` a `historia-3`) y el video (`video-principal`). Cada visitante puede elegir una de siete reacciones, cambiarla o quitarla; también se cuentan los compartidos. Cada visitante se identifica con un identificador aleatorio guardado en su navegador; no se necesita crear una cuenta.

Si la base MySQL ya existía antes de agregar las reacciones y los compartidos, importa una vez `database/migrate_reactions_and_shares.sql` desde phpMyAdmin.

## Video de Blogs

El video local de Blogs está en `public/videos/la-narco-cultura.mp4`. Para cambiarlo, reemplaza ese archivo manteniendo el nombre. También se aceptan enlaces directos `.mp4`, `.webm` u `.ogg`, además de enlaces de YouTube. Los comentarios aparecen debajo del reproductor.

## Comandos

- `npm run dev`: inicia el servidor local de Vite.
- `npm run build`: crea la versión estática de producción en `dist`.
- `npm run lint`: ejecuta Oxlint.
