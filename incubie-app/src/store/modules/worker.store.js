import firebase from "firebase";
import "firebase/messaging";

import globalConstant from "./../../globalConstant";


export default {
    namespaced: true,
    state: {
        "isOffline": false,
        "messaging": null
    },
    getters: {
        "userId": (state, getters, globalState, globalGetters) => {
            let gId = globalState.auth.payload ? globalState.auth.payload.userId :  undefined;

            return gId || (getters.user ? getters.user._id : undefined);
        },
        "user": (state, getters, globalState, globalGetters) => {
            return globalGetters["auth/loggedInUser"];
        }
    },
    mutations: {
        "isOffline": function(state, isOffline) {
            state.isOffline = isOffline;
        },
        "messaging": function(state, messaging) {
            state.messaging = messaging;
        }
    },
    actions: {
        async initFirebase({commit, dispatch}) {
            console.log('Firebase worker is active.');

            firebase.initializeApp({
                messagingSenderId: globalConstant.CloudMessagingSenderId
            });

            let messaging = firebase.messaging();

            messaging.usePublicVapidKey(globalConstant.CloudMessagingPublicVapidKey);

            commit("messaging", messaging);

            setTimeout(() => {
                dispatch("subscribe")
            }, 2000);
        },
        async subscribe({dispatch, state, getters}, registration) {
            if(!state.messaging || !getters.userId) {
                return false;
            }

            state.messaging.requestPermission().then(() => {
                state.messaging.getToken().then((currentToken) => {
                    this.dispatch("users/updateUserToken", {
                        "userId": getters.userId,
                        "token": currentToken
                    });
                }).catch((err) => {
                    console.warn('При получении токена произошла ошибка.', err);
                });
            }).catch((err) => {
                console.warn('Не удалось получить разрешение на показ уведомлений.', err);
            });

            state.messaging.onTokenRefresh(() => {
                return state.messaging.getToken().then((refreshedToken) => {
                    console.log('onTokenRefresh getToken Token refreshed.');
                    console.log('onTokenRefresh getToken', refreshedToken);
                }).catch((err) => {
                    console.log('onTokenRefresh getToken Unable to retrieve refreshed token ', err);
                });
            });

            state.messaging.onMessage(function(payload) {
                console.log('Message received', payload);
                // if (permission === 'granted') {
                //     navigator.serviceWorker.ready.then(function(registration) {
                //         // Copy data object to get parameters in the click handler
                //         payload.data.data = JSON.parse(JSON.stringify(payload.data));
                //
                //         registration.showNotification(payload.data.title, payload.data);
                //     }).catch(function(error) {
                //         // registration failed :(
                //         showError('ServiceWorker registration failed', error);
                //     });
                // }
            });
        },
        ready({commit, dispatch}) {

        },
        registered({dispatch, getters}, registration) {
            console.log('Service worker has been registered.', registration);
            // registration.pushManager.subscribe({
            //     "userVisibleOnly": true
            // }).then((res) => {
            //     console.log(res);
            //     //registration.getTo
            //     registration.showNotification("test", {
            //         "title": "Ералаш",
            //         "body": "Начало в 21:00",
            //         "icon": "https://eralash.ru.rsz.io/sites/all/themes/eralash_v5/logo.png?width=40&height=40",
            //         "click_action": "http://eralash.ru/"
            //     });
            // });
        },
        cached(registration) {
            console.log('Content has been cached for offline use.')
        },
        updatefound({commit}, registration) {
            console.log('New content is downloading.')
        },
        updated({commit, dispatch}, registration) {
            console.log('New content is available; please refresh.')
        },
        offline({commit}) {
            console.log('No internet connection found. App is running in offline mode.');

            commit("isOffline", true);
        },
        error(error) {
            console.error('Error during service worker registration:', error)
        },
        send({commit}, data) {
            // navigator.serviceWorker.controller.postMessage(data, "*");
            // window.postMessage(data, "*");
        },
        message({commit}, data) {
            console.log("app", data);
        }
    }
};