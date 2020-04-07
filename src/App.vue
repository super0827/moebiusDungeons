<template>
  <div id="app">

    <!-- DEBUGGING -->
    <section class="debugBar">
      <p>METHODS</p>
      <section>Kill Player</section>
      <section @click="killMonster()">Kill Monster</section>
      <section>New Monster</section>
      <br>
      <p>END GAME</p>
      <section @click="scene = 'winner'">Win Screen</section>
      <section @click="scene = 'loser'">Lose Screen</section>
      <br>
      <p>SCENES</p>
      <section @click="storeState.phase = 'InstructionsScreen'">Instructions</section>
      <section @click="storeState.phase = 'CharacterSelect'">Char Select</section>
      <section @click="storeState.phase = 'ShopPhase'">Shop</section>
      <section @click="storeState.phase = 'DungeonPhase'">Dungeon</section>
    </section>

    <!-- GUI -->
      <transition name="fade" mode="out-in">
        <component 
        :key="storeState.phase"
        :is="storeState.phase"></component>
      </transition> 

</div>
</template>

<script>
import './assets/styles/globals.css';
import './assets/styles/animatedCSS.css';
import './assets/styles/transitions.css';

import { EventBus } from "./js/event-bus";
import { store } from "./store"

import CharacterSelect from './components/CharacterSelect.vue';
import DungeonPhase from './components/DungeonPhase.vue';
import ShopPhase from './components/ShopPhase.vue';

import InstructionsScreen from './components/InstructionsScreen.vue';

import WinScreen from './components/WinScreen.vue';
import LoseScreen from './components/LoseScreen.vue';

export default {
  name: 'App',
  components: {
    InstructionsScreen,
    CharacterSelect,
    DungeonPhase,
    ShopPhase,
    WinScreen,
    LoseScreen,
  },
  data() {
    return {
      scene: 'characterSelect',
      helper: "",
      storeState: store.state,
    }
  },
  methods: {
    killMonster() {
      this.storeState.monster.health = 0;
      EventBus.$emit('is-monster-dead');
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

.battleWrapper {
  width:400px;
  max-width:400px;
}

.phaseName {
  font-size:40px;
  margin:10px 0;
}

.gameplayWrapper {
  width:600px;
  min-width:600px;
  margin:0 auto;
  position:relative;
}


/* HELPERS */
    #dungeonHelp {
        font-size: 20px;
        position:fixed;
        right:10px;
        top:10px;
        margin:0;
        padding:5px;
        background:rgb(218, 218, 218);
    }

    #dungeonHelp:hover {
        background:rgb(240, 240, 240);
        cursor:pointer
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
