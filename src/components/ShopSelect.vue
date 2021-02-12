<template>
<section class="characterSelectWrapper d-flex flex-column justify-content-center">
    <b-row align-h="center" class="text-center">
        <b-col>
            <img src="@/assets/imgs/icons/travelersSigilIcon.png" alt="">
            <h1>EYIEN</h1>
        </b-col>
    </b-row>
    <b-row align-v="center" class="my-4 d-flex flex-row justify-content-around m-4">
        <b-col cols="12" class="d-flex flex-row justify-content-between text-white statIcons">
            <section class="mx-4 d-flex flex-column justify-content-center">
                <img class="position-absolute" src="@/assets/imgs/icons/healthIcon.png">
                <h1 class="m-0 leftPos position-relative">{{health}}</h1>
            </section>

            <section class="mx-4 d-flex flex-column justify-content-center">
                <img class="position-absolute" :src="attackImg">
                <h1 class="m-0 leftPos position-relative">{{ attack }}</h1>
            </section>
            
            <section class="mx-4 d-flex flex-column justify-content-center">
                <img class="position-absolute" :src="armorImg">
                <h1 class="m-0 leftPos position-relative">{{ armor }}</h1>
            </section>

            <section class="mx-4 d-flex flex-column justify-content-center">
                <img class="position-absolute coin" src="@/assets/imgs/icons/coinIcon.png">
                <h1 class="m-0 coinLeftPos position-relative">{{ coins }}</h1>
            </section>
            
            <section class="mx-4 d-flex flex-column justify-content-center">
                <img class="position-absolute coin" :src="mettleImg">
                <h1 class="m-0 coinLeftPos position-relative">{{ mettle }}</h1>
            </section>
        </b-col>
    </b-row>

    <b-row class="text-center">
        <b-col cols="12" class="d-flex justify-content-center">
            <section
                v-for="characters in variants"
                :key="characters.name"
                :portrait="characters.portrait"
            >
                <section 
                    @mouseenter="UiSound.chit.play()"
                    @click="toShopkeep(characters)"
                    class="portContainer"
                    :id="characters.name"
                >
                    <h2 class="text-uppercase">{{characters.name}}</h2>
                    <section class="overlay"></section>
                    <img :src="characters.portrait">
                </section>
            </section>
        </b-col>
    </b-row>

    <!-- Options -->
    <b-row align-h="center" class="mt-3 d-flex flex-row justify-content-center">
        <b-col cols="8" class="d-flex justify-content-center">
            <b-button class="p-4 mr-3 d-flex justify-content-center align-items-center" @mouseenter="UiSound.chit.play()" @click="toggleRetire()">
                <h2 class="">Retire</h2>
            </b-button>

            <b-button class="p-4 d-flex flex-row justify-content-center align-items-center" v-if="mettle < 3" @mouseenter="UiSound.chit.play()" @click="addMettle()">
                <h2 class="m-0">Rest + 1 <img :src="mettleImg"/></h2>
            </b-button>

            <b-button class="p-4 d-flex justify-content-center align-items-center" :class="{'unavailable': mettle >= 3}" v-if="mettle >= 3"  @mouseenter="UiSound.chit.play()">
                <h2 class="m-0">Can't Rest With Max Mettle</h2>
            </b-button>
        </b-col>

        <retire class="retire"  key="retireConfirm" @close="toggleRetire()" @retire="retireGame()" v-if="retire"/>
    </b-row>
</section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import ShopSelectHelp from "@/components/ShopSelectHelp.vue";
import Retire from "@/components/Retire.vue";
import UiSound from '@/plugins/UiSounds.js'

import gameAnimations from '@/components/mixins/gameAnimations';
import gameMusic from '@/components/mixins/gameMusic';


export default {
  name: 'ShopSelect',
  mixins: [gameAnimations, gameMusic],
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
            armorImg: state => state.info.armorTypeImage,
            mettle: state => state.info.mettle,
            mettleImage: state => state.info.mettleImg
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
    }
    else {
        this.$store.commit('shopkeepData/mutate', {property:'shopLoaded', with:false}, {root:true})
    }
  }
}
</script>

<style scoped>
.leftPos {
  text-align:center;
  left:24px;
  top:8px;
}

.coinLeftPos {
  text-align:center;
  left:12px;
  top:7px;
}

.statIcons img {
  width:80px;
  height:80px;
}

img.coin {
    width:60px;
    height:60px;
}

.statIcons h1 {
  height:35px;
  width:35px;
  font-size:20px;
  text-align:center;
  display:block;
  text-shadow: 1px 1px 5px black;
}

.portContainer img{
    width:200px;
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
