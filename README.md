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

**Regime field (density)** — different areas of one frame can sit in different regimes (fine maze,
coarse beads, thick worms) at once.
- **Field amount, Gradient, Grad angle, Noise, Noise scale** — shape the spatial variation.
- **Draw seed / Paint denser / Paint finer / Reset density** — paint the density field directly on the canvas.

**Motion**
- **Auto-morph (M)** — drifts F & k along a closed loop through the live band, so the pattern keeps morphing without ever dying. **Morph speed** sets the pace.
- **Tilt** — on a phone, tilt to make the fluid flow and the highlights slosh (iOS asks permission). **Tilt flow** sets the strength.
- **Lens bubble** — a glassy droplet that magnifies the pattern beneath it like a fisheye lens. Stationary by default — **drag it on the canvas** to move it — or turn on **Roam** to let it wander (**Roam speed / range**). **Lens size / warp** set its look. Works in every render mode.

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
3. Turn on **Auto-morph** (morph speed ~0.4) and let it wander.
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
