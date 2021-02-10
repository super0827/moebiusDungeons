<template>
  <div class="d-flex flex-column justify-content-start align-items-start" no-gutters>
    <div class="loginBar px-3 w-100 text-center" v-if="user.loggedIn == true">
      <div class="d-flex flex-row justify-content-between align-items-center">
        <b-button size="sm" class="m-2">
          <b-icon scale="1.2" @click="toggleSettings" icon="gear-fill" aria-hidden="true"></b-icon> 
        </b-button>
        <img class="m-2 avatar" :src="avatar" alt="an avatar icon">
        <p class="m-2">{{user.data ? user.data.displayName : "..."}}</p>
        
        <transition name="fade" mode="in-out">
        <section v-if="acceptablePhase">
          <p class="m-0">
          Score: 
          <animated-number 
          :value="highScore"
          :duration="1000"
          :formatValue="wholeNumber"
          />
          </p>
        </section>
      </transition>
      
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

      <div v-if="settingShow && user.data != null" class="d-flex flex-column align-items-center p-3">
        <section class="mb-3">
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
        </section>

        <h2>Settings</h2>
        <section class="d-flex flex-column align-items-center justify-content-between my-3">
          <div class="d-flex flex-row">
            <h4 class="m-0 mr-1">Tooltips:</h4>
            <b-button v-if="toolTip" @click="toggleToolTips">ON</b-button>
            <b-button v-else @click="toggleToolTips">OFF</b-button>
          </div>
          <div>
            <b-button class="my-4" v-if="!saveSuccessful && user.data.displayName !== 'wanderer'" @click="saveSettings">Save Settings</b-button>
            <b-button v-if="saveSuccessful">Save Settings</b-button>
          </div>
        </section>

        <h2>MENU</h2>
        <section class="my-3 d-flex flex-column"> 
          <b-button class="mb-2" @click="signOut">Sign Out</b-button>
          <b-button @click="mainMenu">Main Menu</b-button>
        </section>
      </div>
    </div>
  </div>
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
}

.avatar {
  width:40px;
  height:40px;
  margin:0 5px;
}
</style>