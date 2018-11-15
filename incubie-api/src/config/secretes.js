module.exports = {
    stripeOptions: {
        stripeSecKey: process.env.STRIPE_SEC_KEY || 'sk_live_945xCS6y8JfA0gaUcWlOw5RQ',
        stripePubKey: process.env.STRIPE_PUB_KEY || 'pk_live_whwTghaQJVQggofyXALYTnQJ',
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
            }
        }
    }
}

