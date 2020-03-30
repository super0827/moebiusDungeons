<template>
<section class="columns">
    
      <img class="sigil" src="../assets/imgs/icons/monsterSigilIcon.png" alt="">
      <h3 class="uppercase"> {{ currentMonster.name }} </h3>
      <img class="portrait" :src="currentMonster.portrait">
      
      <section class="flexRow stats">

        <section>
          <p>{{ currentMonster.health }}</p>
          <img src="../assets/imgs/icons/healthIcon.png">
        </section>
        
        <section>
          <p>{{ currentMonster.armor }}</p>
          <img src="../assets/imgs/icons/armorIcon.png">
        </section>
        
        <section>
          <p> d{{ currentMonster.attackMax }}</p>
          <img :src="currentMonster.attackTypeImage">
        </section>

      </section>

      <section class="coinWrapper">
        <img src="../assets/imgs/icons/coinIcon.png" alt="">
        <h1 class="coinValue">{{ currentMonster.coins }}</h1>
      </section>
    
</section>
</template>

<script>
export default {
  name: 'MonsterPortrait',
  data() {
      return {
          currentMonster: null,
          monsterRoster: 0,
          monsterCharacters: [
                // Level 1   
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
                coins:1, health:9, armor:1, attackMax:4, attackType: "physical",
                attackTypeImage: require("../assets/imgs/icons/physicalIcon.png")
              },
              {
                name:"goblins", 
                portrait:require("../assets/imgs/monsters/goblins.png"), 
                coins:1, health:8, armor:1, attackMax:6, attackType: "physical",
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
  created() {
       this.monsterRoster = this.monsterRoster + Math.floor(Math.random() * (3 - 1) + 1);
       this.currentMonster = this.monsterCharacters[this.monsterRoster];

       this.$emit('monster-stats', this.currentMonster);
  }
}
</script>

<style scoped>

</style>
