<template>
  <div id="app">

    <keypress key-event="keyup" :key-code="192" @success="toggleDebug" />
    <!-- DEBUGGING -->

    <transition name="fade" mode="out-in">
    <section key="loginBar" v-if="phase != 'Loading'" class="user">

      <div class="loginBar" v-if="user.data != null">
        <p>{{user.data.displayName}}</p>
        <p>|</p>
        <p class="clickable" @click="signOut">Sign Out</p>
      </div>

      <div v-else-if="user.data == null" class="loginBar">
        <p @click="$store.commit('gameData/mutate', {property: 'phase', with:'Login'})" class="clickable" >Login</p>
        <p>|</p>
        <p @click="$store.commit('gameData/mutate', {property: 'phase', with:'Register'})" class="clickable">Sign Up</p>
      </div>
   
    </section>
    </transition>

    <section class="debugBar" v-if="!testMode">
      <section @click="debugShow = !debugShow">
        <h3>DEBUG BAR</h3>
      </section>

      <article class="debugContent" v-if="debugShow">
        <p>SCENES</p>

        <section>
          <section class="flexColumn">
          <span>SCENE SELECT</span>
            <button @click="$store.commit('gameData/mutate', {property: 'phase', with:'StartScreen'})">STARTING SCREEN</button>
            <button @click="$store.commit('gameData/mutate', {property: 'phase', with:'CharacterSelect'})">CHARACTER SCREEN</button>
            <button @click="$store.commit('gameData/mutate', {property: 'phase', with:'DungeonPhase'})">DUNGEON</button>
            <button @click="$store.commit('gameData/mutate', {property: 'phase', with:'ShopSelect'})">SHOP SELECT</button>
            <button @click="$store.commit('gameData/mutate', {property: 'phase', with:'ShopPhase'})">SHOP</button>
            <button @click="$store.commit('gameData/mutate', {property: 'phase', with:'WinScreen'})">WIN SCREEN</button>
            <button @click="$store.commit('gameData/mutate', {property: 'phase', with:'LoseScreen'})">LOSE SCREEN</button>
          </section>
        </section>

        <p>MONSTER</p>
        <section>
          <span>HEALTH</span>
          <section>
            <button @click="$store.commit('monsterData/mutateInfo', {property: 'baseHealth', with:1})">1</button>
            <button @click="$store.commit('monsterData/mutateInfo', {property: 'baseHealth', with:99})">99</button>
          </section>
        </section>
        
        <br>

        <p>PLAYER</p>
        
        <section>
          <span>HEALTH</span>
          <section>
            <button @click="$store.commit('playerData/mutateInfo', {property: 'baseHealth', with:1})">1</button>
            <button @click="$store.commit('playerData/mutateInfo', {property: 'baseHealth', with:99})">99</button>
          </section>
        </section>
      
        <section>
          <span>ARMOR</span>
          <section>
          <button @click="$store.commit('playerData/mutateInfo', {property: 'baseArmor', with:5})">5</button>
          <button @click="$store.commit('playerData/mutateInfo', {property: 'baseArmor', with:99})">99</button>
          </section>
        </section>
        
        <section>
          <span>ATTACK</span>
          <section>
          <button @click="$store.commit('playerData/mutateInfo', {property: 'baseAttackMax', with:5})">5</button>
          <button @click="$store.commit('playerData/mutateInfo', {property:'baseAttackMax', with:99})">99</button> 
          </section>
        </section>
        
        <section>
          <span>COINS</span>
          <section>
          <button @click="$store.commit('playerData/mutateInfo', {property:'coins', with:0})">0</button>
          <button @click="$store.commit('playerData/mutateInfo', {property:'coins', with:99})">99</button>
          </section>
        </section>
        
        <section>
          <span>METTLE</span>
          <section>
          <button @click="$store.commit('playerData/mutateInfo', {property:'mettle', with:0})">0</button>
          <button @click="$store.commit('playerData/mutateInfo', {property:'mettle', with:3})">3</button>
          </section>
        </section>

        <br>

        <p>SHOPKEEPS</p>
          <section>
            <section class="flexColumn">
              <button @click="$store.dispatch('shopkeepData/PICK_SHOPKEEP', {shopkeep:0})">CLERIC </button>
              <button @click="$store.dispatch('shopkeepData/PICK_SHOPKEEP', {shopkeep:1})">GRAVEROBBER</button>
              <button @click="$store.dispatch('shopkeepData/PICK_SHOPKEEP', {shopkeep:2})">MERCHANT</button>
              <button @click="$store.dispatch('shopkeepData/PICK_SHOPKEEP', {shopkeep:3})">WITCH</button>
            </section>
        </section>

        <br>
        
        <section>
          <h3 @click="testMode = !testMode">Enable Testing Mode</h3>
        </section>
      </article>
      
    </section>

    <!-- GUI -->
     <transition name="fade" mode="out-in">
        <component 
        :key="phase"
        :is="phase"
        ></component>
      </transition>

