<template>
  <v-dialog :value="isOpen" :lazy="true" max-width="414" @input="handleIsOpenChange">
    <v-form ref="form" class="accent" @submit.prevent="postComment">
      <v-card>
        <v-card-title primary-title>
          <h3 class="title">Comment</h3>
        </v-card-title>

        <v-card-text>
          <v-textarea ref="comment" v-model="commentModel.text" :rules="[$rules.required('Comment cannot be blank.')]"
            :validate-on-blur="true" auto-grow autofocus rows="1" counter="500" color="accent"
            required/>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="primary" flat @click="handleIsOpenChange(false)">Cancel
          </v-btn>
          <v-btn :loading="isActionPending" type="submit" color="accent" flat>
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { voteKinds } from "@/constants";

export default {
  name: "IdeaCommentDialog",
  components: {},
  props: {},
  data() {
    return {
      text: null,
      commentModel: {}
    };
  },
  computed: {
    ...mapState("ui", {
      isOpen: "isIdeaCommentDialogOpen"
    }),
    ...mapState("actions", ["isActionPending"]),
    ...mapGetters("auth", ["loggedInUser"]),
    ...mapGetters("companies", {
      company: "current"
    }),
    ...mapGetters("ideas", {
      idea: "current"
    }),
    ...mapGetters("comments", {
      current: "current"
    }),
    editing() {
      return this.current && this.current._id ? true : false;
    },
    comment() {
      return {
        createdBy: this.loggedInUser._id,
        text: this.text,
        idea: this.idea._id,
        parent: null
      };
    }
  },
  watch: {
    current(newVal, oldVal) {
      this.initForm();
    }
  },

  created() {
    this.initForm();
  },
  mounted() {},
  methods: {
    ...mapMutations("ui", {
      setOpen: "setIdeaCommentDialogOpen"
    }),
    ...mapActions("votes", {
      vote: "create"
    }),
    initForm() {
      const _self = this;
      const { Comment } = this.$FeathersVuex;
      if (this.current) {
        this.commentModel = this.current.clone();
      } else {
        this.commentModel = new Comment({
          createdBy: this.loggedInUser._id,
          idea: this.idea ? this.idea._id : null,
          parent: null
        });
      }
    },
    async postComment() {
      const form = this.$refs.form;

      if (form.validate()) {
        let id;
        try {
          if (this.editing) {
            await this.commentModel.save();
            await this.handleIsOpenChange(false);
            id = this.commentModel._id;
          } else {
            const { data } = await this.$dispatchAction({
              type: this.$actionTypes.POST_COMMENT,
              entity: this.company._id,
              payload: this.commentModel
            });
            id = data.comment._id;
            await this.handleIsOpenChange(false);
          }

          this.$router.push({ name: "idea", params: { idea: this.idea._id, comment: id } });
        } catch (err) {
          // TODO: handle error
        }
      }
    },
    handleEnterKey(event) {
      if (event.shiftKey) {
        return false;
      }

      this.postComment();
    },
    async handleIsOpenChange(v) {
      await this.setOpen(v);

      if (v) {
        this.onOpen();
      } else {
        this.onClose();
      }
    },
    onOpen() {
      this.$nextTick(() => {
        const input = this.$refs.comment;
        input.focus();
      });
    },
    onClose() {
      this.commentModel.reset();
      const form = this.$refs.form;

      form.reset();
    }
  }
};
</script>
