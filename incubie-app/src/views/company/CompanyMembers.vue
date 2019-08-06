<template>
  <div class="members u__main-container u__clipped-container mt-3">
    <company-invite-members-dialog/>

    <v-btn
      class="ma-0 pa-0"
      color="accent"
      fab
      absolute
      top
      right
      icon
      @click="setInviteMembersDialogOpen">
      <v-icon>person_add</v-icon>
    </v-btn>

    <v-list
      two-line
      class="pa-0">
      <template v-for="user in users">
        <v-list-tile
          :key="user._id"
          avatar>
          <v-list-tile-avatar>
            <i-user-icon
              :user="user"
              :size="32"/>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>
              {{ user.firstName }}
              {{ user.lastName }}
            </v-list-tile-title>
            <v-list-tile-sub-title>
              {{ user.email }}
            </v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-select
              :items="roles"
              :value="getRole(user, company._id)"
              style="width: 132px"
              dense
              small
              solo
              @input="updateRole($event, user._id)"/>
          </v-list-tile-action>
          <v-list-tile-action>
            <v-btn
              class="ma-0 pa-0"
              icon>
              <v-icon>close</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider :key="`${user._id}-list-divider`"/>
      </template>
    </v-list>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import CompanyInviteMembersDialog from './CompanyInviteMembersDialog'

export default {
  name: 'CompanyMembers',
  components: { CompanyInviteMembersDialog },
  props: {},
  data () {
    return {}
  },
  computed: {
    ...mapGetters('auth', ['roles']),
    ...mapGetters('users', {
      users: 'list',
      getRole: 'role'
    }),
    ...mapGetters('companies', {
      company: 'current'
    })
  },
  watch: {},
  created () {},
  methods: {
    ...mapMutations('ui', {
      setInviteMembersDialogOpen: 'setInviteMembersDialogOpen'
    }),
    ...mapActions('users', {
      editCompanyRole: 'editCompanyRole'
    }),
    updateRole (role, userId) {
      this.editCompanyRole({
        companyId: this.company._id,
        role,
        userId
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .members {
    position: relative
  }
</style>
