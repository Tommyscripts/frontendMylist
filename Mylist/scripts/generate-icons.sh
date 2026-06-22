#!/usr/bin/env bash
# Genera PNGs para mipmaps Android desde public/icon.svg
# Requiere inkscape o rsvg-convert
set -e
SVG="public/icon.svg"
OUTDIR="android-icons"
mkdir -p "$OUTDIR"
# Resoluciones recomendadas para mipmap (px)
declare -A sizes=( [mdpi]=48 [hdpi]=72 [xhdpi]=96 [xxhdpi]=144 [xxxhdpi]=192 )
if command -v inkscape >/dev/null 2>&1; then
  for k in "${!sizes[@]}"; do
    s=${sizes[$k]}
    inkscape "$SVG" --export-type="png" --export-filename="$OUTDIR/icon-$k.png" -w $s -h $s
  done
elif command -v rsvg-convert >/dev/null 2>&1; then
  for k in "${!sizes[@]}"; do
    s=${sizes[$k]}
    rsvg-convert -w $s -h $s "$SVG" -o "$OUTDIR/icon-$k.png"
  done
else
  echo "Error: ni inkscape ni rsvg-convert están instalados. Instala uno de ellos para generar PNGs."
  exit 2
fi

echo "Iconos generados en $OUTDIR"
