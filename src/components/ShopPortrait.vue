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
                items: [
                    { name: 'minor heal', cost: 1, description: 'heals player for 6 hp' },
                    { name: 'blessing', cost: 2, description: 'increases players armor by 1' },
                    { name: 'miracle', cost: 3, description: 'increases players max attack by 3' },
                ],
                saying:"Come in, are you hurt?",
                shopTitle: "I can heal you, or perhaps you need the favor of the old gods?"
              },

              {
                name:"graverobber", 
              portrait:require("../assets/imgs/shopkeepers/graverobber.png"),
              items: [
                { name: 'nacre charm', cost: 1, description: 'ATK +1 | ARM +1 | HP +1'},
                { name: 'detriment bangle', cost: 2, description: "Halves your HP | +3 ARM"},
                { name: 'Demon Ring', cost: 3, description: 'ATK Type becomes Pyhsical | x2 ATK '},
              ],
              saying:"Trust me, nothing I sell is cursed.",
              shopTitle: "Just buy somethin' quick, I don't wanna be seen fencing to the Kingloyal."
              },

              {name:"merchant", 
              portrait:require("../assets/imgs/shopkeepers/merchant.png"),
              items: [
                { name: 'rations', cost: 1, description: '+5 HP' },
                { name: 'armor kit', cost: 2, description: '+1 ARM' },
                { name: 'whetstone', cost: 2, description: '+2 ATK' },
              ],
              saying:"Friend or foe, what are ya' buyin'?",
              shopTitle: "It's not much, but it's what I've got. All priced to move."
              },

              {name:"witch", 
              portrait:require("../assets/imgs/shopkeepers/witch.png"),
              items: [
                { name: 'red potion', cost: 1, description: '+8 HP' },
                { name: 'banded charm', cost: 3, description: '+2 ATK | +1 ARM' },
                { name: 'blood ritual', cost: 5, description: 'Thirds your HP | + lost HP to your ATK' },
              ],
              saying:"Everything you see, all hand enchanted.",
              shopTitle: "Some of my inventory tends to be virulent. Browse at your own risk."
              },
          ],
        }
    },
    created() {
        let randomNumber = Math.floor(Math.random() * Math.floor(3) + 1);
        this.currentShopkeep = this.shopKeepers[randomNumber];
        this.$emit('send-shopkeep', this.currentShopkeep);
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
