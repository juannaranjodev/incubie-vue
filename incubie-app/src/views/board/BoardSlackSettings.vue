<template>
  <v-dialog
    :value="isOpen"
    width="440"
    lazy
    @input="setOpen">
    <v-form
      ref="slackSettingForm"
      @submit.prevent="saveSettings">
      <v-card>
        <v-card-title primary-title>
          <h3 class="title">Slack Integration</h3>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-if="checkCompanyAdmin"
            label="ApiToken"
            v-model="apiToken"
            placeholder="xxxx-xxxxx-xxxxx-xxxxxxxx"
            outline/>
          <p v-else>{{company && company.slackIntegration ? '' : 'Your Company Admin has not setup Slack yet'}}</p>
          <v-text-field
            label="Channel"
            v-model="slackChannel"
            placeholder="#incubie"
            outline/>
            <h3>Post to Slack When</h3>
            <v-list-tile>
              <v-checkbox color="indigo" label="New Idea is Posted" v-model="checkbox1"></v-checkbox>
            </v-list-tile>
            <v-list-tile>
              <v-checkbox color="indigo" label="New Comment is Added" v-model="checkbox2"></v-checkbox>
            </v-list-tile>
            <v-list-tile>
              <v-checkbox color="indigo" label="Idea Changes State" v-model="checkbox3"></v-checkbox>
            </v-list-tile>
            <v-list-tile>
              <v-checkbox color="indigo" label="When a New Member Joins" v-model="checkbox4"></v-checkbox>
          </v-list-tile>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            color="primary"
            flat
            @click.stop="close">Cancel
          </v-btn>
          <v-btn
            type="submit"
            color="accent"
            :loading="isUpdatePending"
            flat>Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import changeCase from 'change-case'
import { get } from 'lodash'

export default {
  name: 'BoardSlackSettings',
  data () {
    return {
      isUpdatePending: false,
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      checkbox4: false,
      slackChannel: null,
      apiToken: null,
    }
  },
  // ruby test >
  computed: {
    ...mapState('ui', {
      isOpen: 'isBoardSlackSettingsOpen'
    }),
    ...mapGetters('auth', ['loggedInUser']),
    ...mapGetters('companies', {
      company: 'current'
    }),
    ...mapGetters('boards', {
      currentBoard: 'current'
    }),
    ...mapGetters('users', {
      isAdmin: 'isAdmin'
    }),
    checkCompanyAdmin() {
      if(this.currentBoard && this.loggedInUser) {
        if(this.isAdmin(this.loggedInUser, this.currentBoard.company)) {
          console.log("ruby: user ", this.loggedInUser, " company", this.currentBoard.company);
          return true;
        }
      }
      return false;
    }
  },
  watch: {
    isOpen(val) {
      if (val) {
        console.log("ruby: test : BoardSlackSetting Dialog opened");
        if(this.currentBoard) {
          this.slackChannel = this.currentBoard.slackBoardId;
          this.checkbox1 = this.currentBoard.messageOnIdeaCreation;
          this.checkbox2 = this.currentBoard.messageOnCommentCreation;
          this.checkbox3 = this.currentBoard.messageOnIdeaStatusChanged;
          this.checkbox4 = this.currentBoard.messageOnJoinBoard;
        }
      }
    },
  },
     // ruby test <
  mounted () {
  },
  methods: {
    ...mapMutations('ui', {
      setOpen: 'setBoardSlackSettingsOpen',
    }),
    ...mapActions('boards', {
      patchBoard: 'patch'
    }),
    close () {
      this.setOpen(false)
      //this.$router.push({ name: 'feed/main' })
    },
    async saveSettings () {
      this.isUpdatePending = true;
      await this.patchBoard([
        this.currentBoard._id,
        {
          slackBoardId: this.slackChannel,
          messageOnIdeaCreation: this.checkbox1,
          messageOnCommentCreation: this.checkbox2,
          messageOnIdeaStatusChanged: this.checkbox3,
          messageOnJoinBoard: this.checkbox4,
        }
      ]);

      if(this.checkCompanyAdmin) {
        if(this.apiToken && this.apiToken != '') {
          console.log("ruby: test API TOKEN", this.apiToken);
          await this.$dispatchAction({
            type: this.$actionTypes.UPDATE_SLACK_TOKEN,
            payload: {
              token: this.apiToken,
              company: this.currentBoard.company,
            },
            entity: this.currentBoard.company
          })
        }
      }
      this.setOpen(false);
      this.isUpdatePending = false;
    },
  }
}
</script>
<style lang="css" scoped>
.theme--light .v-label, .application .theme--light.v-label {
  color:black!important;
}
</style>