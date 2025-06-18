const CACHE_NAME = 'minos-cache-v1';
const ASSETS = [
  '/flipminos/index.html',
  '/flipminos/manifest.json',
  '/flipminos/libs/page-flip.min.css',
  '/flipminos/libs/page-flip.browser.min.js',
  '/flipminos/img/minos1.png',
  // ...
  '/flipminos/img/minos10.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(res => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, res.clone());
          return res;
        });
      });
    })
  );
});
