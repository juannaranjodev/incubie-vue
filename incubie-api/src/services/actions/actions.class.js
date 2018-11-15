const roleTypes = require('../credentials/role-types')
const entityKinds = require('../credentials/entity-kinds')
const voteKinds = require('../votes/vote-kinds')
const actions = require('./action-types')
const errors = require('@feathersjs/errors')
const get = require('lodash/get')
const logger = require('../../logger')

class Service {
  constructor(options) {
    this.options = options || {}
  }

  setup(app) {
    this.app = app
  }

  async find(params) {
    return actions
  }

  async get(id, params) {
    return {
      id,
      text: `A new message with ID: ${id}!`
    }
  }

  async create(data, params) {
    const type = data.type
    const entity = data.entity
    const payload = data.payload
    const company = data.company
    const user = params.user

    await this.app.service('permissions').create({
      type,
      entity,
      user
    })

    let actionRes

    switch (type) {
      case actions.SIGN_UP:
        actionRes = await this.signUp(payload)
        break

      case actions.CHECK_UNIQUE_EMAIL:
        actionRes = await this.checkUniqueEmail(payload)
        break

      case actions.CHECK_UNIQUE_COMPANY:
        actionRes = await this.checkUniqueCompany(payload)
        break

      case actions.VERIFY_EMAIL:
        actionRes = await this.verifyEmail(payload)
        break

      case actions.RETRIEVE_INVITATION:
        actionRes = await this.retrieveInvitation(payload)
        break

      case actions.ACCEPT_INVITATION:
        actionRes = await this.acceptInvitation(payload)
        break

      case actions.LOAD_COMPANIES:
        actionRes = await this.loadCompanies(user)
        break

      case actions.LOAD_COMPANY:
        actionRes = await this.loadCompany(params, payload)
        break

      case actions.CREATE_BOARD:
        actionRes = await this.createBoard(payload, user)
        break

      case actions.REMOVE_BOARD:
        actionRes = await this.removeBoard(entity)
        break

      case actions.INVITE_COMPANY_MEMBERS:
        actionRes = await this.inviteCompanyMembers(payload)
        break

      case actions.UPLOAD_IMAGES:
        actionRes = await this.uploadImages(payload)
        break

      case actions.CREATE_IDEA:
        actionRes = await this.createIdea(payload)
        break

      case actions.LOAD_IDEA:
        actionRes = await this.loadIdea(payload)
        break

      case actions.IDEA_VOTE:
        actionRes = await this.vote(payload)
        break

      case actions.REMOVE_IDEA_VOTE:
        actionRes = await this.removeVote(payload)
        break

      case actions.COMMENT_VOTE:
        actionRes = await this.vote(payload)
        break

      case actions.REMOVE_COMMENT_VOTE:
        actionRes = await this.removeVote(payload)
        break

      case actions.POST_COMMENT:
        actionRes = await this.postComment(payload)
        break

      case actions.JOIN_BOARD:
        actionRes = await this.joinBoard(payload)
        break

      case actions.EDIT_COMPANY_ROLES:
        actionRes = await this.editCompanyRole(payload)
        break

      case actions.STRIPE_OPEN:
        console.log("ruby : ***** STRIPE_OPEN start *****");
        actionRes = await this.openStripe(payload)
        console.log('ray : ***** STRIPE_OPEN end ***** stripe ', actionRes.data.user.stripe);
        break;

      case actions.UPDATE_IDEA_CHECKS:
        console.log("ruby : ***** UPDATE_IDEA_CHECK case *****");
        actionRes = await this.updateIdeaChecks(payload)
        break;

      case actions.SET_PAYMENT_INFO:
        console.log("ruby : ***** SET_PAYMENT_INFO case *****");
        actionRes = await this.setPayInfo(payload)
        break;

      case actions.GET_PAYMENT_INFO:
        console.log("ruby : ***** GET_PAYMENT_INFO case *****");
        actionRes = await this.getPayInfo(payload)
        break;

      case actions.INVITE_BOARD_MEMBERS:
        console.log("ruby : ***** INVITE_BOARD_MEMBERS case *****");
        actionRes = await this.inviteBoardMembers(payload)
        break;

      case actions.GET_INVITED_BOARD:
        console.log("ruby : ***** GET_INVITED_BOARD case *****");
        actionRes = await this.joinInvitedBoard(payload)
        break;

      case actions.ACCEPT_LINK_INVITATION:
        console.log("ruby : ***** ACCEPT_LINK_INVITATION case *****");
        actionRes = await this.acceptLinkInvitation(payload)
        break;

      case actions.HIDE_VOTE_COUNT:
        console.log("ruby : ***** HIDE_VOTE_COUNT case *****");
        actionRes = await this.hideVoteCount(payload)
        break;
      case actions.UPDATE_SLACK_TOKEN:
        console.log("ruby : ***** UPDATE_SLACK_TOKEN case *****");
        actionRes = await this.updateSlackToken(payload)
        break;
      // case actions.GET_ACTIVE_USER_INFO:
      //   console.log("ruby : ***** GET_ACTIVE_USER_INFO case *****");
      //   actionRes = await this.getActiveUserInfo(payload)
      //   break; 
        
    }

    return {
      type,
      entity,
      company: get(actionRes, 'company', company),
      // ray test changed default to false not true
      notify: get(actionRes, 'notify', true),
      data: get(actionRes, 'data', null)
    }
  }

