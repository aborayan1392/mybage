const CACHE_NAME = 'reading-tracker-cache-v4';
const APP_SHELL = ['./','./index.html','./payload.js','./payload-1.txt','./payload-2.txt','./payload-3.txt','./payload-4.txt','./payload-5.txt','./manifest.json','./icon.svg','./icon-maskable.svg'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch', event => {
  if(event.request.method!=='GET') return;
  const url=new URL(event.request.url);
  if(url.origin===self.location.origin){
    event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy));return response;}).catch(()=>caches.match('./index.html'))));
  } else event.respondWith(fetch(event.request).catch(()=>caches.match(event.request)));
});
