<template>
  <div>
    <app-header></app-header>
    <div class="page-container">
      <h3 v-if="user.displayName">Hi {{ user.displayName }}</h3>
    </div>
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader'
import { mapState } from 'vuex'

export default {
  name: 'Home',

  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },

  components: {
    'app-header': AppHeader
  },

  computed: {
    ...mapState([
      'user'
    ])
  }
}
</script>

<style scoped>
</style>
