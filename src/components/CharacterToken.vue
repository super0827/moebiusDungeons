<template>

<section class="flexRow">
      <character-stats v-if="who === 'monster'"
        :health="health"
        :armor="armor"
        :attack="attack"
        :attackImage="attackTypeImg"
        :who="'monster'"
      />

  <section class="columns">
      
      <h3 id="name">{{name}}</h3>
      <section 
      class="portraitWrapper"
      :class="{'animated pulse' : isHurt, 
      'animated wobble' : isAttacking,
      'animated reverseWobble' : monsterisAttacking, 
      'animated pulse' : isBlocking,
      'animated tada' : isDead 
      }"
      >
      <img class="portrait" :src="portrait">

      <transition appear
            type="animation"
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <section v-if="isDead"
              class="deadOverlay"
              :class="{ dead : isDead }"
            >
            <img src='../assets/imgs/icons/deadX.png' alt="">
            </section>  
          </transition>

      <!-- Animated Damage Tips -->
        <transition appear
          type="animation"
          enter-active-class="animated jackInTheBox"
          leave-active-class="animated fadeOut"
        >
          <h1 v-if="isBlocking" class="blocked">BLOCKED!</h1>
        </transition>

        <transition appear
          type="animation"
          enter-active-class="animated pulse"
          leave-active-class="animated fadeOut"
        >
          <section class="damageReadout" v-if="isHurt">
             <section class="flexRow">
               <section class="indicatorWrapper">
              <img class="attackIndicator" :src="enemyAttackTypeImage" alt="">
              <h2 class="attackValue">
                {{ enemyAttackDamage }} 
              </h2>
               </section>

              <h2 class="versus">vs.</h2>
              
              <section class="indicatorWrapper">
              <img class="armorIndicator" src="../assets/imgs/icons/armorIcon.png" alt="">
              <h2 class="armorValue" :class="{ 'striked': enemyAttackType === 'magical'}">
              {{ armor }} 
              </h2>
              </section>
             </section>

             <section>
              <h2 class="calculatedDamage"> {{ enemyReducedAttackDamage }} </h2>
            </section>
          </section>
        </transition>

        <transition appear
            type="animation"
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <section v-if="porteffect" 
              class="damagedOverlay"
              :class="{ 
                red : redShine, 
                green : greenShine,
                purple : purpleShine,
                gold : goldShine,
              }"
            >
            </section>  
          </transition>
          
          <transition appear
            type="animation"
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <section class="armorUp" v-if="name === 'swordsman' && goldShine">
              <img src="../assets/imgs/icons/armorIcon.png" alt="">
              <h1>2</h1>
            </section>
          </transition>

      </section>

      <section class="coinWrapper">
        <img src="../assets/imgs/icons/coinIcon.png" alt="">
        <h1 class="coinValue">
          <animated-number 
          :value="coins"
          :duration="1000"
          :formatValue="wholeNumber"
          />
        </h1>
      </section>


  </section>

      <character-stats v-if="who === 'player'"
      :health="health"
      :armor="armor"
      :attack="attack"
      :attackImage="attackTypeImg"
      />

</section>
</template>

<script>
import AnimatedNumber from "animated-number-vue";
import CharacterStats from "./CharacterStats.vue";

export default {
  name: 'CharacterToken',
  components: {
    AnimatedNumber,
    CharacterStats
  },
  props: [
    'who',
    'name',
    'portrait',
    'health',
    'armor',
    'attack',
    'attackType',
    'attackTypeImg',
    'coins',
    'isHurt',
    'isBlocking',
    'isAttacking',
    'monsterisAttacking',
    'isDead',
    'statSide',
    'enemyAttackType',
    'enemyAttackTypeImage',
    'enemyAttackDamage',
    'enemyReducedAttackDamage',

    'porteffect',
    'redShine',
    'greenShine',
    'purpleShine',
    'goldShine',
  ],
  methods: {
    wholeNumber(value) {
      return `${Math.ceil(value)}`;
    },
  }
}

</script>

<style scoped>
#name {
  text-transform:uppercase;
}
.portraitWrapper {
  display:grid;
  height:233px;
  grid-template-columns: 100%;
  grid-template-rows: 33% 34% 33%;
}

.portrait {
  grid-row: 1/4;
  grid-column:1/2;
}

.attackValue{
  position:relative;
  color:rgb(255, 166, 0);
  text-shadow: black 2px 2px 2px;
  font-size:40px;
  margin:0px;
  padding:0px;
  text-decoration: none;
}

.armorValue {
  color:rgb(0, 179, 255);
  text-shadow: black 2px 2px 2px;
  font-size:40px;
  margin:0px;
  padding:0px;
  text-decoration: none;
}

.calculatedDamage {
  color:red; 
  text-shadow: black 2px 2px 2px;
  font-size:65px;
  line-height:65px;
  margin:0;
  padding:0;
  text-decoration: none;
}

.versus {
    color:rgb(255, 255, 255);
    line-height:70px;
    margin:5px;
    padding:5px;
    text-decoration: none;
}

.indicatorWrapper {
  position:relative;
}

.attackIndicator {
  width:50px;
  position:absolute;
  left:-15px;
  top:50px;
  filter: drop-shadow(-1px 2px 5px blue) invert(1);
}

.armorIndicator {
  width:50px;
  position:absolute;
  left:-15px;
  top:50px;
  filter: drop-shadow(-1px 2px 5px orange) invert(1);
}

.armorUp {
  width:100px;
  position:absolute;
  top:115px;
}

.armorUp h1 {
  color:black;
  position:absolute;
  text-shadow: none;
  left:82px;
  top:-42px;
  font-size:50px;
}

.armorUp img {
  width:200px;
  filter: drop-shadow(-1px 2px 5px blue) invert(1);
}

.red {
    background: linear-gradient(0deg, rgb(187, 16, 58) 0%, rgba(255,192,0,0) 100%);
}

.dead {
    background: linear-gradient(0deg, rgb(58, 40, 44) 0%, rgba(53, 42, 44, 0.5) 100%);
}

.purple {
    background: linear-gradient(0deg, rgb(187, 16, 187) 0%, rgba(255,192,0,0) 100%);
}

.green {
    background: linear-gradient(0deg, rgb(16, 187, 87) 0%, rgba(255,192,0,0) 100%);
}

.gold {
    background: linear-gradient(0deg, rgb(255, 217, 0) 0%, rgba(255,192,0,0) 100%);
}

.damagedOverlay {
  grid-row:3/4;
  grid-column:1/2;
}

.deadOverlay {
  grid-row:1/4;
  grid-column:1/2;
}

.deadOverlay img {
  width:200px;
  margin-top:15px;
}

.striked {
  color:red;
  text-decoration: line-through;
}

.damageReadout {
    grid-row: 2/3;
    grid-column: 1/2;
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width:200px;
    text-shadow: black 2px 2px 2px;
    text-align:center;
    margin:0 auto;
    text-decoration:none;
    font-family:var(--paragraphs-type);

}

.blocked {
  grid-row: 2/3;
  grid-column: 1/2;
  display:flex;
  align-items: center;
  justify-content: center;
  width:200px;
  text-align:center;
  margin:0 auto;
  text-decoration:none;
  color:greenyellow;
  font-size:20px;
  text-shadow:black 2px 2px 2px;
}

.test {
  position:fixed;
}

.coinWrapper {
  margin-top:10px;
}
</style>
