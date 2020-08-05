<template>

<section class="characterSelectWrapper">

    <h1 class="animated" :class="{'zoomInDown' : isEntering, 
    'zoomOutUp' : !isEntering }">CHOOSE YOUR CHARACTER</h1>

    <section class="chooseChar">
        <section
        v-for="characters in characterClasses"
        :key="characters.name"
        :portrait="characters.portrait"
        :coins="characters.coins"
        :health="characters.health"
        :armor="characters.armor"
        :attackMax="characters.attackMax"
        :attackType="characters.attackType"
        :attackTypeImage="characters.attackTypeImage"
        @click="setPlayer(characters)"
        class="columns animated"
        :class="{ [characters.inAnimations]: isEntering, 
        [characters.outAnimations]: !isEntering }">
        
            <h2>{{characters.name}}</h2>
            <h3>{{characters.description1}}</h3>
            <p>{{characters.description2}}</p>
        
            <section 
            @mouseenter="UiSound.chit.play()"
            class="portContainer animated infinite" :id="characters.name">
                <section class="overlay"></section>
                <img :src="characters.portrait" :alt="characters.description2">
            </section>

        </section>
    </section>

<h1 id="about" @mouseenter="UiSound.chit.play()" @click="toggleHelp()"> HUH? </h1>

<transition name='fade'>
    <instructions-screen v-if="this.helper"/>
</transition>

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
  name: 'CharacterSelect',
  mixins: [helperToggles, gameAnimations, gameMusic],
  components: {
      InstructionsScreen,
  },
  data() {
      return {
            UiSound: UiSound,
            music: ['charSelectMusic'],
            characterClasses: [
              { 
                name:"swordsman",
                type:'player', 
                portrait:require("../assets/imgs/playableCharacters/swordsman.png"), 
                description1:"Slicing and Dicing",
                description2:"Bruiser class, high damage, good armor, high health.", 
                coins:0, baseHealth:12, baseArmor:2, baseAttackMax:8, attackType: "physical",
                attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"),
                mettleImg: require("@/assets/imgs/icons/swordsmanMettle.png"),
                mettle: 1,
                curse:0,
                special: "en'garde",
                specialDescription:"Spend one mettle hone your guard and permenantly gain 1 armor.",
                inAnimations: "zoomInLeft",
                outAnimations: "zoomOutLeft"
              },

              {
                name:"mage",
                type:'player', 
                portrait:require("../assets/imgs/playableCharacters/mage.png"), 
                description1:"Spellslinging", 
                description2:"Magic attacks ignore enemy armor, highest damage, lowest health.", 
                coins:0, baseHealth:6, baseArmor:0, baseAttackMax:10, attackType: "magical", 
                attackTypeImage: require("../assets/imgs/icons/magicalIcon.png"),
                mettleImg: require("@/assets/imgs/icons/mageMettle.png"),
                mettle: 1,
                curse:0,
                special: "variagate",
                specialDescription:"Spend one mettle to deal 12 damage to the enemy that ignores armor. The monster won’t attack you back when you use Variagate.",
                inAnimations: "zoomInUp",
                outAnimations: "zoomOutDown",
              },

              {
                name:"varlet",
                type:'player', 
                portrait:require("../assets/imgs/playableCharacters/varlet.png"), 
                description1:"Sneaky and Roguish", 
                description2:"Avoids damage on critical hits, mid tier stats.", 
                coins:1, baseHealth:8, baseArmor:1, baseAttackMax:6, attackType: "physical", 
                attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"),
                mettleImg: require("@/assets/imgs/icons/varletMettle.png"),
                mettle: 1,
                curse:0,
                special: "Backstab",
                specialDescription:"Spend 1 Mettle to deal 2/3 your max damage to the monster. The monster won’t attack you back when you use Backstab.",
                inAnimations: "zoomInRight",
                outAnimations: "zoomOutRight",
              },
          ],
      }
  },
  methods: {
    setPlayer(passedPlayer) {
        console.log(`You're playing as the ${passedPlayer.name}: logged from CharSelect.vue`);
        this.$store.commit('playerData/mutate', {property: 'info', with: passedPlayer});
        this.$store.commit('gameData/mutate', {property: 'phase', with: 'DungeonPhase'});
        UiSound.charPick.play();
    },
  },
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
