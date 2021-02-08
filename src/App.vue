<template>
  <b-container id="app" class="h-100">
		<b-row align-v="center" class="h-100" align-h="center">
      <b-col align-self="start" cols="1" class="h-10 d-flex flex-column justify-content-start mr-n4">
        <transition-group name="fade" mode="out-in">
          <TheLoginBar key="loginBar" v-if="phase != 'Loading'"/>
        </transition-group>
          <DebugBar key="debugBar" v-if="debugShow"/>
      </b-col>

			<b-col align-self="center" cols="10" class="h-80 d-flex justify-content-center align-items-center mx-n4">
        <transition name="fade" mode="out-in">
          <component
          :key="phase"
          :is="phase"
          ></component>
        </transition>
      </b-col>

			<b-col align-self="end" cols="1" class="h-10 ml-n4 mb-1">
				<div class="info d-flex flex-row justify-content-end align-items-center text-center">
				  <b-button class="mr-3" variant="info" size="sm">
            <a class="text-white" href="https://github.com/MisuseofMana/moebiusDungeons/issues">Report Issues</a>
          </b-button>
          <b-button variant="info" size="sm">
          <a class="text-decoration-none text-white" href="https://github.com/MisuseofMana/moebiusDungeons/blob/master/ChangeLog.md" target="_blank">v.1.3.5</a>
          </b-button>
        </div>
      </b-col>
    </b-row>

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
    toggleDebug() {
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
	height:100vh;
	width:100vw;
}

.info {
  min-width:200px;
}
</style>
