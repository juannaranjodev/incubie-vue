<template>
  <div>
    <board-create-dialog/>
    <board-slack-settings />
    <v-flex
      xs12
      sm8
      lg6>
      <v-container
        class="fluid grid-list-md">
        <v-layout
          column
          fill-height>
          <v-flex>
            <v-card class="px-4 pt-4">
              <i-media>
                <button
                  v-if="!board.image"
                  slot="figure"
                  class="board__settings__upload-image">
                  <h2 class="headline">Upload Image</h2>
                </button>
                <i-board-icon
                  v-else
                  slot="figure"
                  :board="board"
                  :size="154"/>
                <h1 class="heading">{{ board.name }}</h1>
                <div>
                  Created by
                  {{ board.owner.firstName }}
                  {{ board.owner.lastName }}
                </div>
                <div>
                  {{ board.description }}
                </div>
              </i-media>
              <v-list-tile>
                <v-layout justify-end>
                  <v-btn flat icon @click="boardUpdate">
                    <v-icon>edit</v-icon>
                  </v-btn>
                </v-layout>

                
              </v-list-tile>
            </v-card>
            <!-- ruby test start -->
            <div class="my-4">
              <v-card  v-if="currentBoard &&isAdmin(loggedInUser, currentBoard._id)">
                <!-- <v-list-tile>
                  <v-switch
                    color="indigo"
                    label="Hide internal posts from guests"
                    v-model="hideFromGuest"
                    @change="changeHideFromGuest"></v-switch>
                </v-list-tile> -->
                <v-list-tile>
                  <v-switch
                    color="indigo"
                    label="Hide vote count"
                    v-model="currentBoard.hideVote"
                    @change="changeHideVote">
                  </v-switch>
                </v-list-tile>
              </v-card>
            </div>
            <!-- ruby test end -->
            <v-list subheader>
              <v-subheader>Integrations</v-subheader>
              <template
                v-for="item in items">
                <v-list-tile
                  :key="item.title"
                  avatar>
                  <v-list-tile-avatar>
                    <img :src="item.avatar">
                  </v-list-tile-avatar>

                  <v-list-tile-content v-if="checkBoardAdmin">
                    <v-list-tile-title>
                      <b>{{item.title}}</b> {{ item.active && currentBoard && currentBoard.slackBoardId != '#' ?  "   Connected to Channel " + currentBoard.slackBoardId : ''}}
                    </v-list-tile-title>
                  </v-list-tile-content>

                  <v-list-tile-action v-if="checkBoardAdmin">
                    <v-list-tile>
                    <v-btn flat icon
                    :disabled="!item.active"
                      @click="editIntegration(item.title)"><v-icon>edit</v-icon>
                    </v-btn>
                    <v-switch class="pl-4"
                      color="indigo"
                      label=""
                      v-model="item.active"
                      @change="integrateTo(item)">
                    </v-switch>
                    </v-list-tile>
                  </v-list-tile-action>
                </v-list-tile>
              </template>
            </v-list>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState, mapActions } from 'vuex';
import BoardCreateDialog from './BoardCreateDialog';
import BoardSlackSettings from './BoardSlackSettings';

export default {
  name: 'BoardSettings',
  components: {
    BoardCreateDialog,
    BoardSlackSettings, // ruby test
  },
  props: {
    boardSlug: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      items: [
        { active: true, title: 'Slack', avatar: '/images/icons/slack.png' }
        // { active: true, title: 'Jira', avatar: '/images/icons/jira.png' },
        // { active: false, title: 'Trello', avatar: '/images/icons/trello.svg' }
      ],
      // ruby test added
      //hideVote: false,
      hideFromGuest: false,
    }
  },
  computed: {
    ...mapState('boards', {
      isCreateDialogOpen: 'isCreateBoardDialogOpen'
    }),
    ...mapGetters('auth', ['loggedInUser']),
    ...mapGetters('boards', {
      findBoards: 'find',
      currentBoard: 'current',
    }),
    ...mapGetters('users', {
      isAdmin: 'isAdmin'
    }),
    board () {
      return {
        name: this.currentBoard ? this.currentBoard.name : 'New Project',
        description: this.currentBoard ? this.currentBoard.description : '',
        image: this.currentBoard? this.currentBoard.image : null,
        owner: this.loggedInUser,
        hideVote: this.currentBoard ? this.currentBoard.hideVote : 0,
      }
    },
    // ruby test: check whether admin
    ...mapGetters('users', {
      isAdmin: 'isAdmin'
    }),
    checkBoardAdmin() {
      if(this.loggedInUser && this.currentBoard){
        if(this.isAdmin(this.loggedInUser, this.currentBoard._id)) {
          return true;
        }
      }
      return false;
    }
  },
  watch: {
    '$route.params.boardSlug': {
      immediate: true,
      handler (boardSlug) {
        if (!boardSlug) {
          console.log("ruby: MUST BE ERROR: setCreateBoardDialogOpen");
          this.setCreateBoardDialogOpen()
        }else {
          console.log("ruby: MUST BE ERROR - : setCreateBoardDialogOpen", boardSlug);
          this.setCurrentBoardBySlug(boardSlug);
          
        }
      }
    },
    currentBoard: {
      immediate: true,
      handler (board) {
        this.mutableBoard = {
          name: board? board.name : null,
          description: board?board.description : null,
          createdDate: board?board.createdDate : null,
          image: board?board.image : null,
        }
      }
    }
  },
  methods: {
    ...mapActions('boards', {
      setCurrentBoardBySlug: 'setCurrentBySlug'
    }),
    ...mapMutations('ui', ['setCreateBoardDialogOpen', 'setBoardSlackSettingsOpen']),
    // ruby test <
    async changeHideFromGuest() {
      console.log("ruby test Hide From Guest :", this.hideFromGuest);
    },

    async changeHideVote() {
      console.log("ruby test Hide Vote :", this.currentBoard.hideVote );
      let isadmin = this.isAdmin(this.loggedInUser, this.currentBoard._id);
      if(!isadmin) {
        console.log("ruby: not Admin");
        return;
      }
      let res = await this.$dispatchAction({
        type: this.$actionTypes.HIDE_VOTE_COUNT,
        entity: this.currentBoard._id,
        user: this.loggedInUser._id,
        payload: { 
          value: this.currentBoard.hideVote,
          board: this.currentBoard._id
        }
      });
      console.log("ruby: response ", res);
    },
    async boardUpdate() {
      console.log("ruby: board update");
      this.$router.push({ name: 'board/update', params: {boardSlug: this.currentBoard.slug}});
    },
    async integrateTo(item) {
      console.log("ruby: integrateTo clicked ", item.title);
      if(!item.active)
        return;
      switch(item.title){
        case "Slack":
          this.setBoardSlackSettingsOpen(true);
          break;
        case "Jira":
          break;
      }
    },
    async editIntegration(index) {
      console.log("ruby: editIntegration clicked ", index);
      switch(index){
        case "Slack":
          this.setBoardSlackSettingsOpen(true);
          break;
        case "Jira":
          break;
      }
    },
    
    // ruby test >
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/stylus/settings/_variables'
  @import '~@/assets/stylus/settings/_colors'

  .board__settings {

    &__upload-image {
      background-color: $grey.lighten-2
      border: 3px solid $grey.lighten-1
      border-radius: 50%
      color: $grey.darken-1
      display: block
      height: 154px
      width: 154px
    }
  }
</style>
