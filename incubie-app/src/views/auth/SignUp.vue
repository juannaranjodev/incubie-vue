<template>
  <v-card class="auth__card">
    <transition
      appear
      name="slide-y-transition">
      <v-form
        ref="signUpForm"
        @submit.prevent="signUp">
        <v-card-text>
          <!-- <v-btn
            class="btn__social"
            large
            block
            disabled
            @click.prevent="launchGoogleSignIn">
            <i>
              <img src="/images/icons/google.svg">
            </i>
            Sign Up with Google
          </v-btn>

          <div class="auth__divider">
            <span/>
            <span>or</span>
            <span/>
          </div> -->

          <v-text-field
            ref="fullName"
            v-model.trim="fullName"
            :loading="isAuthenticatePending"
            :rules="[$rules.required()]"
            type="text"
            label="Full Name"
            validate-on-blur/>
          <v-text-field
            ref="email"
            v-model.trim="email"
            :loading="isAuthenticatePending"
            :rules="[$rules.required(), $rules.email()]"
            :error-messages="emailErrors"
            type="email"
            label="Company Email"
            validate-on-blur
            @keyup="checkUniqueEmail()"/>
          <v-text-field
            ref="password"
            v-model.trim="password"
            :rules="[$rules.required()]"
            type="password"
            label="Password"
            validate-on-blur/>
          <v-text-field
            ref="companyName"
            v-model.trim="companyName"
            :loading="isAuthenticatePending"
            :rules="[$rules.required()]"
            :error-messages="companyErrors"
            type="text"
            label="Company Name"
            validate-on-blur
            @input="checkUniqueCompany()"/>
          <v-checkbox v-model="agreeCheckbox">

            <span slot="label">I agree to the <a @click="dialog = true">Terms of Service </a></span>
          </v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-btn
            ref="signUpBtn"
            :loading="isAuthenticatePending"
            type="submit"
            append-icon
            color="accent"
            large
            block>
            Sign Up
          </v-btn>
        </v-card-actions>
      </v-form>
    </transition>
    <v-dialog
      v-model="dialog"
      max-width="300"
      scrollable>
      <v-card>
        <v-card-title class="headline">Incubie Beta Terms of Service</v-card-title>

        <v-card-text>
          Incubie Beta Test Agreement
          This Beta Test Agreement (“Agreement”) governs the disclosure of information by Incubie, LLC
          (“Company”) (the “Recipient”) and Recipient’s use of Company’s beta service offering.
          1. Subject to the terms and conditions of this Agreement, Company grants Recipient a
          nonexclusive, nontransferable license to use the Company service (“Service”) for a period designated
          by the Company for the purpose of testing and evaluating the Service.
          2. The Recipient agrees that it will at all times will hold in strict confidence and not disclose
          Confidential Information (as defined below) to any third party except as approved in writing by the
          Company and will use the Confidential Information for no purpose other than evaluating the Service.
          The Recipient shall only permit access to Confidential Information to those of its employees having a
          need to know and who have signed confidentiality agreements or are otherwise bound by
          confidentiality obligations at least as restrictive as those contained herein. “Confidential Information”
          means all non-public materials and information provided or made available by Company to
          Recipient, including products and services, information regarding technology, know-how, processes,
          software programs, research, development, financial information and information the Company
          provides regarding third parties.
          3. The Recipient’s obligations under this Agreement with respect to any portion of the
          Confidential Information shall terminate when the Recipient can document that: (a) it was in the
          public domain at the time it was communicated to the Recipient; (b) it entered the public domain
          subsequent to the time it was communicated to the Recipient through no fault of the Recipient; (c) it
          was in the Recipient’s possession free of any obligation of confidence at the time it was
          communicated to the Recipient; (d) it was rightfully communicated to the Recipient free of any
          obligation of confidence subsequent to the time it was communicated to the Recipient; or (e) it was
          developed by employees or agents of the Recipient who had no access to any information
          communicated to the Recipient. After Recipient’s evaluation of the Service is complete, or upon
          request of the Company, the Recipient shall promptly return to the Company all documents, notes
          and other tangible materials and return or certify the destruction of all electronic documents, notes,
          software, data, and other materials in electronic form representing the Confidential Information and
          all copies thereof.
          !1
          4. The Recipient agrees that nothing contained in this Agreement shall be construed as
          granting any ownership rights to any Confidential Information disclosed pursuant to this Agreement,
          or to any invention or any patent, copyright, trademark, or other intellectual property right. The
          Recipient shall not make, have made, use or sell for any purpose any product or other item using,
          incorporating or derived from any Confidential Information or the Service. The Recipient will not
          modify, reverse engineer, decompile, create other works from, or disassemble any software programs
          contained in the Confidential Information or the Service.
          5. This Service is a beta release offering and is not at the level of performance of a
          commercially available product offering. The Service may not operate correctly and may be
          substantially modified prior to first commercial release, or at Company’s option may not be released
          commercially in the future. THE SERVICE AND DOCUMENTATION ARE PROVIDED “AS IS”
          WITHOUT WARRANTY OF ANY KIND, AND COMPANY AND ITS LICENSORS DISCLAIM
          ALL WARRANTIES, EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WITHOUT
          LIMITATION ANY IMPLIED WARRANTIES OF TITLE, NON-INFRINGEMENT OF THIRD
          PARTY RIGHTS, MERCHANTABILITY, OR FITNESS FOR A PARTICULAR PURPOSE. NO
          ORAL OR WRITTEN ADVICE OR CONSULTATION GIVEN BY COMPANY, ITS AGENTS OR
          EMPLOYEES WILL IN ANY WAY GIVE RISE TO A WARRANTY. THE ENTIRE RISK
          ARISING OUT OF THE USE OR PERFORMANCE OF THE SERVICE REMAINS WITH
          RECIPIENT.
          6. COMPANY AND ITS LICENSORS SHALL NOT BE LIABLE FOR LOSS OF USE,
          LOST PROFIT, COST OF COVER, LOSS OF DATA, BUSINESS INTERRUPTION, OR ANY
          INDIRECT, INCIDENTAL, CONSEQUENTIAL, PUNITIVE, SPECIAL, OR EXEMPLARY
          DAMAGES ARISING OUT OF OR RELATED TO THE SERVICE OR THIS AGREEMENT,
          HOWEVER CAUSED AND REGARDLESS OF THE FORM OF ACTION, WHETHER IN
          CONTRACT, TORT (INCLUDING NEGLIGENCE) STRICT LIABILITY, OR OTHERWISE,
          EVEN IF SUCH PARTIES HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH
          DAMAGES. IN NO EVENT WILL COMPANY’S AGGREGATE CUMULATIVE LIABILITY
          FOR ANY CLAIMS ARISING OUT OF OR RELATED TO THIS AGREEMENT EXCEED $50.00
          OR THE AMOUNT RECIPIENT ACTUALLY PAID COMPANY UNDER THIS AGREEMENT (IF
          ANY).
          7. The Recipient’s obligations under this Agreement shall survive any termination of this
          !2
          agreement. This Agreement shall be governed by and construed in accordance with the laws of
          California. The Recipient hereby agrees that breach of this Agreement will cause Company
          irreparable damage for which recovery of damages would be inadequate, and that the Company shall
          therefore be entitled to obtain timely injunctive relief under this Agreement, as well as such further
          relief as may be granted by a court of competent jurisdiction. The Recipient will not assign or
          transfer any rights or obligations under this Agreement without the prior written consent of the
          Company.
          In Witness Whereof, the Recipient has caused this Agreement to be executed as of the date set forth
          below.
          !3
        </v-card-text>

        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="primary"
            flat="flat"
            @click="dialog = false, agreeCheckbox = false">
            Disagree
          </v-btn>
          <v-btn
            color="secondary"
            flat="flat"
            @click="dialog = false, agreeCheckbox = true">
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import changeCase from 'change-case'
import { debounce, get } from 'lodash'

