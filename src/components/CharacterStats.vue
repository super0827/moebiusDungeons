<template>
    <div>
        <section class="stats statColumn" v-if="who === 'player'">

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
        

      </section>  


      <!-- MONSTER BAR -->
      <section class="stats statColumn" v-if="who === 'monster'">

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

      </section>  
    </div>
</template>

<script>
import AnimatedNumber from "animated-number-vue";

export default {
    name: 'CharacterStats',
    components: {
        AnimatedNumber,
    },
    props: [
      'who',
      'health',
      'armor',
      'attack',
      'attackImage',
    ],
    data() {
        return {
        }
    },
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