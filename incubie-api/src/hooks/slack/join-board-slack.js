// use this hook to send slack messages when a new idea is made
// eslint-disable-next-line no-unused-vars
const { WebClient } = require('@slack/client');
const entityKinds = require('../../services/credentials/entity-kinds')

module.exports = function (options = {}) {
  return async context => {
    console.log("ruby: ****** SLACK JOIN BOARD TEST ******", context.data);
    if(context.data.kind != entityKinds.boards) {
      return context;
    }

    console.log("ruby: not exit,", entityKinds.boards);
    const credential = context.result;
    console.log("ruby: credential = ", credential);

    const user = await context.app.service('users').get(credential.user);
    const board = await context.app.service('boards').get(credential.entity);
    const company = await context.app.service('companies').get(user.lastAccessed);
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
    console.log("ruby: this is slackBoardId", slackBoardId );
    // return if slack is not integrated or is turned off
    if (!slackIntegration || !board.messageOnJoinBoard || !slackBoardId) {
      return context;
    }
    //get Idea url
    let boardUrl = baseUrl + '/' + company.slug;
    console.log("ruby: board URL = " , boardUrl);

    // send the message
    const slackClient = new WebClient(slackIntegration.apiToken);
    slackClient.chat.postMessage({
      channel: slackBoardId,
      username: "Incubie",
      icon_emoji: ":boy:",
      text: "New Member",

      attachments:[{
        fallback: "fallback",
        pretext: "<" + boardUrl + "|Goto Board>",
        title: user.firstName + " " + user.lastName +  " joined " + board.name + " Idea Board!",
        color: "good",
      }]
    }).then((res) => {
    }).catch((err) => {
      console.error(`join-board-slack: Error posting message to slack board: ${slackBoardId} for idea`);
    });
    return context;
  };

};