export default {
  data () {
    return {
      agreeCheckbox: true,
      fullName: null,
      dialogm1: '',
      dialog: false,
      email: null,
      password: null,
      companyName: null,
      slug: null,
      strategy: 'local'
    }
  },
  computed: {
    ...mapState('auth', ['errorOnAuthenticate', 'isAuthenticatePending']),
    ...mapState('actions', ['errorOnAction']),

    user () {
      return {
        fullName: this.fullName,
        email: this.email ? this.email.toLowerCase() : null,
        password: this.password,
        strategy: this.strategy
      }
    },
    company () {
      return {
        name: this.companyName,
        slug: this.slug || changeCase.lowerCase(this.companyName.replace(/[^a-zA-Z]/g, '').replace(/\s+/g, ''))
      }
    },

    emailErrors () {
      return get(this.errorOnAction, 'errors.email')
    },

    companyErrors () {
      return get(this.errorOnAction, 'errors.company')
    },

    authenticateErrors () {
      if (this.errorOnAuthenticate && this.errorOnAuthenticate.hasOwnProperty('errors')) {
        return this.errorOnAuthenticate.errors || null
      } else {
        return null
      }
    }
  },
  async destroyed () {
    await this.$store.commit('auth/clearAuthenticateError')
  },
  methods: {
    checkUniqueEmail: debounce(async function () {
      await this.$dispatchAction({
        type: this.$actionTypes.CHECK_UNIQUE_EMAIL,
        payload: this.user.email
      })
    }, 300),
    checkUniqueCompany: debounce(async function () {
      await this.$dispatchAction({
        type: this.$actionTypes.CHECK_UNIQUE_COMPANY,
        payload: this.company
      })
    }, 300),
    async signUp () {
      this.$refs.signUpBtn.$el.focus()
      await this.$store.commit('auth/clearAuthenticateError')

      if (this.$refs.signUpForm.validate() && !this.emailErrors && !this.companyErrors) {
        this.$store.commit('auth/setAuthenticatePending', true)

        try {
          await this.$dispatchAction({
            type: this.$actionTypes.SIGN_UP,
            entity: null,
            payload: {
              user: this.user,
              company: this.company
            }
          })

          const res = await this.$store.dispatch('auth/authenticate', this.user)
          this.$router.push({ name: 'root' })
        } catch (err) {
          this.$store.commit('auth/setAuthenticateError', err.errors)
        }

        this.$store.commit('auth/unsetAuthenticatePending')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