  async update(id, data, params) {
    return data
  }

  async patch(id, data, params) {
    return data
  }

  async remove(id, params) {
    return {
      id
    }
  }

  async signUp(payload) {
    const accountService = require('../auth-management/notifier')
    const company = await this.app.service('companies').create(payload.company)
    const user = await this.app.service('users').create({
      ...payload.user,
      lastAccessed: company._id
    })
    const entityUser = await this.app.service('credentials').create({
      user: user._id,
      entity: company._id,
      kind: entityKinds.companies,
      role: roleTypes.admin,
      lastSeenAt: new Date()
    })

    accountService(this.app).notifier('resendVerifySignup', user)

    return {
      data: {
        user,
        company,
        entityUser
      },
      notify: false
    }
  }

  async checkUniqueEmail(email) {
    const users = await this.app.service('users').find({
      query: {
        email,
        $limit: 0
      }
    })

    if (users.total > 0) {
      throw new errors.BadRequest('Email already taken.', {
        errors: {
          email: 'Email already taken.'
        }
      })
    } else {
      return true
    }
  }

  async checkUniqueCompany(company) {
    const companies = await this.app.service('companies').find({
      query: {
        slug: company.slug,
        $select: ['_id']
      }
    })

    if (companies.length) {
      throw new errors.BadRequest({
        errors: {
          company: 'Company name already taken.'
        }
      })
    } else {
      return true
    }
  }

  async verifyEmail(verifyToken) {
    const Users = this.app.service('users')
    const user = get(await Users.find({
      query: {
        verifyToken,
        $limit: 1
      },
      paginate: false
    }), '[0]')

    if (!user) {
      throw new errors.BadRequest('Email not verified.', {
        errors: {
          verifyEmail: 'Invalid token.'
        }
      })
    } else if (user.isVerified) {
      throw new errors.BadRequest('Email already verified')
    }

    await Users.patch(user._id, {
      isVerified: true
    })

    return true
  }

  async retrieveInvitation(id) {
    const data = await this.app.service('invitations').get(id)

    return {
      data
    }
  }

