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

// self.addEventListener("fetch", function (e) {
//     e.respondWith(
//         // check if the cache has the file
//         caches.match(e.request).then(function (r) {
//             console.log("[ServiceWorker] Fetching resource: " + e.request.url);
//             // 'r' is the matching file if it exists in the cache
//             return r
//         })
//     );
// });

self.addEventListener("fetch", function (e) {
    e.respondWith(
        // check if the cache has the file
        caches.match(e.request).then(function (r) {
            console.log("[ServiceWorker] Fetching resource: " + e.request.url);
            // Download the file if it is not in the cache,
            return r || fetch(e.request).then(function (response) {
                // add the newly downloaded file to the cache
                return caches.open(cacheName).then(function (cache) {
                    console.log("[ServiceWorker] Caching new resource: " + e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});