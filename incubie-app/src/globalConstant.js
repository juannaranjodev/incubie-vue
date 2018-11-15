import Vue from 'vue';


export default new Vue({
    data: {
        BaseUrl: 'https://beta.incubie.com/',
        CloudMessagingSenderId: process.env.VUE_APP_CLOUD_MESSAGING_SENDER_ID || "673044084535",
        CloudMessagingPublicVapidKey: process.env.VUE_APP_CLOUD_MESSAGING_PUBLIC_VAPID_KEY || "BE8WbostCqwlyXrbvvOfBCVtNIjBTeCpa7buyaKFf5drnbTtTdT7UiZtwMQfscBkEykOzKqmrzK5yn3Nrqqnjwo"
    }
})