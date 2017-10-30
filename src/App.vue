<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3 {
  font-weight: lighter;
}

.btn-primary {
  background: #25A7AD
}

.page-container {
  width: 1000px;
  margin: 40px auto 0 auto
}
</style>
