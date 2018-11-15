module.exports = {
  addInvitation: require('./add-invitation.hook'),
  addRandomColor: require('./add-random-color.hook'),
  allowQueryEntityByUser: require('./allow-query-entity-by-user.hook'),
  ensureCompanyUser: require('./ensure-company-user.hook'),
  isAction: require('./is-action.hook'),
  sendVerificationEmail: require('./send-verification-email'),
  updateIdeaVoteCount: require('./update-idea-vote-count.hook'),
  updateCommentVoteCount: require('./update-comment-vote-count.hook'),
  isParamsAction: require('./is-params-action.hook')
}
