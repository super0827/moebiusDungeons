<template>
<section>
  <section class="hidden" id="combatOptions">

      <section id="combatToolTipWrapper">
          <p id="combatToolTip" class="fast hidden"></p>
      </section>

      <!-- Attack Button -->
      <section id="hackAndSlash">
          <h2 onclick="hackAndSlash()">Trade Blows</h2>
      </section>
      <!-- Run Button -->
      <section id="turnTail">
          <h2 onclick="turnTail()">Turn Tail</h2>
      </section>
  </section>

  <!-- SHOP ITEMS -->
  <section id="shopItems" class="hidden">
      <section id="dungeonButton" onclick="openDungeon();buttonHover.play();">
          <h2>FIGHT ANOTHER MONSTER</h2>
      </section>
      <br><br>
      <h3 id="item1does"></h3>
      <section class="travelItem">
          <p class="xpCost">1M</p> <p onclick="buyItem(this.id)" id="item1"></p>
      </section>

      <hr>
      
      <h3 id="item2does"></h3>
      <section class="travelItem">
          <p class="xpCost">2M<p> <p onclick="buyItem(this.id)" id="item2"></p>
      </section>

      <hr>

      <h3 id="item3does"></h3>
      <section  class="travelItem">
          <p class="xpCost">3M</p> <p onclick="buyItem(this.id)" id="item3"></p>
      </section>
  </section>
</section>
</template>

<script>
export default {
  name: 'GameControls',
  props: {
    
  }
}
</script>

<style scoped>

</style>