</div>
</template>

<script>
import './assets/styles/globals.css';
import './assets/styles/animatedCSS.css';
import './assets/styles/transitions.css';

import { mapState } from 'vuex'

import * as firebase from "firebase";

import StartScreen from './components/StartScreen.vue';

import CharacterSelect from './components/CharacterSelect.vue';
import DungeonPhase from './components/DungeonPhase.vue';
import ShopSelect from './components/ShopSelect.vue';
import ShopPhase from './components/ShopPhase.vue';
import LoseScreen from './components/LoseScreen.vue';
import Keypress from 'vue-keypress';
import Login from './components/authentication/Login.vue';
import Loading from './components/authentication/Loading.vue';

import Register from './components/authentication/Register.vue';

export default {
  name: 'App',
  components: {
    StartScreen,
    CharacterSelect,
    DungeonPhase,
    ShopSelect,
    ShopPhase,
    LoseScreen,
    Keypress,
    Login,
    Register,
    Loading
  },
  data() {
    return {
      testMode: true,
      debugShow: false,
    }
  },
  methods: {
    toggleDebug(response) {
      this.testMode = !this.testMode
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
           this.$store.commit('gameData/mutate', {property: 'phase', with: 'Login'});
        });
    }
  },
  computed: {
      ...mapState('gameData', {
          phase: state => state.phase
      }),
      ...mapState('authData', {
          user: state => state.user 
      }),
  },
  beforeMount(){
console.log(`
_____         _   _            ____                              
|     |___ ___| |_|_|_ _ ___   |    \ _ _ ___ ___ ___ ___ ___ ___ 
| | | | . | -_| . | | | |_ -|  |  |  | | |   | . | -_| . |   |_ -|
|_|_|_|___|___|___|_|___|___|  |____/|___|_|_|_  |___|___|_|_|___|
                                            |___|  
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMWKOkdlc:ccccdk0NMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMM0,            .:0MMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMNd'.  .'..   ..cKMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNKd.....  l0XWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMWXKOOd. .;c..ckxdddxxxOKXWMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMWKxol::cc::, .:lo, ':cloolllllllllox0NMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMN0xlc:;,;coOXWMMk..,''..OMMMMMMMMMMWXKOxol:lKWMMMMMMMMMMMMM
MMMMMMMMMMMMMNkc,,:ox0XWMMMMMMMM0'.',;..OMMMMMMMMMMMMMMMMW0c,c0WMMMMMMMMMMM
MMMMMMMMMMMXd;,ckXWMMMMMMMMMMMMMK,.':l..kMMMMMMMMMMMMMMMMMMWKl,cOWMMMMMMMMM
MMMMMMMMWKo,,dXMMN0O0XXKKOkdoccc;..cdd' 'ccllloodk000KNWMMMMMMKl'cKMMMMMMMM
MMMMMMW0c.,dNMMKo,. .....          ..               ..':kWMMMMMWO;,xNMMMMMM
MMMMMXl.'xXMMMMx.       .....      .'..    .;,,,,,.     .OMMMMMMMNo':KMMMMM
MMMMK;.cKMMMMMMW0occldkO00KX0o, 'o:;'...cc.oMWWWWWXOdoodONMMMMMMMMWO,'OMMMM
MMMK;'kWMMMMMMMMMWNWMMMMMMMMMMO.:NW0, 'OWx.,xdddx0XWMMMMMMXOXMMMMMMM0,'OMMM
MMX:.kWMMMMMMMMMWd:0MWX0Okxocc;.:NMX; ,KMo.':;;;;;,;dKMMMMXkOxkWMMMMMk.:NMM
MWd.lWMMMMMMMMMMWd':l:..  .:::;..ll:. .:c' 'cloxkko:''oKWWWWM0kNMMMMMN:'0MM
MN:.xMMMMMMMMMMMMWKxcc:'  .:cclooodxddxO00kO0kdolccc:'.,llloONMMMMWWMMd.oMM
MWo.dMMMMMMMMMMMMMMW0l;:;.:XWMMMMMMWNXddNMMMMMMMMMNXXKKKKXXXNMMMMM0ONMx.:NM
MMO.cWMMMMMMMMMMMMKl..:c,.,KMMMMMMMKo:'':lOWMMMMMMMMMMMMMMWWMMMMMMWWMMd.oWM
MMNc'OMMMMMMMMMMM0,  .:l, cNMMMMMMMWXKK0OOKWMMMMMMMMMMMMMXocOWMM0kNMMMo.xMM
MMM0,:XMMMMMMMMWk'.;dKKl.:KMMMMWWWMMMMMMMMMWN0OXWMMMMMMMMWKo:OMM0ONMMK,,KMM
MMMMO,:XMMMMMMMO',O0xc',xNN0dl:,;lllkXNMNOo;,coONMMMMMMMMMMN0XMMMMMMK;.kWMM
MMMMMO,;0WMMMMN: .'..;xXNk:,cl' 'OKx,.lO:    ,:::ldO0XNWMMMMMMMMMWKd,;OWMMM
MMMMMM0;.cOXWM0',xxOKWMNl.lXMX; .kMN: ...',;cxKKOdc::,',:lllc:;c:'.,xNMMMMM
MMMMMMMNkc;,;c:.colKMMMx.lWMMK, .kWx.  ;0NNWMMMMMMMMNKkxxdolc:;,,;.:XMMMMMM
MMMMMMMMMMNOxoc.:k:lNMMk'oWMMK, .;:.,:dXMOcOMMMMXxKMMMMMMMMMMMMWWK,.OMMMMMM
MMMMMMMMMMMWXd;,,:coXMMWklool;.  'lONMMMMK:lXMMMKd0MMMMMMMMMMMMMNo.;KMMMMMM
MMMMMMMMWk:;.,lo;,coookOkxo:'';dONMMMMMMMM0l0MMMMMMMMMMMMMMMMMW0:.cXMMMMMMM
MMMMMMMMMXc.;k:'dXMMXkdolloxOXWMMMMMMMMMMMWXNMMMMMMMMMMMMMMMNx,.'xNMMMMMMMM
MMMMMMMMMMKdOl.kWMMMMMMMMMMMMMMMMMWXOxxxO0000kxdlclllllloool;',oKMMMMMMMMMM
MMMMMMMMMMMMK,:NMMMMMMMMMMMMMMMMXxc,. .:c,... ,odk0Okkkxo..lk0NMMMMMMMMMMMM
MMMMMMMMMMMMX;;KMMMMMMMMMMMMMMNd;;xo. lWWc ;xk0WMMMMMMW0:'dWMMMMMMMMMMMMMMM
MMMMMMMMMMMMMO,cXMMMXoxWMMMMM0;.lNMx..oMN:.OMM0dXMMMW0c':0WMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMM0c:kWMNkoKMMMMM0,.dMMo.'xMN:'0MMXKNW0d:,cOWMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMNx,oNMWKXMMMMMMd.oMWc.cOMX;,0NX0kl:;cxXWMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMWO:cOWWWMMMMMMk.cWWc'lOMk..clcccoOXMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMNxcloOKKKK0Ol.'0MOccOX: cXNWMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMWKxoolllc:cc';KWWNWx..OMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWO,,OWM0,.dWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMKc'co,.oNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNkc:oKWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM

Created by Sean Yager, (c) Misuse of Mana LLC.

If you're a game dev company or individual looking to hire an artist with
full stack front end designer with backend knowledge, experience with Vue,
React, Webpack, and Node.js, send me an email.

I'm a former web dev student of Austin Coding Academy, and
would love to hear from you.

contact@seanyager.com
`);

  this.$store.commit('monsterData/newMonster');
  this.$store.commit('shopkeepData/newShopkeep')
  },
}
</script>

<style>
.loginBar {
  display:flex;
  align-items:center;
  justify-content:space-around;
}

.loginBar .clickable:hover {
  cursor:pointer;
  color:gold;
}

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

.debugBar h3 {
  border: solid white 2px;
  padding:0 50px;
}

.debugBar span {
  margin-right:10px;
}

.debugBar section {
  display:flex;
  justify-content:center;
  padding:1px;
  margin:3px;
}

.debugContent { 
  height:500px;
  overflow-y: scroll;
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
</style>
