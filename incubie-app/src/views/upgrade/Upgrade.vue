<template>
  <div>
  <v-layout row align-center>
    <v-flex>
      <h1 class="font-weight-thin display-2 text-xs-center mt-5"> Never. Stop. Innovating. </h1>
    </v-flex>
  </v-layout>
  <v-container grid-list-md>
    <v-flex xs12 sm10 offset-sm1>
    <v-layout align-center justify-center row fill-height wrap class="mt-5">
      <v-flex xs12 sm4 v-for="plan in plans" :key="plan.id">
        <v-card max-width="250" height="320" :raised="plan.raised" :class="plan.color +'-border'">
          <v-card-title class="text-xs-center headline font-weight-bold"> {{ plan.specificPlan.name }} </v-card-title>
            <v-list>
              <v-list-tile v-for="feature in plan.features" :key="feature.id" class="py-0"><p class="title"> {{ feature }} </p></v-list-tile>
            </v-list>
            <!-- <h2 class="headline text-xs-center mb-1" v-if="plan.id == 3">{{ plan.phone }}</h2> -->
            <h2 class="headline text-xs-center mb-1">{{ plan.priceCaption }}</h2>
            <v-card-actions>
              <!-- ray test touch -->
              <v-btn class="white--text font-weight-bold" block :color="plan.color" @click="checkout(plan.specificPlan)" :disabled="plan.disabled"><v-icon v-if="plan.id == 3" class="mr-1">phone</v-icon> Choose {{ plan.specificPlan.name }} </v-btn>
            </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    </v-flex>
  </v-container>
  </div>
</template>

<script>
// ruby test added <
import { stripeOptions } from '@/constants';
import { mapState, mapMutations } from 'vuex';
import { get } from 'lodash';
import { mapGetters } from "vuex";
let planData = stripeOptions.planData;
// ruby test added >

export default {
  data () {
    return {
      plans: [{
        id: '1',
        specificPlan: planData.incubieFree,
        color: "grey",
        features: ['50 Ideas', 'Unlimited Users',''],
        priceCaption: '$0',
        destination: 'company/billing',
      },
      {
        id: '2',
        specificPlan: planData.incubiePremium,
        color: "teal",
        features: ['1000 Ideas', 'Unlimited Users', 'Private Boards'],
        priceCaption: '$1/Active User',
        raised: 'raised',
        destination: 'company/billing',
      },
      {
        id: '3',
        specificPlan: planData.incubieEnterprise,
        color: "amber",
        features: ['Unlimited Ideas', 'Unlimited Users', 'Private Boards'],
        priceCaption: 'Call Us',
        destination: 'tel:7605937616'
      },
      ]
    }
  },
  // ruby test added <
  computed: {
    ...mapGetters("companies", {
      company: "current"
    }),
    ...mapGetters("auth", ["loggedInUser"]),
  },
  methods: {
    // ruby test added <
    ...mapMutations("snackbar", {
      showSnackbar: "show"
    }),
    // ruby test added >
    checkout(specificPlan) {
      if(!this.loggedInUser || !this.loggedInUser.stripe) {
        return;
      }
      const currentPlan = this.loggedInUser.stripe.plan;
      
      // ray: block subscribing to the same plan
      if (currentPlan == specificPlan.name) {
        console.log('ray : the selected plan is the same as the current plan.');
        return;
      }

      // ray: block enterprise plan for now
      if (specificPlan.name == 'Enterprise') {
        console.log('ray : the selected plan is enterprise plan.');
        return;
      }

      if(specificPlan.name == 'Free'){
          this.playStripe(specificPlan , {});
          this.showSnackbar({color:"error", message: "Warning! This will hide all ideas over the plan limit."});
          this.updateIdeas(true);
          return;
      }

      this.$checkout.open({
        name: 'Enjoy Incubie!',
        currency: 'USD',
        amount: specificPlan.price,
        token: (token) => {
          this.playStripe(specificPlan, token);
          this.updateIdeas(false);
        },
        closed: () => {
          console.log('ray : stripe element closed...')
        }
      });
    },

    updateIdeas(isDowngrade) {
      this.$dispatchAction({
        type: this.$actionTypes.UPDATE_IDEA_CHECKS,
        entity: this.company._id,
        payload: {
          user: this.loggedInUser,
          isDowngrade : isDowngrade
        }
      }).then(res => {
        console.log('ray : stripe dispatch then');
        console.log(res);
      })
    },

    playStripe(specificPlan, token){
      let that = this;
      this.$dispatchAction({
        type: this.$actionTypes.STRIPE_OPEN,
        entity: this.company._id,
        payload: {
          token: token,
          userId: this.loggedInUser._id,
          planData: specificPlan
        }
      }).then(res => {
        console.log('ray : stripe dispatch then');
        let updatedLoggedInUser = res.data.user;
        console.log(updatedLoggedInUser);
        this.loggedInUser.stripe = updatedLoggedInUser.stripe;
      })
    }
  }
  // ruby test added >
}
</script>

<style lang="stylus" scroped>
@import '~@/assets/stylus/settings/_colors'

.grey-border  {
  border: 3px solid $grey.darken-1;
  max-width: 250px
}
.teal-border {
  border: 3px solid $teal.darken-1;
  max-width: 250px;
}
.amber-border {
  border: 3px solid $amber.darken-1;
  max-width: 250px;
}
</style>


