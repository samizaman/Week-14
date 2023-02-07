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