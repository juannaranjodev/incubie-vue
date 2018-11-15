<template>
  <div v-if="board" class="board u__fill-height">
    <idea-create-dialog :board="boardId" />
    <board-invite-members-dialog v-bind:showShareLink="false"/>
    <board-join-sheet v-model="preview" />

        <v-btn :to="{name: 'board/main', params: {createIdea: 'create'}}"
          :class="{'btn__fab--pushed': preview, 'pulse-animation': !ideasList.length && !isCreateIdeaDialogOpen }"
          color="primary" dark fab large fixed bottom right>
            <v-icon>lightbulb_outline</v-icon>
        </v-btn>

        <i-container v-if="!ideasList.length && !isFindIdeasPending" fluid>
            <v-layout fill-height align-center>
                <div class="u__empty-message">
                    <h1 :class="{ 'headline': breakpoint, 'display-1': !breakpoint }" class="mb-4">
                        There's nothing here yet
                    </h1>

                    <p :class="{ 'subheading': breakpoint, 'headline': !breakpoint }">
                        Post the first ground-breaking idea now!
                    </p>
                </div>
            </v-layout>
        </i-container>

        <div class="board__main">
            <v-container fluid class="u__main-container">
                <v-layout wrap>
                    <v-flex xs12>
                        <idea-list v-if="ideasList.length" :ideas="ideasList" />
                    </v-flex>
                </v-layout>
            </v-container>
        </div>

        <transition appear name="slide-in-from-right">
            <board-info-drawer v-if="showInfoDrawer && $vuetify.breakpoint.smAndDown"
              class="board__info board__info--absolute"
              v-model="showInfoDrawer"
              :board="board"
              :width="368" />

            <board-info-drawer v-if="showInfoDrawer && $vuetify.breakpoint.mdAndUp"
              class="board__info"
              v-sticky="{ offset: '64' }"
              v-model="showInfoDrawer"
              :board="board"
              :width="368" />
        </transition>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import BoardInfoDrawer from "./components/BoardInfoDrawer";
import IdeaList from "@/views/idea/components/IdeaList";
import IdeaCreateDialog from "@/views/idea/components/IdeaCreateDialog";
import BoardJoinSheet from "./BoardJoinSheet";
import { get } from "lodash";
import store from "@/store";
import BoardInviteMembersDialog from '@/views/idea/components/BoardInviteMembersDialog';

export default {
  name: "BoardMain",
  components: {
    BoardInfoDrawer,
    IdeaCreateDialog,
    IdeaList,
    BoardJoinSheet,
    BoardInviteMembersDialog,
  },
  props: {
    createIdea: {
      type: String,
      required: false,
      default: ""
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("auth", ["actionTypes"]),
    ...mapState("ui", ["isMenuMini", "isCreateIdeaDialogOpen", "isBoardInfoDrawerOpen"]),
    ...mapState("ideas", {
      isFindIdeasPending: "isFindPending"
    }),
    ...mapGetters("auth", ["loggedInUser"]),
    ...mapGetters("users", {
      getUser: "get",
      userHasCredential: "hasCredential"
    }),
    ...mapGetters("companies", {
      company: "current",
      getCompany: "get"
    }),
    ...mapGetters("boards", {
      boardId: "currentId",
      board: "current",
      boards: "list",
      boardHasUser: "hasUser"
    }),
    ...mapGetters("ideas", {
      ideas: "list"
    }),
    breakpoint() {
      return this.$vuetify.breakpoint.xsOnly;
    },
    showInfoDrawer: {
      get() {
        return this.isBoardInfoDrawerOpen;
      },
      set(v) {
        this.setBoardInfoDrawerOpen(v);
      }
    },
    preview() {
      return !this.userHasCredential(this.loggedInUser, this.boardId);
    },
    ideasList: {
      get() {
        return this.ideas.filter((idea) => {
          if(idea.board == this.boardId) {
            return true;
          }

          return false;
        });
      },
      set(list) {}
    }
  },
  watch: {
    createIdea: {
      immediate: true,
      handler(isCreate) {
        if (isCreate) {
          this.setCreateIdeaDialogOpen(true);
        } else {
          this.setCreateIdeaDialogOpen(false);
        }
      }
    },
    isCreateIdeaDialogOpen(isOpen) {
      if (!isOpen) {
        this.$router.push({ name: "board/main" });
      }
    }
  },
  created() {},
  mounted() {console.log('ruby : ***** BoardMain mounted *****');},// ruby test
  beforeRouteEnter(to, from, next) {
    // ruby test <
    console.log("ruby test: ", to.params.boardSlug);
    const id = store.getters["boards/getIdBySlug"](to.params.boardSlug);
    console.log("ruby: id,", id);
    // ruby test >
    if (id) {
      store.dispatch("boards/load", id);
      next();
    } else {
      const company = store.getters["companies/current"];
      next({ name: "board/notFound", params: { slug: company.slug } });
    }
  },
  beforeRouteUpdate(to, from, next) {
    const id = store.getters["boards/getIdBySlug"](to.params.boardSlug);
    const currentId = get(store.getters["boards/current"], "_id");

    if (currentId !== id) {
      store.dispatch("boards/load", id);
    }

    next();
  },
  beforeRouteLeave(to, from, next) {
    if (to.params.boardSlug !== from.params.boardSlug) {
      store.dispatch("boards/unload");
      next();
    } else {
      next();
    }
  },
  methods: {
    ...mapMutations("ui", ["setCreateIdeaDialogOpen", "setBoardInfoDrawerOpen", "setInviteToBoardDialogOpen"]),
    ...mapActions("boards", {
      loadBoard: "load",
      unloadBoard: "unload"
    }),
    async removeBoard() {
      try {
        const res = await this.$dispatchAction({
          type: this.$actionTypes.REMOVE_BOARD,
          entity: this.board._id
        });

        this.$router.push({ name: "board/add" });
      } catch (err) {
        // TODO: handle error
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
    .board {
        display: flex;
        flex-direction: row;

        &__main {
            flex: 1 1 auto;
        }

        &__info {
            height: calc(100vh - 64px);
            z-index: 5;

            &--absolute {
                height: 100vh;
                position: fixed;
                right: 0;
                top: 0;
                z-index: 6;
            }
        }
    }
</style>
