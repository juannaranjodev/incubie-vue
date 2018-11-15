<template>
  <div>
    <v-card :class="{ 'idea-card--closed': idea.status === $constants.ideaStatuses.closed }"
      class="idea-card">
      <div class="idea-card__header">
        <div class="idea-card__status">
          <v-select v-if="canCloseIdea(workingIdea)" v-model="workingIdea.status" :items="statusTypes"
            content-class="idea-card__status__control__content" hide-details class="idea-card__status__control"
            @input="handleStatusInput">
            <template slot="selection" slot-scope="data">
              <div class="idea-card__status__control__item idea-card__status__control__item--collapsed">
                <div :class="`idea-card__status__icon--${data.item.value}`" class="idea-card__status__icon"/>
              </div>
            </template>
            <template slot="item" slot-scope="data">
              <div class="idea-card__status__control__item">
                <div :class="`idea-card__status__icon--${data.item.value}`" class="idea-card__status__icon"/> {{ data.item.text }}
              </div>
            </template>
          </v-select>
          <div v-else class="pt-1">
            <div :class="`idea-card__status__icon idea-card__status__icon--${workingIdea.status}`"
              :title="workingIdea.status" />
          </div>
        </div>
      </div>
      <v-container pa-2>
        <v-layout>
          <div class="idea-card__vote">
            <i-vote :parent="idea._id" :kind="$constants.voteKinds.ideas" :disabled="idea.status === $constants.ideaStatuses.closed" :showDot="!isActive || checkHideVote"
              class="mr-2" />
          </div>
          <div class="idea-card__main">
            <v-layout wrap>
              <v-flex v-if="images.length" xs12 sm4 class="idea-card__images">
                <div :class="{ 'mt-3': $vuetify.breakpoint.xsOnly, 'mr-4': $vuetify.breakpoint.smAndUp }">
                  <idea-card-images v-model="idea.images" :faded="idea.status === $constants.ideaStatuses.closed"/>
                </div>
              </v-flex>

              <v-flex :sm8="images.length" xs12 class="idea-card__body">
                <h1 :title="idea.statusDescription ? 'Closed' : ''" class="idea-card__title headline">
                  {{ idea.title }}
                </h1>

                <!-- <h6 class="idea-card__heading caption">User Story</h6>
                <p>{{ idea.userStory }}</p> -->

                <div v-if="idea.description">
                  <h6 class="idea-card__heading caption">Description</h6>
                  <p>
                    <i-read-more :text="idea.description" />
                  </p>
                </div>
              </v-flex>
              <v-flex xs12 class="idea-card__footer mt-3">
                <i-user :user="getUser(idea.createdBy)" />

                <a class="u__underline-on-hover" @click="scrollToTarget('#comments', { offset: -64 })">
                  {{ idea.commentCount }}
                  <span v-if="idea.commentCount === 1">Comment</span>
                  <span v-else>Comments</span>
                </a>

                <em title="gorp">{{ idea.createdAt | formatDateFromNow }}</em>

                <v-menu v-model="isShareMenuOpen" :close-on-content-click="false" :nudge-bottom="20"
                  :nudge-right="40">
                  <a slot="activator" class="u__no-underline">
                    <span class="u__underline-on-hover">Share</span>
                    <v-icon small class="u__no-underline">
                      arrow_drop_down
                    </v-icon>
                  </a>
                  <v-card color="primary" dark class="idea-card__share-menu">
                    <v-card-title class="px-2 pt-2 pb-0">
                      <h6 class="caption">Share Link</h6>
                    </v-card-title>
                    <v-card-text class="px-2 pt-1 pb-2">
                      <input ref="shareLink" :value="shareLink" type="text" readonly class="mr-2">
                      <a title="Copy share link" @click="copyShareLink">
                        <v-icon :size="24">
                          file_copy
                        </v-icon>
                      </a>
                    </v-card-text>
                  </v-card>
                </v-menu>

                <v-card-actions>
                  <v-btn v-if="isOwner" flat small @click="$emit('edit')">
                    <v-icon :size="14" color="grey">
                      edit
                    </v-icon>
                    <span>Edit</span>
                  </v-btn>

                  <v-btn v-if="isOwner" flat small @click="deleteIdea">
                    <v-icon :size="14" color="grey">
                      delete
                    </v-icon>
                    <span>Delete</span>
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </div>
        </v-layout>
      </v-container>
    </v-card>

    <v-dialog v-model="isCloseIdeaDialogVisible" width="320">
      <v-form ref="closeIdeaForm" @submit.prevent="doCloseIdea">
        <v-card>
          <v-card-title class="title">Close Idea</v-card-title>
          <v-card-text>
            <v-textarea v-model="workingIdea.statusDescription" :rules="[$rules.required()]"
              outline autofocus required label="Reason" />
          </v-card-text>
          <v-card-actions class="u__justify-end">
            <v-btn flat @click="doCancelCloseIdea">
              Cancel
            </v-btn>
            <v-btn type="submit" color="accent" flat>
              Close Idea
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

    <v-dialog v-model="isCommitIdeaDialogVisible" width="320">
      <v-form @submit.prevent="doCommitIdea">
        <v-card>
          <v-card-title class="title">Commit Idea</v-card-title>
          <v-card-text>
            <v-text-field v-model="workingIdea.statusUrl" :persistent-hint="true" placeholder="http://"
              hint="Link to ticket" label="URL" autofocus outline/>
          </v-card-text>
          <v-card-actions class="u__justify-end">
            <v-btn flat @click="doCancelCommitIdea">
              Cancel
            </v-btn>
            <v-btn type="submit" color="accent" flat>
              Commit Idea
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import IdeaCardImages from "./IdeaCardImages";
import { scrollToTarget } from "@/lib/mixins";
import { cloneDeep } from "lodash";

