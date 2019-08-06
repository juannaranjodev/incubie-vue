<template>
  <i-container
    small
    class="i-company-settings">
    <v-card>
      <v-form @submit.prevent="updateCompany">
        <v-card-text>
          <v-layout wrap>
            <v-flex xs12>
              <div class="i-company-settings__logo">
                <i-company-icon
                  :company="mutableCompany"
                  :size="155"/>
                <v-btn
                  color="accent"
                  small
                  fab
                  class="i-company-settings__logo-edit"
                  @click.prevent="chooseAvatar">
                  <v-icon>edit</v-icon>
                </v-btn>
                <input
                  ref="avatarFileInput"
                  type="file"
                  class="i-company-settings__logo-input"
                  @change="handleAvatarFile">
              </div>
              <!-- <div class="i-company-settings__logo">
                <i-file-uploader>
                  <v-btn
                    slot="trigger"
                    color="accent"
                    small
                    fab
                    @click.prevent="chooseAvatar"
                    class="i-company-settings__logo-edit">
                    <v-icon>edit</v-icon>
                  </v-btn>
                </i-file-uploader>

                <i-company-icon
                  :company="mutableCompany"
                  :size="155"/>
              </div> -->
            </v-flex>
            <!-- ruby test -->
            <v-flex xs12>
              <v-text-field
                label="Name"
                v-model="mutableCompany.name"
                color="accent"/>
            </v-flex>
            <v-flex xs12 v-if="isAdmin(loggedInUser, company._id)">
              <v-text-field
                label="Slack Token"
                v-model="token"
                placeholder="xxxx-xxxxxx-xxxx"
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
</template>

<script>
// ruby test added import
import { mapGetters, mapActions, mapMutations} from 'vuex'
import { get } from 'lodash'

export default {
  name: 'CompanyHome',
  components: {},
  props: {},
  data () {
    return {
      isUpdatePending: false,
      mutableCompany: null, // ruby test
      token: null,
    }
  },
  computed: {
    ...mapGetters('users', {
      users: 'list'
    }),
    ...mapGetters('users', {
      isAdmin: 'isAdmin'
    }),
    ...mapGetters('companies', {
      company: 'current'
    }),
    breakpoint () {
      return this.$vuetify.breakpoint.xsOnly
    },
    ...mapGetters("auth", ["loggedInUser"]), // ruby test
  },
  watch: {
    company: {
      immediate: true,
      handler (company) {
        this.mutableCompany = {
          name: company.name,
          logo: company.logo,
        }
      }
    }
  },
  created () {},
  methods: {
    // ruby test <
    ...mapMutations("snackbar", {
      showSnackbar: "show"
    }),
    ...mapActions('companies', {
      patchCompany: 'patch'
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

          this.mutableCompany.logo = data
        }
      }
    },

    async updateCompany () {
      console.log('ruby: update company')
      this.isUpdatePending = true
      console.log(this.loggedInUser);
      if(!this.isAdmin(this.loggedInUser, this.company._id)) {
        console.log("ruby: you are not an admin");
        this.showSnackbar({ message: 'You have no permission.', color: 'error' });
        return;
      }
      if (this.mutableCompany.logo !== this.company.logo) {
        const uploadRes = await this.$dispatchAction({
          type: this.$actionTypes.UPLOAD_IMAGES,
          payload: {
            uri: this.mutableCompany.logo,
            bucket: `${this.company._id}/companies/${this.company._id}`,
            thumb: false
          },
          entity: this.company._id
        })

        this.mutableCompany.logo = get(uploadRes, 'data.url')
       }

       await this.patchCompany([this.company._id, this.mutableCompany])
       if(this.token != ''){
         await this.$dispatchAction({
         type: this.$actionTypes.UPDATE_SLACK_TOKEN,
         payload: {
           token: this.token,
           company: this.company._id,
         },
         entity: this.company._id
       })

       }
       
      this.isUpdatePending = false
      this.showSnackbar({ message: 'Company data updated' })
    }
    // ruby test >
  }
}
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/settings/_variables"
  @import "~@/assets/stylus/settings/_colors"

  .i-company-settings {

    &__logo {
      display: inline-flex
      margin: $spacers.two.y 0 $spacers.four.y 0
      position: relative

      &:before {
        color: $grey.darken-1
        content: 'Logo'
        font-size: 12px
        left: 0
        position: absolute
        top: -8px
      }
      &-input {
        display: none
      }
    }
  }
</style>
