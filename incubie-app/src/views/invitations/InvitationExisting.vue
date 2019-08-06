<template>
  <v-form @submit.prevent="acceptInvitation()">
    <v-card>
      <v-card-title
        primary-title>
        <h3 class="headline">
          {{ invitation.invitedBy.firstName }} {{ invitation.invitedBy.lastName }}
          has invited you to join <strong>{{ invitation.company.name }}</strong>
        </h3>
      </v-card-title>
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
import { mapGetters } from 'vuex'
import { get } from 'lodash'

export default {
  name: 'InvitationNewUser',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {
    ...mapGetters('invitations', {
      invitation: 'current'
    })
  },
  watch: {},
  created () {},
  methods: {
    async acceptInvitation () {
      try {
        const res = await this.$dispatchAction({
          type: this.$actionTypes.ACCEPT_INVITATION,
          payload: this.invitation
        })
        const slug = get(res, 'data.company.slug')

        this.$router.push({ name: 'feed/main', params: { slug } })
      } catch (err) {
        // TODO: handle error
      }
    }
  }
}
</script>
