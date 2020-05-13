<template>
  <div id="app">

    <!-- DEBUGGING -->

    <section class="debugBar" v-if="!testMode">
      <section @click="debugShow = !debugShow">
        DEBUG BAR
      </section>

      <article v-if="debugShow">
      <p>MONSTER</p>
      <section @click="store.newMonster()">New Monster</section>
      <section @click="storeState.monsterRoster = 0">Reset Monster Roster</section>
      <section @click="storeState.monster.health += 100">Monster HP 100</section>
      <section @click="storeState.monster.health = 1">Monster HP 1</section>
      <br>
      <p>PLAYER</p>
      <section @click="storeState.player.health += 100">Player HP 100</section>
      <section @click="storeState.player.health = 1">Player HP 1</section>
      <section @click="storeState.player.coins++">Coins Up</section>
      <br>
      <p>SCENES</p>
      <section @click="store.sceneChange('CharacterSelect')">Char Select</section>
      <section @click="store.sceneChange('ShopPhase')">Shop</section>
      <section @click="store.sceneChange('DungeonPhase')">Dungeon</section>
      <br>   
      <p>END GAME</p>
      <section @click="store.sceneChange('WinScreen')">Win Screen</section>
      <section @click="store.sceneChange('LoseScreen')">Lose Screen</section>
      <br>
      <section @click="testMode = !testMode">Enable Testing Mode</section>

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

import gameData from './components/mixins/gameData';

import StartScreen from './components/StartScreen.vue';

import CharacterSelect from './components/CharacterSelect.vue';
import DungeonPhase from './components/DungeonPhase.vue';
import ShopPhase from './components/ShopPhase.vue';


import WinScreen from './components/WinScreen.vue';
import LoseScreen from './components/LoseScreen.vue';

export default {
  name: 'App',
  mixins: [gameData],
  components: {
    StartScreen,
    CharacterSelect,
    DungeonPhase,
    ShopPhase,
    WinScreen,
    LoseScreen,
  },
  data() {
    return {
      testMode: false,
      debugShow: false,
    }
  },
  created(){
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

If you're a game dev company or individual looking to hire an artist with full stack front end designer with backend
knowledge, experience with Vue, React, Webpack, and Node.js, send me an email.

I'm a former web dev student of Austin Coding Academy, and want to hear from you.

contact@seanyager.com
`);
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

.debugBar section {
  text-align:center;
  padding:1px;
  margin:3px;
  border:solid #eee 2px;
}
</style>
