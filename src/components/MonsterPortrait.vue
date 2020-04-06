<template>
<section 
  key="monsterPortComp"
 class="columns" 
 :class="{
  'animated tada' : monsterDead,
  }"
 @animationend="monsterFinished"
>
    
      <h3 class="uppercase"> {{ storeState.monster.name }} </h3>
      
      <section 
      class="portraitWrapper"
      :class="{ 'animated pulse' : hurt, 'animated reverseWobble' : attacking, 'animated pulse' : blocked }"
        @animationend="afterEnter"
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
          <h1 v-if="blocked" class="blocked">BLOCKED!</h1>
        </transition>

        <transition appear
          type="animation"
          enter-active-class="animated pulse"
          leave-active-class="animated fadeOut"
        >
          <section class="damageReadout" v-if="hurt">
              <h2 class="calculatedDamage"> {{ afterArmorDamage }} </h2>
             
             <section class="flexRow">
              <h2 class="attackValue">
                {{ attackDamage }} 
              </h2>
              <h3 class="versus">vs.</h3>
              <h2 class="armorValue">
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
            <section v-if="portEffect" 
              class="damagedOverlay"
              :class="{ 
                red : portEffectRed, 
                green : portEffectGreen, 
                purple : portEffectPurple 
              }"
            >
            </section>  
          </transition>
      </section>
      
      <section class="flexRow stats">

        <section>
          <p>{{ storeState.monster.health }}</p>
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
import { EventBus } from "../js/event-bus";
import { store } from "../store"

export default {
  name: 'MonsterPortrait',
  data() {
      return {
          storeState: store.state,
          storeChar: store.characters,

          //monster animation states
          blocked: false,
          hurt: false,
          attacking:false,
          portEffect: false,
          portEffectRed: false,
          portEffectPurple: false,
          portEffectGreen: false,
          monsterDead: false,

          // Battle Data
          attackDamage: 0,
          afterArmorDamage: 0,
          
      }
  },
  methods: {
    // Resets animations after they're executed
    afterEnter: function (){
    this.blocked = false;
    this.hurt = false;
    this.attacking = false;
    this.portEffect = false;
    this.portEffectRed = false;
    this.portEffectGreen = false;
    this.portEffectPurple = false;
    },
    monsterFinished: function () {
    this.monsterDead = false;
    }
  },
  created() {
    store.newMonster();
    store.newShopkeep();
  },
   mounted() { 
    //sets animation state of monster attacking 
    EventBus.$on('monster-attacking', () => {
      this.attacking = true;
    });

    //sets animation state of monster being attacked
    EventBus.$on('monster-recoil', () => {
      this.hurt = true; 
      this.portEffect = true;
      this.portEffectRed = true;
    });

    //listens for physical damage
    EventBus.$on('monster-physical-damage', ($event) => {
      this.attackDamage = $event + this.storeState.monster.armor
      this.afterArmorDamage = $event;
    });

    //listen for player dealing 0 or less damage
    EventBus.$on("monster-blocked", () => { 
      this.blocked = true; 
      this.portEffect = true;
      this.portEffectPurple = true;
      
    });

    //listens fot player dealing 1 or more damage.
    EventBus.$on("monster-takes-damage", () => { 
      this.storeState.monster.health--;
    });

    //listens for monster dying
    EventBus.$on("is-monster-dead", () => { 
      if(this.storeState.monster.health > 0){
        EventBus.$emit('monster-retaliate');
      }
      else {
          this.monsterDead = true;
          if(this.storeState.finalBoss == true ){
            setTimeout( () => { this.storeState.phase = "WinScreen" }, 2000);
            } else {
            this.storeState.isEntering = false;
            setTimeout( () => { 
              this.storeState.phase = "ShopPhase";
              this.storeState.isEntering = true; 
            }, 2000);
          }
          
      }
    });
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
