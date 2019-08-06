import store from '@/store'
import actionTypes from '@/store/action-types'
import multiGuard from 'vue-router-multiguard'

function ensureInvitationId (to, from, next) {
  if (!to.params.id) {
    next({ name: 'login' })
  } else {
    next()
  }
}

async function retrieveInvitation (to, from, next) {
  try {
    const { data } = await store.dispatch('actions/dispatch', {
      type: actionTypes.RETRIEVE_INVITATION,
      payload: to.params.id
    })

    store.commit('invitations/addItem', data)
    store.commit('invitations/setCurrent', data._id)

    next()
  } catch (err) {
    // TODO: handle error
    // ruby test <
    
    let str = to.params.id;
    console.log("ruby: params.id = ", to.params.id);
    if(str.includes('_FAI35_')) {
      let array = str.split('_FAI35_');
      let companyId =array[0];
      next({ name: 'invitation/linksignup', params: { id: to.params.id } })

    }else {
      next({ name: 'invitation/invalid', params: { id: to.params.id } })
    }
    

    // ruby test >
  }
}

function ensureExisting (to, from, next) {
  const invitation = store.getters['invitations/current']

  if (!invitation.user) {
    next({ name: 'invitation/signup', params: { id: to.params.id } })
  } else {
    next()
  }
}

export const invitationRoutes = {
  path: '/invitation/:id',
  component: () => import('@/views/invitations/Invitation'),
  props: true,
  beforeEnter: ensureInvitationId,
  children: [
    {
      path: '',
      name: 'invitation',
      component: () => import('@/views/invitations/InvitationExisting'),
      beforeEnter: multiGuard([retrieveInvitation, ensureExisting])
    },
    {
      path: '',
      name: 'invitation/signup',
      component: () => import('@/views/invitations/InvitationSignUp')
    },
    {
      path: 'invalid',
      name: 'invitation/invalid',
      component: () => import('@/views/invitations/InvitationInvalid')
    },
    // ruby test <
    {
      path: '',
      name: 'invitation/linksignup',
      component: () => import('@/views/invitations/InvitationLinkSignUp')
    },
    // ruby test >
  ]
}
