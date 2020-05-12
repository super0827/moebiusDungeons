<template>
<section class="flexRow">
   <monster-stats/>
<section 
  key="monsterPortComp"
  class="columns" 
>
    
      <h3 class="uppercase"> {{ storeState.monster.name }} </h3>
      
      
      <section 
      class="portraitWrapper"
      :class="{ 'animated pulse' : storeAnim.hurt, 
      'animated reverseWobble' : storeAnim.attacking, 
      'animated pulse' : storeAnim.blocking,
      'animated tada' : storeAnim.monsterDead
      }"
      >
        <div class="tooltip">
        <!-- Monster Image -->
        <img 
        class="portrait" 
        :src="storeState.monster.portrait"
        >
        <span class="tooltiptext">{{storeState.monster.warning}}</span>
        </div>

        <!-- Animated Damage Tips -->
        <transition appear
          type="animation"
          enter-active-class="animated jackInTheBox"
          leave-active-class="animated fadeOut"
        >
          <h1 v-if="storeAnim.blocking" class="blocked">BLOCKED!</h1>
        </transition>

        <transition appear
          type="animation"
          enter-active-class="animated pulse"
          leave-active-class="animated fadeOut"
        >
          <section class="damageReadout" v-if="storeAnim.hurt">
             <section class="flexRow">
               <section class="indicatorWrapper">
              <img class="attackIndicator" :src="storeState.player.attackTypeImage" alt="">
              <h2 class="attackValue">
                {{ storeState.playerDealtDamage }} 
              </h2>
               </section>

              <h2 class="versus">vs.</h2>
              
              <section class="indicatorWrapper">
              <img class="armorIndicator" src="../assets/imgs/icons/armorIcon.png" alt="">
              <h2 class="armorValue" :class="{ 'striked': storeState.magicAttack}">
              {{ storeState.monster.armor }} 
              </h2>
              </section>
             </section>

             <section>
              <h2 class="calculatedDamage"> {{ storeState.playerafterArmorDealtDamage }} </h2>
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

          <section v-if="storeState.monster.dire" class="direOverlay"></section>
      </section>


      <section class="coinWrapper">
        <img src="../assets/imgs/icons/coinIcon.png" alt="">
        <h1 class="coinValue">
          <animated-number 
          :value="storeState.monster.coins"
          :duration="storeState.duration"
          :formatValue="store.wholeNumber"
          />
        </h1>

      </section>
</section>

</section>
</template>


<script>
import { store } from "../store";
import AnimatedNumber from "animated-number-vue";
import MonsterStats from "./MonsterStats.vue";


export default {
  name: 'MonsterPortrait',
    components: {
      AnimatedNumber,
      MonsterStats
    },
  data() {
      return {
          storeState: store.state,
          storeAnim: store.animations.monster,
          store: store,
      }
  },
  created(){
    this.$sound.play(this.storeState.monster.enterSound);
  },
}
</script>

<style scoped>

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

.striked {
  color:red;
  text-decoration: line-through;
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

.direOverlay{
  grid-row:1/4;
  grid-column:1/2;
  background:rgba(255, 0, 98, 0.308);
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

p {
  text-transform:uppercase;
}

.coinWrapper {
  margin-top:10px;
}



</style>