  // ruby test <
  async acceptLinkInvitation(invitation) {
    let user
    if (invitation.user._id) {
      user = invitation.user
    } else {
      let candiUsers = await this.app.service('users').find({
        query:{
          email: invitation.user.email,
          $limit: 1
        }
      });
      console.log("ruby: candiUsers", candiUsers.data);
      if(candiUsers.total > 0){
        // if signed up user
        user = candiUsers.data[0];
        console.log("ruby: I found it in db ,", user);

        user = await this.app.service('users').patch( user._id, {
          //password: invitation.user.password,
          isVerified: true,
          lastAccessed: invitation.company._id,
        })
      }else {
        // if new user
        user = await this.app.service('users').create({
          fullName: invitation.user.fullName,
          email: invitation.user.email,
          password: invitation.user.password,
          isVerified: true,
          lastAccessed: invitation.company._id,
        })
      }

    }
    let realCompany = await this.app.service('companies').get(invitation.company._id);
    console.log("ruby: @@@company@@@@" , realCompany);
    let realBoard = await this.app.service('boards').get(invitation.board);
    console.log("ruby: @@@board@@@" , realBoard);

    try{
      await this.app.service('credentials').create({
        entity: invitation.company._id,
        user: user._id,
        kind: entityKinds.companies,
        role: roleTypes.member
      })
    }catch(err){
      console.log("ruby: failed in company join");
    }
    try{
      console.log("ruby: **&&**&&**&&02" , invitation.company._id);
      await this.app.service('credentials').create({
        entity: invitation.board,
        user: user._id,
        kind: entityKinds.boards,
        role: roleTypes.member,
      })
    }catch (err){
      console.log("ruby: failed in board join");
    }
    return {
      data: {
        company: realCompany,
        user,
        board: realBoard,
      },
      notify: false
    }
  }
  // ruby test >

  async acceptInvitation(invitation) {
    let user
    if (invitation.user._id) {
      user = invitation.user
    } else {
      user = await this.app.service('users').create({
        fullName: invitation.user.fullName,
        email: invitation.user.email,
        password: invitation.user.password,
        isVerified: true,
        lastAccessed: invitation.company._id,
      })
    }

    await this.app.service('credentials').create({
      entity: invitation.company._id,
      user: user._id,
      kind: entityKinds.companies,
      role: roleTypes.member
    })
    await this.app.service('invitations').remove(invitation._id)
    // ruby test <
    let inviteRes = await this.app.service('invite-board').find({
      query:{
        email:user.email
      }
    });
    console.log("ruby: &&&&", inviteRes);
    const credentialService = this.app.service('credentials');
    inviteRes.data.forEach(invite => {
      console.log("ruby: inviteboard test ", invite);
      credentialService.create({
        entity: invite.board,
        user: user._id,
        kind: entityKinds.boards,
        role: invite.role,
      })
      this.app.service('invite-board').remove(invite._id)
    });
    // ruby test >
    return {
      data: {
        company: invitation.company,
        user
      },
      notify: false
    }
  }
  // ruby test <
  async joinInvitedBoard(payload){
    let user = payload.user;
    let inviteRes = await this.app.service('invite-board').find({
      query:{
        email:user.email
      }
    });
    console.log("ruby: &&&&", inviteRes);
    const credentialService = this.app.service('credentials');
    inviteRes.data.forEach(invite => {
      console.log("ruby: inviteboard test ", invite);
      credentialService.create({
        entity: invite.board,
        user: user._id,
        kind: entityKinds.boards,
        role: invite.role,
      })
      this.app.service('invite-board').remove(invite._id)
    });

    const updatedUser = await this.app.service('users').get(user._id)

    return {
      data: {
        user: updatedUser,
      },
      notify: false,
    }
    
  }
  // ruby test >

  async loadCompanies(user) {
    const companies = await this.app.service('companies').find({
      query: {
        user: user._id,
        $sort: {
          createdAt: 1
        }
      },
      paginate: false
    })

    return {
      data: companies
    }
  }

  async loadCompany(params, payload) {
    const {
      id
    } = payload
    const users = await this.app.service('users').find({
      query: {
        company: id
      },
      paginate: false
    })
    const credentials = await this.app.service('credentials').find({
      query: {
        company: id
      },
      paginate: false
    })
    const boards = await this.app.service('boards').find({
      query: {
        company: id
      },
      paginate: false
    })
    const channel = `companies/${id}`

    // this.app.channel(this.app.channels).leave(connection => connection === params.connection)
    this.app.channel(channel).join(params.connection)

    return {
      data: {
        company: id,
        boards,
        credentials,
        // ideas,
        users,
        // ideaVotes
      },
      company: id,
      notify: false
    }
  }

