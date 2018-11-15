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


module.exports = function(options = {}) {
    return async (context) => {
        const comment = context.data;
        const idea = await context.app.service('ideas').get(comment.idea);
        const company = await context.app.service("companies").get(idea.company);
        const user = await context.app.service('users').get(idea.createdBy);

        let tokens = user.notificationsTokens || [];

        let promises = [];

        if(comment.parent) {
            const parentComment = await context.app.service("comments").get(comment.parent);

            if(idea.createdBy != parentComment.createdBy) {
                const parentUser = await context.app.service("users").get(parentComment.createdBy);

                let parentTokens = parentUser.notificationsTokens || [];

                for(let i in parentTokens) {
                    tokens.push(parentTokens[i]);
                }
            }
        }

        for(let i in tokens) {
            let token = tokens[i];

            let siteUrl = url.parse(process.env.VUE_APP_BASE_URL || "https://app.incubie.com");

            let promise = sendMessage(serverKey, token, {
                "title": idea.title,
                "body": "A new comment was posted on the idea: " + idea.title + ". Comment: " + context.data.text,
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

        return context;
    };
};