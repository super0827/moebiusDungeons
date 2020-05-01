<template>
<section>
<section id="playerDead" class="hidden">
        <section class="animated pulse slower infinite">
            <h2>Death was always lurking.</h2>
            <h2>These dungeons are dangerous, and rife with challenge.</h2>
        </section>
    </section>

    <section class="hidden" id="gameStats">
        
        <h1 class="animated pulse slow">FINAL STATS</h1>
        <p>You played as a <span id="playerType"></span></p>

        <br>
        
        <section id="finalStats">
            <section id="monstersFoughtWrapper">
                <h2>Monsters Fought:</h2>
                <p id="monstersFought"></p>
            </section>
            
            <section id="totalDamageWrapper">
                <h2>Total Damage Dealt:</h2>
                <p id="totalDamage"></p>
            </section>

            <section id="damageBlockedWrapper">
                <h2>Damage Blocked:</h2>
                <p id="damageBlocked"></p>
            </section>

            <section id="maxHealthWrapper">
                <h2>Max Health:</h2>
                <p id="maxHealth"></p>
            </section>

            <section id="mettleEarnedWrapper">
                <h2>Mettle Earned:</h2>
                <p id="mettleEarned"></p>
            </section>

            <section id="itemsBoughtWrapper">
                <h2>Items Bought</h2>
                <p id="itemsBought"></p>
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
export default {
  name: 'LoseScreen',
  props: {
  },
  created() {
      this.$sound.play('loseScreen');
  },
  beforeDestroy() {
      this.$sound.pause(`loseScreen`, {fade: 1200, volume: 0});
  }
}
</script>

<style scoped>

</style>
