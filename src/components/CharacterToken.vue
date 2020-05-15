<template>

<section class="flexRow">
  <section class="columns">
      
      <h3>YOU</h3>
      <section 
      class="portraitWrapper"
      :class="{'animated pulse' : isHurt, 
      'animated wobble' : isAttacking, 
      'animated pulse' : isBlocking,
      'animated tada' : isDead 
      }"
      >
      <img class="portrait" :src="portrait">

      <!-- Animated Damage Tips -->
        <transition appear
          type="animation"
          enter-active-class="animated jackInTheBox"
          leave-active-class="animated fadeOut"
        >
          <h1 v-if="blocking" class="blocked">BLOCKED!</h1>
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
            <section v-if="storeAnim.portEffect" 
              class="damagedOverlay"
              :class="{ 
                red : storeAnim.portEffectRed, 
                green : storeAnim.portEffectGreen, 
                purple : storeAnim.portEffectPurple 
              }"
            >
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

      <stat-bar/>

</section>
</template>

<script>
import AnimatedNumber from "animated-number-vue";
import StatBar from "./StatBar.vue";

export default {
  name: 'CharacterToken',
  components: {
    AnimatedNumber,
    StatBar
  },
  props: [
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
    'isDead',
    'statSide',
    'enemyAttackType',
    'enemyAttackTypeImage',
    'enemyAttackDamage',
    'enemyReducedAttackDamage',
  ],
  methods: {
    wholeNumber(value) {
      return `${Math.ceil(value)}`;
    },
  }
}

</script>

<style scoped>

.portraitWrapper {
  display:grid;
  height:233px;
  grid-template-columns: 100%;
  grid-template-rows: 33% 34% 33%;
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

.red {
    background: linear-gradient(0deg, rgb(187, 16, 58) 0%, rgba(255,192,0,0) 100%);
}

.purple {
    background: linear-gradient(0deg, rgb(187, 16, 187) 0%, rgba(255,192,0,0) 100%);

}

.green {
    background: linear-gradient(0deg, rgb(16, 187, 87) 0%, rgba(255,192,0,0) 100%);

}

.damagedOverlay {
  grid-row:3/4;
  grid-column:1/2;
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
