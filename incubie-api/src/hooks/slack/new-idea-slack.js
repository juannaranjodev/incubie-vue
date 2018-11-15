// use this hook to send slack messages when a new idea is made
// eslint-disable-next-line no-unused-vars
const { WebClient } = require('@slack/client');

module.exports = function (options = {}) {
  return async context => {
    console.log("ruby: ****** SLACK NEW IDEA TEST ******", context.result);

    const ideaId = context.result._id;
    const companyId = context.data.company;
    const ideaName = context.data.title;
    const ideaDesc = context.data.description;
    const baseUrl = context.app.get('baseUrl');
    const company = await context.app.service('companies').get(companyId);
    let slackIntegration;
    let slackBoardId;
    let user;
    let board;
    if(!company.slackIntegration){
      return context;
    }
    console.log("______________________1_____");
    // get the slack integration info  ruby test del
    const slackIntegrations = await context.app.service('slack-integration').find({
      query: { company: companyId }
    });
    if (slackIntegrations && slackIntegrations.total > 0) {
      slackIntegration = slackIntegrations.data[0];
    }
    console.log("______________________2_____");
    if (context.data.board) {
       board = await context.app.service('boards').get(context.data.board);
      slackBoardId = board.slackBoardId;
    }
    console.log("______________________3_____");
    //get user
    user = await context.app.service('users').get(context.data.createdBy);
    console.log("ruby: this is a slackboard Id =",slackBoardId, " http:"  );

    // return if slack is not integrated or is turned off
    if (!slackIntegration || !board.messageOnIdeaCreation || !slackBoardId) {
      return context;
    }

    //get Idea url
    let ideaUrl = baseUrl + '/' + company.slug + "/i/" + ideaId;
    console.log("ruby: idea URL = " , ideaUrl);
    
    // send the message
    const slackClient = new WebClient(slackIntegration.apiToken);
    slackClient.chat.postMessage({
      channel: slackBoardId,
      username: "Incubie",
      icon_emoji: ":boy:",
      text: `New Idea Posted.`,
      //as_user: true,
      attachments:[{
        fallback: "fallback",
        pretext: "<" + ideaUrl +"|Goto Idea>",
        author_name: user.firstName + ' ' + user.lastName + ' in ' + board.name + ' Ideas Board',
        color: "good",
        image_url: "http://example.com/path/to/thumb.png",
        fields: [
          {
            title: "Title",
            value: context.data.title,
            short: true,
          },
          {
            title: "Description",
            value: context.data.description,
            short: true,
          }
        ],
        attachment_type: "default",
        //callback_id: "chirp_message",
        elements: [{
          type: "text",
          label: "Say what you want",
          name: "hello",
        }
        ],
        actions: [
            {
                name: "comment",
                text: "Comment",
                type: "button",
                value: "comment",
                url: ideaUrl+ "/xxx",
            },
            {
                name: "vote",
                text: "Goto Vote",
                style: "danger",
                type: "button",
                value: "vote",
                url: ideaUrl,
            }
          ]
      }]
    
    }).then((res) => {
      console.log("ruby: message successfully sent. RES = ", res);
    }).catch((err) => {
      console.error(`new-idea-slack: Error posting message to slack board: ${slackBoardId} for idea`);
    });
    return context;
  };

};
