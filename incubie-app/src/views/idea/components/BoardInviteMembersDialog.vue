<template>
  <v-dialog
    :value="isOpen"
    width="375"
    lazy
    scrollable
    @input="setOpen">
    <v-card>
      <v-card-title class="headline">
        Invite Collaborators
      </v-card-title>
      <v-card-text>
        <p class="caption">Invite Existing or New Members via Email </p>
        <v-text-field v-if="showShareLink"
          ref="shareLink"
          readonly
          append-icon="file_copy"
          @click:append="copyShareLink"
          outline
          v-model="linkUrl"
          :rules="[$rules.required(), $rules.maxLength(220)]"
           color="accent" label="Share Link"
          required >
        </v-text-field>
        <v-combobox
          outline
          hide-selected: true
          v-model="select"

          label="Collaborators"
          multiple
          color="primary"
          chips>
          <template
            slot="selection"
            slot-scope="data">
            <v-chip
              :selected="data.selected"
              :disabled="data.disabled"
              :key="JSON.stringify(data.item)"
              close
              class="v-chip--select-multi"
              @input="data.parent.selectItem(data.item)">
              <v-avatar
                class="accent white--text"
                v-text="data.item.slice(0, 2).toUpperCase()"></v-avatar>
              {{ data.item }}
            </v-chip>
          </template>
        </v-combobox>
      </v-card-text>
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
import { get } from "lodash";
import globalConstant from '../../../globalConstant.js';

export default {
  name: 'BoardInviteMembersDialog',
  components: {},
  props: {
    showShareLink: {type:Boolean, default: true}
  },
  data () {
    return {
      select: [],
      linkUrl: '', // ruby test
    }
  },
   computed: {
    ...mapState('auth', ['actionTypes', 'roleTypes']),
    ...mapState('actions', ['isActionPending']),
    ...mapState('ui', {
      isOpen: 'isInviteToBoardDialogOpen'
    }),
    ...mapGetters('auth', ['roles', 'loggedInUser']),
    ...mapGetters('companies', {
      company: 'current'
    }),
    ...mapGetters("boards", {
      currentBoard: "current",
      boards: "list",
      shareLink: "shareLink", // ruby test
    }),
    ...mapGetters("ideas", {
      idea: "current",
    }),
    invitations () {
      return this.select.filter(row => {
        return row
      }).map(row => {
        return {
          email: row,
          role: 'member',
          company: this.company._id,
          board: this.currentBoard._id,
          invitedBy: this.loggedInUser._id
        }
      })
    },
  },
  watch: {
    isOpen(val){
      if(val){
        console.log("ruby: BoardInviteMemebersDialog opened , ", this.$route.path);
        console.log("ruby: this.idea", this.idea);
        let boardId = null;
        if(!this.currentBoard){
          boardId = this.idea.board;
        }else{
          boardId = this.currentBoard._id;
        }
        this.linkUrl = globalConstant.BaseUrl + "invitation/" + this.company._id + '_FAI35_' + this.loggedInUser._id + '_FAI35_' + boardId + '_FAI35_' + this.company.name.split(' ').join('_');
      }
    },
  },
  mounted() {
    //this.linkUrl = "http://incubie.com/b/";//+ this.currentBoard.slug;
    console.log("ruby: test,mounted board", this.currentBoard);
    console.log("ruby: test, idea", this.idea);
    let boardId = null;
    if(!this.currentBoard){
      boardId = this.idea.board;
    }else{
      boardId = this.currentBoard._id;
    }

    this.linkUrl = globalConstant.BaseUrl + "invitation/" + this.company._id + '_FAI35_' + this.loggedInUser._id + '_FAI35_' + boardId + '_FAI35_' + this.company.name.split(' ').join('_');
  },
 
  methods: {
    ...mapMutations('ui', {
      setOpen: 'setInviteToBoardDialogOpen'
    }),
    ...mapActions('invitations', {
      createInvitations: 'create'
    }),
    ...mapActions('companyManagement', ['inviteMembers']),
    async submit () {
      await this.$dispatchAction({
        type: this.$actionTypes.INVITE_COMPANY_MEMBERS,
        entity: this.company._id,
        payload: this.invitations
      })
      await this.$dispatchAction({
        type: this.$actionTypes.INVITE_BOARD_MEMBERS,
        entity: this.company._id,
        payload: this.invitations
      })

      this.setOpen(false)
    },

    // check if or not email
    validateEmail(email) {
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    },
    copyShareLink() {
      console.log("ruby: copyShareLink clicked", this.$refs.shareLink);

      let text = this.linkUrl;

      var textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }

      document.body.removeChild(textArea);
    },
  },
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
