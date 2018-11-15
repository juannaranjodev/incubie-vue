<template>
  <div>
    <v-toolbar v-if="['settings'].indexOf($route.name) > -1" dark class="toolbar hidden-xs-only"
      color="secondary lighten-1" flat>
      <v-toolbar-title class="subheading">
        {{ board.name }}
      </v-toolbar-title>
    </v-toolbar>
    <v-toolbar v-if="checkShow" dark color="secondary lighten-1" class="toolbar" flat>
      <v-toolbar-title v-if="board" class="title hidden-xs-only">
        {{ board.name }}
      </v-toolbar-title>
      <v-radio-group v-model="feedSortBy" row hide-details class="u__sort-by-group">
        <v-divider class="mx-3" vertical/>
        <v-layout justify-end row>
          <v-radio v-for="sortByType in sortByOptions" :key="sortByType.value" :label="sortByType.label"
            :value="sortByType.value" @change="handleSortChange" />
        </v-layout>
      </v-radio-group>
      <v-divider class="mx-3" vertical/>
      <v-btn flat icon @click="setInviteToBoardDialogOpen(true)">
        <v-tooltip bottom>
          <v-icon slot="activator">group_add</v-icon>
          <span>Add Collaborators</span>
        </v-tooltip>
      </v-btn>
      <v-btn flat icon @click="toggleInfoDrawer">
        <v-tooltip bottom>
          <v-icon slot="activator">info</v-icon>
          <span>Board Information</span>
        </v-tooltip>
      </v-btn>
      <!-- ruby test start -->
      <v-menu v-model="isShareMenuOpen" :close-on-content-click="false">
        <v-tooltip bottom slot="activator">
          <span>Share</span>
          <v-btn flat icon slot="activator">
            <v-icon>share</v-icon>
          </v-btn>
        </v-tooltip>
        <v-card>
          <v-card-title class="px-2 pt-2 pb-0">
            <h6 class="caption">Share Link</h6>
          </v-card-title>
          <v-card-text class="px-2 pt-1 pb-2">
            <input ref="shareLink" v-model="linkUrl" type="text" class="mr-2" readonly>
            <a title="Copy share link" @click="copyShareLink">
              <v-icon :size="24">
                file_copy
              </v-icon>
            </a>
          </v-card-text>
        </v-card>
      </v-menu>
      <!-- ruby test end -->
      <!-- <v-btn flat icon @click="setInviteToBoardDialogOpen(true)">
        <v-tooltip bottom>
          <v-icon slot="activator">share</v-icon>
          <span>Share</span>
        </v-tooltip>
      </v-btn> -->
      <v-btn append to="settings" flat icon
        v-if="checkBoardCreator">
        <v-tooltip bottom>
          <v-icon slot="activator">settings</v-icon>
          <span>Board Settings</span>
        </v-tooltip>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import BoardInviteMembersDialog from '@/views/idea/components/BoardInviteMembersDialog';
import globalConstant from '../../globalConstant.js';

export default {
  name: "BoardToolbar",
  components: {
    BoardInviteMembersDialog,
  },
  props: {},
  data() {
    return {
      isShareMenuOpen: false, // ruby test below
      linkUrl: globalConstant.BaseUrl + 'invitation/'
    };
  },
  computed: {
    ...mapState("ui", ["sortIdeasBy", "isBoardInfoDrawerOpen"]),
    ...mapGetters("ui", ["sortByOptions"]),
    ...mapGetters('auth', ['roles', 'loggedInUser']), // ruby teset
    ...mapGetters("boards", {
      board: "current"
    }),
    ...mapGetters('companies', {
      company: 'current'
    }),
    feedSortBy: {
      get() {
        return this.sortIdeasBy;
      },
      set(v) {
        this.setSortIdeasBy(v);
      }
    },

    iconSize() {
      return this.$vuetify.breakpoint.xsOnly ? 24 : 32;
    },
    // ruby test <
    checkShow() {
      switch(this.$route.name){
        case 'board/settings':
        case 'board/update':
          return false;
      }
      return true;
    },
    checkBoardCreator() {
      if(this.board && this.loggedInUser){
        if(this.board.createdBy == this.loggedInUser._id) {
          return true;
        }
      }
      return false;
    }
    // ruby test >
  },
  watch: {
    isShareMenuOpen(val){
      if(val){    
        this.linkUrl = globalConstant.BaseUrl + "invitation/" + this.company._id + '_FAI35_' + this.loggedInUser._id + '_FAI35_' + this.board._id + '_FAI35_' + this.company.name.split(' ').join('_');
      }
    }
  },
  created() {},
  methods: {
    ...mapMutations("ui", ["setInviteToBoardDialogOpen"]), // ruby test
    ...mapMutations("ui", ["setSortIdeasBy", "setBoardInfoDrawerOpen"]),
    ...mapActions("boards", {
      loadBoard: "load"
    }),
    ...mapActions("ideas", {
      findIdeasBySort: "findBySort"
    }),

    async handleSortChange() {
      this.$nextTick(async () => {
        await this.findIdeasBySort({ board: this.board._id });
      });
    },
    toggleInfoDrawer() {
      this.isBoardInfoDrawerOpen ? this.setBoardInfoDrawerOpen(false) : this.setBoardInfoDrawerOpen(true);
    },
    // ruby test <
    copyShareLink() {
      console.log("ruby: BoardToolbar / copyShareLink");
      this.linkUrl = globalConstant.BaseUrl +"invitation/" + this.company._id + '_FAI35_' + this.loggedInUser._id + '_FAI35_' + this.board._id + '_FAI35_' + this.company.name.split(' ').join('_');
      this.$refs.shareLink.select();
      document.execCommand("copy");
    }
    // ruby test >
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/settings/_variables';
@import '~@/assets/stylus/settings/_colors';
</style>
