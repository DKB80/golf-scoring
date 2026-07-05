/* Nedlands Golf Club service worker - v9781fafa */
const CACHE = "ngc-shell-9781fafa";
const FONT_CACHE = "ngc-fonts-v1";
const SHELL = ["./","./index.html","./manifest.webmanifest",
  "./icons/icon-192.png","./icons/icon-512.png","./icons/maskable-512.png","./icons/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE && k !== FONT_CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (url.hostname.includes("fonts.googleapis.com") || url.hostname.includes("fonts.gstatic.com")) {
    // stale-while-revalidate for fonts: instant offline, refresh in background
    e.respondWith(caches.open(FONT_CACHE).then(async c => {
      const hit = await c.match(e.request);
      const net = fetch(e.request).then(r => { if (r.ok) c.put(e.request, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  if (e.request.mode === "navigate" || SHELL.some(p => url.pathname.endsWith(p.slice(1)))) {
    // cache-first app shell: opens instantly with zero signal mid-round
    e.respondWith(caches.match(e.request, {ignoreSearch:true}).then(hit =>
      hit || caches.match("./index.html").then(idx => idx || fetch(e.request))
    ));
  }
});
