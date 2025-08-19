Generar APK Android usando Capacitor + Vite

Resumen rápido

1) Este repo usa Vite + Vue 3. La carpeta de salida tras `npm run build` es `dist`.
2) Usaremos Capacitor para empaquetar la web en una app nativa Android.

Requisitos (en tu máquina)

- Node.js + npm instalados
- Java JDK (17 recomendado)
- Android Studio con SDK y herramientas de plataforma instaladas
- Gradle (Android Studio ya lo provee)

Pasos resumidos

1. Instala Capacitor global o usa npx (recomendado):
   npm install @capacitor/cli @capacitor/core --save-dev

2. Inicializa Capacitor (solo la primera vez):
   npx cap init
   - appId: com.mycompany.mylist (o tu package)
   - appName: MyList
   - webDir: dist

3. Construye la app web:
   npm run build

4. Añade Android y sincroniza:
   npx cap add android
   npx cap sync android

5. Abre Android Studio para firmar, configurar iconos y generar APK:
   npx cap open android

Iconos

- He añadido un icono base en `public/icon.svg`.
- Android necesita mipmaps PNG en varias resoluciones. Puedes convertir `public/icon.svg` a PNG con una herramienta (inkscape, imagemagick) y luego usar Android Studio -> Image Asset para generar los mipmaps automáticamente.

Firmado y generación de APK

- Dentro de Android Studio: Build -> Generate Signed Bundle/APK -> crea o usa tu KeyStore -> genera APK o App Bundle (recommended: AAB).

Notas y consejos

- Si planeas publicar en Google Play, genera un App Bundle (.aab) y sigue la guía de Google Play para firmar con Play App Signing.
- Para notificaciones push u otros plugins nativos, configura los plugins de Capacitor y revisa la documentación.

Comprobaciones rápidas que hice

- `package.json` actualizado con scripts útiles para Capacitor.
- `capacitor.config.json` agregado apuntando a `dist`.
- `public/icon.svg` creado como icono base.

Si quieres, procedo a:
- Añadir scripts adicionales de build/clean si los necesitas.
- Generar PNGs en varias resoluciones desde el SVG aquí si tienes instalado `inkscape` en tu entorno (puedo convertirlos si lo permites).
- Ayudarte a abrir y configurar Android Studio desde la terminal.

