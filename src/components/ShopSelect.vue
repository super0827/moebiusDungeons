<template>

<section class="characterSelectWrapper">

    <h1 class="animated" :class="{'zoomInDown' : isEntering, 
    'zoomOutUp' : !isEntering }"></h1>

    <section class="chooseChar">
        <section
        v-for="characters in variants"
        :key="characters.name"
        :portrait="characters.portrait"
        class="columns animated">
        
            <h2>{{characters.name}}</h2>

            <!-- NEEDS ON CLICK EVENT -->
            <section 
            @mouseenter="UiSound.chit.play()"
            class="portContainer animated infinite" :id="characters.name">
                <section class="overlay"></section>
                <img :src="characters.portrait">
            </section>

        </section>
    </section>

<!-- <h1 id="about" @mouseenter="UiSound.chit.play()" @click="toggleHelp()"> HUH? </h1> -->

<!-- <transition name='fade'>
    <instructions-screen v-if="this.helper"/>
</transition> -->

</section>
</template>

<script>
import InstructionsScreen from './InstructionsScreen';
import { mapState } from 'vuex';

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
            variants: state => state.variants,
        }),
        
    },
  methods: {
    setPlayer(passedPlayer) {
        console.log(`You're playing as the ${passedPlayer.name}: logged from CharSelect.vue`);
        this.$store.commit('playerData/mutate', {property: 'info', with: passedPlayer});
        this.$store.commit('gameData/mutate', {property: 'phase', with: 'DungeonPhase'});
    },
  },
  created() {
    
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

#swordsman:hover, #mage:hover, #varlet:hover {
    cursor:pointer;
}
#swordsman:hover .overlay {
    background: linear-gradient(0deg, rgb(187, 16, 58) 0%, rgba(255,192,0,0) 100%);
}

#mage:hover .overlay {
    background: linear-gradient(0deg, rgb(0, 174, 255) 0%, rgba(255,192,0,0) 100%);
    cursor:pointer;
}

#varlet:hover .overlay {
    background: linear-gradient(0deg, rgb(238, 255, 0) 0%, rgba(255,192,0,0) 100%);
    cursor:pointer;
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
</style>
