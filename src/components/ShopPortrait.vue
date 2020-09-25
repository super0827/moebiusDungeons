<template>
 <section key="shopPortComp" class="columns">

      <h3> {{ shopkeepName }}</h3>

      <img class="portrait" :src="shopPort">
      
      <section class="flexRow stats">

          <p> {{ shopTitle }} </p>

      </section>

      <section  @mouseenter="UiSounds.chit.play()" @click="$store.commit('gameData/mutate', {property: 'phase', with: 'DungeonPhase'})" class="backToDungeon">
        <h3>BACK TO THE DUNGEON</h3>
    </section>

  </section>
</template>

<script>
import {mapState} from 'vuex'
import UiSounds from '@/plugins/UiSounds.js'

export default {
    name: 'ShopPortrait',
    data() {
      return {
          UiSounds:UiSounds,
      }
    },
    computed: {
        ...mapState('shopkeepData', {
            shopkeepName: state => state.info.name,
            shopPort: state => state.info.portrait,
            saying: state => state.info.saying,
            shopTitle: state => state.info.shopTitle,
        }),
    },
}
</script>

<style scoped>
.columns {
    width:200px;
    min-width:200px;
    margin-left:10px;
}
h3 {
    text-transform:uppercase;
}
p{
    text-transform:uppercase;
}

.backToDungeon {
  text-align:center;
  border:2px solid black;
  padding:5px 0;
  margin-top:5px;
}

.backToDungeon:hover {
  background: rgb(253,229,144);
  cursor:pointer;
}
</style>
