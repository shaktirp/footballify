<template>
  <div>
    <app-header></app-header>
    <h3>{{ msg }}</h3>
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader'

export default {
  name: 'Home',

  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },

  components: {
    'app-header': AppHeader
  }
}
</script>

<style scoped>
</style>
