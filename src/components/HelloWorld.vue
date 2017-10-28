<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
let auth = {
  headers: {
    'X-Auth-Token': '15008df9a7a5420595624fe4d305c149'
  }
}

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },

  methods: {
    getLeagues: function () {
      let allSeasonUrl = 'http://api.football-data.org/v1/soccerseasons'
      this.$axios.get(allSeasonUrl, auth)
        .then(function (data) {
          console.log(data)
          let league = this.$_.find(data['data'], function (league) {
            return league['league'] === 'PL'
          })
          console.log(league)
          // this.getFixtures(league['_links']['fixtures']['href'])
        }.bind(this), function (error) {
          console.error(error)
        })
    }

    // getFixtures: function (url) {
    //   this.$http
    //     .get(url, auth)
    //     .then(function (data) {
    //       this.fixtures = _.map(data['body']['fixtures'], function (fixture) {
    //         return {
    //           awayTeam: fixture['awayTeamName'],
    //           homeTeam: fixture['homeTeamName'],
    //           matchday: fixture['matchday']
    //         }
    //       })
    //     }.bind(this), function (error) {
    //       console.error(error)
    //     })
    // }
  },

  mounted: function () {
    this.getLeagues()
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
