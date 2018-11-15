// use this hook to send slack messages when a new idea is made
// eslint-disable-next-line no-unused-vars
const { WebClient } = require('@slack/client');

module.exports = function (options = {}) {
  return async context => {
    console.log("ruby: ****** SLACK IDEA STATUS TEST ******", context.data);
    if(context.data._id || context.data.voteCount != undefined || context.data.commentCount != undefined || context.data.images != undefined){ // check if status only changed or not
      return context;
    }
    console.log("is it all right?", context.data._id);
    
    const idea = context.result;

    const user = await context.app.service('users').get(idea.createdBy);
    const company = await context.app.service('companies').get(idea.company);
    const board = await context.app.service('boards').get(idea.board);
    const baseUrl = context.app.get('baseUrl');
    let slackBoardId;
    if(!company.slackIntegration){
      return context;
    }
    // get the slack integration info  ruby test del
    const slackIntegration = await context.app.service('slack-integration').get(company.slackIntegration);
    if (board) {
      slackBoardId = board.slackBoardId;
    }

    // return if slack is not integrated or is turned off
    if (!slackIntegration || !board.messageOnIdeaStatusChanged || !slackBoardId) {
      return context;
    }
    //get Idea url
    let ideaUrl = baseUrl + '/' + company.slug + "/i/" + idea._id;
    console.log("ruby: idea URL = " , ideaUrl);

    // send the message
    const slackClient = new WebClient(slackIntegration.apiToken);
    slackClient.chat.postMessage({
      channel: slackBoardId,
      username: "Incubie",
      icon_emoji: ":boy:",
      text: "Idea Status Changed!",

      attachments:[{
        fallback: "fallback",
        pretext: "<" + ideaUrl +"|Goto Idea>",
        title: idea.title,
        text: "Changed to " + idea.status,
        //author_name: user.firstName + ' ' + user.lastName + ' in ' + board.name + ' Ideas Board',
        color: "good",
        text: " Reason: " + idea.statusDescription,
      }]
    }).then((res) => {
    }).catch((err) => {
      console.error(`idea-status-slack: Error posting message to slack board: ${slackBoardId} for idea`);
    });
    return context;
  };

};
