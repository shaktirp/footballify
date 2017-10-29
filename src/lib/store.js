import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  uid: ''
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  authStateObserver: function () {
    return firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
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
  getAuthState: ({ commit }) => commit('authStateObserver')
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
