<template>

    <b-col cols="12" class="d-flex flex-column justify-content-center text-center">
        <h1>LEADERBOARDS</h1>
        <p>Congragtulations to the most powerful kingloyal in Amara.</p>

        <transition name="fade" mode="out-in">
            <section class="mb-3">
                <section v-if="leaderboards.length > 0">
                    <b-card-group deck class="mb-3">
                        <b-card
                            v-for="(items, index) in leaderboardTop"
                            :key="items + index"
                        >
                        <b-card-text>
                            <img class="mb-1" :src="items.data.icon" alt="avatar icon from dicebear api">
                            <h4 class="mb-1">{{index + 1 + '. ' + items.name.toUpperCase()}}</h4>
                            <p class="mb-1">{{items.data.playedAs.toUpperCase()}}</p>
                            <h1 class="smallFont">{{items.data.highScore}}</h1>
                        </b-card-text>
                        </b-card>
                    </b-card-group>
                    <b-card-group deck class="mb-3">
                        <b-card
                            v-for="(items, index) in leaderboardMid"
                            :key="items + index"
                        >
                        <b-card-text>
                            <img class="mb-1" :src="items.data.icon" alt="avatar icon from dicebear api">
                            <h4 class="mb-1">{{index + 1 + '. ' + items.name.toUpperCase()}}</h4>
                            <p class="mb-1">{{items.data.playedAs.toUpperCase()}}</p>
                            <h1 class="smallFont">{{items.data.highScore}}</h1>
                        </b-card-text>
                        </b-card>
                    </b-card-group>
                    <b-card-group deck>
                        <b-card
                            v-for="(items, index) in leaderboardLow"
                            :key="items + index"
                        >
                        <b-card-text>
                            <img class="mb-1" :src="items.data.icon" alt="avatar icon from dicebear api">
                            <h4 class="mb-1">{{index + 1 + '. ' + items.name.toUpperCase()}}</h4>
                            <p class="mb-1">{{items.data.playedAs.toUpperCase()}}</p>
                            <h1 class="smallFont">{{items.data.highScore}}</h1>
                        </b-card-text>
                        </b-card>
                    </b-card-group>
                </section>

                <section v-else-if="leaderboards.length <= 0">
                    <p>Leaderboards are empty, carve your own path and make Kingloyal history!</p>
                </section>
            </section>
        </transition>
    
        <section>
            <b-button size="lg" @click="home()"><h4>Main Menu</h4></b-button>
        </section>
</b-col>
</template>

<script>
import { mapState } from 'vuex'

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
    leaderboardTop: function() {
        return this.leaderboards.slice(0,3)
    },
    leaderboardMid: function() {
        return this.leaderboards.slice(3,6)
    },
    leaderboardLow: function() {
        return this.leaderboards.slice(6,9)
    }
  },
  created() {
      this.$store.commit('gameData/clearLeaderboard')
      this.$store.dispatch('authData/fetchLeaderboard')
  }
}
</script>

<style scoped>
.card img{
    width:40px;
}

.smallFont {
    font-size:1.5vw;
}
</style>
