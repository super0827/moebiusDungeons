<template>
  <section class="columns">
      
      <img class="sigil" src="../assets/imgs/icons/playerSigilIcon.png" alt="">
      <h3>YOU</h3>
      <img class="portrait" :src="player.portrait">
      
      <section class="flexRow stats">

        <section>
          <p>{{ player.health }}</p>
          <img src="../assets/imgs/icons/healthIcon.png">
        </section>
        
        <section>
          <p>{{ player.armor }}</p>
          <img src="../assets/imgs/icons/armorIcon.png">
        </section>
        
        <section>
          <p> d{{ player.attackMax }}</p>
          <img :src="player.attackTypeImage">
        </section>

      </section>

      <section class="coinWrapper">
        <img src="../assets/imgs/icons/coinIcon.png" alt="">
        <h1 class="coinValue">{{ player.coins }}</h1>
      </section>

  </section>
</template>

<script>

export default {
  name: 'PlayerPortrait',
  props:{
    player: {
      type: Object
    }
  },
  }
</script>

<style scoped>

</style>
