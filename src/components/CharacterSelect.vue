<template>

<b-col cols="12" class="d-flex flex-column justify-content-center">
    <h1 
        class="animated text-center mb-5" 
        :class="{'zoomInUp' : isEntering, 'zoomOutDown' : !isEntering }"
    >
    CHOOSE YOUR CHARACTER
    </h1>

    <section class="chooseChar justify-content-center">
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
        
            <ToolTip
                :title="characters.name"
                :subtitle="characters.description1"
                :descriptions="[characters.description2]"
            >
                <section 
                @mouseenter="UiSound.chit.play()"
                class="portContainer animated infinite" :id="characters.name">
                    <section class="overlay"></section>
                    <img :src="characters.portrait" :alt="characters.description2">
                </section>
            </ToolTip>
        </section>
    </section>

</b-col>
</template>

<script>
import UiSound from '@/plugins/UiSounds.js'

import gameAnimations from '@/components/mixins/gameAnimations';
import gameMusic from '@/components/mixins/gameMusic';
import ToolTip from '@/components/ui/ToolTip.vue';

export default {
  name: 'CharacterSelect',
  mixins: [gameAnimations, gameMusic],
  components: {
      ToolTip,
  },
  data() {
      return {
            UiSound: UiSound,
            music: ['charSelectMusic'],
            characterClasses: [
              { 
                name:"swordsman",
                warning:"Protected by a metal mesh, runs his blade through monster flesh.",
                type:'player', 
                portrait:require("@/assets/imgs/playableCharacters/swordsman.png"), 
                description1:"Slicing and Dicing",
                description2:"Basic hack and slash class, focus on damage and armor to become a bulwark.", 
                coins:0, baseHealth:12, baseArmor:2, baseAttackMax:8, attackType: "physical",
                attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
                armorType: 'physical',
                mettleImg: require("@/assets/imgs/icons/swordsmanMettle.png"),
                mettle: 1,
                curse:0,
                special: "en'garde",
                specialDescription:"Spend one mettle to gain +1 Armor. The monster won’t attack you back when you use En'garde.",
                inAnimations: "zoomInLeft",
                outAnimations: "zoomOutLeft",              },

              {
                name:"mage",
                warning:"Tinctures made of bark and wirt, ancient words designed to hurt.",
                type:'player', 
                portrait:require("@/assets/imgs/playableCharacters/mage.png"), 
                description1:"Spellslinging", 
                description2:"Magic attacks ignore enemy armor, highest damage, lowest health.", 
                coins:0, baseHealth:6, baseArmor:0, baseAttackMax:10, attackType: "magical", 
                attackTypeImage: require("@/assets/imgs/icons/magicalIcon.png"),
                armorType: 'magical',
                mettleImg: require("@/assets/imgs/icons/mageMettle.png"),
                mettle: 1,
                curse:0,
                special: "variagate",
                specialDescription:"Spend one mettle to halve enemy HP. The monster won’t attack you back when you use Variagate.",
                inAnimations: "zoomInUp",
                outAnimations: "zoomOutDown",              
              },

              {
                name:"varlet",
                warning:"A shoddy cloak, a knife that's worse, dishonest tools to cut your purse.",
                type:'player', 
                portrait:require("@/assets/imgs/playableCharacters/varlet.png"), 
                description1:"Sneaky and Roguish", 
                description2:"Varlet can steal coins from enemies using their Special. Starts with 1 gold.", 
                coins:1, baseHealth:8, baseArmor:1, baseAttackMax:6, attackType: "physical", 
                attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
                armorType: 'physical',
                mettleImg: require("@/assets/imgs/icons/varletMettle.png"),
                mettle: 1,
                curse:0,
                special: "Peculate",
                specialDescription:"Deals 1/4 your max damage rounding up. Kill a monster using Peculate to gain 2 extra gold.",
                inAnimations: "zoomInRight",
                outAnimations: "zoomOutRight",
              },
          ],
      }
  },
  methods: {
    setPlayer(passedPlayer) {
        this.$store.commit('playerData/mutate', {property: 'info', with: passedPlayer});
        this.$store.commit('gameData/mutate', {property: 'phase', with: 'DungeonPhase'});
        this.$store.commit('monsterData/mutate', {property: 'roster', with: 0})
        
        //for varlets starting coins - not a mistake
        this.$store.commit('leaderboardData/incrementByValue', {property: 'totalCoins', with: passedPlayer.coins})
        UiSound.charPick.play();
        this.$store.commit('monsterData/newMonster');
        this.$store.dispatch('monsterData/GENERATE_MONSTER_STATS');
        this.$store.commit('shopkeepData/resetShopItems');
    },
  },
}
</script>

<style scoped>
.characterSelectWrapper {
    text-align:center;
    /* position:relative; */
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
    z-index:2;
    position:absolute;
    bottom:0;
    pointer-events: none;
}

.portContainer {
    /* position:relative; */
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
