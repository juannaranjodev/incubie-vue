<template>
  <v-dialog
    :value="isOpen"
    width="375"
    lazy
    scrollable
    @input="setOpen">
    <v-card>
      <v-card-title class="headline">
        Invite Members
      </v-card-title>

      <v-card-text height="300">
        <v-form ref="inviteForm">
          <v-container
            pa-0
            grid-list-md
            fluid>
            <v-layout
              class="invite__row"
              row
              wrap>
              <v-flex xs12>
                <v-alert
                  :value="$store.state.invitations.errorOnCreate"
                  class="mb-4"
                  type="error">
                  {{ $store.state.invitations.errorOnCreate ? $store.state.invitations.errorOnCreate.message : '' }}
                </v-alert>
              </v-flex>
              <v-flex
                v-for="(invitation, index) in inviteRows"
                :key="`invitation-${index}`"
                xs12>
                <v-card
                  flat
                  class="invite__card">
                  <v-container
                    grid-list-md
                    fluid>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-text-field
                          v-model="invitation.email"
                          :rules="[$rules.email()]"
                          autofocus
                          hide-details
                          color="accent"
                          type="email"
                          class="invite__field"
                          style="padding-right: 32px"
                          placeholder="Email"/>
                      </v-flex>
                    </v-layout>
                  </v-container>

                  <v-btn
                    v-if="index !== 0"
                    small
                    icon
                    flat
                    class="invite__remove__row__btn"
                    @click="removeRow(index)">
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          flat
          color="accent"
          @click="addRow">Add Another
        </v-btn>
      </v-card-actions>
      <v-card-actions class="justify-end">
        <v-btn
          color="primary"
          flat
          @click.stop="setOpen(false)">Cancel
        </v-btn>
        <v-btn
          :loading="isActionPending"
          color="accent"
          flat
          @click="submit">Send Invites
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'CompanyInviteMembersDialog',
  components: {},
  props: {},
  data () {
    return {
      inviteRows: [
        {
          email: null,
          role: null
        }
      ],

      emailMatches: []
    }
  },
  computed: {
    ...mapState('auth', ['actionTypes', 'roleTypes']),
    ...mapState('actions', ['isActionPending']),
    ...mapState('ui', {
      isOpen: 'isInviteMembersDialogOpen'
    }),
    ...mapGetters('auth', ['roles', 'loggedInUser']),
    ...mapGetters('companies', {
      company: 'current'
    }),
    invitations () {
      return this.inviteRows.filter(row => {
        return row.email
      }).map(row => {
        return {
          email: row.email,
          role: 'member',
          company: this.company._id,
          invitedBy: this.loggedInUser._id
        }
      })
    }
  },
  watch: {},
  methods: {
    ...mapMutations('ui', {
      setOpen: 'setInviteMembersDialogOpen'
    }),
    ...mapActions('invitations', {
      createInvitations: 'create'
    }),
    ...mapActions('companyManagement', ['inviteMembers']),
    addRow () {
      this.inviteRows.push({
        email: null,
        role: null
      })
    },
    removeRow (index) {
      this.inviteRows.splice(index, 1)
    },
    async submit () {
      if (this.$refs.inviteForm.validate()) {
        await this.$dispatchAction({
          type: this.$actionTypes.INVITE_COMPANY_MEMBERS,
          entity: this.company._id,
          payload: this.invitations
        })

        this.setOpen(false)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/stylus/settings/_variables'
  @import '~@/assets/stylus/settings/_colors'

  .invite {

    &__card {
      position: relative
      transition: box-shadow $primary-transition

      &:hover {
        box-shadow: 0 0 1px 0 rgba(0, 0, 0, .6)
      }
    }

    &__field {
      padding-top: 4px
    }

    &__remove__row__btn {
      position: absolute
      top: 4px
      right: 0
      z-index: 10
    }

    &__clear {
      text-align: right
    }
  }
</style>
