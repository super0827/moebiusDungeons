<template>

 <section class="columns">
      
      <img class="sigil" src="../assets/imgs/icons/shopkeepSigilIcon.png" alt="">
      <h3> {{  }}</h3>
      <img class="portrait" :src="player.portrait">
      
      <section class="flexRow stats">

          <p> {{ }} </p>

      </section>

      <section class="coinWrapper">
        <img src="../assets/imgs/icons/coinIcon.png" alt="">
        <h1 class="coinValue">{{ player.coins }}</h1>
      </section>

  </section>



    <!-- <img class="imgSize" src="./imgs/TRAVELERS.png" alt="">
        <section class="levelTitle">
            <p id="shopName"></p>
        </section>
        
        <section id="shopPortraits">
        </section>
        
        <section id="shopSaying">
        </section>

        <section>
            <h3 id="shopTip"></h3>
        </section> -->

</template>

<script>
export default {
    name: 'ShopPortrait',
    data() {
        return {
             shopKeepers: [
              {
                name:"cleric", 
                portrait:require("../assets/imgs/shopkeepers/cleric.png"), 
                description1:"Slicing and Dicing", 
                description2:"Bruiser class, high damage, good armor, high health.", 
                coins:0, health:12, armor:2, attackMax:8, attackType: "physical",
                attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"), 
                inAnimations: "zoomInLeft",
                outAnimations: "zoomOutLeft"
              },

              {name:"mage", 
              portrait:require("../assets/imgs/playableCharacters/mage.png"), 
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
}
</script>

<style scoped>

</style>
