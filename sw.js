const cacheName = "restaurant-reviews-app";

const assets = [
  'index.html',
  'restaurant.html',
  'css/styles.css',
  'data/restaurants.json',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg',
  'js/dbhelper.js',
  'js/main.js',
  'js/restaurant_info.js'
];

// Add event listener for install event
self.addEventListener('install', event => {
  console.log("Service worker: installed");
  event.waitUntil(
    caches
    .open(cacheName)
    .then(cache => {
      console.log('Service worker: caching files');
      cache.addAll(assets);
    })
    .then(() => self.skipWaiting())
  );
});

// Add event listener for activate event
self.addEventListener('activate', event => {
  console.log('Service worker: activated');
  event.waitUntil(
    caches.keys()
    .then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log("Service worker: clearing cache");
            return caches.delete(cache);
          }
        })
      )
    })
  )
})

// Add event listener for fetch event
self.addEventListener('fetch', event => {
  console.log("Service Worker: fetching");
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request)));
});