export default {
  name: "IdeaCard",
  components: {
    IdeaCardImages
  },
  mixins: [scrollToTarget],
  props: {
    idea: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      hasVoted: false,
      workingIdea: {},
      isShareMenuOpen: false,
      isCloseIdeaDialogVisible: false,
      isCommitIdeaDialogVisible: false,
      closeIdeaReason: null
    };
  },
  computed: {
    ...mapState("votes", ["isVotePending"]),
    ...mapGetters("auth", ["loggedInUser"]),
    ...mapGetters("users", {
      getUser: "get"
    }),
    ...mapGetters("permissions", ["canCloseIdea"]),
    ...mapGetters("ideas", {
      statusTypes: "statusTypes",
      shareLink: "shareLink"
    }),
    ...mapGetters("votes", {
      hasUserVoted: "hasVoted"
    }),
    // ruby test <
    ...mapGetters('boards', {
      board: 'current',
      getBoard: 'get'
    }),
    // ruby test >
    images() {
      return this.idea.images;
    },

    isOwner() {
      return this.loggedInUser._id === this.idea.createdBy;
    },
    ideaVote() {
      return {
        parent: this.idea._id,
        kind: this.$constants.voteKinds.ideas,
        owner: this.idea.createdBy,
        voter: this.loggedInUser._id
      };
    },
        // ruby test <
    isActive ()
    {
      if(this.idea.check != -2)
        return true;
      return false;
    },
    // ruby test <
    checkHideVote () {
      if(this.board){
        return this.board.hideVote == 1;
      }else {
        let board = this.getBoard(this.idea.board);
        return board.hideVote == 1;
      }
      
      
    },
    // ruby test >
  },
  watch: {
    idea: {
      immediate: true,
      handler(idea) {
        this.workingIdea = cloneDeep(idea);
      }
    }
  },
  created() {
    this.hasVoted = this.hasUserVoted(this.loggedInUser._id, this.idea);
  },
  // ruby test <
  mounted() {
    console.log("ruby: IDEA CARD = ",this.$route);
    if(this.$route.params.comment == 'xxx'){
      this.setIdeaCommentDialogOpen(true);
    }
  },
  // ruby test >
  methods: {
    ...mapActions("ideas", {
      patchIdea: "patch"
    }),
    ...mapActions("votes", {
      vote: "create",
      unvote: "remove"
    }),
    ...mapMutations("snackbar", {
      showSnackbar: "show"
    }),
    // ruby test <
    ...mapMutations("ui", {
      setIdeaCommentDialogOpen: "setIdeaCommentDialogOpen"
    }),
    // ruby test >
    async deleteIdea() {
      let res = await this.$confirm("Are you sure you want to delete this idea?", { title: "Delete Idea?" });
      if (res) {
        await this.idea.remove();
        this.$router.go(-1);
        // ruby test <
        let newUser = this.loggedInUser;
        newUser.ideasCount = this.loggedInUser.ideasCount - 1;
        // ruby test >
      }
    },
    async doVote() {
      if (this.hasVoted) {
        await this.unvote(this.ideaVote);
        this.hasVoted = false;
      } else {
        await this.vote(this.ideaVote);
        this.hasVoted = true;
      }
    },
    async handleStatusInput(status) {
      if (status === this.$constants.ideaStatuses.committed) {
        this.isCommitIdeaDialogVisible = true;
      } else if (status === this.$constants.ideaStatuses.closed) {
        this.isCloseIdeaDialogVisible = true;
      } else {
        await this.patchIdea([
          this.idea._id,
          {
            status,
            statusDescription: null,
            statusUrl: null
          }
        ]);

        this.showSnackbar({ color: "info", message: "Idea status changed." });
      }
    },
    copyShareLink() {
      this.$refs.shareLink.select();
      document.execCommand("copy");
    },
    async doCloseIdea() {
      const form = this.$refs.closeIdeaForm;

      if (form.validate()) {
        await this.patchIdea([
          this.idea._id,
          {
            status: this.workingIdea.status,
            statusDescription: this.workingIdea.statusDescription,
            statusUrl: null
          }
        ]);

        this.isCloseIdeaDialogVisible = false;
        this.showSnackbar({ color: "info", message: "Idea closed." });
      }
    },
    doCancelCloseIdea() {
      this.workingIdea.status = this.idea.status;
      this.workingIdea.statusDescription = null;
      this.isCloseIdeaDialogVisible = false;
    },
    async doCommitIdea() {
      await this.workingIdea.save();
      // await this.patchIdea([
      //   this.idea._id,
      //   {
      //     status: this.currentStatus,
      //     statusUrl: this.workingIdea.statusUrl,
      //     statusDescription: null
      //   }
      // ]);

      this.isCommitIdeaDialogVisible = false;
      this.showSnackbar({ color: "info", message: "Idea committed." });
    },
    doCancelCommitIdea() {
      this.currentStatus = this.idea.status;
      this.workingIdea.status = this.idea.status;
      this.workingIdea.statusUrl = null;
      this.isCommitIdeaDialogVisible = false;
    },
    
  },
};
</script>

