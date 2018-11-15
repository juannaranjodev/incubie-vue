<template>
  <i-container v-if="idea">
    <v-layout wrap>
      <idea-comment-dialog />
      <div id="parent"><board-invite-members-dialog v-bind:showShareLink="true"/></div>
      <idea-create-dialog v-model="idea" />
      <v-btn :disabled="idea.status === $constants.ideaStatuses.closed" color="primary"
        dark fab large fixed bottom right @click="newComment">
        <v-icon>add_comment</v-icon>
      </v-btn>

      <v-flex xs12>
        <v-alert :value="idea.status === $constants.ideaStatuses.closed" icon="info" color="closed">
          <strong>This idea is closed. Comments and voting have been disabled.</strong>
          <div v-if="idea.status === $constants.ideaStatuses.closed" class="mt-2">
            <strong>Reason:</strong>
            {{ idea.statusDescription }}
          </div>
        </v-alert>
      </v-flex>

      <v-flex xs12 mb-5>
        <idea-card :idea="idea" @edit="editing=true" />
      </v-flex>

      <v-flex id="comments" xs12>
        <idea-comments :comments="comments" />
      </v-flex>
    </v-layout>
  </i-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import IdeaCommentDialog from "./components/IdeaCommentDialog";
import IdeaCard from "./components/IdeaCard";
import IdeaMeta from "./components/IdeaMeta";
import IdeaComments from "./components/IdeaComments";
import IdeaCreateDialog from "@/views/idea/components/IdeaCreateDialog";
import BoardInviteMembersDialog from "./components/BoardInviteMembersDialog";// ruby test
import store from "@/store";

export default {
  name: "IdeaMain",
  components: {
    IdeaCard,
    IdeaCommentDialog,
    IdeaCreateDialog,
    IdeaComments,
    IdeaMeta,
    BoardInviteMembersDialog, // ruby test
  },
  props: {},
  data() {
    return {
      editing: false,
      comment: {}
    };
  },
  computed: {
    ...mapState("ui", {
      isOpen: "isCreateIdeaDialogOpen",
      commenting: "isIdeaCommentDialogOpen"
    }),

    ...mapState("route", {
      routeParams: "params"
    }),
    ...mapGetters("auth", ["loggedInUser"]),
    ...mapState("comments", {
      isCommentsFindPending: "isFindPending"
    }),
    ...mapGetters("companies", {
      company: "current"
    }),
    ...mapGetters("ideas", {
      idea: "current",
      statusTypes: "statusTypes"
    }),
    ...mapGetters("comments", {
      findCommentsInStore: "find",

      hasMoreComments: "hasMore"
    }),
    hash() {
      return window.location.hash;
    },
    comments() {
      return this.findCommentsInStore({
        query: {
          idea: this.$route.params.idea,
          parent: null,
          $sort: {
            createdAt: -1
          }
        }
      }).data;
    }
  },
  watch: {
    isOpen(newVal, oldVal) {
      if (!newVal) {
        this.editing = false;
      }
    },

    editing(newVal, oldVal) {
      if (newVal === true) {
        this.setCreateIdeaDialogOpen();
      }
    },
    $route() {
      this.init();
    },

    routeParams: {
      immediate: true,
      handler(params) {
        const { comment } = params;

        if (comment) {
          this.$nextTick(() => {
            const el = document.querySelector(`[name='${comment}']`);
            if (el) {
              el.scrollIntoView(false);
            }
          });
        }
      }
    }
  },
  async mounted() {
    console.log('ray : ***** IdeaMain mounted *****');
    // ray test block console.log(this);
    this.init();
    // const {Comment}
  },
  beforeRouteEnter(to, from, next) {
    const idea = to.params.idea;
    store.dispatch("ideas/load", idea);
    next();
  },
  beforeRouteUpdate(to, from, next) {
    const idea = to.params.idea;
    store.dispatch("ideas/load", idea);
    next();
  },
  beforeRouteLeave(to, from, next) {
    store.dispatch("ideas/unload");
    next();
  },
  methods: {
    ...mapMutations("ui", ["setIdeaCommentDialogOpen"]),
    ...mapMutations("ui", ["setInviteToBoardDialogOpen"]),
    ...mapMutations("ui", ["setCreateIdeaDialogOpen"]),
    ...mapMutations("comments", {
      setComment: "setCurrent",
      clearComments: "clearAll"
    }),

    ...mapActions("comments", { findComments: "find" }),
    ...mapActions("comments", {
      findNextCommentsPage: "findNextPage"
    }),
    async init() {
      await this.findComments({
        query: {
          idea: this.$route.params.idea,
          $sort: {
            createdAt: -1
          }
        }
      });
    },
    newComment() {
      const { Comment } = this.$FeathersVuex;
      this.setComment(
        new Comment({
          createdBy: this.loggedInUser._id,
          idea: this.idea._id
        })
      );
      this.setIdeaCommentDialogOpen();
    },
    async infiniteHandler($state) {
      await this.findNextCommentsPage();
      $state.loaded();

      if (!this.hasMoreComments) {
        $state.complete();
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/settings/_variables';
@import '~@/assets/stylus/settings/_colors';

.idea {
  max-width: 600px;
}
</style>
