const CACHE='paes-trainer-pedv2-specific-hints-v4';
const ASSETS=['./','./index.html','./styles.css','./config.js','./data.js','./generator.js','./app.js','./learning.js','./classes.js','./pedagogy.js','./manifest.webmanifest'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
