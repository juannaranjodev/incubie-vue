<template>
  <v-form @submit.prevent="acceptInvitation()">
    <v-card>
      <v-card-title
        primary-title>
        <h3 class="headline">
          {{ invitation.invitedBy.firstName }}
          has invited you to join <strong>{{ invitation.company.name }}</strong>
        </h3>
      </v-card-title>
      <v-card-text>
        <v-text-field
          ref="fullName"
          v-model.trim="fullName"
          :rules="[$rules.required()]"
          type="text"
          label="Enter your full name"
          validate-on-blur/>
        <v-text-field
          ref="password"
          v-model.trim="password"
          :rules="[$rules.required()]"
          type="password"
          label="Choose a password"
          validate-on-blur/>
      </v-card-text>
      <v-card-actions>
        <v-btn
          block
          large
          color="accent"
          type="submit">
          Accept My Invitation
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { get } from 'lodash'

export default {
  name: 'InvitationSignUp',
  components: {},
  props: {},
  data () {
    return {
      fullName: null,
      password: null
    }
  },
  computed: {
    ...mapGetters('invitations', {
      invitation: 'current'
    }),
    user () {
      return {
        fullName: this.fullName,
        email: this.invitation.email,
        password: this.password,
        strategy: 'local',
      }
    }
  },
  watch: {},
  created () {},
  methods: {
    ...mapActions('auth', ['authenticate']),
    async acceptInvitation () {
      try {
        const res = await this.$dispatchAction({
          type: this.$actionTypes.ACCEPT_INVITATION,
          payload: Object.assign(this.invitation, { user: this.user })
        })
        //const slug = get(res, 'data.company.slug')

        await this.authenticate(this.user)

        //this.$router.push({ name: 'feed/main', params: { slug } })
        this.$router.push({ name: 'upgrade'})
      } catch (err) {
        // TODO: handle error
      }
    }
  }
}
</script>
