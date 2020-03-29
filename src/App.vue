<template>
  <div id="app">

    <section class="debugBar">
      <section>Kill Player</section>
      <section>Kill Monster</section>
      <section>Set Scene To Shop</section>
      <section @click="this.scene = 'dungeon'">Set Scene To Dungeon</section>
      <section @click="this.scene = 'characterSelect'">Set Scene To Player Select</section>
    </section>

    <transition name="fade" mode="out-in">
      <character-select @to-dungeon="scene = 'dungeon'" v-if="scene == 'characterSelect'"/>
      <dungeon-screen v-else-if="scene == 'dungeon'"/>
    </transition>
  </div>
</template>

<script>
import './assets/styles/globals.css';
import './assets/styles/animatedCSS.css';
import './assets/styles/transitions.css';

// import InstructionsScreen from './components/InstructionsScreen.vue';
import CharacterSelect from './components/CharacterSelect.vue';
import DungeonScreen from './components/DungeonScreen.vue';
// import WinScreen from './components/WinScreen.vue';
// import LoseScreen from './components/LoseScreen.vue';

export default {
  name: 'App',
  components: {
    CharacterSelect,
    DungeonScreen,
    // InstructionsScreen,
    // WinScreen,
    // LoseScreen,
  },
  data() {
    return {
      scene: 'characterSelect',
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
                    
.debugBar {
  font-family: var(--paragraphs-type);
  display:inline;
  position:fixed;
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
