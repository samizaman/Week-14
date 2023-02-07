var cacheName = "petstore-v1";
var cacheFiles = [
    "index.html",
    "style.css",
    "petstore.webmanifest",
    "images",
    "products.js"
];

self.addEventListener("install", (e) => {
    console.log("[ServiceWorker] Installed");

    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log("[ServiceWorker] Caching cacheFiles");
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener("fetch", function (e) {
    e.respondWith(
        // check if the cache has the file
        caches.match(e.request).then(function (r) {
            console.log("[ServiceWorker] Fetching resource: " + e.request.url);
            // 'r' is the matching file if it exists in the cache
            return r
        })
    );
});