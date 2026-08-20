const CACHE='paes-v3-6-2-lectora-valoraciones';
const ASSETS=['./','./index.html','./styles.css','./v3.css','./config.js','./data.js','./generator.js','./diversity.js','./app.js','./learning.js','./classes.js','./pedagogy.js','./demre-library.js','./ratings.js','./v3.js','./manifest.webmanifest'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request)))});
