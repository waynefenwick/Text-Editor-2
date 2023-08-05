const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching

registerRoute(({ request }) => request.mode === 'navigate, pageCache');

registerRoute(
  // Define a route to cache assets
  // ({ request }) => request.destination === 'style' || request.destination === 'script' || request.destination === 'image',
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  // Use a CacheFirst strategy for caching assets
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// registerRoute(
//   // Define a route to cache assets
//   ({ request }) => request.destination === 'style' || request.destination === 'script' || request.destination === 'image',
//   // Use a CacheFirst strategy for caching assets
//   new CacheFirst({
//     cacheName: 'assets-cache',
//     plugins: [
//       new CacheableResponsePlugin({
//         statuses: [0, 200],
//       }),
//       new ExpirationPlugin({
//         maxAgeSeconds: 7 * 24 * 60 * 60, // Cache assets for 7 days
//       }),
//     ],
//   })
// );


