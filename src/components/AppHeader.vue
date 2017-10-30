<template>
  <header>
    <div class="logo">
      <a href="/#/">FOOTBALLIFY {{ uid }}</a>
    </div>

    <div class="sign-in-form">
      <b-modal ref="signInFormRef" id="signInForm" hide-footer=true hide-header=true>
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

    <div class="nav">
      <b-nav>
        <b-nav-item href="/#/leagues">Leagues</b-nav-item>
        <b-btn v-b-modal.signInForm>Login</b-btn>
      </b-nav>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  data () {
    return {
      welcome: 'Welcome',
      modal: {
        hideHeader: true,
        form: {
          email: 'test123@test123.co',
          password: 'password'
        }
      }
    }
  },

  methods: {
    ...mapActions([
      'authStateObserver',
      'signInUser'
    ]),

    ...mapMutations([
      'initializeFirebaseApp'
    ]),

    signInBtnClick () {
      this.signInUser({
        email: this.modal.form.email,
        password: this.modal.form.password
      })
      this.$refs.signInFormRef.hide()
    }
  },

  computed: {
    ...mapState([
      'uid'
    ])
  },

  mounted: function () {
    this.initializeFirebaseApp()
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
</style>
