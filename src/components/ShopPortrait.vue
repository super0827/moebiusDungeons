<template>

 <section class="columns">

      <h3> {{ currentShopkeep.name }}</h3>

      <img class="portrait" :src="currentShopkeep.portrait">
      
      <section class="flexRow stats">

          <p> {{ currentShopkeep.saying }} </p>

      </section>

  </section>

</template>

<script>
import { EventBus } from '../js/event-bus';

export default {
    name: 'ShopPortrait',
    data() {
        return {
             currentShopkeep: Object,
             shopKeepers: [
              {
                name:"cleric", 
                portrait:require("../assets/imgs/shopkeepers/cleric.png"),
                items: [
                    { name: 'minor heal', cost: 1, description: 'heals player for 6 hp', value:6, },
                    { name: 'blessing', cost: 2, description: 'increases players armor by 1', value: 3 },
                    { name: 'miracle', cost: 3, description: 'increases players max attack by 3', value: 3 },
                ],
                saying:"Come in, are you hurt?",
                inAnimations: "zoomInRight",
                outAnimations: "zoomOutRight"
              },

              {
                name:"graverobber", 
              portrait:require("../assets/imgs/shopkeepers/graverobber.png"), 
              inAnimations: "zoomInRight",
              outAnimations: "zoomOutRight",
              },

              {name:"varlet", 
              portrait:require("../assets/imgs/playableCharacters/varlet.png"), 
              description1:"Sneaky and Roguish", 
              description2:"Avoids damage on critical hits, mid tier stats.", 
              coins:1, health:8, armor:1, attackMax:6, attackType: "physical", 
              attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"), 
              inAnimations: "zoomInRight",
              outAnimations: "zoomOutRight",
              },
          ],
        }
    },
    created() {
        // let randomNumber = Math.floor(Math.random() * Math.floor(4) + 1);
        this.currentShopkeep = this.shopKeepers[0];
        EventBus.$emit('send-shopkeep', this.currentShopkeep);
    }
}
</script>

<style scoped>
.columns {
    width:200px;
    min-width:200px;
}
h3 {
    text-transform:uppercase;
}
</style>
