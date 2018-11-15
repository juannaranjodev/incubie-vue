<template>
  <div>
    <i-container
      small
      class="i-account">
      <v-card class="mb-5">
        <v-form @submit.prevent="updateProfile">
          <v-card-text>
            <v-layout wrap>
              <v-flex xs12>
                <div class="i-account__avatar">
                  <i-user-icon
                    :user="mutableUser"
                    :size="155"/>
                  <v-btn
                    color="accent"
                    small
                    fab
                    class="i-account__avatar-edit"
                    @click.prevent="chooseAvatar">
                    <v-icon>edit</v-icon>
                  </v-btn>

                  <input
                    ref="avatarFileInput"
                    type="file"
                    class="i-account__avatar-input"
                    @change="handleAvatarFile">
                </div>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  v-model="fullName"
                  label="Name"
                  color="accent"/>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="mutableUser.email"
                  label="Email"
                  color="accent"/>
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
              Update
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </i-container>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { get } from 'lodash'

export default {
  name: 'AccountProfile',
  components: {},
  props: {},
  data () {
    return {
      tmpAvatar: null,
      mutableUser: null,
      isUpdatePending: false
    }
  },
  computed: {
    ...mapGetters('auth', ['loggedInUser']),
    ...mapGetters('companies', {
      company: 'current'
    }),
    avatar () {
      return this.tmpAvatar || this.loggedInUser.avatar
    }
  },
  watch: {
    loggedInUser: {
      immediate: true,
      handler (user) {
        this.mutableUser = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          avatar: user.avatar
        }

        this.fullName = `${this.loggedInUser.firstName} ${this.loggedInUser.lastName}`
      }
    }
  },
  created () {},
  methods: {
    ...mapActions('users', {
      patchUser: 'patch'
    }),
    ...mapMutations('snackbar', {
      showSnackbar: 'show'
    }),
    chooseAvatar () {
      this.$refs.avatarFileInput.click()
    },
    async handleAvatarFile (e) {
      const file = get(e, 'currentTarget.files[0]')

      if (file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = async e => {
          const data = e.target.result

          this.mutableUser.avatar = data
        }
      }
    },
    async updateProfile () {
      this.isUpdatePending = true

      if (this.mutableUser.avatar !== this.loggedInUser.avatar) {
        const uploadRes = await this.$dispatchAction({
          type: this.$actionTypes.UPLOAD_IMAGES,
          payload: {
            uri: this.mutableUser.avatar,
            bucket: `${this.company._id}/accounts/${this.loggedInUser._id}`,
            thumb: false
          },
          entity: this.company._id
        })

        this.mutableUser.avatar = get(uploadRes, 'data.url')
      }

      const nameParts = this.fullName.split(' ')
      this.mutableUser.firstName = nameParts[0]
      this.mutableUser.lastName = nameParts[1]

      await this.patchUser([this.loggedInUser._id, this.mutableUser])

      this.isUpdatePending = false
      this.showSnackbar({ message: 'Profile updated' })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/settings/_variables"
  @import "~@/assets/stylus/settings/_colors"

  .i-account {

    &__avatar {
      display: inline-flex
      margin: $spacers.two.y 0 $spacers.four.y 0
      position: relative

      &:before {
        color: $grey.darken-1
        content: 'Avatar'
        font-size: 12px
        left: 0
        position: absolute
        top: -8px
      }

      &-edit {
        position: absolute
        right: 0
        top: 0
        transform: translate(25%, -25%)
      }

      &-input {
        display: none
      }
    }
  }
</style>
