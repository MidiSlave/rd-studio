# Reaction-Diffusion Studio

An interactive, GPU-accelerated **Gray-Scott reaction-diffusion** playground that runs in
the browser — render the morphing organic patterns as crisp **black & white** or as a glossy,
backlit **ferrofluid** liquid, tweak everything live, and record the result to video.

**Live demo:** https://midislave.github.io/rd-studio/

Single self-contained `index.html` — WebGL2, no build step, no dependencies.

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

The whole simulation runs on the GPU at 1260×1746 portrait, 60fps (a lighter resolution on
phones — recordings are rescaled back up by `assemble.sh`).

## Run it

Open the [live demo](https://midislave.github.io/rd-studio/), or run locally:

```bash
node serve.mjs            # then open http://localhost:8099/
```
(or just double-click `index.html` — it works from `file://` too.)

## Controls

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
- **Flow** — push the fluid in a direction (**Flow** strength + **Flow angle**) so it drifts and drags into combs. Works on desktop with no gyro, and drives the colour pickup.
- **Tilt** — on a phone, tilt to make the fluid flow and the highlights slosh (iOS asks permission). **Tilt flow** sets the strength.
- **Lens bubble** — a glassy droplet that magnifies the pattern beneath it like a fisheye lens. Stationary by default — **drag it on the canvas** to move it — or turn on **Roam** to let it wander (**Roam speed / range**). **Lens size / warp** set its look. Works in every render mode.

**Modulation — an LFO on any parameter**
- Every slider has a small **`~`** button. Tap it to modulate that parameter with an **LFO** — a compact **rate / depth / waveform** strip appears under the slider and the value sweeps on its own. Waveforms: sine, triangle, saw, square, random (sample-&-hold).
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

Touch-friendly: the canvas fills the screen and the controls live in a slide-up sheet (tap **Show** /
drag down to dismiss). Drag on the canvas to seed, drag the lens bubble to move it, and turn on
**? Help** then tap any control to read what it does.

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
2. For the glossy look, leave **Ferrofluid** on; for mono, hit **Classic B&W**.
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
| `serve.mjs` | Tiny static server for local use |
| `assemble.sh` | Turns a recording into `.mp4` + `.mov` |
