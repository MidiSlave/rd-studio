#!/usr/bin/env bash
# Turn a recorded recording.webm into a finished video matching the source "cool art.mov".
# Usage:
#   ./assemble.sh [input.webm] [output basename]
# Produces both an H.264 .mp4 (universal) and a ProRes .mov (editing-grade).
set -euo pipefail

IN="${1:-recording.webm}"
OUT="${2:-output}"
W=1260
H=1746
FPS=60

if [ ! -f "$IN" ]; then
  echo "No input file '$IN'. Record one in rd.html first (the Record button)."
  exit 1
fi

# Scale/letterbox to the exact source canvas, force constant 60fps, lock to greyscale (true B&W).
VF="scale=${W}:${H}:force_original_aspect_ratio=decrease,pad=${W}:${H}:(ow-iw)/2:(oh-ih)/2:color=white,format=gray,format=yuv420p,fps=${FPS}"

echo "→ ${OUT}.mp4 (H.264)"
ffmpeg -y -loglevel error -i "$IN" -vf "$VF" \
  -c:v libx264 -preset slow -crf 14 -pix_fmt yuv420p -movflags +faststart "${OUT}.mp4"

echo "→ ${OUT}.mov (ProRes 422 HQ)"
ffmpeg -y -loglevel error -i "$IN" -vf "$VF" \
  -c:v prores_ks -profile:v 3 -pix_fmt yuv422p10le "${OUT}.mov"

echo "Done:"
ls -lh "${OUT}.mp4" "${OUT}.mov"
