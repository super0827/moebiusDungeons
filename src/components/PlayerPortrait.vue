<template>
  <section class="columns">
      
      <h3>YOU</h3>

      <section 
      class="portraitWrapper"
      :class="{'animated pulse' : storeAnim.hurt, 
      'animated wobble' : storeAnim.attacking, 
      'animated pulse' : storeAnim.blocked }"
      >
      <img class="portrait" :src="storeState.player.portrait">

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
              <h2 class="calculatedDamage"> {{ storeState.monsterafterArmorDealtDamage }} </h2>
             
             <section class="flexRow">
              <h2 class="attackValue">
                {{ storeState.monsterDealtDamage }} 
              </h2>
              <h3 class="versus">vs.</h3>
              <h2 class="armorValue" :class="{ 'striked': storeState.magicAttack}">
              {{ storeState.player.armor }} 
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
      </section>


      <section class="flexRow stats">

        <section>
          <p>{{ storeState.player.health }}</p>
          <img src="../assets/imgs/icons/healthIcon.png">
        </section>
        
        <section>
          <p>{{ storeState.player.armor }}</p>
          <img src="../assets/imgs/icons/armorIcon.png">
        </section>
        
        <section>
          <p> d{{ storeState.player.attackMax }}</p>
          <img :src="storeState.player.attackTypeImage">
        </section>

      </section>

      <section class="coinWrapper">
        <img src="../assets/imgs/icons/coinIcon.png" alt="">
        <h1 class="coinValue">{{ storeState.player.coins }}</h1>
      </section>

  </section>
</template>

<script>
import { store } from "../store";


export default {
  name: 'PlayerPortrait',
  data() {
    return {
      storeState: store.state,
      storeAnim: store.animations.player,
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
