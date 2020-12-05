<template>
<section class="wrapper">
    <section v-if="health <= 0">
        <h1>Death was always lurking.</h1>
        <h3>These dungeons are dangerous, and rife with infinite challenge.</h3>
        <p>When you die in the dungeons you can't submit your score to the leaderboards.</p>
        <p>Try retiring next time before you die.</p>
    </section>

    <section class="flexColumn" v-if="health > 0">
        <h1>Well done, kingloyal.</h1>
        <h3>You've retired and submitted your score to the leaderboards.</h3>
        <p>Try to beat your high score and compete for the top of the list.</p>
    </section>

    <section id="gameStats">
        
        <h1 class="buffer animated pulse slow">FINAL STATS</h1>
        <p>You played as a {{ name }}.</p>
        
        <br>

        <section id="finalStats">
            <section class="flexRow block">
                <section class="commas">
                    <h2>Monsters Slain:</h2>
                    <span class="uppercase" v-for="(monsters, index) in monstersKilled" :key="monsters+index" id="monstersFought">{{ monsters }}</span>
                </section>
            </section>
            
            <section class="flexRow block">
                <section id="totalDamageWrapper">
                    <h2>Highest Health:</h2>
                    <p id="totalDamage">{{ highestHealth }}</p>
                </section>

                <section id="totalDamageWrapper">
                    <h2>Highest Armor:</h2>
                    <p id="totalDamage">{{ highestHealth }}</p>
                </section>

                <section id="totalDamageWrapper">
                    <h2>Highest Attack:</h2>
                    <p id="totalDamage">{{ highestAttack }}</p>
                </section>
            </section>

            <section class="flexRow block">
                <section>
                    <h2>Damage Dealt:</h2>
                    <p>{{ totalDamageDealt }}</p>
                </section>
                
                <section>
                    <h2>Damage Taken:</h2>
                    <p>{{ totalDamageTaken }}</p>
                </section>

                <section>
                    <h2>Damage Blocked:</h2>
                    <p>{{ damageBlocked }}</p>
                </section>
            </section>

            <section class="flexRow block">
                <section>
                    <h2>Coins Looted:</h2>
                    <p>{{ totalCoins }}</p>
                </section>

                <section>
                    <h2>Coins Spent</h2>
                    <p>{{ coinsSpent }}</p>
                </section>
            </section>
        </section>

        <br>

        <section>
            <h3>FINAL SCORE</h3>
            <h1 class="nomargin">{{score}}</h1>
        </section>

    </section>

        <section class="playAgain">    
            <p @click="reset()">DELVE THE DUNGEONS AGAIN</p>
        </section>
</section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import LeaderBoard from '@/store/modules/leaderboardData'
import PlayerData from '@/store/modules/playerData'
import BackgroundMusic from '@/plugins/backgroundMusic'

export default {
  name: 'LoseScreen',
  data() {
      return {
        music: ['loseScreen'],  
      }
  },
  props: {
  },
  methods: {
      reset() {
          this.$store.commit('gameData/mutate', {property:'phase', with:'SavedGame'})
          this.$store.dispatch('authData/deleteSavedGame')
          
      },
      leaderboards() {
          this.$store.commit('gameData/mutate', {property:'phase', with:'LeaderBoard'})
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
    ...mapGetters('leaderboardData', {
        score: 'highScore',
        }),
    ...mapGetters('playerData', {
        health: 'calcHealth',
        }),
    ...mapState('playerData', {
        name: state => state.info.name,
    }),
  },
  created(){
      this.$store.dispatch('authData/deleteSavedGame');
  }
}
</script>

<style scoped>

.buffer {
    margin:5px;
}

.commas span:last-of-type:after
{
    content:'';
}

.commas span::after {
    content:', ';

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
    transition:background-color .6s ease-in-out;
}

.playAgain p:hover {
    background:rgb(167, 0, 0);
    cursor:pointer;
    transition:background-color .6s ease-in-out;
}

.seeLeaderboards p {
    background:black;
    color:white !important;
    font-family: Arial, Helvetica, sans-serif;
    font-size:20px;
    padding:20px;
    margin:0 auto;
    text-align:center;
    width:60%;
    border:none;
    transition:background-color .6s ease-in-out;
}

.seeLeaderboards p:hover {
    background:rgb(206, 134, 0);
    cursor:pointer;
    transition:background-color .6s ease-in-out;
}
</style>
