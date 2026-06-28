/* Service worker for Reaction-Diffusion Studio.
   Makes the app installable and offline-capable. The app is a single static
   page, so the strategy is simple:
     - navigations  -> network-first (always get the latest deploy when online),
                       falling back to the cached page when offline.
     - other GETs   -> stale-while-revalidate (instant from cache, refreshed in
                       the background).
   Bump CACHE whenever the precached shell changes to evict the old cache. */
const CACHE = "rd-studio-v4";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  // Page loads: prefer the network so a redeploy shows up immediately.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => { caches.open(CACHE).then((c) => c.put("./index.html", res.clone())); return res; })
        .catch(() => caches.match("./index.html").then((r) => r || caches.match("./")))
    );
    return;
  }

  // Same-origin assets: serve cache fast, refresh in the background.
  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(req).then((cached) => {
        const network = fetch(req)
          .then((res) => { if (res && res.ok) caches.open(CACHE).then((c) => c.put(req, res.clone())); return res; })
          .catch(() => cached);
        return cached || network;
      })
    );
  }
});
