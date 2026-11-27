#!/bin/sh
# Run from repo root after replacing the original photos or logo. Requires ImageMagick.
set -eu
mkdir -p public/images/responsive
for name in portret portret2 gabinet; do
  for width in 320 480 640 800 960; do
    convert "public/images/$name.webp" -resize "${width}x" -strip -quality 77 "public/images/responsive/$name-$width.webp"
  done
done
for name in gabinet-fotel gabinet-detal-1 gabinet-detal-2; do
  for width in 320 480 640 840; do
    [ "$name:$width" = gabinet-detal-1:840 ] && continue
    convert "public/images/$name.webp" -resize "${width}x" -strip -quality 77 "public/images/responsive/$name-$width.webp"
  done
done
for width in 160 260 400 520 780; do
  convert public/logo.webp -resize "${width}x" -strip -quality 82 "public/images/responsive/logo-$width.webp"
done

# Set HERO_PORTRAIT_SOURCE to the archived JPEG to avoid re-encoding a WebP.
# Preserve the full height and crop equal landscape margins from both sides.
hero_source=${HERO_PORTRAIT_SOURCE:-public/images/portret2.webp}
for width in 96 192 288 360 428 576 720 855; do
  convert "$hero_source" -auto-orient -gravity center -crop 855x855+0+0 +repage \
    -resize "${width}x" -strip -quality 77 "public/images/responsive/portret-hero-$width.webp"
done
