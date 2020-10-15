<template>
<section>
<section>
        <section class="animated pulse slower infinite">
            <h2>Death was always lurking.</h2>
            <h2>These dungeons are dangerous, and rife with infinite challenge.</h2>
        </section>
    </section>

    <section id="gameStats">
        
        <h1 class="animated pulse slow">FINAL STATS</h1>
        <p>You played as a {{ name }}.</p>  

        <br>
        
        <section id="finalStats">
            <section id="monstersFoughtWrapper">
                <h2>Monsters Fought:</h2>
                <p id="monstersFought">{{ monstersKilled }}</p>
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
                <h2>Coins Spent</h2>
                <p id="itemsBought">{{ coinsSpent }}</p>
            </section>
        </section>

        <section>
            <h1>FINAL SCORE</h1>
            <h3></h3>
        </section>

        <footer id="thankYou">
            <h2>Thanks for playing!</h2>
            <p>Screenshot this page and post it to twitter, brag to your friends about your high score, or click the button below to submit your stats and play again!</p>
        </footer>

    </section>
       
        <section class="playAgain">    
            <p @click="reset()">DELVE THE DUNGEONS AGAIN, ADVENTURER</p>
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
    ...mapGetters('monsterData', {
            monsterRank: 'monsterRank',
        }),
    ...mapState('playerData', {
        name: state => state.info.name,
    }),
    playerScore: function() {
        let score = this.highestHealth + this.highestArmor + this.highestAttack + this.monstersKilled.length + this.coinsSpent + this.totalCoins + this.totalDamageDealt + this.totalDamageTaken + this.damageBlocked
        if(this.monsterRank === '') return score
        else if (this.monsterRank === 'virulent') return Math.floor(score * 2)
        else if (this.monsterRank === 'fearsome') return Math.floor(score * 2.5)
        else if (this.monsterRank === 'bloodless') return Math.floor(score * 3)
        else if (this.monsterRank === 'flawless') return Math.floor(score * 4)

    }
  },
}
</script>

<style scoped>

#gameStats {
    background-image:url('../assets/imgs/backgrounds/scrollHeader.png');
    background-size: contain;
    background-position: top;
    background-repeat: no-repeat;
    background-color:rgb(218,218,218);
    
    width:70%;
    border:rgb(70,70,70) solid 2px;
    margin:0 auto 20px auto;
    text-align:center;

    
    color:rgb(70,70,70);
    transition: none;
}

#gameStats h1 {
    margin-top:50px;
    margin-bottom:0px;  
    text-align:center;
}

#finalStats {
    display:grid;
    grid-template-columns:1fr 1fr 1fr;
    grid-template-rows:1fr 1fr;
    grid-gap: 10px;

    width:80%;
    margin:0 auto 0px auto;
}

#finalStats h2 {
    margin:0;
    font-size:18px;
    color:rgb(70,70,70);
}

#whowasI {
    margin-bottom:10px;
}

#gameStats p {
    color:rgb(70,70,70);
}

#monstersFoughtWrapper {
    grid-column: 1/2;
    grid-row:1/2;
    border:rgb(70,70,70) solid 2px;
    padding:10px;
}

#totalDamageWrapper {
    grid-column: 2/3;
    grid-row:1/2;
    border:rgb(70,70,70) solid 2px;
    padding:10px;
}

#damageBlockedWrapper {
    grid-column: 3/4;
    grid-row:1/2;
    border:rgb(70,70,70) solid 2px;
    padding:10px;
}

#maxHealthWrapper {
    grid-column: 1/2;
    grid-row:2/3;
    border:rgb(70,70,70) solid 2px;
    padding:10px;
}

#mettleEarnedWrapper {
    grid-column: 2/3;
    grid-row:2/3;
    border:rgb(70,70,70) solid 2px;
    padding:10px;
}

#itemsBoughtWrapper {
    grid-column: 3/4;
    grid-row:2/3;
    border:rgb(70,70,70) solid 2px;
    padding:10px;
}

#thankYou {
    margin:10px auto;
    width:80%;
}

#playerDead h2{
    text-align:center;
    font-size:25px;
}

#playerDead {
    margin-bottom:14px;
}

#statForm {
    margin:20px auto;
    display:flex;
}

#statForm input[type=submit] {
    background:black;
    color:white;
    font-family: Arial, Helvetica, sans-serif;
    font-size:20px;
    padding:20px;
    margin:0 auto;
    border:none;
}

#playerType {
    text-transform: uppercase;
    font-weight: 600;
}

#instructions {
    width:50%;
}

#instructions h2 {
    background:black;
    color:white;
    font-family: Arial, Helvetica, sans-serif;
    font-size:20px;
    padding:20px;
    margin:0 auto;
    border:none;
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
    transition:background-color 3s ease-in-out;
}

.playAgain p:hover {
    background:rgb(102, 0, 0);
    cursor:pointer;
    transition:background-color 3s ease-in-out;
}
</style>
