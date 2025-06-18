const CACHE_NAME = 'minos-cache-v1';
const ASSETS = [
  '/flipminos/',
  '/flipminos/index.html',
  '/flipminos/manifest.json',
  '/flipminos/flipbookee.pdf', // opcional
  '/flipminos/libs/page-flip.min.css',
  '/flipminos/libs/page-flip.browser.min.js',
  '/flipminos/img/minos1.png',
  '/flipminos/img/minos2.png',
  '/flipminos/img/minos3.png',
  '/flipminos/img/minos4.png',
  '/flipminos/img/minos5.png',
  '/flipminos/img/minos6.png',
  '/flipminos/img/minos7.png',
  '/flipminos/img/minos8.png',
  '/flipminos/img/minos9.png',
  '/flipminos/img/minos10.png'
];

// Instala y precachea todo
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activa y limpia cachés antiguos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Intercepta todas las peticiones: primero intenta desde cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request)
        .then(res => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, res.clone());
            return res;
          });
        });
    })
  );
});
