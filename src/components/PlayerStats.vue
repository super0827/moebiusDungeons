<template>
    <div>
        <section class="stats statColumn">

        <section class="flexRowStats">
          <img src="../assets/imgs/icons/healthIcon.png">
          <p>
          <animated-number 
          :value="storeState.player.health"
          :duration="storeState.duration"
          :formatValue="store.wholeNumber"
          />
          </p>
        </section>
        
        <section class="flexRowStats">
          <img src="../assets/imgs/icons/armorIcon.png">
          <p>
            <animated-number 
          :value="storeState.player.armor"
          :duration="storeState.duration"
          :formatValue="store.wholeNumber"
          />
          </p>
        </section>
        
        <section class="flexRowStats">
          <img :src="storeState.player.attackTypeImage">
          <p>
          <animated-number 
          :value="storeState.player.attackMax"
          :duration="storeState.duration"
          :formatValue="store.wholeNumber"
          />
          </p>
        </section>

      </section>  
    </div>
</template>



<script>
import { store } from "../store";
import AnimatedNumber from "animated-number-vue";

export default {
    name: 'PlayerStats',
    components: {
        AnimatedNumber,
    },
    data() {
        return {
        store: store,
        storeState: store.state,
        }
    },
}
</script>

<style scoped>
p { 
  font-size:25px;
}
</style>