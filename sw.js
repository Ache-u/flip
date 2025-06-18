const CACHE_NAME = 'minos-cache-v1';
const ASSETS = [
  '/',                    // Hace match con index.html
  '/index.html',
  '/manifest.json',
  '/flipbookee.pdf',      // opcional: si quieres servir tu PDF offline
  '/libs/page-flip.min.css',
  '/libs/page-flip.browser.min.js',
  // Lista aquí todas las imágenes:
  '/img/minos1.png',
  '/img/minos2.png',
  '/img/minos3.png',
  '/img/minos4.png',
  '/img/minos5.png',
  '/img/minos6.png',
  '/img/minos7.png',
  '/img/minos8.png',
  '/img/minos9.png',
  '/img/minos10.png'
];

// Al instalar: precache
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Al activar: limpia caches viejos
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Intercepta fetch para servir de cache primero
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cached => {
      if (cached) return cached;
      return fetch(evt.request)
        .then(res => {
          // opcional: cachea nuevas peticiones de la misma sesión
          return caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(evt.request, res.clone());
              return res;
            });
        });
    })
  );
});
