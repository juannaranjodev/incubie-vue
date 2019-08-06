<template>
  <v-dialog :value="isOpen" max-width="525" lazy @input="setOpen">
    <v-form ref="form" class="accent" @submit.prevent="submit">
      <!-- ruby test start -->
      <v-card>
        <v-alert
          :value="!checkUpdate() && !this.blnEditing"
          class="mb-2"
          type="error">
          Idea limit reached. New ideas are only visible to you.
          <v-btn color="primary" flat @click="gotoUpgrade"><h4>UPGRADE</h4>
          </v-btn>
        </v-alert>
        <!-- ruby test end -->
        <v-card-title primary-title>
          <h3 class="title">{{blnEditing? "Edit" : "New"}} Idea</h3>
        </v-card-title>

        <v-card-text>
          <v-select v-if="!currentBoard" v-model="ideaModel.board" :items="boardsOptions" :rules="[$rules.required()]"
            :autofocus="!currentBoard" color="accent" label="Board" required />
          <v-text-field v-model="ideaModel.title" :rules="[$rules.required(), $rules.maxLength(120)]"
            :autofocus="!!currentBoard" counter="120" color="accent" label="Title"
            required />
          <!-- <v-textarea v-model="ideaModel.userStory" :rules="[$rules.maxLength(170)]" :hint="userStoryHint"
            auto-grow rows="1" counter="170" color="accent" label="User Story" required/> -->
          <v-textarea v-model="ideaModel.description" :rules="[$rules.maxLength(500)]" auto-grow
            rows="1" counter="500" color="accent" label="Description" />
          <i-image-picker v-model="ideaModel.images" :loading.sync="isImagePickerLoading" class="mt-4"/>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="primary" flat @click="canceled">Cancel
          </v-btn>
          <v-btn :loading="isActionPending || isImagePickerLoading" type="submit" color="accent"
            flat>{{blnEditing? "Save" : "Create"}}
          </v-btn>
          <!-- ruby test -->
          <p>{{loggedInUser.ideasCount}}</p>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import _ from "lodash";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { get } from "lodash";
import { voteKinds } from "@/constants";
import BoardInviteMembersDialog from './BoardInviteMembersDialog';

