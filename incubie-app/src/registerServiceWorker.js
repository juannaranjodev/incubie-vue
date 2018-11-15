/* eslint-disable */

import {
    register,
    unregister
} from 'register-service-worker';
import store from "@/store";


register("/firebase-messaging-sw.js", {
    async ready() {
        await Promise.all([
            store.dispatch("worker/ready")
        ]);
    },
    async registered(registration) {
        await Promise.all([
            store.dispatch("worker/initFirebase"),
            store.dispatch("worker/registered", registration)
        ]);
    },
    cached(registration) {
        store.dispatch("worker/cached", registration);
    },
    updatefound(registration) {
        store.dispatch("worker/updatefound", registration);
    },
    updated(registration) {
        store.dispatch("worker/updated", registration);
    },
    offline() {
        store.dispatch("worker/offline");
    },
    error(error) {
        console.error("/firebase-messaging-sw.js", error);
    }
});

register("/service-worker.js", {
    registered() {
        
    },
    offline() {
        store.dispatch("worker/offline");
    },
    error(error) {
        console.error("/service-worker.js", error);
    }
});