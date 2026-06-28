# Reaction-Diffusion Studio

An interactive, GPU-accelerated **Gray-Scott reaction-diffusion** playground that runs in
the browser — render the morphing organic patterns as crisp **black & white** or as a glossy,
backlit **ferrofluid** liquid, tweak everything live, and record the result to video.

**Live demo:** https://midislave.github.io/rd-studio/

Single self-contained `index.html` — WebGL2, no build step, no dependencies.
Installable as a **PWA**: add it to your home screen to run full-screen and offline.

## Credits & inspiration

The ferrofluid look is an independent procedural homage to the macro ferrofluid artwork of
**[@cosmodernism](https://www.cosmodernism.com)** ([cosmodernism.com](https://www.cosmodernism.com)).
All rights to that artwork remain with the artist. Their videos and any frames from them are
used only as local visual reference and are **never** committed to this repo (see `.gitignore`).

## How it works

One Gray-Scott simulation, with its *feed* (F) and *kill* (k) rates animated over time, morphs
through every classic regime:

| Look                      | Gray-Scott regime |
|---------------------------|-------------------|
| thick flowing coral bands | coral / worms     |
| fingerprint maze          | labyrinth         |
| floating amoeba blobs     | mitosis / spots   |
| radial zebra stripes      | zebra / waves     |
| concentric spirals        | spirals           |

The whole simulation runs on the GPU at 60fps. On desktop it renders at 1260×1746; on phones
the render matches the device's own screen resolution (so it stays Retina-sharp), while the
underlying simulation grid is lighter to hold the framerate. Recordings are always normalised
to 1260×1746 by `assemble.sh`.

## Run it

Open the [live demo](https://midislave.github.io/rd-studio/), or run locally:

```bash
node serve.mjs            # then open http://localhost:8099/
```
(or just double-click `index.html` — it works from `file://` too, though installable/offline PWA features need it served over http/https.)

## Controls

**Display**
- **Fill screen** — stretch the art edge-to-edge (cropping the sides) instead of letterboxing it; ideal on a phone. The choice is remembered.
- **Fullscreen** — hide the browser chrome where supported. On iPhone, install to the Home Screen for the same chromeless result (the button hides itself there).

**Render & look**
- **Render mode** — **Ferrofluid** (glossy colour) or black & white **Filled** / **Outline** / **Soft**.
- **Threshold / Edge-width** — how fat the tubes are and how soft their edges.
- **Invert B/W** and **Classic B&W** — the latter jumps straight back to the original mono look (Filled, regime field off).

**Reaction**
- **Feed (F)** & **Kill (k)** — the "genome" of the pattern; together they decide the regime.
- **Diffuse A / B**, **Time step**, **Speed** (simulation steps per frame).
- **Presets (keys 1–8)** — Coral, Maze, Mitosis, Worms, Spirals, Zebra, Holes, Solitons.

**Ferrofluid material** (glossy mode)
- **Palette** — Amber, Blood orange, Red/black, Cobalt + amber.
- **Light angle, Relief, Gloss, Specular, Rim light, Vignette** — light it as a raised liquid.
- **Reflection** — wet studio reflection on the beads (the liquid-metal sheen).
- **Glow / bloom** — warm backlit halo around the bright fluid.
- **Hue drift** — slowly eases the palette through hues over time.

**Colour pickup** (glossy mode) — the fluid carries a colour that advects, diffuses and blends as it
moves, picking up and mixing hues as it flows (the oil-on-water look).
- **Colour bleed** — turn it on. The hues are anchored to the selected **Palette**.
- **Spread** — how far the hues wander from the palette (0 = palette only, high = rainbow).
- **Colour scale** — size of the colour regions · **Bleed** — how much they diffuse and blend.
- Drive it with **Flow** (below): the more the fluid moves, the more it picks up and mixes.

**Regime field (density)** — different areas of one frame can sit in different regimes (fine maze,
coarse beads, thick worms) at once.
- **Field amount, Gradient, Grad angle, Noise, Noise scale** — shape the spatial variation.
- **Draw seed / Paint denser / Paint finer / Reset density** — paint the density field directly on the canvas.

**Motion & flow**
- **Flow shape** — how the flow combs the fluid, so it forms ordered structures plain reaction-diffusion never makes on its own:
  - **Uniform** — a plain global drift (**Flow angle** = direction).
  - **Radial** — rays a sunburst out of the centre.
  - **Swirl** — winds it into fingerprint whorls.
  - **Spiral** — blends radial + tangential (**Flow angle** = spiral pitch).
  - **Random** — wandering turbulent eddies (curl-of-noise; **Flow angle** re-seeds the pattern).
- **Flow** sets the strength; **Flow centre X/Y** place the eye of the radial / swirl / spiral. Drives the colour pickup; tilt rides on top.
- **Tilt** — on a phone, tilt to make the fluid flow and the highlights slosh (iOS asks permission). **Tilt flow** sets the strength.

**Concentric rings** — a sustained radial standing wave that pins the reaction into evenly-spaced
concentric rings (the radar / target look) and keeps forcing them so they persist (unlike the
one-shot **Rings** seed).
- **Ring force** = strength · **Ring spacing** = how tightly they pack · **Ring centre X/Y**. Pair
  with the **Swirl** Flow shape to lock them into perfect circles.

**Symmetry** — a display-only fold (the simulation underneath is untouched, so it toggles freely
and works in every render mode).
- **Mirror X** gives the Rorschach "spine" (chevron / herringbone with the **Radial** Flow shape),
  plus **Mirror Y** / **Mirror both (4-way)**.
- **Kaleidoscope** repeats wedges around the centre — **Folds** = how many, **Rotate** spins them.

**Modulation — an LFO on any parameter**
- Every slider has a small **`~`** button. Tap it to modulate that parameter with an **LFO** — a compact **rate / depth / offset / waveform** strip appears under the slider and the value sweeps on its own. **Offset** shifts the oscillation centre off the base value. Tap the **LFO params** header to collapse a strip while the LFO keeps running. Waveforms: sine, triangle, saw, square, random (sample-&-hold).
- **Morph (M)** is a one-tap preset: phase-offset LFOs on Feed + Kill (what Auto-morph used to do). Tap again to clear.
- **Reset to defaults** clears all LFOs.

**Seed / canvas**
- **Spots / Centre / Random / Rings**, **Clear**, **Brush size** — or just **drag on the canvas** to seed.

**Record**
- **Record (R)** captures the canvas to `recording.webm` at 60fps · **Save PNG** · **Pause**.

**Panel**
- Section headings are **collapsible** — click a heading to fold it.
- **Hide / Show (H)** the panel, **Reset to defaults**, and **? Help** — toggle help then hover (or tap) any control to read what it does.

Keyboard: `Space` pause · `M` morph · `R` record · `C` clear · `I` invert · `H` hide panel · `?` help · `1`–`8` presets.

### On mobile

Touch-friendly: the controls live in a slide-up sheet (tap **Show** / drag down to dismiss), with
large tap targets and safe-area-aware layout. Drag on the canvas to seed, and turn on **? Help**
then tap any control to read what it does. Use **Fill screen** for an edge-to-edge view, and
**Add to Home Screen** to install it as a full-screen, offline app.

## Make a finished video

After recording, `recording.webm` lands in this folder:

```bash
./assemble.sh                      # → output.mp4 (H.264) + output.mov (ProRes)
./assemble.sh recording.webm myclip
```

The script scales to exactly 1260×1746 and forces a constant 60fps. (For a pure black & white
clip, render in a B&W mode before recording.)

## A good starting recipe

1. Pick **Coral**, hit **Spots**, let it fill in.
2. For the glossy look, switch the render mode to **Ferrofluid**; for mono, hit **Classic B&W**.
3. Hit **Morph** to set it wandering (or tap **~** on any slider to modulate just that one).
4. **Record** ~30s, then `./assemble.sh`.

## Deploying the demo

The live demo redeploys itself: a GitHub Actions workflow (`.github/workflows/deploy-pages.yml`)
publishes to GitHub Pages on every push to `main`. You can also run it by hand from the repo's
**Actions → Deploy demo to GitHub Pages → Run workflow**.

**One-time setup:** **Settings → Pages → Build and deployment → Source → GitHub Actions**.

## Files

| File | Purpose |
|------|---------|
| `index.html` | The whole app (WebGL2 simulation + UI) |
| `manifest.json` | PWA manifest (installable, standalone, portrait) |
| `sw.js` | Service worker (offline shell, network-first page) |
| `icons/` | App icons (`icon.svg` source + generated PNGs) |
| `serve.mjs` | Tiny static server for local use |
| `assemble.sh` | Turns a recording into `.mp4` + `.mov` |
| `LICENSE` | MIT licence |

## License

The code in this repository is released under the [MIT License](LICENSE) — © 2026 Nathan MacGregor.

This licence covers the original code and ideas here only. It does **not** extend to the
third-party ferrofluid artwork referenced under *Credits & inspiration* above, which remains
the property of its respective artist and is never committed to this repo.
