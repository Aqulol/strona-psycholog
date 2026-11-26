#!/bin/sh
# Run from repo root after replacing the original photos or logo. Requires ImageMagick.
set -eu
mkdir -p public/images/responsive
for name in portret gabinet; do
  for width in 320 480 640 800 960; do
    convert "public/images/$name.webp" -resize "${width}x" -strip -quality 77 "public/images/responsive/$name-$width.webp"
  done
done
for width in 160 260 400 520 780; do
  convert public/logo.webp -resize "${width}x" -strip -quality 82 "public/images/responsive/logo-$width.webp"
done
