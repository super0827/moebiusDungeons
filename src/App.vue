<template>
  <div id="app">

    <!-- DEBUGGING -->

    <section class="debugBar">
      <section @click="debugShow = !debugShow">
        DEBUG BAR
      </section>

      <article v-if="debugShow">
      <p>MONSTER</p>
      <section @click="storeState.monsterRoster = 0">Reset Monster Roster</section>
      <section @click="storeState.monster.health+=100">Monster HP +100</section>
      <section @click="storeState.monster.health+=10">Monster HP +10</section>
      <section @click="storeState.monster.health = 10">Monster HP =10</section>
      <br>
      <p>PLAYER</p>
      <section @click="storeState.player.health+=100">Player HP +100</section>
      <section @click="storeState.player.health+=10">Player HP +10</section>
      <section @click="storeState.player.health = 10">Player HP =10</section>
      <section @click="storeState.player.coins += 1">+1 Coin</section>
      <section @click="storeState.player.coins += 10">+10 Coins</section>
      <br>
      <p>SCENES</p>
      <section @click="store.sceneChange('InstructionsScreen')">Instructions</section>
      <section @click="store.sceneChange('CharacterSelect')">Char Select</section>
      <section @click="store.sceneChange('ShopPhase')">Shop</section>
      <section @click="store.sceneChange('DungeonPhase')">Dungeon</section>
      <br>   
      <p>END GAME</p>
      <section @click="store.sceneChange('WinScreen')">Win Screen</section>
      <section @click="store.sceneChange('LoseScreen')">Lose Screen</section>
      </article>
    </section>

    <!-- GUI -->
      <transition name="fade" mode="out-in">
        <component 
        :key="storeState.phase"
        :is="storeState.phase"
        :music="this.music"
        ></component>
      </transition> 

</div>
</template>

<script>
import './assets/styles/globals.css';
import './assets/styles/animatedCSS.css';
import './assets/styles/transitions.css';

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
      store: store,
      debugShow: false,
    }
  },
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
  margin:10px;
  font-family: var(--paragraphs-type);
  text-align:center;
  display:inline;
  position:fixed;
  font-size:13px;
  top:0px;
  z-index:999999;
  min-width:200px;
  opacity:0.7;
  color:white;
  left:0px;
  background:black;
  text-transform:uppercase;
}

.debugBar section {
  text-align:center;
  padding:1px;
  margin:3px;
  border:solid #eee 2px;
}
</style>
