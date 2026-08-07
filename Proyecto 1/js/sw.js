const CACHE_NAME = "campus-tasks-v2";

const APP_SHELL_FILES = [
  "./",
  "./index.html",
  "./login.html",
  "./onboarding.html",
  "./css/styles.css",
  "./js/app.js",
  "./js/taskStore.js",
  "./js/taskUI.js",
  "./js/firebaseConfig.js",
  "./js/login.js",
  "./js/onboarding.js",
  "./manifest.json",
  "./icons/icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL_FILES))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});