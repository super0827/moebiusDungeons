<template>
  <b-container id="app" class="h-100 p-0">
        <b-row class="viewHeight10 justify-content-between" no-gutters>
          <b-col cols="3 mt-2">
            <transition name="fade" mode="out-in">
              <TheLoginBar key="loginBar" v-if="phase != 'Loading'"/>
            </transition>
              <DebugBar key="debugBar" v-if="debugShow"/>
          </b-col>

          <b-col cols="2" class="d-flex justify-content-end mt-2">
            <transition name="fade" mode="out-in">
              <div v-if="helperAvailable">
                <h1 class="small"><b-button @mouseenter="UiSound.chit.play()" @click="toggleHelper()">{{helperText[phase]}}</b-button></h1>
              </div>
            </transition>
          </b-col>
        </b-row>

        <b-overlay
          id="overlay"
          no-center
          :show="helper"
          bg-color="#eee"
          opacity="0.99"
          blur="5px"
        >
          <template class="border" #overlay>
            <b-row class="h-10" style="z-index:999">
              <b-col cols="12" class="d-flex justify-content-end">
                <h1 class="text-danger cursor py-2 px-4 m-0" @click="toggleHelper()">X</h1>
              </b-col>
            </b-row>
            <component
            :key="phase + 'helper'"
            :is="phase + 'Helper'"
            >
            </component>
          </template>
            <b-row align-v="center" class="viewHeight80 d-flex justify-content-center align-items-center" no-gutters>
              <b-col align-self="center" cols="12" class="h-80 d-flex justify-content-center align-items-center">
                  <transition name="fade" mode="out-in">
                    <component
                    :key="phase"
                    :is="phase"
                    ></component>
                  </transition>
                </b-col>
            </b-row>
        </b-overlay>
          
        <b-row align-v="end" class="viewHeight10">
          <b-col cols="12" class="d-flex justify-content-end mb-3">
            <b-button class="mr-3" variant="info" size="sm" @mouseenter="UiSound.chit.play()">
              <a class="text-white" href="https://github.com/MisuseofMana/moebiusDungeons/issues" target="_blank">Report Issues</a>
            </b-button>
            <b-button variant="info" size="sm" @mouseenter="UiSound.chit.play()">
              <a class="text-decoration-none text-white" href="https://github.com/MisuseofMana/moebiusDungeons/blob/master/ChangeLog.md" target="_blank">v.1.3.5</a>
            </b-button>
          </b-col>
        </b-row>
    </transition>

    <Keypress key-event="keyup" :key-code="192" @success="toggleDebug"/>
  </b-container>
</template>

<script>
import '@/assets/styles/globals.css';
import '@/assets/styles/animatedCSS.css';
import '@/assets/styles/transitions.css';
import '@/assets/styles/scrollbars.css';

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
import WorldMap from '@/components/WorldMap.vue';


import CharacterSelectHelper from '@/components/helpers/CharacterSelectHelper'
import DungeonPhaseHelper from '@/components/helpers/DungeonPhaseHelper.vue';

import Register from '@/components/authentication/Register.vue';
import { consoleHello } from "@/components/mixins/consoleHello.js"

import UiSound from '@/plugins/UiSounds.js'

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
    WorldMap,

    CharacterSelectHelper,
    DungeonPhaseHelper,
  },
  data() {
    return {
      preferences: false,
      UiSound: UiSound,
      helperText:{
        'CharacterSelect':'Who To Pick',
        'DungeonPhase':'How To Fight',
        'WorldMap':'Map Help',
        'ShopSelect': 'Eyien Help'
      },
    }
  },
  methods: {
    toggleDebug() {
      if(this.user.data.displayName === 'Sean Yager'){
        this.$store.commit('gameData/toggle', {property:'debugShow'});
      }
    },
    togglePref(response) {
      this.preferences = !this.preferences
    },
    toggleHelper(event) {
      this.$store.commit('gameData/toggleHelp');
    }
  },
  computed: {
      ...mapState('gameData', {
        phase: state => state.phase,
        leaderboard: state => state.leaderboard,
        debugShow: state => state.debugShow,
        helper: state => state.helper,
        helperName: state => state.helperName,
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
      }),
      helperAvailable: function() {
        switch (this.phase) {
          case 'CharacterSelect':
          case 'DungeonPhase':
          case 'ShopSelect':
          case 'ShopPhase':
          case 'LeaderBoard':
          case 'WorldMap':
            return true;
            break;
          default:
            return false;
        }
      },
  },
  mounted() {
    consoleHello();
  },
}
</script>

<style>
#app {
	height:100vh;
	width:100vw;
}

.info {
  min-width:200px;
}

.viewHeight10 {
  height:10vh;
}

.viewHeight80 {
  height:80vh;
}

.cursor {
  cursor:pointer;
}

.z-999 {
  z-index:999;
}
</style>
