# Reaction-Diffusion Studio

A black-&-white generative animation tool — a browser playground that recreates the
morphing organic style of a Gray-Scott reaction-diffusion video.

**Live demo:** https://midislave.github.io/rd-studio/

## Credits & inspiration

The ferrofluid look is an independent procedural homage to the macro ferrofluid
artwork of **[@cosmodernism](https://www.cosmodernism.com)** — see
[cosmodernism.com](https://www.cosmodernism.com). All rights to that artwork
remain with the artist. Their videos and any frames from them are used only as
local visual reference for this study and are **never** committed to this repo
(see `.gitignore`).

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
- **Look** — render mode (**Ferrofluid** glossy colour, or B&W Filled / Outline / Soft), threshold, edge width, Invert B/W.
- **Ferrofluid material** — palette (Amber, Blood orange, Red/black, Cobalt+amber), light angle, relief, gloss, specular, rim light, vignette. Lights the pattern as a glossy raised liquid à la macro ferrofluid art.
- **Regime field (density)** — make different areas of one frame sit in different regimes (thick worms, fine spots, bubbly holes) via a gradient + noise field, or paint density directly onto the canvas (Draw seed / Paint denser / Paint finer).
- **Auto-morph (M)** — slowly drifts F & k through the interesting band → the morphing journey of the source.
- **Seed** — Spots / Centre / Random / Rings, or **drag on the canvas** to draw.
- **Record (R)** — captures the canvas to `recording.webm` at 60fps.

Keyboard: `Space` pause · `M` morph · `R` record · `C` clear · `I` invert · `1`–`8` presets.

### On mobile

The studio is touch-friendly. The canvas fills the screen and the controls live
in a slide-up sheet (tap **Show** / drag down to dismiss). Tap the sheet's
controls as usual, drag on the canvas to seed, and turn on **? Help** then tap any
control to read what it does. To save GPU on phones the simulation runs at a
lighter resolution — `assemble.sh` still rescales any recording back to 1260×1746.

## Deploying the demo

The live demo redeploys itself automatically. A GitHub Actions workflow
(`.github/workflows/deploy-pages.yml`) publishes the site to GitHub Pages on
every push to `main` that touches `index.html` (or the README / assemble
script), so the demo always tracks the default branch — just merge your changes
and the page rebuilds. You can also trigger it by hand from the repo's **Actions
→ Deploy demo to GitHub Pages → Run workflow**.

**One-time setup:** in the repo go to **Settings → Pages → Build and deployment**
and set **Source** to **GitHub Actions**. (If Pages was previously serving from a
branch, switching to GitHub Actions hands deployment over to the workflow.)

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