<style lang="stylus">
@import '~@/assets/stylus/settings/_variables.styl';
@import '~@/assets/stylus/settings/_colors.styl';

.idea-card {
  &__header {
    display: flex;
  }

  &__status {
    position: absolute;
    right: $spacers.one.x;
    top: $spacers.one.y;

    &__icon {
      border-radius: 50%;
      display: block;
      height: 12px;
      margin-right: $spacers.two.x;
      transform: translateY(-1px);
      width: 12px;

      &--committed {
        background-color: $theme.committed;
      }

      &--proposed {
        background-color: $theme.proposed;
      }

      &--closed {
        background-color: $theme.closed;
      }
    }

    &__control {
      background: white;
      margin: 0;
      padding: 0;
      width: 44px;
      background-color: white;
      border-radius: 2px;
      border: 1px solid #757575;

      &__content {
        border-radius: 0;
        transform: translateY(14px);

        .v-card {
          border-radius: 0;
        }

        .v-list {
          background: #d8d8d8;
          padding: 0;

          > div:not(:last-child) {
            border-bottom: 1px solid #979797;
          }

          &__tile {
            font-size: 13px;
            height: 24px;
            padding: 0 $spacers.two.x;
          }
        }
      }

      &__item {
        align-items: center;
        display: flex;

        &--collapsed {
          padding: 0 0 0 5px;

          .idea-card__status__icon {
            margin-right: 0;
          }
        }
      }
    }
  }

  &__container {
  }

  &__images {
    @media $display-breakpoints.xs-only {
      order: 3;
    }
  }

  &__body {
    @media $display-breakpoints.xs-only {
      order: 1;
    }
  }

  &__title {
    margin-bottom: $spacers.two.y;
    margin-right: 44px;
    word-wrap: break-word;
  }

  &__heading {
    color: #979797;
    font-weight: bold;
    margin-bottom: $spacers.one.y;
  }

  &__footer {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @media $display-breakpoints.xs-only {
      order: 2;
    }
  }

  &__share-menu {
    input {
      background: #f8f8f8;
      color: #4a4a4a;
      font-size: 11px;
      padding: $spacers.one.y (((((((((((((((((((($spacers.two.x))))))))))))))))))));
    }
  }

  &--closed {
    .idea-card {
      &__body, &__footer {
        color: $grey.lighten-1;

        a {
          color: $grey.lighten-1;
        }
      }
    }
  }
}
</style>
