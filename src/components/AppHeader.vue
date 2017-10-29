<template>
  <header>
    <div class="logo">
      <a href="/#/">FOOTBALLIFY</a>
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
                    @click="signInUser">
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
import * as firebase from 'firebase'
import { mapGetters, mapActions } from 'vuex'

let config = {
  apiKey: 'AIzaSyBNBlLKG9XmRWLB4NeP-gVJuVixD9MC7KY',
  authDomain: 'test-89c67.firebaseapp.com',
  databaseURL: 'https://test-89c67.firebaseio.com',
  projectId: 'test-89c67',
  storageBucket: 'test-89c67.appspot.com',
  messagingSenderId: '900979973520'
}

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
      'getAuthState'
    ]),

    initializeFirebaseApp: function () {
      firebase.initializeApp(config)

      this.getAuthState()
    },

    createUser: function () {
      firebase.auth().createUserWithEmailAndPassword('test123@test123.co', 'password').catch(function (error) {
        console.error('Error in creating user', error)
      })
    },

    signInUser: function () {
      console.log('signing in', this.modal.form)
      firebase.auth().signInWithEmailAndPassword(this.modal.form.email, this.modal.form.password).then(data => {
        this.authStateObserver()
      }).catch(error => {
        console.error(error)
      })
    },

    authStateObserver () {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log(user)
          this.$refs.signInFormRef.hide()
        } else {
          console.log('User signed out')
        }
      })
    }
  },

  computed: {
    ...mapGetters([
      'userID'
    ])
  },

  mounted: function () {
    this.initializeFirebaseApp()
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
