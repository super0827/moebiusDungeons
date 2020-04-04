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
export default {
    name: 'ShopPortrait',
    data() {
        return {
             currentShopkeep: Object,
             shopKeepers: [
              {
                name:"cleric", 
                portrait:require("../assets/imgs/shopkeepers/cleric.png"),
                inAnimations: "zoomInLeft",
                outAnimations: "zoomOutLeft"
              },

              {name:"graverobber", 
              portrait:require("../assets/imgs/shopkeepers/graverobber.png"), 
              description1:"Spellslinging", 
              description2:"Magic attacks ignore enemy armor, highest damage, lowest health.", 
              coins:0, health:6, armor:0, attackMax:10, attackType: "magical", 
              attackTypeImage: require("../assets/imgs/icons/magicalIcon.png"), 
              inAnimations: "zoomInUp",
              outAnimations: "zoomOutDown",
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
        let randomNumber = Math.floor(Math.random() * Math.floor(4) + 1);
        this.currentShopkeep = this.shopKeepers[randomNumber];
    }
}
</script>

<style scoped>
h3 {
    text-transform:uppercase;
}
</style>
