<template>
<transition appear
    enter-active-class="animated zoomInRight"
    leave-active-class="animated zoomOutRight"
>
<section class="columns">
    
      <h3 class="uppercase"> {{ newMonster.name }} </h3>
      
      <section 
      class="portraitWrapper"
      :class="{'animated pulse' : hurt, 'animated reverseWobble' : attacking, 'animated jello' : blocked }"
        @animationend="afterEnter"
      >
        <!-- Monster Image -->
        <img 
        class="portrait" 
        :src="newMonster.portrait"
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
              {{ newMonster.armor }} 
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
          <p>{{ newMonster.health }}</p>
          <img src="../assets/imgs/icons/healthIcon.png">
        </section>
        
        <section>
          <p>{{ newMonster.armor }}</p>
          <img src="../assets/imgs/icons/armorIcon.png">
        </section>
        
        <section>
          <p> d{{ newMonster.attackMax }}</p>
          <img :src="newMonster.attackTypeImage">
        </section>

      </section>

      <section class="coinWrapper">
        <img src="../assets/imgs/icons/coinIcon.png" alt="">
        <h1 class="coinValue">{{ newMonster.coins }}</h1>
      </section>
</section>
</transition>
</template>


<script>
import { EventBus } from "../js/event-bus";

export default {
  name: 'MonsterPortrait',
  data() {
      return {

          //monster animation states
          blocked: false,
          hurt: false,
          attacking:false,
          portEffect: false,
          portEffectRed: false,
          portEffectPurple: false,
          portEffectGreen: false,

          // Battle Data
          attackDamage: 0,
          afterArmorDamage: 0,

          //Monster data
          monsterRoster: 0,
          newMonster: Object,
          monsterCharacters: [
                // Level 1   
              {
               name: "emptyObject",
              },
              {
                name:"bats", 
                portrait:require("../assets/imgs/monsters/bats.png"), 
                coins:1, health:4, armor:0, attackMax:4, attackType: "physical",
                attackTypeImage: require("../assets/imgs/icons/physicalIcon.png")
              },
              {
                name:"slime", 
                portrait:require("../assets/imgs/monsters/slime.png"), 
                coins:1, health:6, armor:2, attackMax:4, attackType: "physical",
                attackTypeImage: require("../assets/imgs/icons/physicalIcon.png")
              },
              {
                name:"kobold", 
                portrait:require("../assets/imgs/monsters/kobold.png"), 
                coins:1, health:7, armor:1, attackMax:4, attackType: "physical",
                attackTypeImage: require("../assets/imgs/icons/physicalIcon.png")
              },
              {
                name:"gnoll", 
                portrait:require("../assets/imgs/monsters/gnoll.png"), 
                coins:1, health:9, armor:1, attackMax:5, attackType: "physical",
                attackTypeImage: require("../assets/imgs/icons/physicalIcon.png")
              },
              {
                name:"goblins", 
                portrait:require("../assets/imgs/monsters/goblins.png"), 
                coins:1, health:8, armor:1, attackMax:4, attackType: "physical",
                attackTypeImage: require("../assets/imgs/icons/physicalIcon.png")
              },

                // Level 2
              {
                name:"ghost", 
                portrait:require("../assets/imgs/monsters/ghost.png"), 
                coins:2, health:10, armor:2, attackMax:8, attackType: "magical",
                attackTypeImage: require("../assets/imgs/icons/magicalIcon.png")
              },
              {
                name:"lizardman", 
                portrait:require("../assets/imgs/monsters/lizardman.png"), 
                coins:2, health:12, armor:2, attackMax:8, attackType: "physical",
                attackTypeImage: require("../assets/imgs/icons/physicalIcon.png")
              },
              {
                name:"curse", 
                portrait:require("../assets/imgs/monsters/curse.png"), 
                coins:2, health:16, armor:4, attackMax:12, attackType: "magical",
                attackTypeImage: require("../assets/imgs/icons/magicalIcon.png")
              },
              {
                name:"bandits", 
                portrait:require("../assets/imgs/monsters/bandits.png"), 
                coins:2, health:15, armor:2, attackMax:8, attackType: "physical",
                attackTypeImage: require("../assets/imgs/icons/physicalIcon.png")
              },
                  
                  // Level 3
              
              {
                name:"mimic", 
                portrait:require("../assets/imgs/monsters/mimic.png"), 
                coins:5, health:18, armor:3, attackMax:10, attackType: "physical",
                attackTypeImage: require("../assets/imgs/icons/physicalIcon.png")
              },
              {
                name:"ghoul", 
                portrait:require("../assets/imgs/monsters/ghoul.png"), 
                coins:3, health:15, armor:2, attackMax:10, attackType: "physical",
                attackTypeImage: require("../assets/imgs/icons/physicalIcon.png")
              },
              {
                name:"skeleton", 
                portrait:require("../assets/imgs/monsters/skeleton.png"), 
                coins:3, health:16, armor:2, attackMax:10, attackType: "physical",
                attackTypeImage: require("../assets/imgs/icons/physicalIcon.png")
              },
              {
                name:"swampling", 
                portrait:require("../assets/imgs/monsters/swampling.png"), 
                coins:3, health:16, armor:2, attackMax:10, attackType: "magical",
                attackTypeImage: require("../assets/imgs/icons/magicalIcon.png")
              },

                // Level 4

              {
                name:"harpy", 
                portrait:require("../assets/imgs/monsters/harpy.png"), 
                coins:4, health:15, armor:3, attackMax:10, attackType: "physical",
                attackTypeImage: require("../assets/imgs/icons/physicalIcon.png")
              },
              {
                name:"mushroom", 
                portrait:require("../assets/imgs/monsters/mushroom.png"), 
                coins:4, health:18, armor:2, attackMax:10, attackType: "physical",
                attackTypeImage: require("../assets/imgs/icons/physicalIcon.png")
              },
              {
                name:"dryad", 
                portrait:require("../assets/imgs/monsters/dryad.png"), 
                coins:4, health:20, armor:4, attackMax:10, attackType: "magical",
                attackTypeImage: require("../assets/imgs/icons/magicalIcon.png")
              },
              {
                name:"golem", 
                portrait:require("../assets/imgs/monsters/golem.png"), 
                coins:4, health:22, armor:4, attackMax:10, attackType: "physical",
                attackTypeImage: require("../assets/imgs/icons/physicalIcon.png")
              },
              
                // Level 5

              {
                name:"demon", 
                portrait:require("../assets/imgs/monsters/demon.png"), 
                coins:5, health:25, armor:4, attackMax:10, attackType: "physical",
                attackTypeImage: require("../assets/imgs/icons/physicalIcon.png")
              },
              {
                name:"banshee", 
                portrait:require("../assets/imgs/monsters/banshee.png"), 
                coins:5, health:30, armor:5, attackMax:12, attackType: "magical",
                attackTypeImage: require("../assets/imgs/icons/magicalIcon.png")
              },
              
                // BOSSES
              
              {
                name:"lich", 
                portrait:require("../assets/imgs/monsters/lich.png"), 
                coins:10, health:36, armor:8, attackMax:12, attackType: "magical",
                attackTypeImage: require("../assets/imgs/icons/magicalIcon.png")
              },
              {
                name:"dragon", 
                portrait:require("../assets/imgs/monsters/dragon.png"), 
                coins:10, health:40, armor:8, attackMax:12, attackType: "physical",
                attackTypeImage: require("../assets/imgs/icons/physicalIcon.png")
              },
          ],
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
    }
  },
  created() {
      // Sets monsterRoster to a new value, adding 1-4 to the old value
      this.monsterRoster = this.monsterRoster + Math.floor(Math.random() * Math.floor(4)) + 1;
      this.newMonster = this.monsterCharacters[this.monsterRoster];
      this.$emit('send-monster', this.newMonster);

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
      this.attackDamage = $event;
      this.afterArmorDamage = this.attackDamage - this.newMonster.armor;
    });
    //listen for player dealing 0 or less damage
    EventBus.$on("monster-blocked", () => { 
      this.blocked = true; 
      this.portEffect = true;
      this.portEffectPurple = true;
    });
    //listens fot player dealing 1 or more damage.
    EventBus.$on("monster-takes-damage", () => { 
      this.newMonster.health--;
    });
    //listens for monster dying
    EventBus.$on("is-monster-dead", () => { 
      if(this.newMonster.health <= 0){
        console.log('monster is dead!');
        EventBus.$emit('monster-retaliate');
      } else {
          EventBus.$emit('monster-retaliate');
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
