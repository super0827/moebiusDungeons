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

</section>
</template>

<script>
import InstructionsScreen from './InstructionsScreen';
import { mapState } from 'vuex';
import shuffle from 'lodash.shuffle'

import UiSound from '@/plugins/UiSounds.js'

import helperToggles from './mixins/helperToggles';
import gameAnimations from './mixins/gameAnimations';
import gameMusic from './mixins/gameMusic';

export default {
  name: 'ShopSelect',
  mixins: [helperToggles, gameAnimations, gameMusic],
  components: {
      InstructionsScreen,
  },
  data() {
      return {
            UiSound: UiSound,
            music: ['shopSelect'],
      }
  },
  computed: {
        ...mapState('shopkeepData', {
            variants: state => state.shopChoice,
        }),
        
    },
  methods: {
    setPlayer(passedPlayer) {
        console.log(`You're playing as the ${passedPlayer.name}: logged from CharSelect.vue`);
        this.$store.commit('playerData/mutate', {property: 'info', with: passedPlayer});
        this.$store.commit('gameData/mutate', {property: 'phase', with: 'DungeonPhase'});
    },
    toShopkeep(chosenShopkeep) {
        this.$store.commit('shopkeepData/newShopkeep', {shopkeep: chosenShopkeep});
        this.$store.commit('gameData/mutate', {property: 'phase', with: 'ShopPhase'});
    }
  },
  created() {
    this.$store.commit('shopkeepData/pickTwoShops');
  }
}
</script>

<style scoped>
.characterSelectWrapper {
    text-align:center;
    position:relative;
}

.chooseChar {
    display:flex;
    flex-direction: row;
}

.shopkeep {
    cursor:pointer;
}

.columns {
    margin:0 10px;
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
