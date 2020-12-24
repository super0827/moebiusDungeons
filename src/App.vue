<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <section class="flexColumn">
        <section key="loginBar" v-if="phase != 'Loading'" class="user">
          <TheLoginBar />
          <DebugBar v-if="debugShow"/>
        </section>
      </section>
    </transition>

    <section class="version">
      <p><a href="https://github.com/MisuseofMana/moebiusDungeons/blob/master/ChangeLog.md" target="_blank">v.1.3.2</a></p>
      <p class="smallText">Stable in Google Chrome</p>
      <p class="smallText">Buggy in Firefox</p>
    </section>

    <Keypress key-event="keyup" :key-code="192" @success="toggleDebug" />

    <!-- GUI -->
     <transition v-if="(acceptableBrowser !== 'unsupported' && acceptableDevice)" name="fade" mode="out-in">
        <component 
        :key="phase"
        :is="phase"
        ></component>
      </transition>

      <transition name="fade" mode="out-in">
        <section  v-if="(acceptableBrowser === 'unsupported' && acceptableDevice)" class="flexColumn">
          <h1>Oh Dang!</h1>
          <p>Looks like Moebius Dungeons isn't available for your browser just yet.</p>
          <p>Currently the game works best on Google Chrome and alright on Mozilla Firefox</p>
          <p>Download one of those browsers and try again.</p>
          <section class="flexRow">
              <a href="https://www.google.com/chrome/">
                <h3 class="linkButton">Get Google Chrome</h3>
              </a>

              <a href="https://www.mozilla.org/en-US/firefox/">
                <h3 class="linkButton">Get Mozilla Firefox</h3>
              </a>
          </section>
        </section>
      </transition>

      <transition name="fade" mode="out-in">
        <section  v-if="!acceptableDevice" class="flexColumn">
          <h1>Oops!</h1>
          <p>Moebius Dungeons isn't available on mobile devices yet!</p>
          <p>Come back on a desktop device to delve the dungeons!</p>
        </section>
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
      acceptableBrowser() {
        let browser = this.$browserDetect;
        if(browser.isChrome) return 'supported';
        if(browser.isSafari || browser.isOpera || browser.isEdge || browser.isIE) return 'unsupported';
        if(browser.isFirefox) return 'experimental'
      },
      acceptableDevice() {
        let device = this.$browserDetect;
        if (device.$isIOS) return false
        return true
      }
  },
  mounted() {
    this.$store.commit('monsterData/newMonster');
    this.$store.dispatch('monsterData/GENERATE_MONSTER_STATS');
    consoleHello();
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

.user {
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

.version {
  margin:10px 20px 10px 10px;
  font-family: var(--paragraphs-type);
  text-align:center;
  display:inline;
  position:fixed;
  font-size:13px;
  bottom:0px;
  z-index:999999;
  color:black;
  right:0px;
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
