# Reaction-Diffusion Studio

A black-&-white generative animation tool — a browser playground that recreates the
morphing organic style of a Gray-Scott reaction-diffusion video.

**Live demo:** https://midislave.github.io/rd-studio/

## What the source video is

`cool art.mov` is a **Gray-Scott reaction-diffusion** animation. One simulation, with its
*feed* (F) and *kill* (k) rates animated over time, morphs through every regime seen in the clip:

| Look in the video        | Gray-Scott regime |
|--------------------------|-------------------|
| thick flowing coral bands| coral / worms     |
| fingerprint maze         | labyrinth         |
| floating amoeba blobs    | mitosis / spots   |
| radial zebra stripes     | zebra / waves     |
| concentric spirals       | spirals           |

This tool runs that same system live on the GPU (WebGL2), in pure black & white, at the
source resolution (1260×1746 portrait, 60fps).

## Run it

Open the [live demo](https://midislave.github.io/rd-studio/), or run locally:

```bash
node serve.mjs
# then open http://localhost:8099/
```
(or just double-click `index.html` — it works from `file://` too.)

## Controls

- **Presets (1–8 / buttons)** — jump to a named regime (Coral, Maze, Mitosis, Worms, Spirals, Zebra, Holes, Solitons).
- **Reaction sliders** — Feed, Kill, Diffuse A/B, Time step, Speed (sim iterations per frame).
- **Look** — render mode (Filled / Outline / Soft), threshold, edge width, Invert B/W.
- **Auto-morph (M)** — slowly drifts F & k through the interesting band → the morphing journey of the source.
- **Seed** — Spots / Centre / Random / Rings, or **drag on the canvas** to draw.
- **Record (R)** — captures the canvas to `recording.webm` at 60fps.

Keyboard: `Space` pause · `M` morph · `R` record · `C` clear · `I` invert · `1`–`8` presets.

## Make a finished video

After recording (`recording.webm` lands in this folder):

```bash
./assemble.sh                 # → output.mp4 (H.264) + output.mov (ProRes, matches source)
./assemble.sh recording.webm myclip
```

The script scales to exactly 1260×1746, forces 60fps and locks to true greyscale.

## How to reproduce the source's vibe

1. Hit **Spots**, pick the **Coral** preset.
2. Turn on **Auto-morph** (low-ish morph speed, ~0.4).
3. Let it settle, then **Record** for ~30s.
4. `./assemble.sh`.
