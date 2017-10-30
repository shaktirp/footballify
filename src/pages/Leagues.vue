<template>
  <div>
    <app-header></app-header>
    <div class="page-container">
      <h1>{{ msg }}</h1>
      <div class="main-container">
        <div class="results-container">
          <h2>Results</h2>
          <div v-for="(value, key) in results">
            <h3>{{ key }}</h3>
            <div v-for="result in value" class="gameweek">
              <span class="home">{{ result['homeTeamName'] }}</span>
              <span class="score">{{ result['result']['goalsHomeTeam'] }} - {{ result['result']['goalsAwayTeam'] }}</span>
              <span class="away">{{ result['awayTeamName'] }}</span>
            </div>
          </div>
        </div>
        <div class="fixtures-container">
          <h2>Fixtures</h2>
          <div v-for="(value, key) in fixtures">
            <h3>{{ key }}</h3>
            <div v-for="fixture in value" class="gameweek">
              <span class="home">{{ fixture['homeTeamName'] }}</span>
              <span class="score"> vs </span>
              <span class="away">{{ fixture['awayTeamName'] }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader'

let auth = {
  headers: {
    'X-Auth-Token': '15008df9a7a5420595624fe4d305c149'
  }
}

export default {
  data () {
    return {
      msg: 'Premier League',
      results: {},
      fixtures: {}
    }
  },

  components: {
    'app-header': AppHeader
  },

  methods: {
    getLeagues: function () {
      let allSeasonUrl = 'http://api.football-data.org/v1/soccerseasons'

      this.$axios.get(allSeasonUrl, auth).then(data => {
        let league = this.$_.find(data['data'], (league) => {
          return league['league'] === 'PL'
        })
        this.getFixtures(league['_links']['fixtures']['href'])
      }).catch(e => console.error(e))
    },

    getFixtures: function (url) {
      let tempResults = []

      this.$axios.get(url, auth).then(data => {
        this.$_.each(data['data']['fixtures'], (game) => {
          let dateDiff = new Date(game['date']) - new Date()
          let gameDate = new Date(game['date']).toLocaleDateString()

          if (dateDiff >= 0) {
            this.fixtures = this.loadGameObject(this.fixtures, gameDate, game)
          } else {
            tempResults = this.loadGameObject(tempResults, gameDate, game)
          }
        })

        let dates = this.$_.sortedUniq(Object.keys(tempResults)).reverse()
        this.$_.each(dates, (date) => {
          this.results[date] = tempResults[date]
        })

        console.log(this)
      }).catch(e => console.error(e))
    },

    loadGameObject: function (gameObj, gameDate, game) {
      if (gameObj[gameDate]) {
        gameObj[gameDate].push(game)
      } else {
        gameObj[gameDate] = [game]
      }
      return gameObj
    }
  },

  mounted: function () {
    this.getLeagues()
  }
}
</script>

<style scoped>
.main-container, .gameweek {
  display: flex;
}
.results-container, .fixtures-container {
  flex: 50%
}
.home {
  flex: 9;
  text-align: right
}
.away {
  flex: 9;
  text-align: left;
}
.score {
  flex: 1;
  padding: 0 20px;
  font-size: 12px
}
</style>
