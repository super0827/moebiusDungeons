<template>
  <div id="app">

    <!-- DEBUGGING -->
    <section class="debugBar">
      <p>METHODS</p>
      <section>Kill Player</section>
      <section>Kill Monster</section>
      <br>
      <p>END GAME</p>
      <section @click="scene = 'winner'">Win Screen</section>
      <section @click="scene = 'loser'">Lose Screen</section>
      <br>
      <p>GAMEPLAY</p>
      <section @click="scene = 'characterSelect'">Player Select</section>
      <section @click="scene = 'instructions'">Instructions</section>
      <section @click="scene = 'gameplay'">Gameplay</section>
      <section @click="gameplayScene = 'shop'">Shop</section>
      <section @click="gameplayScene = 'dungeon'">Shop</section>
    </section>



    <!-- GUI -->
    <transition name="fade" mode="out-in">

      <!-- Character Selection Screen-->
      <character-select @character-chosen="createPlayer($event)" @to-dungeon="scene = 'gameplay'" v-if="scene == 'characterSelect'"/>

      <instructions-screen v-else-if="scene == 'instructions'"/>

      <!-- Gameplay Screen -->
      <section v-else-if="scene == 'gameplay'">

        <h1 class=""> {{ gameplayScene }} </h1>

        <section class="flexRow">
        <player-portrait 
          :player="player"
          class="animated zoomInLeft"
        />

        <section v-if="gameplayScene == 'dungeon'">
          <battle-controls/>
          <monster-portrait/>
        </section>

        <shop-controls/>
        <shop-portrait/>
        </section>
      
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
import BattleControls from './components/BattleControls.vue';
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
    BattleControls,
    MonsterPortrait,
    PlayerPortrait,
    ShopControls,
    ShopPortrait,
  },
  data() {
    return {
      scene: 'characterSelect',
      gameplayScene: 'dungeon',
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


                  
/* Debug Styles - REMOVE FOR PRODUCTION */
.debugBar {
  font-family: var(--paragraphs-type);
  text-align:center;
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
