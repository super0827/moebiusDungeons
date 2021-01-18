<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <section class="userInfoBar">
        <section key="loginBar" v-if="phase != 'Loading'">
          <TheLoginBar />
          <DebugBar v-if="debugShow"/>
        </section>
      </section>
    </transition>

    <section class="version">
      <p><a href="https://github.com/MisuseofMana/moebiusDungeons/blob/master/ChangeLog.md" target="_blank">v.1.3.5</a></p>
      <p class="smallText"><a href="https://github.com/MisuseofMana/moebiusDungeons/issues">Report Issues Here</a></p>
    </section>

    <Keypress key-event="keyup" :key-code="192" @success="toggleDebug" />

    <!-- Game Interface - Switches Phases -->
     <transition name="fade" mode="out-in">
        <component
        class="gameArea flexColumn"
        :key="phase"
        :is="phase"
        ></component>
      </transition>
</div>
</template>

<script>
import '@/assets/styles/globals.css';
import '@/assets/styles/animatedCSS.css';
import '@/assets/styles/transitions.css';

import { mapState, mapGetters } from 'vuex'

import firebase from 'firebase/app'
import 'firebase/auth'

import SavedGame from '@/components/SavedGame.vue';
import StartScreen from '@/components/StartScreen.vue';

import CharacterSelect from '@/components/CharacterSelect.vue';
import DungeonPhase from '@/components/DungeonPhase.vue';
import ShopSelect from '@/components/ShopSelect.vue';
import ShopPhase from '@/components/ShopPhase.vue';
import LoseScreen from '@/components/LoseScreen.vue';
import LeaderBoard from '@/components/LeaderBoard.vue';
import TermsPage from '@/components/TermsPage.vue';
import DebugBar from '@/components/DebugBar.vue';
import Keypress from 'vue-keypress';
import Login from '@/components/authentication/Login.vue';
import Loading from '@/components/authentication/Loading.vue';
import TheLoginBar from '@/components/ui/TheLoginBar.vue';
import CreditsOverlay from '@/components/CreditsOverlay.vue';

import Register from '@/components/authentication/Register.vue';
import { consoleHello } from "@/components/mixins/consoleHello.js"


export default {
  name: 'App',
  components: {
    SavedGame,
    StartScreen,
    CharacterSelect,
    DungeonPhase,
    ShopSelect,
    ShopPhase,
    LoseScreen,
    Keypress,
    Login,
    Register,
    Loading,
    LeaderBoard,
    TermsPage,
    DebugBar,
    TheLoginBar,
    CreditsOverlay,
  },
  data() {
    return {
      preferences: false,
    }
  },
  methods: {
    toggleDebug(response) {
      if(this.user.data.displayName === 'Sean Yager'){
        this.$store.commit('gameData/toggle', {property:'debugShow'});
      }
    },
    togglePref(response) {
      this.preferences = !this.preferences
    },
  },
  computed: {
      ...mapState('gameData', {

        phase: state => state.phase,
        leaderboard: state => state.leaderboard,
        debugShow: state => state.debugShow
      }),
      ...mapState('authData', {
        user: state => state.user,
        settings: state => state.settings
      }),
      ...mapGetters('leaderboardData',{
        leaderBoard: 'snapshot',
      }),
      ...mapState('monsterData', {
        roster: state => state.roster
      }),
      ...mapState('shopkeepData', {
        variants: state => state.variants
      })
  },
  mounted() {
    consoleHello();
  },
}
</script>

<style>
#app {
  /* overflow:hidden; */
  width:100vw;
  height:100vh;
  margin:0;
  padding:0;
  display:grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 1fr 10fr 1fr;
  grid-gap: 10px;
}

.userInfoBar {
  grid-row:1/2;
  grid-column:1/3;
  margin:10px 0 0 10px;
  display:flex;
  justify-content:center;
  align-items:center;
  position:absolute;
}

.gameArea {
  grid-row:2/3;
  grid-column:2/12;
}

.phaseName {
  font-size:40px;
  margin:10px 0;
}

.pref:hover {
  color:gold;
  cursor:pointer;
  filter:saturate(5);
}

.prefBar {
  margin-top:5px;
}

.prefBar button {
  margin-bottom:10px;
  margin-top:10px;
  cursor:pointer;
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

.version {
  margin:10px 20px 10px 10px;
  font-family: var(--paragraphs-type);
  text-align:center;
  grid-row:3/4;
  grid-column: 12/13;
  font-size:13px;
  color:black;
  text-transform:uppercase;
}

a {
  text-decoration:none;
}

.linkButton {
  color:white;
  background:#777;
  padding:20px;
  margin:20px;
  border-radius:5px;
  text-decoration:none;
}

.linkButton:hover {
  color:black;
  background:#999;
}

.smallText {
  font-size:10px;
  text-transform:none;
}
</style>
