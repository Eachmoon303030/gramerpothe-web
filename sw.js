// © 2026 Eachmoon Barman (EB). All rights reserved.
// Offline cache for Gramer Pothe. The publish script fills in the cache name (version + commit)
// and the file list, so every publish makes phones fetch the new version.
const CACHE = 'gramerpothe-0.1.0-5eb4da2';
const FILES = ["./","apple-touch-icon.png","author_photo.jpg","fonts/hind-bn-400.woff2","fonts/hind-bn-600.woff2","fonts/hind-lat-400.woff2","fonts/hind-lat-600.woff2","icon-192.png","icon-512.png","icon-maskable-512.png","index.html","manifest.webmanifest","vendor/three.LICENSE.txt","vendor/three.min.js"];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req)));
});
