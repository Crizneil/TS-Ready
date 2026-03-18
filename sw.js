const CACHE_NAME = 'it-ready-v8';
const ASSETS = [
  './',
  './index.html',
  './assets/css/styles.css',
  './assets/js/app.js',
  './assets/js/data.js',
  './manifest.json',
  './assets/images/icon-192.png',
  './assets/images/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  // Use a Network-First strategy for the main page and critical assets to ensure updates
  if (e.request.mode === 'navigate' || ASSETS.includes(e.request.url)) {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, clonedResponse);
          });
          return response;
        })
        .catch(() => caches.match(e.request))
    );
  } else {
    // Cache-First for other assets
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request))
    );
  }
});
