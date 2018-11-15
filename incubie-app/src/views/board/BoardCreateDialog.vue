<template>
  <v-dialog
    :value="isOpen"
    width="440"
    lazy
    @input="setOpen">
    <v-form
      ref="createBoardForm"
      @submit.prevent="createBoard">
      <v-card>
        <v-alert
          :value="errorOnCreate"
          class="mb-4"
          type="error">
          <ul
            v-if="errorOnCreate"
            class="u__flat-list">
            <li
              v-for="(value, key) in errorOnCreate.errors"
              :key="key">
              {{ value }}
            </li>
          </ul>
        </v-alert>

        <v-card-title primary-title>
          <h3 class="title">Create Board</h3>
        </v-card-title>

        <v-card-text>
          <v-text-field
            ref="name"
            :rules="[$rules.required()]"
            :error-messages="nameErrors"
            v-model="name"
            placeholder="Board Name"
            @blur="handleBoardNameBlur"/>
          <v-text-field
            v-model="description"
            placeholder="Description"/>
                          <v-flex xs12>
        <v-combobox
          outline
          hide-selected
          v-model="select"
          :items="items"
          label="Collaborators"
          multiple
          color="primary"
          chips>
          <template
            slot="selection"
            slot-scope="data">
            <v-chip
              color="blue"
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
      </v-flex>
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
            flat>Create
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
  name: 'DialogueCreateBoard',
  data () {
    return {
      name: null,
      description: null,
      error: null,
      slug: null,
      select: null, // ruby test
      items: [],
      newBoardId: 0,
    }
  },
    computed: {
    ...mapState('auth', ['actionTypes']),
    ...mapState('ui', {
      isOpen: 'isCreateBoardDialogOpen'
    }),
    ...mapState('boards', ['errorOnCreate']),
    ...mapState('boardManagement', ['errors']),
    ...mapGetters('auth', ['loggedInUser']),
    ...mapGetters('auth', ['allUsers']),
    ...mapGetters('boardManagement', ['nameErrors', 'hasErrors']),
    ...mapGetters('companies', {
      company: 'current'
    }),
    ...mapGetters('boards', {
      board: 'current'
    }),
    newBoard () {
      return {
        name: this.name,
        description: this.description,
        // ruby test slug: this.slug || changeCase.lowerCase(this.name.replace(/[^a-zA-Z]/g, '').replace(/\s+/g, '')),
        slug: this.slug || changeCase.lowerCase(this.name.replace(/ /g, '')), // ruby test board name error
        company: this.company._id,
        createdBy: this.loggedInUser._id
      }
    }
  },
  // ruby test >
  watch: {
    isOpen: {
      immediate: true,
      handler (isCreateBoardOpen) {
        if (isCreateBoardOpen) {
          this.$nextTick(() => {
            if (this.$refs.name) {
              this.$refs.name.focus()
            }
          })
        }
      }
    }
  },
  // ruby test <
  mounted () {
    this.getItems();
  },
  
  methods: {
    ...mapMutations('ui', {
      setOpen: 'setCreateBoardDialogOpen'
    }),
    ...mapMutations('boards', {
      addBoard: 'addItem',
      setCurrentBoard: 'setCurrent'
    }),
    ...mapActions('boards', ['create']),
    ...mapActions('boardManagement', ['checkUnique']),
    handleBoardNameBlur () {
      if (this.name) {
        this.checkUnique(this.newBoard)
      }
    },
    close () {
      this.setOpen(false)
      this.$router.push({ name: 'feed/main' })
    },
    async createBoard () {
      const form = this.$refs.createBoardForm
      console.log("ruby test combobox :", this.select);
      if (form.validate() && !this.hasErrors) {
        try {
          const res = await this.$dispatchAction({
            type: this.$actionTypes.CREATE_BOARD,
            entity: this.company._id,
            payload: this.newBoard
          })

          const boardSlug = get(res, 'data.board.slug')
	        console.log("ruby: boardSlug = ", boardSlug);
          this.newBoardId = res.data.board._id;
          console.log("ruby test :" , res.data.board._id);
          
          // ruby test <
          this.inviteBoardMembers();
          // ruby test >

          form.reset()
          this.setOpen(false)
          
          this.$router.push({ name: 'board/main', params: { boardSlug } })
          
        } catch (err) {
          // TODO: handle error
          console.log("ruby: test here is error");
        }
      }
    },
    // ruby test users to send email
    getItems() {
      console.log("ruby test users = ", this.allUsers.data);
      this.items = [];
      this.allUsers.data.forEach(user => {
        this.items.push(user.firstName + ' ' + user.lastName);
      });
    },

    // check if or not email
    validateEmail(email) 
    {
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    },

    // ruby test send email
    async inviteBoardMembers() {
      console.log("ruby test ***** invite board members **** in boardCreateDialog");
      let inviteInfo = this.invitations();
      //console.log("ruby test ***** invite board members ****", inviteInfo.length);
      if(inviteInfo){
        console.log("ruby: test send invite email");
        await this.$dispatchAction({
          type: this.$actionTypes.INVITE_COMPANY_MEMBERS,
          entity: this.company._id,
          payload: inviteInfo
        })

        await this.$dispatchAction({
          type: this.$actionTypes.INVITE_BOARD_MEMBERS,
          entity: this.company._id,
          payload: inviteInfo
        })
      }
      
    },

    getUserWithName(fullName) {
      let index = 0
      for(index = 0; index < this.allUsers.data.length ; index++) {
        let member =this.allUsers.data[index];
        let memberName = member.firstName + ' ' + member.lastName;
        if(fullName == memberName){
          console.log("fullName 's email = " + member.email);
          return member;
        }
      }
      console.log("Not found in Users");
      return null;
    },

    getUserWithEmail(email) {
      let index = 0
      for(index = 0; index < this.allUsers.data.length ; index++) {
        let member =this.allUsers.data[index];
        if(email == member.email){
          console.log("ruby: His 's name = " + member.firstName);
          return member;
        }
      }
      console.log("Not found in Users");
      return null;
    },

    // ruby test get email info
    invitations() {
      let result = [];
      let emailTo = '';
      let userId = 0;
      let index = 0;
      if(!this.select)
        return result;
      for(index = 0 ; index < this.select.length ; index++){
        let member = this.select[index];
        emailTo = '';
        if(this.validateEmail(member)) {
          emailTo = member;
          let receiver = this.getUserWithEmail(emailTo);
          if(receiver){
            userId = receiver._id;
          }else{
            userId = -1;
          }
        }else {
          let receiver = this.getUserWithName(member);
          userId = -1;
          if(receiver){
            emailTo = receiver.email;
            userId = receiver._id;
          }else{
            emailTo = '';
          }
        }
        console.log("ruby: after check email = ", emailTo , "user = ",userId);
        if(emailTo != '') {
          result.push({
            email: emailTo,
            role: 'member',
            company: this.company._id,
            invitedBy: this.loggedInUser._id,
            board: this.newBoardId,
            //user: userId,
          })
        }
      }

      return result;
    }
  }
}
</script>