  async createBoard(payload, user) {
    const board = await this.app.service('boards').create(payload)
    const credential = await this.app.service('credentials').create({
      entity: board._id,
      user: user._id,
      kind: entityKinds.boards,
      role: roleTypes.admin
    })
    const updatedUser = await this.app.service('users').get(user._id)

    return {
      data: {
        credential,
        board,
        user: updatedUser
      }
    }
  }

  async removeBoard(entity) {
    await this.app.service('boards').remove(entity)
    await this.app.service('credentials').remove(null, {
      query: {
        entity
      }
    })

    return true
  }

  async inviteCompanyMembers(payload) {
    await this.app.service('invitations').create(payload)
    return true
  }

  async uploadImages(payload) {
    const data = {}
    const config = this.app.get('storage')
    const Uploads = this.app.service('uploads')
    const bucketPath = `${config.s3.bucket}/${get(payload, 'bucket', 'uncategorized')}`

    logger.info(config.s3.bucket)
    logger.info(bucketPath)

    if (payload.thumb) {
      const thumbRes = await Uploads.create({
        uri: payload.uri,
        bucket: payload.bucket,
        thumb: true
      })
      data.thumb = `//s3.${config.s3.region}.amazonaws.com/${bucketPath}/${thumbRes.id}`
    }

    const imageRes = await Uploads.create({
      uri: payload.uri,
      bucket: payload.bucket
    })

    data.url = `//s3.${config.s3.region}.amazonaws.com/${bucketPath}/${imageRes.id}`

    return {
      data,
      notify: false
    }
  }

  async createIdea(payload) {
    const res = await this.app.service('ideas').create(payload)

    return {
      data: res
    }
  }

  async loadIdea(id) {
    const idea = await this.app.service('ideas').get(id)

    return {
      data: {
        idea
      }
    }
  }

  async postComment(payload) {
    const author = payload.createdBy
    const ideaId = payload.idea
    const comment = await this.app.service('comments').create(payload)
    const idea = await this.app.service('ideas').get(ideaId)
    const vote = await this.app.service('votes').create({
      parent: comment._id,
      kind: voteKinds.comments,
      owner: author,
      voter: author
    })

    comment.voteCount = 1
    comment.votes.push(vote)

    return {
      data: {
        comment,
        idea
      }
    }
  }

  async vote(payload) {
    const vote = await this.app.service('votes').create(payload)
    const parent = await this.app.service(payload.kind).get(payload.parent)
    const owner = await this.app.service('users').get(payload.owner)

    return {
      data: {
        parent,
        owner,
        vote
      }
    }
  }

  async removeVote(payload) {
    const commentVoteRes = await this.app.service('votes').find({
      query: payload,
      paginate: false
    })

    const commentVoteId = get(commentVoteRes, '[0]._id')
    const commentOwner = get(commentVoteRes, '[0].owner')
    await this.app.service('votes').remove(commentVoteId)
    const parent = await this.app.service(payload.kind).get(payload.parent)
    const owner = await this.app.service('users').get(commentOwner)

    return {
      data: {
        parent,
        owner
      }
    }
  }

  async joinBoard(payload) {
    const {
      board,
      company,
      user
    } = payload
    const credentialService = this.app.service('credentials');
    console.log("ruby ######join board#### user=", user, " , board =", board, "company, ", company);
    const {
      total
    } = await credentialService.find({
      query: {
        entity: company,
        user,
        $limit: 0
      }
    })

    if (total === 0) {
      throw new errors.Forbidden({
        errors: {
          board: 'User is not authorized to join this board.'
        }
      })
    }
    console.log("PASSED__________________1_________",board);
    await credentialService.create({
      entity: board,
      user,
      role: roleTypes.member,
      kind: entityKinds.boards
    })
    console.log("PASSED__________________2_________");
    const updatedUser = await this.app.service('users').get(user)
    console.log("ruby: #####__________ BACK  #######updatedUser = ", updatedUser);
    return {
      data: {
        user: updatedUser
      },
      notify: true
    }
  }

