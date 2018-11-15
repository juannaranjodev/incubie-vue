const actions = require('../actions/action-types')

module.exports = {
  companies: {
    admin: {
      fullName: 'Company Administrator',
      description: '',
      allowedActions: [
        actions.CHECK_UNIQUE_COMPANY,
        actions.LOAD_COMPANY,
        actions.REMOVE_COMPANY,
        actions.UPDATE_PAYMENT,
        actions.INVITE_COMPANY_MEMBERS,
        actions.REMOVE_COMPANY_MEMBER,
        actions.CREATE_BOARD,
        actions.REMOVE_BOARD,
        actions.JOIN_BOARD,
        actions.REMOVE_ANY_IDEA,
        actions.EDIT_COMPANY_ROLES,
        actions.UPLOAD_IMAGES,
        actions.LOAD_IDEA,
        actions.CREATE_IDEA,
        actions.POST_COMMENT,
        actions.IDEA_VOTE,
        actions.REMOVE_IDEA_VOTE,
        actions.COMMENT_VOTE,
        actions.REMOVE_COMMENT_VOTE,
        actions.STRIPE_OPEN, // ruby test below,
        actions.UPDATE_IDEA_CHECKS,
        actions.DOWN_IDEA_CHECKS,
        actions.GET_PAYMENT_INFO,
        actions.SET_PAYMENT_INFO,
        actions.GET_ACTIVE_USER_INFO,
        actions.GET_INVITED_BOARD,
        actions.UPDATE_SLACK_TOKEN,
      ]
    },
    member: {
      fullName: 'Company Member',
      description: '',
      allowedActions: [
        actions.CHECK_UNIQUE_COMPANY,
        actions.LOAD_COMPANY,
        actions.CREATE_BOARD,
        actions.JOIN_BOARD,
        actions.UPLOAD_IMAGES,
        actions.LOAD_IDEA,
        actions.CREATE_IDEA,
        actions.POST_COMMENT,
        actions.IDEA_VOTE,
        actions.REMOVE_IDEA_VOTE,
        actions.COMMENT_VOTE,
        actions.REMOVE_COMMENT_VOTE,
        actions.STRIPE_OPEN, // ruby test below
        actions.UPDATE_IDEA_CHECKS,
        actions.DOWN_IDEA_CHECKS,
        actions.GET_PAYMENT_INFO,
        actions.SET_PAYMENT_INFO,
        actions.GET_ACTIVE_USER_INFO,
        actions.GET_INVITED_BOARD,
        actions.UPDATE_SLACK_TOKEN,
      ]
    }
  },
  boards: {
    admin: {
      fullName: 'Board Administrator',
      description: '',
      allowedActions: [
        actions.CHANGE_IDEA_STATE,
        actions.EDIT_BOARD_ROLES,
        actions.REMOVE_BOARD,
        actions.INVITE_BOARD_MEMBERS,
        actions.HIDE_VOTE_COUNT, // ruby test below
      ]
    },
    member: {
      fullName: 'Board Member',
      description: '',
      allowedActions: [
        actions.INVITE_BOARD_MEMBERS
      ]
    },
    guest: {
      fullName: 'Board Guest',
      description: '',
      allowedActions: []
    }
  }
}
