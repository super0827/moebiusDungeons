<template>
<section>
<section>
        <section class="animated pulse slower infinite">
            <h2>Death was always lurking.</h2>
            <h2>These dungeons are dangerous, and rife with infinite challenge.</h2>
        </section>
    </section>

    <section class="hidden" id="gameStats">
        
        <h1 class="animated pulse slow">FINAL STATS</h1>
        <p>You played as a {{ name }}.</p>  

        <br>
        
        <section id="finalStats">
            <section id="monstersFoughtWrapper">
                <h2>Monsters Fought:</h2>
                <p id="monstersFought">{{ monstersFought }}</p>
            </section>
            
            <section id="totalDamageWrapper">
                <h2>Total Damage Dealt:</h2>
                <p id="totalDamage">{{ totalDamageDealt }}</p>
            </section>

            <section id="damageBlockedWrapper">
                <h2>Damage Blocked:</h2>
                <p id="damageBlocked">{{ damageBlocked }}</p>
            </section>

            <section id="maxHealthWrapper">
                <h2>Max Health:</h2>
                <p id="maxHealth">{{ highestHealth }}</p>
            </section>

            <section id="mettleEarnedWrapper">
                <h2>Coins Looted:</h2>
                <p id="mettleEarned">{{ totalCoins }}</p>
            </section>

            <section id="itemsBoughtWrapper">
                <h2>Items Bought</h2>
                <p id="itemsBought">{{ itemsBought }}</p>
            </section>
        </section>

        <footer id="thankYou">
            <h2>Thanks for playing!</h2>
            <p>Screenshot this page and post it to twitter, brag to your friends about your high score, or click the button below to send me your stats and play again!</p>
        </footer>

        <section class="playAgain">    
            <p onclick="window.location.reload();">DELVE THE DUNGEONS AGAIN, ADVENTURER</p>
        </section>
    </section>
</section>
</template>

<script>
import { mapState } from 'vuex'
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
        'itemsBought',
        'monstersFought',
    ]),
    ...mapState('playerData', {
        name: state => state.info.name,
    })
  },
}
</script>

<style scoped>

</style>
