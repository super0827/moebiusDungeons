<template>
  <div id="app">

    <!-- DEBUGGING -->
    <section class="debugBar">
      <section @click="scene = 'characterSelect'">Player Select</section>
      <section>Kill Player</section>
      <section>Kill Monster</section>
      <section @click="scene = 'instructions'">Instructions</section>
      <section @click="scene = 'winner'">Win Screen</section>
      <section @click="scene = 'loser'">Lose Screen</section>
      <section @click="scene = 'dungeon'">Dungeon</section>
      <section @click="scene = 'shop'">Shop</section>
    </section>



    <!-- GUI -->
    <transition name="fade" mode="out-in">

      <!-- Character Selection Screen-->
      <character-select @character-chosen="createPlayer($event)" @to-dungeon="scene = 'dungeon'" v-if="scene == 'characterSelect'"/>

      <instructions-screen v-else-if="scene == 'instructions'"/>

      <!-- Gameplay Screen -->
      <section v-else-if="scene == 'dungeon'">
        <player-portrait 
          :player="player"
        />

        <game-controls/>
        <monster-portrait/>

        <shop-controls/>
        <shop-portrait/>
      </section>

      <win-screen v-else-if="scene == 'winner'"/>

      <lose-screen v-else-if="scene == 'loser'"/>

    </transition>
  </div>
</template>

<script>
import './assets/styles/globals.css';
import './assets/styles/animatedCSS.css';
import './assets/styles/transitions.css';

import InstructionsScreen from './components/InstructionsScreen.vue';
import CharacterSelect from './components/CharacterSelect.vue';
import WinScreen from './components/WinScreen.vue';
import LoseScreen from './components/LoseScreen.vue';
import GameControls from './components/GameControls.vue';
import MonsterPortrait from "./components/MonsterPortrait.vue";
import PlayerPortrait from "./components/PlayerPortrait.vue";
import ShopControls from "./components/ShopControls.vue";
import ShopPortrait from "./components/ShopPortrait.vue";

export default {
  name: 'App',
  components: {
    CharacterSelect,
    InstructionsScreen,
    WinScreen,
    LoseScreen,
    GameControls,
    MonsterPortrait,
    PlayerPortrait,
    ShopControls,
    ShopPortrait,
  },
  data() {
    return {
      scene: 'characterSelect',
      player: [],
    }
  },
  methods: {
    createPlayer(player) {
      this.player = player;
    }
  }
}
</script>

<style>
#app {
  overflow:hidden;
  width:100vw;
  height:100vh;

  margin:0;
  padding:0;

  display:flex;
  justify-content:center;
  align-items:center;
}
                    
.debugBar {
  font-family: var(--paragraphs-type);
  display:inline;
  position:fixed;
  font-size:10px;
  top:0px;
  color:white;
  left:0px;
  background:black;
}

.debugBar section {
  text-align:center;
  padding:8px;
  margin:3px;
  border:solid #eee 2px;
}

.debugBar section:hover {
  cursor:pointer;
  background:#999
}
</style>
