<template>
    <div>
        <section class="stats statColumn">

        <section class="flexRowStats">
          <p>
          <animated-number 
          :value="storeState.monster.health"
          :duration="storeState.duration"
          :formatValue="store.wholeNumber"
          />
          </p>
          <img src="../assets/imgs/icons/healthIcon.png">
        </section>
        
        <section class="flexRowStats">
          <p>
            <animated-number 
          :value="storeState.monster.armor"
          :duration="storeState.duration"
          :formatValue="store.wholeNumber"
          />
          </p>
          <img src="../assets/imgs/icons/armorIcon.png">
        </section>
        
        <section class="flexRowStats">
          <p>
          <animated-number 
          :value="storeState.monster.attackMax"
          :duration="storeState.duration"
          :formatValue="store.wholeNumber"
          />
          </p>
          <img :src="storeState.monster.attackTypeImage">
        </section>

      </section>  
    </div>
</template>



<script>
import { store } from "../store";
import AnimatedNumber from "animated-number-vue";

export default {
    name: 'monsterStats',
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