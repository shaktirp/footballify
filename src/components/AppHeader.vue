<template>
  <header>
    <div class="logo">
      <a href="/#/">FOOTBALLIFY</a>
    </div>

    <div class="sign-in-form">
      <b-modal ref="signInFormRef" id="signInForm" :hide-footer="true" :hide-header="true">
        <b-form>
          <b-form-group id="emailGroup">
            <b-form-input type="email"
                          placeholder="Enter email"
                          v-model="modal.form.email"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="passwordGroup">
            <b-form-input type="password"
                          placeholder="Password"
                          v-model="modal.form.password"
            ></b-form-input>
          </b-form-group>
          <b-button type="submit"
                    variant="primary"
                    @click="signInBtnClick">
            Sign In
          </b-button>
        </b-form>
      </b-modal>
    </div>

    <div class="sign-in-form">
      <b-modal ref="signUpFormRef" id="signUpForm" :hide-footer="true" :hide-header="true">
        <b-form>
          <b-form-group id="nameGroup">
            <b-form-input type="text"
                          placeholder="Enter name"
                          v-model="modal.form.name"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="emailGroup">
            <b-form-input type="email"
                          placeholder="Enter email"
                          v-model="modal.form.email"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="passwordGroup">
            <b-form-input type="password"
                          placeholder="Password"
                          v-model="modal.form.password"
            ></b-form-input>
          </b-form-group>
          <b-button type="submit"
                    variant="primary"
                    @click="signupBtnClick"
                    :disabled="modal.form.name ? false : true">
            Sign up
          </b-button>
        </b-form>
      </b-modal>
    </div>

    <div class="nav">
      <b-nav class="header-menu">
        <b-nav-item href="/#/leagues">Leagues</b-nav-item>
        <b-nav-item v-if="uid" @click="signOutUser">Sign out</b-nav-item>
        <div v-else>
          <b-btn v-b-modal.signInForm>Login</b-btn>
          <b-btn v-b-modal.signUpForm>Sign up</b-btn>
        </div>
      </b-nav>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      welcome: 'Welcome',
      modal: {
        hideHeader: true,
        form: {
          name: '',
          email: 'test123@test123.co',
          password: 'password'
        }
      }
    }
  },

  methods: {
    ...mapActions([
      'authStateObserver',
      'createUser',
      'signInUser',
      'signOutUser'
    ]),

    signInBtnClick () {
      this.signInUser({
        email: this.modal.form.email,
        password: this.modal.form.password
      })
      this.$refs.signInFormRef.hide()
    },

    signupBtnClick () {
      this.createUser({
        name: this.modal.form.name,
        email: this.modal.form.email,
        password: this.modal.form.password
      })
      this.$refs.signUpFormRef.hide()
    }
  },

  computed: {
    ...mapState([
      'uid'
    ])
  },

  mounted: function () {
    this.authStateObserver()
  }
}
</script>

<style scoped>
header {
  background: #25A7AD;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  color: #FFF
}

header a {
  color: #FFF
}

header a:hover {
  color: #FFF;
  text-decoration: none;
}

.logo {
  padding: 0.5rem 1rem;
}

.sign-in-form {
  color: #000
}

.header-menu button {
  margin-right: 20px
}

.header-menu button:last-child {
  margin-right: 0
}
</style>
