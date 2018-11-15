<template>
  <v-container grid-list-md>
    <v-layout
      column>
      <v-flex
        xs12
        sm9
        md5>
        <v-card>
          <v-card-title>
            <p class="caption">Your Plan</p>
          </v-card-title>
          <v-card-text>
            <p class="title">{{loggedInUser.stripe.plan}}</p>
            <p class="caption"> Active Users: {{activeUsers}} / {{headcount}} </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn
              to="company.users"
              color="accent">
              Add Users
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex
        xs12
        sm9
        md5>
        <v-card>
          <v-card-title>
            <p class="caption">Payment Method</p>
          </v-card-title>
          <v-card-text class="mt-0">
            <p class="title"> {{this.cardBrand}} Ending in {{this.cardLast4}} </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn flat @click="setPayInfo">
              Change Payment
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex
        xs12
        sm9
        md5>
        <v-card>
          <v-card-title>
            <p class="caption">Recent Payments</p>
          </v-card-title>
          <v-card-text>
            <!-- ruby test -->
            <v-list v-for="invoice in invoices" :key=invoice.id>
              <v-list-tile>
                <v-layout
                  row
                  space-between>
                  <v-flex>
                    <p class="title mb-0">${{invoice.amount / 100}}</p>
                  </v-flex>
                  <v-flex>
                    <p class="title mb-0">{{invoice.created}}</p>
                  </v-flex>
                  <v-flex>
                    <p class="title mb-0">xxxx xxxx {{invoice.source.last4}}</p>
                  </v-flex>
                </v-layout>
                <v-divider/>
              </v-list-tile>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
  </v-layout></v-container>
</template>
<style lang="stylus" scoped>
  hr
    margin: 10px 0

</style>

<script>
// ruby test <
import { stripeOptions } from '@/constants';
import { mapState, mapMutations } from 'vuex';
import { get } from 'lodash';
import { mapGetters } from "vuex";

let planData = stripeOptions.planData;
// ruby test >

export default {
  name: 'CompanyBilling',
  // ruby test <
  components: {},

  data (){
    return {
      cardBrand : '',
      cardLast4 : '',
      invoices : [],
      activeUsers : 0,
      headcount : 0,
    };
  },

  computed: {
    ...mapGetters("companies", {
      company: "current"
    }),
    ...mapGetters("auth", ["loggedInUser"]),
  },

  mounted () {
    this.getInvoices();
  },

  methods:{
    ...mapMutations("snackbar", {
      showSnackbar: "show"
    }),

    setPayInfo() {
      if(!this.loggedInUser.stripe) {
        return;
      }

      if(this.loggedInUser.stripe.plan == 'Free'){
        this.showSnackbar({color: "error" , message: "Upgrade required."});
        return;
      }

      this.$checkout.open({
        name: 'Enjoy Incubie!',
        panelLabel: "Change Payment",
        currency: 'USD',
        amount: 0,
        token: (token) => {
          let res = this.changePayment(planData.incubiePremium, token);
        },
        closed: () => {
          console.log('ruby : stripe payment method changed...')
        }
      });
    },

    changePayment(specificPlan, token){
      this.$dispatchAction({
        type: this.$actionTypes.SET_PAYMENT_INFO,
        entity: this.company._id,
        payload: {
          token: token,
          userId: this.loggedInUser._id,
          planData: specificPlan
        }
      }).then(res => {
        if(res.data.success) {
          let customer = res.data.customer;
          let card = customer.sources.data[0];
          this.cardBrand = card.brand;
          this.cardLast4 = card.last4;
        }
      })
    },

    getInvoices() {
      this.$dispatchAction({
        type: this.$actionTypes.GET_PAYMENT_INFO,
        entity: this.company._id,
        payload: {
          userId: this.loggedInUser._id,
        }
        }).then(res => {
          console.log("ruby : getInvoices : res = ", res.data);
          this.invoices = res.data.invoices;
          if(this.invoices){
            // convert data format
            this.invoices.forEach(invoice => {
              let timestamp = parseInt(invoice.created) * 1000;
              let d = new Date(timestamp);
              let month = '' + (d.getMonth() + 1);
              let day = '' + d.getDate();
              let year = d.getFullYear();
              if (month.length < 2) month = '0' + month;
              if (day.length < 2) day = '0' + day;
              invoice.created = [year, month, day].join('-');
              console.log(invoice.created);
            });

            this.cardBrand = res.data.customer.sources.data[0].brand;
            this.cardLast4 = res.data.customer.sources.data[0].last4;
            this.headcount = res.data.headcount;
            this.activeUsers = res.data.activeUsers;
          }
        })
    },

    getActiveUserCount() {
      
    }

  }
  // ruby test >
}
</script>
