<template>
    <div>
        <section class="stats statColumn" v-if="who === 'player'">

          <ToolTip
            subtitle="Your Health (HP)"
            :descriptions="[`Value representing your total Health. If this reaches zero it's Game Over!`]"
          >
        <section class="flexRowStats">
          <img src="@/assets/imgs/icons/healthIcon.png">
          <p>
          <animated-number 
          :value="health"
          :duration="1000"
          :formatValue="wholeNumber"
          />
          </p>
        </section>
        </ToolTip>
        
        <ToolTip
            subtitle="Your Attack (ATK)"
            :descriptions="[`Value representing your maximum possible attack.`]"
          >
        <section class="flexRowStats">
          <img :src="attackImage">
          <p>
          <animated-number 
          :value="attack"
          :duration="1000"
          :formatValue="wholeNumber"
          />
          </p>
        </section>
        </ToolTip>

        <ToolTip
            subtitle="Your Armor (ARM)"
            :descriptions="[`Value representing your armor, this value reduces attacks from physical type monsters.`]"
          >
        <section class="flexRowStats">
          <img src="@/assets/imgs/icons/armorIcon.png">
          <p>
            <animated-number 
          :value="armor"
          :duration="1000"
          :formatValue="wholeNumber"
          />
          </p>
        </section>
        </ToolTip>

      </section>  


      <!-- MONSTER BAR -->
      <section class="stats statColumn" v-if="who === 'monster'">

        <ToolTip
        subtitle="Monster's HP"
        :descriptions="[`Attacking the monster will reduce this number, when it reaches zero, you beat the monster!`]"
        >
        <section class="flexRowStats reverseSides">
          <img src="@/assets/imgs/icons/healthIcon.png">
          <p>
          <animated-number 
          :value="health"
          :duration="1000"
          :formatValue="wholeNumber"
          />
          </p>
        </section>
        </ToolTip>
        
        
        <ToolTip
            subtitle="Monster's Armor (ARM)"
            :descriptions="[`Value representing the Monster's armor, this value reduces physical damage dealt to the Monster.`]"
          >
        <section class="flexRowStats reverseSides">
          <img src="@/assets/imgs/icons/armorIcon.png">
          <p>
            <animated-number 
          :value="armor"
          :duration="1000"
          :formatValue="wholeNumber"
          />
          </p>
        </section>
        </ToolTip>
        
        <ToolTip
            subtitle="Monster's Armor (ARM)"
            :descriptions="[`Value representing the Monster's armor, this value reduces physical damage dealt to the Monster.`]"
          >
        <section class="flexRowStats reverseSides">
          <img :src="attackImage">
          <p>
          <animated-number 
          :value="attack"
          :duration="1000"
          :formatValue="wholeNumber"
          />
          </p>
        </section>
        </ToolTip>

      </section>  
    </div>
</template>

<script>
import AnimatedNumber from "animated-number-vue";
import ToolTip from "@/components/ui/ToolTip.vue"

export default {
    name: 'CharacterStats',
    components: {
        AnimatedNumber,
        ToolTip
    },
    props: [
      'who',
      'health',
      'armor',
      'attack',
      'attackImage',
    ],
}
</script>

<style scoped>
.flexRowStats {
    display:flex;
    justify-content: space-evenly;
    align-items: center;
}
.reverseSides {
  flex-direction:row-reverse;
}

p { 
  font-size:25px;
}
</style>