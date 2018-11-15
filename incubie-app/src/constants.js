export const localStorageKey = 'incubie'

export const sortByTypes = {
  top: {
    label: 'Top',
    value: 'top'
  },
  new: {
    label: 'New',
    value: 'new'
  }
}

export const voteKinds = {
  ideas: 'ideas',
  comments: 'comments'
}

export const entityTypes = {
  companies: 'companies',
  boards: 'boards',
  comments: 'comments'
}

export const roleTypes = {
  admin: 'admin',
  member: 'member',
  guest: 'guest'
}

export const ideaStatuses = {
  committed: 'committed',
  proposed: 'proposed',
  closed: 'closed'
}

// ray test added <
export const stripeOptions = {
  stripePubKey: 'pk_live_whwTghaQJVQggofyXALYTnQJ',
  defaultPlan: 'Free',
  planData: {
    incubieFree: {
      name: 'Free',
      planId: '',
      price: 0
    },
    incubiePremium: {
      name: 'Premium',
      planId: 'plan_DhBx5DDuJW2eMt',
      price: 100
    },
    incubieEnterprise: {
      name: 'Enterprise',
      planId: '',
      price: 0
    }
  }
}


// ray test added >