export default {
  name: "IdeaCreateDialog",
  components: {
    BoardInviteMembersDialog,
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      board: null,
      title: null,
      userStory: null,
      description: null,
      ideaModel: {},
      images: [],

      isImagePickerLoading: false,
      userStoryHint: `As a <em><strong>user type</strong></em>, I need to <em><strong>do something</strong></em> so that I can <em><strong>realize a reward</strong></em>.`
    };
  },

  computed: {
    ...mapState("ui", {
      isOpen: "isCreateIdeaDialogOpen"
    }),
    ...mapState("actions", ["isActionPending"]),
    ...mapGetters("auth", ["loggedInUser"]),
    ...mapGetters("companies", {
      company: "current"
    }),
    ...mapGetters("boards", {
      currentBoard: "current",
      boards: "list",
      getUsers: "getUsers",
    }),
    // ruby test <
    ...mapGetters("ideas", {
      trialIdeasCount: 'trialIdeasCount',
    }),
    ...mapState('ideas', {
      ideasPagination: 'pagination'
    }),
    myIdeasCount () {
      return get(this.ideasPagination, 'default.total', 0)
    },
    // ruby test >
    blnEditing() {
      return this.value && this.value._id ? true : false;
    },
    boardsOptions() {
      return this.boards.map(board => {
        return {
          value: board._id,
          text: board.name
        };
      });
    },
    idea() {
      return {
        company: this.company._id,
        board: this.board || this.currentBoard,
        title: this.title,
        userStory: this.userStory,
        description: this.description,
        createdBy: this.loggedInUser._id
      };
    }
  },
  watch: {
    isOpen(val) {
      if (!val) {
        this.$refs.form.reset();
        this.images = [];
      }
    },
    value(newVal, oldVal) {
      console.log("ruby: watch test", newVal , " => ", oldVal);
      if (newVal) { //ruby test del
        this.initForm();
      }
    }
  },
  created() {
    // this.ideaModel = _.cloneDeep(this.value)
    console.log("ruby: here is created in Idea Create Dialog");
    this.initForm();
    // ray test block for now console.log(this);
  },
  methods: {
    ...mapMutations("ui", {
      setOpen: "setCreateIdeaDialogOpen"
    }),
    // ruby test <
    ...mapMutations("snackbar", {
      showSnackbar: "show"
    }),

    ...mapMutations('ui', {
      setInviteToBoardDialogOpen: 'setInviteToBoardDialogOpen'
    }),

    ...mapActions('ideas', {
      patchIdea: 'patch'
    }),

    async gotoUpgrade() {
      //this.$router.push({ name: "upgrade" });
    },

    checkUpdate() {
      if(!this.loggedInUser.stripe) {
        return false;
      }

      if(this.loggedInUser.stripe.plan == "Free") {
        if(this.loggedInUser.ideasCount >= this.trialIdeasCount)
        {
          return false;
        }
        return true;
      }else if(this.loggedInUser.stripe.plan == "Premium") {
        return true;
      }
      return false;
    },

    // ruby test >
    ...mapActions("uploads", {
      upload: "create"
    }),
    ...mapActions("ideas", {
      createIdea: "create",
      patchIdea: "patch"
    }),
    ...mapActions("votes", {
      vote: "create"
    }),
    initForm() {
      const _self = this;
      const { Idea } = this.$FeathersVuex;

      if (this.value instanceof Idea) {
        this.ideaModel = new Idea(this.value).clone();// .clone()
        console.log("ruby: here is Idea model clone check--if", this.ideaModel);
      } else {

        let newCheck = -2;
        if(this.loggedInUser.ideasCount < this.trialIdeasCount){
          newCheck = 1;
        }else if(this.loggedInUser.stripe && this.loggedInUser.stripe.plan != 'Free'){
          newCheck = 2;
        }

        this.ideaModel = new Idea({
          board: _self.currentBoard ? _self.currentBoard._id : undefined,
          company: this.company._id,
          createdBy: this.loggedInUser._id,
          // ruby test < add check item to IDEA
          check: newCheck,
          // ruby test >
        });
      }
    },
    canceled() {
      // this.ideaModel.reset();
      this.setOpen(false);
    },
    async uploadImage(ideaId, data) {
      let uploadRes = await this.$dispatchAction({
        type: this.$actionTypes.UPLOAD_IMAGES,
        payload: {
          uri: data,
          bucket: `${this.company._id}/ideas/${ideaId}`,
          thumb: true
        },
        entity: this.company._id
      });

      return uploadRes.data;
    },
    async submit() {
      console.log("ruby: idea create start! test for heroku");
      const form = this.$refs.form;
      let id;
      if (form.validate()) {
        let flag = this.checkUpdate();
        if (this.blnEditing) {
          await this.ideaModel.save();
          id = this.ideaModel._id;
        } else {
          const ideaRes = await this.createIdea(this.ideaModel);
          id = get(ideaRes, "data._id");
          await this.vote({
            parent: id,
            kind: voteKinds.ideas,
            owner: this.loggedInUser._id,
            voter: this.loggedInUser._id
          });
        }

        // if there are any images, put them in a bucket with ideaId and patch the idea with the image urls
        if (this.ideaModel.images.length) {
          console.log("ruby: images exist");
          const imageUrls = [];
          await Promise.all(
            this.ideaModel.images.map(async image => {
              if (image.data) {
                const res = await this.uploadImage(id, image.data);
                imageUrls.push(res);
              } else {
                imageUrls.push(image);
              }
            })
          );

          this.ideaModel.images = imageUrls;
          console.log("ruby: ideaModel after", this.ideaModel);


          // await this.ideaModel.commit();
          // this.ideaModel.save();
          await this.patchIdea([id, {images: this.ideaModel.images}]);

        }
        console.log("ruby: count of users", this.getUsers(this.currentBoard._id).length);
        if(!this.blnEditing && this.getUsers(this.currentBoard._id).length == 1){
          this.setInviteToBoardDialogOpen(true);// ruby test test
        }
        await this.setOpen(false);
        

        // ruby test <
        let newUser = this.loggedInUser;
        newUser.ideasCount = this.loggedInUser.ideasCount + 1;
        // ruby test >
        //let flag = this.checkUpdate();
        if(!flag &&  !this.blnEditing){
          this.showSnackbar({ color: "error", message: "Warning! This will hide all ideas over the plan limit." });
          //this.gotoUpgrade();
        }
        // ruby test >
          this.$router.push({ name: "idea", params: { idea: id } });
      }
    }
  }
};
</script>
