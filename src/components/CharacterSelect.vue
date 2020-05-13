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
            @mouseenter="$sound.play('chit')"
            class="portContainer animated infinite" :id="characters.name">
                <section class="overlay"></section>
                <img :src="characters.portrait" :alt="characters.description2">
            </section>

        </section>
    </section>

<h1 id="about" @mouseenter="$sound.play('chit')" @click="toggleHelp()"> HUH? </h1>

<transition name='fade'>
    <instructions-screen @close-instructions="instructionsHandle()" v-if="this.helper"/>
</transition>

</section>
</template>

<script>
import { store } from "../store";
import InstructionsScreen from './InstructionsScreen';
import gameData from './mixins/gameData';
import helperToggles from './mixins/helperToggles';
import gameAnimations from './mixins/gameAnimations';

export default {
  name: 'CharacterSelect',
  music: ['charSelectMusic'],
  mixins: [gameData, helperToggles, gameAnimations],
  components: {
        InstructionsScreen,
  },
  data() {
      return {
          instructions: false,
          characterClasses: [
              {name:"swordsman",
              type:'player', 
              portrait:require("../assets/imgs/playableCharacters/swordsman.png"), 
              description1:"Slicing and Dicing",
              description2:"Bruiser class, high damage, good armor, high health.", 
              coins:0, health:12, armor:2, attackMax:8, attackType: "physical",
              attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"), 
              inAnimations: "zoomInLeft",
              outAnimations: "zoomOutLeft"
              },

              {name:"mage",
              type:'player', 
              portrait:require("../assets/imgs/playableCharacters/mage.png"), 
              description1:"Spellslinging", 
              description2:"Magic attacks ignore enemy armor, highest damage, lowest health.", 
              coins:0, health:6, armor:0, attackMax:10, attackType: "magical", 
              attackTypeImage: require("../assets/imgs/icons/magicalIcon.png"), 
              inAnimations: "zoomInUp",
              outAnimations: "zoomOutDown",
              },

              {name:"varlet",
              type:'player', 
              portrait:require("../assets/imgs/playableCharacters/varlet.png"), 
              description1:"Sneaky and Roguish", 
              description2:"Avoids damage on critical hits, mid tier stats.", 
              coins:1, health:8, armor:1, attackMax:6, attackType: "physical", 
              attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"), 
              inAnimations: "zoomInRight",
              outAnimations: "zoomOutRight",
              },
          ],
      }
  },
  methods: {
    setPlayer(passedPlayer) {
        console.log(`You're playing as the ${passedPlayer.name}`);
        this.$store.commit('mutate', {property: 'player', with: passedPlayer});
        this.$store.commit('mutate', {property: 'phase', with: 'DungeonPhase'});
        this.$sound.play('charPick');
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
