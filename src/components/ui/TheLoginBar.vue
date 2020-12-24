<template>
    <div>
        <div class="loginBar" v-if="user.loggedIn == true">
          <img class="avatar" :src="avatar" alt="">
          <section class="flexRowBetween">
            <p>{{user.data ? user.data.displayName : "..."}}</p>
          </section>
          <div class="settings" @click="toggleSettings">
            <img src="@/assets/imgs/icons/settingsCog.png" alt="">
          </div>
        </div>

          <p v-if="saveSuccessful">Settings Saved!</p>
          <section v-if="!canSave && helpTip">
          <p>
            Game was saved!
          </p>
        </section>

      <div v-else-if="user.data == null" class="loginBar">
        <p @click="$store.commit('gameData/mutate', {property: 'phase', with:'Login'})" class="clickable" >Login</p>
        <p>|</p>
        <p @click="$store.commit('gameData/mutate', {property: 'phase', with:'Register'})" class="clickable">Sign Up</p>
      </div>

       <transition name="fade" mode="in-out">
        <section v-if="acceptablePhase" class="flexStart highscore">
          <p>Score:</p>
          <h1>
           <animated-number 
          :value="highScore"
          :duration="1000"
          :formatValue="wholeNumber"
          />
          </h1>
        </section>
        </transition>

      <div v-if="settingShow && user.data != null" class="settings flexRowCenter">
      <hr class="horRule">
        <section v-if="(canSave && acceptablePhase)" @click="saveGame" class="bigButton">
          <h3>
            Save Game
          </h3>
        </section>

        <section v-if="!canSave && acceptablePhase" @click="saveGame">
          <p class="widthSet">
            Your game is saved, play more before saving again.
          </p>
        </section>
        
        <section v-if="!acceptablePhase" @click="saveGame">
          <p class="widthSet">
            Your game can't be saved on this screen.
          </p>
        </section>

        <hr class="horRule">

        <h2>Settings</h2>
        <section class="flexRowStart">

          <p>
            Tooltips are:
          </p>

          <p v-if="toolTip" @click="toggleToolTips" class="button">ON</p>
          <p v-else-if="!toolTip" @click="toggleToolTips" class="button">OFF</p>
        </section>
        <br>
        <p v-if="!saveSuccessful" @click="saveSettings" class="bigButton">Save Settings</p>
        <p v-if="saveSuccessful" class="bigButton">Save Settings</p>

      <hr class="horRule">
      
      <section class="flexRow widthSet">
        <section>
          <p class="clickable bigButton" @click="signOut">Sign Out</p>
        </section>

        <!-- <section>
          <p class="clickable bigButton" @click="mainMenu">Main Menu</p>
        </section> -->
      </section>

      </div>

      <!-- <div class="prefBar flexColumn" v-if="preferences">
        <input
          :v-model="newName"
          placeholder="New Display Name"
        >
        <button>Change Display Name</button>
      </div> -->
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
            return false;
            break;
          default: return true;
        }
      }
    },
    methods: {
        signOut() {
        this.$store.dispatch('authData/updateSavedGame');

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
  display:flex;
  align-items:center;
  justify-content:space-evenly;
  padding:5px 5px;
  min-width:200px;
}

.loginBar img{
  width:40px;
  height:40px;
}

.loginBar .clickable:hover {
  cursor:pointer;
  color:gold;
}

.settings img {
  width:30px;
  height:30px;
  display:block;
  margin:0 5px;
  cursor:pointer;
}

.flexRowCenter {
  display:flex;
  align-items: center;
  justify-content:center;
  flex-direction: column;
}

.flexRowBetween {
  display:flex;
  flex-direction: row;
  align-items: space-between;
  justify-content: space-between;
}

.flexRowBetween p {
  margin:0 3px;
}

.flexRowStart {
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.settings {
  padding:10px;
}

.avatar {
  margin:0 5px;
}

.button, .bigButton {
  background:#777;
  padding:2px 5px;
  margin:0 0 0 10px;
  cursor:pointer;
}

.button:hover, .bigButton:hover {
  background:#ccc;
  color:black;
}

.horRule {
  width:100%;
}

.bigButton {
  margin:5px;
  padding:5px;
}

.widthSet {
  max-width:160px;
}

.highscore p, .highscore h1 {
  font-size:15px;
  line-height:20px;
  margin:0 0 10px 0;
}

.highscore p {
  margin-right:10px;
}
</style>