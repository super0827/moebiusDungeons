<template>

  <section>
      <h1>Dungeon</h1>

      <player-portrait/>


      <game-controls/>
      <monster-portrait/>

      <shop-controls/>
      <shop-portrait/>



  </section>

</template>

<script>
import GameControls from "./GameControls.vue";
import MonsterPortrait from "./MonsterPortrait.vue";
import PlayerPortrait from "./PlayerPortrait.vue";
import ShopControls from "./ShopControls.vue";

export default {
  name: 'DungeonScreen',
  components: {
    GameControls,
    MonsterPortrait,
    PlayerPortrait,
    ShopControls,
  },
  props: [
      'postTitle'
    ],
  data() {
    return {
      someoneIsAttacking: false,
      player: null,
    }
  },
}
</script>

<style scoped>

</style>
