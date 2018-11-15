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


module.exports = () => {
    return async (context) => {
        const Idea = context.app.service("ideas");
        const Company = context.app.service("companies");
        const User = context.app.service("users");


        let idea = await Idea.get(context.result._id);
        let company = await Company.get(idea.company);

        let usersSearch = await User.find({
            query: {
                lastAccessed: idea.company
            }
        });

        let users = usersSearch.data;

        let tokens = [];

        for(let i in users) {
            let userTokens = users[i].notificationsTokens || [];

            for(let j in userTokens) {
                tokens.push(userTokens[j]);
            }
        }

        let promises = [];

        for(let i in tokens) {
            let token = tokens[i];

            let siteUrl = url.parse(process.env.VUE_APP_BASE_URL || "https://app.incubie.com");

            let promise = sendMessage(serverKey, token, {
                "title": idea.title,
                "body": "New Idea \"" + idea.title + "\" has been created.",
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