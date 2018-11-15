/**
 *
 */

// self.addEventListener("fetch", event => {
//     event.respondWith(
//         fetch(event.request).catch(error => {
//             console.log(`[Service Worker] Network request Failed. Serving content from cache: ${error}`);
//
//             return caches.open("sw-precache-v3-sw-precache-webpack-plugin-https://app.incubie.com").then(cache => {
//                 return cache.match(event.request).then(matching => {
//                     const report = !matching || matching.status == 404 ? Promise.reject("no-match") : matching;
//
//                     return report
//                 })
//             })
//         })
//     );
// });


const parseUrl = function(url) {
    var values = /^(?:(http[s]?|ftp):\/)?\/?([^:\/\s]+)(?:\:([0-9]+))?((?:\/([\w0-9-.]+))*)\/?(\?[^#]+)?(\#.+)?$/.exec(url);

    if(values) {
        return {
            protocol: values[1],
            host: values[2],
            port: values[3],
            path: values[4],
            query: values[6] || "",
            hash: values[7] || ""
        };
    }
    else {
        return false;
    }
};


const CacheFiles = function(sw, cacheName) {
    var filesToCache = [
        '/',
        '/manifest.json'
    ];

    var hosts = [
        "localhost",
        "incubie.demo.ukrohost.com",
        "app.incubie.com",
        "beta.incubie.com",
        "beta.incubie.com"
    ];

    this.fetch = function(event) {
        event.respondWith(
            fetch(event.request).then((res) => {
                var url = parseUrl(event.request.url);

                if(url && url.path != "socket.io") {
                    return this.cacheFile(event.request.url).then(() => {
                        return res;
                    });
                }

                return res;
            }).catch((error) => {
                return caches.open(cacheName).then(cache => {
                    var url = parseUrl(event.request.url);

                    // if(!url.file && hosts.indexOf(url.host) >= 0) {
                    //     event.request.url = "/";
                    // }

                    return cache.match(event.request).then(matching => {
                        const report = !matching || matching.status == 404 ? Promise.reject("no-match") : matching;

                        return report;
                    });
                });
            })
        );
    };

    this.push = function(event) {
        console.log('Received a push event', event);

        // const options = {
        //     title: 'I got a message for you!',
        //     body: 'Here is the body of the message',
        //     icon: '/images/logo512@1x.png',
        //     tag: 'tag-for-this-notification',
        // };
        //
        // var title = "pfpwlepf";
        //
        // event.waitUntil(
        //     sw.registration.showNotification(title, options)
        // );
    };

    this.cacheFile = function(filePath) {
        return caches.open(cacheName).then((cache) => {
            if(cache && filePath) {
                cache.add(filePath);
            }
        });
    };

    this.clear = function() {
        return caches.delete(cacheName);
    };

    this.activate = function(event) {
        // sw.clients.matchAll({ type: 'window' }).then(windowClients => {
        //     for (let windowClient of windowClients) {
        //         // Force open pages to refresh, so that they have a chance to load the
        //         // fresh navigation response from the local dev server.
        //         windowClient.navigate(windowClient.url);
        //     }
        // });
    };

    this.install = function(event) {
        event.waitUntil(
            Promise.all(
                filesToCache.map((filePath) => {
                    return this.cacheFile(filePath);
                })
            ).then(() => {
                //sw.skipWaiting();
            })
        );
    };

    this.send = function(data) {
        // data = JSON.stringify(data);
        //
        // sw.postMessage(data, "*");
    };

    this.message = function(event) {
        // console.log("worker.message", event);
    };

    sw.addEventListener("fetch", (event) => {this.fetch(event);});

    sw.addEventListener("activate", () => {this.activate();});

    sw.addEventListener("push", (event) => {this.push(event);});

    sw.addEventListener("install", (event) => {this.install(event);});

    sw.addEventListener("message", (event) => {this.message(event);});
};


let cacheFiles = new CacheFiles(self, "sw-precache-v3-sw-precache-webpack-plugin-https://app.incubie.com");