  async editCompanyRole(payload) {
    const {
      companyId,
      role,
      userId
    } = payload
    const credentialsRes = await this.app.service('credentials').find({
      query: {
        entity: companyId,
        user: userId,
        $select: ['_id'],
        $limit: 1
      }
    })
    const credentialId = get(credentialsRes, 'data[0]._id')

    if (!credentialId) {
      throw new errors.BadRequest({
        errors: {
          user: `No credential found for user ${userId} in company ${companyId}.`
        }
      })
    }

    await this.app.service('credentials').patch(credentialId, {
      role
    })

    
  }

  // ruby test added <
  async openStripe(payload) {
    // ray test added <
    // vars
    const token = payload.token;
    const userId = payload.userId;
    const planData = payload.planData;

    // services
    const customerService = await this.app.service('stripe/customers');
    const subscriptionService = await this.app.service('stripe/subscriptions');
    let usersService = await this.app.service('users');
    let user = await usersService.get(userId);

    // free plan
    if (user.stripe.subscriptionId) {
      if (planData.name == 'Free') {
        console.log('ray : delete existed subscription ', user.stripe.subscriptionId);
        await subscriptionService.stripe.subscriptions.del(
          user.stripe.subscriptionId
        );
        user.stripe.plan = planData.name;
        user.stripe.subscriptionId = '';
        user = await usersService.patch(userId, user);
        return { data: { user: user }, notify: false, }
      }
    }

    // prepare customer id
    let customer;
    const customerData = {
      email: token.email,
      source: token.id
    };
    if (user.stripe.customerId) {
      console.log('ray : update existed customer');
      customer = await customerService.update(user.stripe.customerId, customerData);
    } else {
      console.log('ray : create new customer');
      customer = await customerService.create(customerData);
    }

    // set customer id if empty
    if (!user.stripe.customerId) {
      console.log('ray : customerId is added');
      user.stripe.customerId = customer.id;
    }

    // prepare subscription id
    let subscription;
    if (user.stripe.subscriptionId) {
        subscription = await subscriptionService.update(
          user.stripe.subscriptionId, {
            plan: planData.planId /*"plan_DhBx5DDuJW2eMt"*/
          },
        );
    } else {
      console.log('ray : create new subscription');
      subscription = await subscriptionService.create({
        customer: customer.id,
        items: [{
          plan: planData.planId
        }],
      });
    }
    
    // stripe plan
    console.log('ray : user.stripe ', user.stripe);

    user.stripe.plan = planData.name;
    if (planData.name != 'Free') {
      user.stripe.subscriptionId = subscription.id;
    }

    user = await usersService.patch(userId, user);
    // ray test added >
    return {
      data: {
        user: user
      },
      notify: false,
    }
  }

  async updateIdeaChecks(payload) {
    //ruby test : payload.up = 1 or -1. 1 means downgrade, -1 means upgrade
    console.log("ruby : this is for idea check in action.class.js");
    const ideasRes = await this.app.service('ideas').find({
      query: {
        //$limit: 1000, // ruby test : this should be changed to 1000
        createdBy: payload.user._id,
        check: payload.isDowngrade ? 2 : -2,
      }
    });

    let ideas = ideasRes.data;
    ideas.forEach(idea => {
      this.app.service('ideas').patch(idea._id, {
        check: payload.isDowngrade ? -2 : 2,
      });
    })
    return {
      data: {
        ideasRes: ideasRes
      },
      notify: false,
    }
  }
  
  // ruby test : this function to change payment method
  async setPayInfo(payload){
    console.log("ruby : **** setPayInfo ****");
    console.log(payload.token);

    // vars
    const token = payload.token;
    const userId = payload.userId;
    const planData = payload.planData;

    // services
    const customerService = await this.app.service('stripe/customers');
    let usersService = await this.app.service('users');
    let user = await usersService.get(userId);

    // prepare customer id
    let customer = {};
    const customerData = {
      email: token.email,
      source: token.id
    };

    //update payment method by token
    let result = false;
    if (user.stripe.customerId) {
      console.log('ruby : update existed customer');
      customer = await customerService.update(user.stripe.customerId, customerData);
      if(customer){
        result = true;
      } else {
        result = false;
      }
    }

    return {
      data: {
        user: payload.user,
        customer: customer,
        success: result,
      }
    }
  }

