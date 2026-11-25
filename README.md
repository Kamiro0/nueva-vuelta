# La Nueva Vuelta

Sitio hecho con React y Vite. La sección **Blogs** ya está en el menú; el espacio de video está listo para añadir el enlace cuando lo compartas.

## Comentarios y reacciones con XAMPP

Los comentarios y las reacciones se guardan en MySQL mediante PHP. Para activarlos:

1. Inicia **Apache** y **MySQL** desde el panel de XAMPP.
2. Abre `http://localhost/phpmyadmin`, importa `database/la_nueva_vuelta.sql` y confirma que se creó la base `la_nueva_vuelta`.
3. En desarrollo, copia `public/api` a `C:\xampp\htdocs\nueva-vuelta\api` y crea `.env.local` en este proyecto con:

   ```env
   VITE_API_BASE_URL=http://localhost/nueva-vuelta/api
   ```

4. Inicia el sitio con `npm run dev`. La API usa por defecto el usuario MySQL `root` sin contraseña, que es la configuración habitual de XAMPP. Si tu instalación tiene otra configuración, define `DB_HOST`, `DB_NAME`, `DB_USER` y `DB_PASSWORD` en el entorno de PHP.

Al publicar, compila con la ruta de la carpeta que usarás en Apache:

```powershell
$env:VITE_BASE_PATH = '/nueva-vuelta/'
npm run build
```

Copia **el contenido de `dist`** a `C:\xampp\htdocs\nueva-vuelta`. El build incluye la API PHP y las imágenes. Abre `http://localhost/nueva-vuelta`. Si la carpeta tiene otro nombre, cambia `/nueva-vuelta/` por esa ruta antes de compilar.

La API acepta comentarios y reacciones para los tres episodios (`podcast-01` a `podcast-03`), las tres historias (`historia-1` a `historia-3`) y el video (`video-principal`). Cada visitante puede elegir una de siete reacciones, cambiarla o quitarla; también se cuentan los compartidos. Cada visitante se identifica con un identificador aleatorio guardado en su navegador; no se necesita crear una cuenta.

Si la base ya existía antes de agregar las reacciones con emojis y el contador de compartidos, importa una vez `database/migrate_reactions_and_shares.sql` desde phpMyAdmin para actualizarla.

## Video de Blogs

El video local de Blogs está en `public/videos/la-narco-cultura.mp4` y ocupa el espacio disponible bajo el menú. Para cambiarlo, reemplaza ese archivo manteniendo el nombre. También se aceptan enlaces directos `.mp4`, `.webm` u `.ogg`, además de enlaces de YouTube. Los comentarios aparecen debajo del reproductor.

## Comandos

- `npm run dev`: inicia el servidor local de Vite.
- `npm run build`: crea la versión de producción en `dist`.
- `npm run lint`: ejecuta Oxlint.
