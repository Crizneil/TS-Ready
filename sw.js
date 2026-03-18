const CACHE_NAME = 'it-ready-v9';
const ASSETS = [
  './',
  './index.html',
  './assets/css/styles.css',
  './assets/js/app.js',
  './assets/js/data.js',
  './manifest.json',
  './assets/images/logo.png',
  './assets/images/icon-192.png',
  './assets/images/icon-512.png',
  './assets/images/mod_mindset.png',
  './assets/images/mod_osi.png',
  './assets/images/mod_documentation.png',
  './assets/images/mod_site_survey.png',
  './assets/images/mod_rack_management.png',
  './assets/images/mod_field_tools.png',
  './assets/images/mod_field_etiquette.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://unpkg.com/@phosphor-icons/web'
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
  // Normalize request URL for comparison with ASSETS
  const requestUrl = new URL(e.request.url);
  const isInternalAsset = ASSETS.some(asset => {
    try {
      return new URL(asset, self.location).href === requestUrl.href;
    } catch {
      return false;
    }
  });

  // Use a Network-First strategy for the main page and critical assets to ensure updates
  if (e.request.mode === 'navigate' || isInternalAsset) {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic' && response.type !== 'cors') {
            return response;
          }
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, clonedResponse);
          });
          return response;
        })
        .catch(() => caches.match(e.request))
    );
  } else {
    // Cache-First for other assets (images, fonts, etc.)
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request))
    );
  }
});
