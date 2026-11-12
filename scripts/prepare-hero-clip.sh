#!/usr/bin/env bash
# Turn a downloaded video into a small, silent hero clip:
# cropped to 8:3, 1600px wide, 6 seconds, H.264, web-optimized.
# DURATION=14 changes the length; LOOP_FADE=1.5 cross-fades the end into the
# start so a single clip loops without a visible jump.
#
# Usage: scripts/prepare-hero-clip.sh <input-video> <name> [start] [y] [zoom] [x]
#   start  first second to keep (default 0)
#   y      vertical position of the crop, 0 = top, 1 = bottom (default 0.5)
#   zoom   1 = full width, 2 = half the width, … (default 1)
#   x      horizontal position when zoomed, 0 = left, 1 = right (default 0.5)
# Example: scripts/prepare-hero-clip.sh ~/Downloads/dunes.mp4 01-dunes 4 0.3
# CRF=30 scripts/prepare-hero-clip.sh …   → smaller file (default CRF is 27)
set -euo pipefail

if [ "$#" -lt 2 ]; then
  echo "Usage: $0 <input-video> <name> [start] [y] [zoom] [x]" >&2
  exit 1
fi

input="$1"
name="$2"
start="${3:-0}"
y="${4:-0.5}"
zoom="${5:-1}"
x="${6:-0.5}"
crf="${CRF:-27}"
out_dir="$(cd "$(dirname "$0")/.." && pwd)/src/assets/videos/hero"
mkdir -p "$out_dir"

crop="crop=trunc(iw/${zoom}/2)*2:trunc(iw/${zoom}*3/8/2)*2:(iw-ow)*${x}:(ih-oh)*${y}"

duration="${DURATION:-6}"
fade="${LOOP_FADE:-0}"
base="${crop},scale=1600:600,fps=30"

if [ "$fade" = "0" ]; then
  filter="[0:v]${base}[v]"
  read_len="$duration"
else
  # Output = clip[fade..end] cross-faded into clip[0..fade]: first and last frames match.
  read_len="$(echo "$duration + $fade" | bc -l)"
  offset="$(echo "$duration - $fade" | bc -l)"
  filter="[0:v]${base},split[a][b];[a]trim=start=${fade}:end=${read_len},setpts=PTS-STARTPTS[main];[b]trim=start=0:end=${fade},setpts=PTS-STARTPTS[head];[main][head]xfade=transition=fade:duration=${fade}:offset=${offset}[v]"
fi

ffmpeg -hide_banner -loglevel error -y \
  -ss "$start" -t "$read_len" -i "$input" \
  -filter_complex "$filter" -map "[v]" \
  -an -c:v libx264 -preset slow -crf "$crf" -pix_fmt yuv420p -movflags +faststart \
  "$out_dir/$name.mp4"

du -h "$out_dir/$name.mp4"