  async getPayInfo(payload) {
    console.log("ruby : ***** getPayInfo *****");

    // services
    const customerService = await this.app.service('stripe/customers');
    const invoiceService = await this.app.service('/stripe/invoices');
    const credentialService = await this.app.service('credentials');
    const usersService = await this.app.service('users');

    // vars
    const userId = payload.userId;
    let companyId;
    let user = await usersService.get(userId);
    let staff;
    let activeUsers = 0;
    let userList = [];
    let memberIds = [];
    let companyIds = await credentialService.find({
      query: {
        user: user._id,
        kind: entityKinds.companies,
        $limit: 5000, // ruby test max count of staff
      }
    });

    // get active users
    if(companyIds){
      companyId = companyIds.data[0].entity;
      console.log("ruby test : company Id = ", companyId);
      staff = await credentialService.find({
        query:{
          kind: entityKinds.companies,
          entity: companyId,
        }
      });
      staff.data.forEach(member => {
        memberIds.push(member.user);
      })
      userList = await usersService.find({
        query:{
          _id: { $in: memberIds },
        }
      });
      userList.data.forEach(member =>{
        if(member.stripe.plan == 'Premium'){
          activeUsers++;
        }
      })
    }

    // prepare customer id
    let customer;
    let invoices = [];
    let result = false;

    // get invoices
    if (user.stripe.customerId) {
      console.log("ruby : step 3, customerId = " + user.stripe.customerId);
      customer = await customerService.get(user.stripe.customerId);
      invoices = await invoiceService.find(
        {query : {
          customer: user.stripe.customerId,
          //$limit: 4,
          // $sort: {
          //   date: -1
          // }
        }
      });

      if(customer) {
        result = true;
      }
    }
    console.log("ruby test: activeUsers == " + activeUsers);
    return {
      data: {
        activeUsers: activeUsers,
        headcount: userList.data.length,
        customer: customer,
        invoices: invoices.data,
        success: result,
      },
      notify:false,
    }
  }

  async inviteBoardMembers(payload) {
    const inviteBoardService = this.app.service('invite-board');
    const credentialService = this.app.service('credentials');
    const boardService = this.app.service('boards');

    await inviteBoardService.create(payload);

    console.log("ruby: payload",payload);
    let index = 0;
    for(index = 0 ; index < payload.length ; index++) {
      let info = payload[index];
      if(info.user && info.user != -1){
        let creRes = await credentialService.create({
          entity: info.board,
          user: info.user,
          kind: entityKinds.boards,
          role: roleTypes.member
        })
        console.log("ruby: board *******", creRes);
      } else {

      }
    }
    return true    
  }
  
  async hideVoteCount(payload) {
    console.log("ruby: **** hideVoteCount ****");
    //vars
    const boardService = this.app.service('boards');
    const res = await boardService.patch(payload.board, { hideVote: payload.value });
    let result = await boardService.get(payload.board);
    return {
      data: {
        board: result,
      },
      notify: true,
    }
  }
  async updateSlackToken(payload) {
    console.log("ruby: **** updateSlackToken ****");
    //vars
    const slackService = this.app.service('slack-integration')
    const slackRes = await slackService.find({
      query: {
        company: payload.company,
    }});
    let slackIntegration;
    if(slackRes && slackRes.total > 0) {
      console.log("ruby:------------slack Res yes",slackRes);
      slackIntegration = slackRes.data[0];
      await slackService.patch(slackIntegration._id, {apiToken: payload.token});
    }else {
      console.log("ruby:------------slack Res no");
      slackIntegration = await slackService.create(
        {company: payload.company, messageOnIdeaCreation: false, apiToken: payload.token}
      );
      await this.app.service('companies').patch(payload.company, {slackIntegration: slackIntegration._id});
    }
    return {
      data: {
        slackIntegration: slackIntegration,
      },
      notify: false,
    }
  }
  

}

module.exports = function (options) {
  return new Service(options)
}

module.exports.Service = Service
