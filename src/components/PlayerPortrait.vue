<template>
  <section class="playerTile columns">
      
      <img class="sigil" src="../assets/imgs/icons/playerSigilIcon.png" alt="">
      <h3>YOU</h3>
      <img class="portrait" :src="player.portrait">
      
      <section class="flexRow">

        <section>
          <p>{{ player.health }}</p>
          <img src="../assets/imgs/icons/healthIcon.png">
        </section>
        
        <section>
          <p>{{ player.armor }}</p>
          <img src="../assets/imgs/icons/armorIcon.png">
        </section>
        
        <section>
          <p>{{ player.attackMax }}</p>
          <img :src="player.attackTypeImage">
        </section>

      </section>

      <section>
        
      </section>

  </section>
</template>

<script>

export default {
  name: 'PlayerPortrait',
  data() {
    return {
    }
  },
  props:{
    player: {
      type: Object
    }
  }
  }
</script>

<style scoped>

</style>
