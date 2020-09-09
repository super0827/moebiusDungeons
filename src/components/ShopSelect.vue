<template>

<section class="characterSelectWrapper">

    <h1 class="animated" :class="{'zoomInDown' : isEntering, 
    'zoomOutUp' : !isEntering }">Choose a Shopkeep</h1>

    <section class="chooseChar">
        <section
        v-for="characters in variants"
        :key="characters.name"
        :portrait="characters.portrait"
        class="shopkeep columns animated">
        
            <h2>{{characters.name}}</h2>

            <section 
            @mouseenter="UiSound.chit.play()"
            @click="toShopkeep(characters)"
            class="portContainer animated infinite" :id="characters.name">
                <section class="overlay"></section>
                <img :src="characters.portrait">
            </section>

        </section>
    </section>

    <h3 class="marginTop">Or pick an option below</h3>

    <section class="flexRow">
        <h2 @click="addMettle()" class="button green">
            Rest + 1 <img :src="mettleImg"/>
        </h2>
    </section>

    <section class="flexRow">
        <h2 @click="toggleRetire()" class="button red">
            Retire From Your Service
        </h2>
    </section>

<h1 id="about" @mouseenter="UiSound.chit.play()" @click="toggleHelp()"> Shop Select Help </h1>

    <!--  Battle Helpers -->
    <transition name="fade" mode="out-in">
        <shop-select-help key="battleHelper" @close="toggleHelp()" v-if="helper"/>
    </transition>
   
    <!--  Retire Confirmation -->
    <transition name="fade" mode="out-in">
        <retire key="retireConfirm" @close="toggleRetire()" @retire="retireGame()" v-if="retire"/>
    </transition>


</section>
</template>

<script>
import InstructionsScreen from './InstructionsScreen';
import { mapState, mapGetters } from 'vuex';
import shuffle from 'lodash.shuffle'

import ShopSelectHelp from "./ShopSelectHelp.vue";
import Retire from "./Retire.vue";
import UiSound from '@/plugins/UiSounds.js'

import helperToggles from './mixins/helperToggles';
import gameAnimations from './mixins/gameAnimations';
import gameMusic from './mixins/gameMusic';

import firebase from "firebase";

export default {
  name: 'ShopSelect',
  mixins: [helperToggles, gameAnimations, gameMusic],
  components: {
      InstructionsScreen,
      ShopSelectHelp,
      Retire
  },
  data() {
      return {
            UiSound: UiSound,
            music: ['shopSelect'],
            retire: false,
      }
  },
  computed: {
        ...mapState('shopkeepData', {
            variants: state => state.shopChoice,
        }),
        ...mapState('playerData', {
            mettleImg: state => state.info.mettleImg,
        }),
        ...mapState('gameData', {
            tracker: state =>state.tracker,
        }),
        ...mapGetters('authData', {
            user: 'user',
        }),
    },
  methods: {
    toShopkeep(chosenShopkeep) {
        this.$store.commit('shopkeepData/newShopkeep', {shopkeep: chosenShopkeep});
        this.$store.commit('gameData/mutate', {property: 'phase', with: 'ShopPhase'});
    },
    retireGame() {
        console.log(this.user.data);
        const recUser = this.user.data.displayName.split(" ").join("").toLowerCase();
        const recEmail = this.user.data.email;

        firebase.database().ref('users/' + recUser).set({
            username: recEmail,
        });
        this.$store.commit('gameData/mutate', {property: 'phase', with: 'LoseScreen'});
    },
    toggleRetire() {
        this.retire = !this.retire
    },
    addMettle() {
        this.$store.commit('playerData/changeStats', {operator: 'add', stat: 'mettle', value:1});
        this.$store.commit('gameData/mutate', {property: 'phase', with: 'DungeonPhase'});
    }
  },
  created() {
    this.$store.commit('shopkeepData/pickTwoShops');
  }
}
</script>

<style scoped>

#about {
    font-size: 20px;
    position: fixed;
    right: 10px;
    top: 10px;
    margin: 0;
    padding: 5px;
    background: rgb(218, 218, 218);
}
#about:hover {
    background:rgb(185, 185, 185);
    cursor:pointer;
}

.characterSelectWrapper {
    text-align:center;
    position:relative;
}

.chooseChar {
    display:flex;
    flex-direction: row;
}

.marginTop {
    margin-top:15px;
}

.shopkeep {
    cursor:pointer;
}

.columns {
    margin:0 10px;
}

.button {
    background:#999;
    margin:20px 0 0 0;
    width:200px;
    color:white;
    border-radius:5px;
    text-decoration:none;
    padding:10px;
    font-size:25px;
    display:flex;
    justify-content:center;
    align-items:center;
    text-align:center;
}

.button img {
    width:50px;
    margin-left:10px;
}

.red:hover {
    cursor:pointer;
    background:rgb(148, 106, 106);
}

.green:hover {
    cursor:pointer;
    background:rgb(106, 148, 120);
}

.chooseChar img {
    max-width:200px;
}

.overlay {
    height:100px;
    width:200px;
    z-index:999;
    position:absolute;
    bottom:0;
}

.portContainer {
    position:relative;
}

#graverobber:hover .overlay {
    background: linear-gradient(0deg, rgb(136, 49, 136) 0%, rgba(255,192,0,0) 100%);
}

#cleric:hover .overlay {
    background: linear-gradient(0deg, rgb(255, 208, 0) 0%, rgba(255,192,0,0) 100%);
}

#witch:hover .overlay {
    background: linear-gradient(0deg, rgb(255, 0, 106) 0%, rgba(255,192,0,0) 100%);
}

#merchant:hover .overlay {
    background: linear-gradient(0deg, rgb(0, 255, 128) 0%, rgba(255,192,0,0) 100%);
}
</style>
