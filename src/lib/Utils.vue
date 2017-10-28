<script>
import VueResource from 'vue-resource'
Vue.use(VueResource)

let auth = {
  headers: {
    'X-Auth-Token': '15008df9a7a5420595624fe4d305c149'
  }
}

export default {
  getLeagues: function () {
    let allSeasonUrl = 'http://api.football-data.org/v1/soccerseasons'

    return this.$axios.get(allSeasonUrl, auth).then(function (data) {
      // let league = this.$_.find(data['data'], function (league) {
      //   return league['league'] === 'PL'
      // })
      console.log(data)
      // return league
      // this.getFixtures(league['_links']['fixtures']['href'])
    }, function (error) {
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
}
</script>
