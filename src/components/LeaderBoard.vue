<template>
<section class="wrapper">
    <h1>LEADERBOARDS</h1>
    <p>Congragulations to the most powerful kingloyal in Amara.</p>
    <p>Leaderboards were reset for V.1.3.1 at 12/19/2020 12pm CST</p>
    <hr>
    <section class="flexColumn">
        <section v-for="(items, index) in leaderboards" :key="items + index" class="block flexRow">
            <img class="smallIcon" :src="items.data.icon">
            <h3>{{index + 1}}. {{items.name}} | <span class="capital">{{items.data.playedAs}}</span> | {{items.data.highScore}} Points </h3>
        </section>
    </section>

    <br>

    <section class="playAgain">    
            <p @click="home()">Back Home</p>
        </section>
</section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import LeaderBoard from '@/store/modules/leaderboardData'
import PlayerData from '@/store/modules/playerData'
import BackgroundMusic from '@/plugins/backgroundMusic'

export default {
  name: 'LeaderBoard',
  data() {
      return {
        music: [''],
      }
  },
  methods: {
      home() {
          this.$store.commit('gameData/mutate', {property:'phase', with:'SavedGame'})
      }
  },
  computed: {
    ...mapState('leaderboardData', [
        'highestHealth',
        'highestArmor',
        'highestAttack',
        'monstersKilled',
        'coinsSpent',
        'totalCoins',
        'totalDamageDealt',
        'totalDamageTaken',
        'damageBlocked',
    ]),
    ...mapState('gameData', {
        leaderboards: state => state.leaderboard
    }),
  },
  created() {
      this.$store.commit('gameData/clearLeaderboard')
      this.$store.dispatch('authData/fetchLeaderboard')
  }
}
</script>

<style scoped>
.smallIcon {
    width:40px;
    height:40px;
}

.buffer {
    margin:5px;
}

.wrapper {
    text-align:center;
}

.block {
    margin:10px;
    text-align:center;
}

.block section {
    border:solid 2px black;
    padding:5px;
    margin:5px;
}

.capital {
    text-transform:capitalize;
}

img {
    margin-right:5px;
}

h3 {
    line-height:40px;
    font-size:20px;
    margin:0;
    padding:0;
}

h1 {
    margin:0;
}

#gameStats {
    border:solid 2px black;
    padding:10px;
    margin:10px 0px;
}

#finalStats h2 {
    margin:0;
    font-size:18px;
    color:black;
}

.playAgain p {
    background:black;
    color:white !important;
    font-family: Arial, Helvetica, sans-serif;
    font-size:20px;
    padding:20px;
    margin:0 auto;
    text-align:center;
    width:60%;
    border:none;
    transition:background-color 1s ease-in-out;
}

.playAgain p:hover {
    background:rgb(102, 0, 0);
    cursor:pointer;
    transition:background-color 1s ease-in-out;
}
</style>
