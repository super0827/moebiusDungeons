<template>
  <div id="app">

    <!-- DEBUGGING -->
    <section class="debugBar">
      <p>METHODS</p>
      <section>Kill Player</section>
      <section>Kill Monster</section>
      <section>New Monster</section>
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
      <section @click="gameplayScene = 'dungeon'">Dungeon</section>
    </section>

    <!-- GUI -->
    <transition name="fade" mode="out-in">

      <!-- Character Selection Screen-->
      <character-select 
      @instructions="scene = 'instructions'"
      @character-chosen="createPlayerData($event)" 
      @to-dungeon="scene = 'gameplay'" 
      v-if="scene == 'characterSelect'"/>

      <!-- Instructions Screen -->
      <instructions-screen 
      @understood="scene = 'characterSelect'" 
      v-if="scene == 'instructions'"/>

      
      <!-- Gameplay Screen -->
      <section class="gameplayWrapper" v-if="scene == 'gameplay'">
        
        <!-- Title For Phase -->
        <transition appear
          enter-active-class="animated zoomInDown"
          leave-active-class="amimated zoomOutDown"
        >
          <section class="flexColumn">
            <img class="iconImageSize" src="./assets/imgs/icons/monsterSigilIcon.png" alt="">
            <h1 class="textCenter phaseName">{{ gameplayScene }}</h1>
          </section>
        </transition>


        <!-- Wrapper for Gameplay -->
        <section class="flexRow">
          
          <!-- Player Portrait and Stats - Always show during gameplay -->
          <player-portrait :playerData="playerData"/>


            <!-- Battle Controls for Dungeon Scene -->
            <battle-controls
            v-if="gameplayScene == 'dungeon'"
            :playerData="playerData"
            :monsterData="monsterData"
            />

            <!-- Monster Portait and Stats for Dungeon Scene -->
            <monster-portrait
            v-if="gameplayScene == 'dungeon'"
            @send-monster="createMonsterData($event)"
            @monster-is-dead="gameplayScene = 'shop'"
            />

          <section class="flexRow" v-if="gameplayScene == 'shop'">
            <shop-controls/>
            <shop-portrait/>
          </section>

        <transition name="fade" mode="out-in">
          <battle-help @close="helper = ''" v-if="helper=='battle'"/>
        </transition>

        </section>

        <!-- HELPERS -->
        <h1 @click="helper = 'battle'" id="dungeonHelp">DUNGEON HELP</h1>

      </section>

      <win-screen v-if="scene == 'winner'"/>

      <lose-screen v-if="scene == 'loser'"/>

    </transition>
  </div>
</template>

<script>
import './assets/styles/globals.css';
import './assets/styles/animatedCSS.css';
import './assets/styles/transitions.css';

import InstructionsScreen from './components/InstructionsScreen.vue';
import CharacterSelect from './components/CharacterSelect.vue';
import BattleHelp from './components/BattleHelp.vue';

import PlayerPortrait from "./components/PlayerPortrait.vue";

import BattleControls from './components/BattleControls.vue';
import MonsterPortrait from "./components/MonsterPortrait.vue";

import ShopControls from "./components/ShopControls.vue";
import ShopPortrait from "./components/ShopPortrait.vue";

import WinScreen from './components/WinScreen.vue';
import LoseScreen from './components/LoseScreen.vue';

export default {
  name: 'App',
  components: {
    InstructionsScreen,
    CharacterSelect,
    BattleHelp,
    PlayerPortrait,
    BattleControls,
    MonsterPortrait,
    ShopControls,
    ShopPortrait,
    WinScreen,
    LoseScreen,
  },
  data() {
    return {
      scene: 'characterSelect',
      gameplayScene: 'dungeon',
      playerData: null,
      monsterData: null,
      helper: "",
    }
  },
  methods: {
    createPlayerData(player) {
      this.playerData = player;
    },
    createMonsterData(monster) {
      this.monsterData = monster;
    },
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
  font-size:60px;
  margin:10px 0;
}

.iconImageSize {
  width:75px;
  margin-right:10px;
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
