/**
 *
 */

const request = require("request");
const url = require("url");
const serverKey = process.env.CLOUD_MESSAGING_SERVER_KEY || "";

const sendMessage = function(serverKey, token, data) {
    return new Promise((resolve) => {
        request({
            "type": "post",
            "method": "post",
            "url": "https://fcm.googleapis.com/fcm/send",
            "body": JSON.stringify({
                "to": token,
                "notification": data
            }),
            "headers": {
                "Content-Type": "application/json",
                'Accept': 'application/json',
                "Authorization": "key=" + serverKey
            }
        }, (err, httpResponse, body) => {
            if(err) {
                console.log("(>_<) ERROR", err);
            }

            resolve();
        });
    });
};


module.exports = (options = {}) => {
    return async (context) => {
        let Idea = context.app.service("ideas");

        let idea = await Idea.get(context.id);
        let company = await context.app.service("companies").get(idea.company);


        if(context.data.status && context.data.status != idea.status) {
            let userId = context.data.createdBy || idea.createdBy;
            let user = await context.app.service('users').get(userId);
            let tokens = user.notificationsTokens || [];
            let promises = [];


            for(let i in tokens) {
                let token = tokens[i];

                let siteUrl = url.parse(process.env.VUE_APP_BASE_URL || "https://app.incubie.com");

                let promise = sendMessage(serverKey, token, {
                    "title": idea.title,
                    "body": "Status of Idea \"" + idea.title + "\" has been changed to \"" + context.data.status + "\".",
                    "icon": '/images/logo512@1x.png',
                    "tag": 'tag-for-this-notification',
                    "click_action": url.format({
                        "protocol": siteUrl.protocol,
                        "hostname": siteUrl.hostname,
                        "port": siteUrl.port,
                        "pathname": "/" + company.slug + "/i/" + idea._id
                    })
                });

                promises.push(promise);
            }

            await Promise.all(promises).then(() => {});
        }

        // console.log("data", context.data);
        // console.log("argument", context.argument);
        // console.log("params", context.params);

        // if(idea.status != idea.statusOld) {



            //

        // }

        return context;
    };
};