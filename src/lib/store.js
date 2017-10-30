import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

const config = {
  apiKey: 'AIzaSyBNBlLKG9XmRWLB4NeP-gVJuVixD9MC7KY',
  authDomain: 'test-89c67.firebaseapp.com',
  databaseURL: 'https://test-89c67.firebaseio.com',
  projectId: 'test-89c67',
  storageBucket: 'test-89c67.appspot.com',
  messagingSenderId: '900979973520'
}

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  uid: '',
  user: {}
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  initializeFirebaseApp () {
    firebase.initializeApp(config)
  },

  createUser () {
    firebase.auth().createUserWithEmailAndPassword('test123@test123.co', 'password').catch(error => {
      console.error('Error in creating user', error)
    })
  },

  signInUser (state, { email, password }) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(data => {
      mutations.authStateObserver()
    }).catch(error => {
      console.error(error)
    })
  },

  authStateObserver (state, val) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        state.user = user
        state.uid = user['uid']
      } else {
        console.log('User signed out')
      }
    })
  }
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  authStateObserver: ({ commit }) => commit('authStateObserver'),
  signInUser: ({ commit }, { email, password }) => commit('signInUser', { email, password })
}

// getters are functions
const getters = {
  userID: state => state.uid
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
