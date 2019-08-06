/**
 */

importScripts('https://www.gstatic.com/firebasejs/3.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.6.8/firebase-messaging.js');


firebase.initializeApp({
    messagingSenderId: '673044084535'
});


const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    if(typeof payload.data.time != 'undefined') {
        // var time = new Date(payload.data.time * 1000);
        // var now = new Date();
        //
        // if(time < now) {
        //     return null;
        // }
        //
        // var diff = Math.round((time.getTime() - now.getTime()) / 1000);
        //
        // payload.data.body = 'Начало через ' + Math.round(diff / 60) + ' минут, в ' + time.getHours() + ':' + (time.getMinutes() > 9 ? time.getMinutes() : '0' + time.getMinutes());
    }

    payload.data.data = payload.data;

    return self.registration.showNotification(payload.data.title, payload.data);
});

self.addEventListener("notificationclick", function(event) {
    const target = event.notification.data.click_action || "/";

    event.notification.close();

    event.waitUntil(clients.matchAll({
        "type": "window",
        "includeUncontrolled": true
    }).then(function(clientList) {
        for(var i = 0; i < clientList.length; i++) {
            var client = clientList[i];

            if(client.url == target && 'focus' in client) {
                return client.focus();
            }
        }

        return clients.openWindow(target);
    }));
});