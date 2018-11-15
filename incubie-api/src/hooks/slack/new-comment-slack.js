// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { WebClient } = require('@slack/client')

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    console.log("ruby: ^^^^^^^^ SLACK INTEGRATION COMMENT ^^^^^^^^", context.data);
    const idea = await context.app.service('ideas').get(context.data.idea);
    const board = await context.app.service('boards').get(idea.board);
    const company = await context.app.service('companies').get(board.company);
    const baseUrl = context.app.get('baseUrl');
    let slackIntegration;
    let slackBoardId;
    let user;
    if(!company.slackIntegration){
      return context;
    }
    // get the slack integration info
    const slackIntegrations = await context.app.service('slack-integration').find({
      query: { company: board.company }
    })

    if (slackIntegrations) {
      slackIntegration = slackIntegrations.data[0];
    }

    if (board) {
      slackBoardId = board.slackBoardId
    }

    //get user
    user = await context.app.service('users').get(context.data.createdBy);
    console.log("ruby: this is a slackboard Id =",slackBoardId, " http:" + user.avatar);

    // ruby open this later.
    if (!slackIntegration || !board.messageOnCommentCreation || !slackBoardId) {
      return context;
    }

    // send the message
    const slackClient = new WebClient(slackIntegration.apiToken)
    //get Idea url
    let ideaUrl = baseUrl + '/' + company.slug + "/i/" + idea._id;
    
    slackClient.chat.postMessage({
      channel: slackBoardId,
      username: "Incubie",
      icon_emoji: ":boy:",
      text: "New Comment",
      //text: `A new comment was posted on the idea: ${idea.title}. Comment: ${context.data.text}`
      attachments:[{
        fallback: "fallback",
        pretext: "<"+ ideaUrl +"|Goto Comment>",
        author_name: user.firstName + ' ' + user.lastName + ' in ' + board.name + ' Ideas Board',
        color: "good",
        fields: [
          {
            title: board.name,
            value: " - " + context.data.text,
            short: true,
          },
        ],

      }]
    }).then((res) => {

    }).catch((err) => {
      console.error(`new-comment-slack: Error posting message to slack board: ${slackBoardId} for idea: context.data._id`);
    })


    return context
  }
}
