<template>
  <v-form @submit.prevent="acceptInvitation()">
    <v-card>
      <v-card-title
        primary-title>
        <h3 class="headline">
          
          <!-- {{ invitation.invitedBy.firstName }} -->
          You are invited to join <strong>{{ companyName }}</strong>
        </h3>
      </v-card-title>
      <v-card-text>
        <v-text-field
          ref="fullName"
          v-model.trim="fullName"
          :rules="[$rules.required()]"
          type="text"
          label="Enter your full name"
          validate-on-blur/>
        <v-text-field
          ref="email"
          v-model.trim="email"
          :rules="[$rules.required(),$rules.email()]"
          type="text"
          label="Enter your Email"
          validate-on-blur
          @keyup="checkUniqueEmail()"/>
        <v-text-field
          ref="password"
          v-model.trim="password"
          :rules="[$rules.required()]"
          type="password"
          label="Choose a password"
          validate-on-blur/>
      </v-card-text>
      <v-card-actions>
        <v-btn
          block
          large
          color="accent"
          type="submit">
          Accept My Invitation
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { debounce, get } from 'lodash'
import changeCase from 'change-case'
import bcrypt from 'bcryptjs'
import globalConstant from '../../globalConstant.js'
export default {
  name: 'InvitationLinkSignUp',
  components: {},
  props: {},
  data () {
    return {
      fullName: null,
      email: null,
      password: null,
      companyName: null,
      companyId: null,
      invitedBy: null,
      boardId: null,
      firstName: null,
      lastName: null,
    }
  },
  computed: {
    ...mapGetters('companies', {
      getCompany: 'get',
      getCompanies: 'find',
      companies: 'list',
      company: 'current',
      getCompanyIdBySlug: 'getIdBySlug',
      getCompanyById: 'getCompanyById',
    }),
    authenticateError () {
      return this.errorOnAuthenticate ? this.errorOnAuthenticate.error : null
    },
    user () {
      return {
        fullName: this.fullName,
        email: this.email,
        password: this.password,
        strategy: 'local',
        role: 'member',
      }
    }
  },
  watch: {},
  created () {
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapMutations('auth', [
      'clearAuthenticateError',
      'setAuthenticatePending',
      'setAuthenticateError',
      'unsetAuthenticatePending'
    ]),
    ...mapMutations("snackbar", {
      showSnackbar: "show"
    }),
    ...mapActions('auth', ['authenticate']),
    checkUniqueEmail: debounce(async function () {
      await this.$dispatchAction({
        type: this.$actionTypes.CHECK_UNIQUE_EMAIL,
        payload: this.user.email
      })
    }, 300),

    async acceptInvitation () {
      //this.init(); // ruby test del
      let namearray = this.fullName.split(' ');
      this.firstName = namearray[0];
      this.lastName = namearray[1];

      try {
        let invitationMock = {
            role: 'member',
            company: { _id: this.companyId,
                        name: this.companyName,
                        slug: changeCase.lowerCase(this.companyName.replace(/ /g,''))
                      },
            invitedBy:{ _id: this.invitedBy, firstName: this.firstName, lastName: this.lastName},
            board: this.boardId,
            linked: true,
          }
        const res = await this.$dispatchAction({
          type: this.$actionTypes.ACCEPT_LINK_INVITATION,
          payload: Object.assign(invitationMock, { user: this.user })
        })

        console.log("ruby: response of link invitation" , res);
        let slug = get(res, 'data.company.slug');
        let serverPassword = get(res, 'data.user.password');
        let boardSlug = get(res, 'data.board.slug'); console.log("ruby: BoardSlug", boardSlug);
        let gotoUrl = globalConstant.BaseUrl + slug + "/b/" + boardSlug;
        let compareRes = bcrypt.compareSync(this.password, serverPassword);

        //this.$router.push({ name: 'board/main', params: { boardSlug: slug} })
        if(!compareRes){
          this.password = "";
          this.showSnackbar({color: "error", message: "Failed in Login"});
        }else {
          await this.authenticate(this.user)
          window.location= gotoUrl;
        }
      } catch (err) {
        // TODO: handle error
        const errCode = get(err, 'code');
        const errMessage = get(err, 'data.message', 'error');
        console.dir(err);
        if (errCode === 403) {
          this.$router.push({ name: 'unauthorized' });
        } else {
          await this.setAuthenticateError({ error: errMessage });
        }
        console.log("ruby: here catch in here");
      }
    },

    init() {
      console.log("ruby: mounted::&&::params", this.$route.path);
      let str = this.$route.path;
      let array1 = str.split('/');
      let strlast = array1[array1.length - 2];
      let info = strlast.split('_FAI35_');
      console.log(info);
      this.companyName = info[3].replace('_',' ');
      this.companyId = info[0];
      this.invitedBy = info[1];
      this.boardId = info[2];
    }
  }
}
</script>
