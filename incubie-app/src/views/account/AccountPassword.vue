<template>
  <i-container
    small
    class="i-account">
    <v-card class="mb-5">
      <v-form @submit.prevent="updatePassword">
        <v-card-text>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                v-model="oldPassword"
                label="Old Password"
                color="accent"
                :rules="[$rules.required()]"
                type="password"/>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="newPassword"
                label="New Password"
                color="accent"
                :rules="[$rules.required()]"
                type="password"/>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="confirmPassword"
                label="Confirm Password"
                color="accent"
                :rules="[$rules.required()]"
                type="password"/>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions
          class="justify-end">
          <v-btn
            :loading="isUpdatePending"
            type="submit"
            color="accent"
            flat>
            Change
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </i-container>
</template>

<script>
// ruby test import
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { get } from 'lodash'
import bcrypt from 'bcryptjs'

export default {
  name: 'AccountPassword',
  components: {},
  props: {},
  data () {
    return {
      isUpdatePending: false,
      // ruby test <
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      mutableUser: null,
      // ruby test >
    }
  },
  computed: {
    ...mapGetters('auth', ['loggedInUser']),
    ...mapGetters('companies', {
      company: 'current'
    }),
  },

  // ruby test <
  watch: {
    loggedInUser: {
      immediate: true,
      handler (user) {
        this.mutableUser = {
          password: user.password,
        }
      }
    }
  },
  // ruby test >
  created () {},
  methods: {
    // ruby test <
    ...mapActions('users', {
      patchUser: 'patch'
    }),
    ...mapMutations('snackbar', {
      showSnackbar: 'show'
    }),

    async updatePassword () {
      console.log('ruby: update password : ', this.oldPassword);
      let compareRes = bcrypt.compareSync(this.oldPassword, this.loggedInUser.password);
      console.log('ruby: **** ', compareRes);
      this.isUpdatePending = true;

      console.log("new = ",this.newPassword, " , " , this.confirmPassword);
      if(this.confirmPassword != this.newPassword ||  !compareRes) {
        this.showSnackbar({ color:'error', message: 'Password is incorrect.' });
        this.isUpdatePending = false;
        return;
      }

      this.mutableUser.password = this.newPassword
      await this.patchUser([this.loggedInUser._id, this.mutableUser])

      this.isUpdatePending = false;
      this.showSnackbar({ color:'success', message: 'Password updated' })
    }
    // ruby test >
  }
}
</script>
