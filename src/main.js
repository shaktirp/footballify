// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import _ from 'lodash'
import axios from 'axios'
import store from './lib/store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'

store.commit('initializeFirebaseApp')

let originalVueComponent = Vue.component
Vue.component = function (name, definition) {
  if (name === 'bFormCheckboxGroup' || name === 'bCheckboxGroup' ||
      name === 'bCheckGroup' || name === 'bFormRadioGroup') {
    definition.components = {bFormCheckbox: definition.components[0]}
  }
  originalVueComponent.apply(this, [name, definition])
}
Vue.use(BootstrapVue)
Vue.component = originalVueComponent

Vue.config.productionTip = false

Vue.prototype.$_ = _
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
