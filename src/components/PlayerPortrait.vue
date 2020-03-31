<template>
<transition appear
  name="custom-classes-transition"
  enter-active-class="animated zoomInLeft"
  leave-active-class="animated zoomOutLeft"
>
  <section class="columns">
      
      <h3>YOU</h3>
      <img class="portrait" :src="playerData.portrait">
      
      <section class="flexRow stats">

        <section>
          <p>{{ playerData.health }}</p>
          <img src="../assets/imgs/icons/healthIcon.png">
        </section>
        
        <section>
          <p>{{ playerData.armor }}</p>
          <img src="../assets/imgs/icons/armorIcon.png">
        </section>
        
        <section>
          <p> d{{ playerData.attackMax }}</p>
          <img :src="playerData.attackTypeImage">
        </section>

      </section>

      <section class="coinWrapper">
        <img src="../assets/imgs/icons/coinIcon.png" alt="">
        <h1 class="coinValue">{{ playerData.coins }}</h1>
      </section>

  </section>
</transition>
</template>

<script>

export default {
  name: 'PlayerPortrait',
  props:{
    playerData: {
      type: Object
    }
  },
  }
</script>

<style scoped>

</style>
