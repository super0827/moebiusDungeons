<template>
<section 
  key="monsterPortComp"
 class="columns" 
 :class="{
  'animated tada' : storeAnim.monsterDead,
  }"
>
    
      <h3 class="uppercase"> {{ storeState.monster.name }} </h3>
      
      <section 
      class="portraitWrapper"
      :class="{ 'animated pulse' : storeAnim.hurt, 
      'animated reverseWobble' : storeAnim.attacking, 
      'animated pulse' : storeAnim.blocking 
      }"
      >
        <!-- Monster Image -->
        <img 
        class="portrait" 
        :src="storeState.monster.portrait"
        >

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
              <h2 class="calculatedDamage"> {{ storeState.playerafterArmorDealtDamage }} </h2>
             
             <section class="flexRow">
              <h2 class="attackValue">
                {{ storeState.playerDealtDamage }} 
              </h2>
              <h3 class="versus">vs.</h3>
              <h2 class="armorValue" :class="{ 'striked': storeState.magicAttack }">
                  {{ storeState.monster.armor }} 
              </h2>
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
      
      <section class="flexRow stats">

        <section>
          <p>
            <animated-number
            :value="storeState.monster.health"
            :duration="storeState.duration"
            :formatValue="store.wholeNumber"
            />
          </p>
          <img src="../assets/imgs/icons/healthIcon.png">
        </section>
        
        <section>
          <p>{{ storeState.monster.armor }}</p>
          <img src="../assets/imgs/icons/armorIcon.png">
        </section>
        
        <section>
          <p> d{{ storeState.monster.attackMax }}</p>
          <img :src="storeState.monster.attackTypeImage">
        </section>

      </section>

      <section class="coinWrapper">
        <img src="../assets/imgs/icons/coinIcon.png" alt="">
        <h1 class="coinValue">{{ storeState.monster.coins }}</h1>
      </section>
</section>
</template>


<script>
import { store } from "../store";
import AnimatedNumber from "animated-number-vue";

export default {
  name: 'MonsterPortrait',
    components: {
      AnimatedNumber
    },
  data() {
      return {
          storeState: store.state,
          storeAnim: store.animations.monster,
          store: store,
      }
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
  margin:5px;
  padding:5px;
  text-decoration: none;
}

.armorValue {
  color:rgb(0, 179, 255);
  text-shadow: black 2px 2px 2px;
  font-size:40px;
  margin:5px;
  padding:5px;
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
    line-height:40px;
    font-size:20px;
    margin:0;
    padding:0;
    color:rgb(192, 192, 192);
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
</style>
