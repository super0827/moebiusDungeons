<template>
  <b-col cols='12' class="d-flex flex-column justify-content-start align-items-center">
    <!-- User Info Wrapper -->
    <!-- v-If renders inside the component wrapper to maintain a centered on screen effect during preloading -->
    <div class="loginBar d-flex flex-column justify-content-center text-center">

      <!-- Shows only if user is logged in -->
      <div class="d-flex flex-row justify-content-around align-items-center"  v-if="user.loggedIn == true">
        <b-button>
          <b-icon scale="1.2" @click="toggleSettings" icon="gear-fill" aria-hidden="true"></b-icon> 
        </b-button>
        <img class="m-1 avatar" :src="avatar" alt="an avatar icon">
        <p class="m-1">{{user.data ? user.data.displayName : "..."}}</p>
      </div>

      <!-- Helper text when user saves settings -->
      <p v-if="saveSuccessful">Settings Saved!</p>
      
      <!-- Helper text when user saves their game -->
      <section v-if="!canSave && helpTip">
        <p>Game was saved!</p>
      </section>

      <div v-else-if="user.loggedIn == false" class="loginBar d-flex flex-row align-items-center justify-content-around text-center">
        <b-button @click="$store.commit('gameData/mutate', {property: 'phase', with:'Register'})" class="clickable">Sign Up</b-button>
        <b-button @click="$store.commit('gameData/mutate', {property: 'phase', with:'Login'})" class="clickable" >Login</b-button>
      </div>

      <transition name="fade" mode="in-out">
        <section v-if="acceptablePhase" class="my-0 d-flex flex-column align-items-center justify-content-center border-top mt-2 mx-3">
          <p class="m-0 mt-2">
          Score: 
          <animated-number 
          :value="highScore"
          :duration="1000"
          :formatValue="wholeNumber"
          />
          </p>
        </section>
      </transition>

      <div v-if="settingShow && user.data != null" class="d-flex flex-column align-items-center">
        <section v-if="(canSave && acceptablePhase) && (user.data.displayName !== 'wanderer')" @click="saveGame" class="my-3">
          <b-button @click="saveGame()">
            Save Game
          </b-button>
        </section>

        <section v-if="!canSave && acceptablePhase" @click="saveGame">
          <p>Your game is saved, play more before saving again.</p>
        </section>
        
        <section v-if="!acceptablePhase" @click="saveGame">
          <p>Your game can't be saved on this screen.</p>
        </section>

        <h2>Settings</h2>
        <section class="d-flex flex-row align-items-center justify-content-between">
          <h4 class="m-0 mr-1">Tooltips:</h4>
          <b-button v-if="toolTip" @click="toggleToolTips">ON</b-button>
          <b-button v-else @click="toggleToolTips">OFF</b-button>
        </section>

        <section class="my-3"> 
          <b-button class="my-4" v-if="!saveSuccessful && user.data.displayName !== 'wanderer'" @click="saveSettings">Save Settings</b-button>
          <b-button class="mb-4" v-if="saveSuccessful">Save Settings</b-button>
          <b-button class="mb-2" @click="signOut">Sign Out</b-button>
          <b-button @click="mainMenu">Main Menu</b-button>
        </section>
      </div>
    </div>
  </b-col>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import firebase from "firebase/app";
import 'firebase/firestore'
import AnimatedNumber from "animated-number-vue";

export default {
components: {
  AnimatedNumber
},
    data() {
        return {
            debugShow: false,
            settingShow: false,
            saveMessage: 'Game Saved!',
            helpTip: false,
        }
    },
    computed: {
        ...mapState('authData', {
        user: state => state.user,
        toolTip: state => state.settings.tooltips,
        saveSuccessful: state => state.saveSuccessful
      }),
      ...mapGetters('authData', {
        avatar: 'userIcon',
        admin: 'adminAllowed'
      }),
      ...mapState('leaderboardData', {
        saveCheck: state => state.saveCheck,
      }),
      ...mapGetters('leaderboardData', {
        highScore: 'highScore',
      }),
      ...mapState('gameData', {
        phase: state => state.phase,
      }),
      canSave() {
        if(this.highScore === 0 || this.highScore > this.saveCheck ) {
          return true;
        }
        else if (this.highScore === this.saveCheck) {
          return false;
        }
      },
      acceptablePhase(){
        switch(this.phase){
          case 'CharacterSelect':
          case 'SavedGame':
          case 'LoseScreen':
          case 'LeaderBoard':
          case 'CreditsOverlay':
          case 'Login':
          case 'Register':
          case 'TermsPage':
            return false;
          default: return true;
        }
      }
    },
    methods: {
        signOut() {
        if(this.user.data.displayName !== 'wanderer'){
          this.$store.dispatch('authData/updateSavedGame');
        }

        this.settingShow = !this.settingShow;

        firebase
            .auth()
            .signOut()
            .then(() => {
                this.$store.commit('gameData/mutate', {property: 'phase', with: 'Login'});
            });

        },
        toggleSettings() {
          this.settingShow = !this.settingShow;
        },
        toggleToolTips() {
          this.$store.commit('authData/toggleUserData', {property:'tooltips'});
        },
        saveSettings() {
          this.$store.dispatch('authData/saveUserSettings');
          this.settingShow = !this.settingShow;
        },
        saveGame(){
          if(this.canSave && this.phase != 'CharacterSelect') {
             this.$store.dispatch('authData/updateSavedGame');
             this.$store.commit('leaderboardData/mutate', {property: 'saveCheck', with:this.highScore})
             this.helpTip = true;
             setTimeout(() => {
              this.helpTip = false;
             }, 3000)
          }
          else if(!this.canSave) {
            return
          }
        },
        mainMenu() {
          this.$store.dispatch('authData/updateSavedGame');
          this.$store.commit('gameData/mutate', {property: 'phase', with: 'SavedGame'});
        }
    }
}
</script>

<style scoped>
.loginBar {
  z-index:999;
  padding:5px;
  color:white;
  background:rgb(54, 54, 54);
  min-width:200px;
}

.avatar {
  width:40px;
  height:40px;
  margin:0 5px;
}
</style>