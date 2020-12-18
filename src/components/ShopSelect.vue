<template>

<section class="characterSelectWrapper">

   <section class="lessImportant">
    <h2>Current Stats</h2>
    <br>
    <section class='flexRow'>
        <section class="iconOverlay">
            <img class="smallStat" src="@/assets/imgs/icons/healthIcon.png">
            <h3>{{ health }}</h3>
        </section>
        <section class="iconOverlay">
            <img class="smallStat" :src="attackImg">
            <h3>{{ attack }}</h3>
        </section>
        <section class="iconOverlay">
            <img class="smallStat" src="@/assets/imgs/icons/armorIcon.png">
            <h3> {{ armor }} </h3>
        </section>
        <section>
            <img class="smallCoin" src="@/assets/imgs/icons/coinIcon.png">
            <h3>{{ coins }}</h3>
        </section>
    </section>
    </section>

    <hr>

     <h1 >Choose a Shopkeep</h1>

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

    <h3 class="marginTop">OR PICK AN OPTION BELOW</h3>

    <section class="flexRow">
        <section>
            <h2 @mouseenter="UiSound.chit.play()" @click="toggleRetire()" class="button red">
                Retire From Your Service
            </h2>
        </section>
        <section>
            <h2 v-if="mettle < 3" @mouseenter="UiSound.chit.play()" @click="addMettle()" class="button green">
                Rest + 1 <img :src="mettleImg"/>
            </h2>
            
            <h2 :class="{'unavailable': mettle >= 3}" v-if="mettle >= 3"  @mouseenter="UiSound.chit.play()" class="button">
                Can't Rest With Max Mettle
            </h2>
        </section>

    </section>

<h1 id="about" @mouseenter="UiSound.chit.play()" @click="toggleHelp()"> Shop Select Help </h1>

    <!--  Battle Helpers -->
    <transition name="fade" mode="out-in">
        <shop-select-help  key="battleHelper" @close="toggleHelp()" v-if="helper"/>
    </transition>
   
    <!--  Retire Confirmation -->
    <transition name="fade-fast" mode="out-in">
        <retire class="retire"  key="retireConfirm" @close="toggleRetire()" @retire="retireGame()" v-if="retire"/>
    </transition>


</section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import shuffle from 'lodash.shuffle'

import ShopSelectHelp from "@/components/ShopSelectHelp.vue";
import Retire from "@/components/Retire.vue";
import UiSound from '@/plugins/UiSounds.js'

import helperToggles from '@/components/mixins/helperToggles';
import gameAnimations from '@/components/mixins/gameAnimations';
import gameMusic from '@/components/mixins/gameMusic';


export default {
  name: 'ShopSelect',
  mixins: [helperToggles, gameAnimations, gameMusic],
  components: {
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
            shopLoaded: state => state.shopLoaded,
            variants: state => state.shopChoice,
        }),
        ...mapState('playerData', {
            mettleImg: state => state.info.mettleImg,
            coins: state => state.info.coins,
            attackImg: state => state.info.attackTypeImage,
            mettle: state => state.info.mettle
        }),
        ...mapState('gameData', {
            tracker: state =>state.tracker,
        }),
        ...mapGetters('authData', {
            user: 'user',
        }),
        ...mapGetters('playerData', {
            health: 'calcHealth',
            armor: 'calcArmor',
            attack: 'calcAttackMax',
        })
    },
  methods: {
    toShopkeep(chosenShopkeep) {
        this.$store.commit('shopkeepData/newShopkeep', {shopkeep: chosenShopkeep});
        this.$store.commit('gameData/mutate', {property: 'phase', with: 'ShopPhase'});
    },
    retireGame() {
        this.$store.commit('gameData/mutate', {property: 'phase', with: 'LoseScreen'});
        this.$store.dispatch('authData/updateLeaderboard')
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
    if(!this.shopLoaded){
        this.$store.commit('shopkeepData/pickTwoShops');
        this.$store.dispatch('authData/updateSavedGame', null, {root:true} )
    }
    else {
        this.$store.commit('shopkeepData/mutate', {property:'shopLoaded', with:false}, {root:true})
    }
  }
}
</script>

<style scoped>

.retire {
    z-index:9999999;
}

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
    margin:20px 10px;
    width:175px;
    height:100px;
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

.unavailable {
    color:white;
    background:rgb(161, 0, 0);
    cursor:not-allowed;
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

.lessImportant {
    opacity:0.4;
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

.smallCoin {
    width:40px;
    margin:0px 5px;
}

.smallStat {
    width:55px;
    position:relative;
    top:-10px;
}

.iconOverlay h3 {
    position:relative;
    top: -15px;
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
