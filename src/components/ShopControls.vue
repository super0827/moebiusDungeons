<template>
<section class="flexContainer">
<section class="columns battleOptions">
  <!-- Shop Title Description -->
  
    <section
    v-for="buyable in shopInventory"
    :key="buyable.name"
    :name="buyable.name"
    :id="buyable.id"
    :description="buyable.description"
    :cost="buyable.cost"
    @click="buy(buyable)"
    class="itemRow"
    >
      <section class="information buySlot" 
      :class="{'striked' : buyable.cost > coins, 
      'animated shake faster' : buyable.noSale, 
      'bought' : buyable.bought}">
        <section>  
        <article class="cost">
          <img src="../assets/imgs/icons/coinIcon.png">
          <h1>{{ buyable.cost }}</h1>
        </article>
        </section>
  
      <section>
        <article>
          <h2>{{ buyable.name }}</h2>
          <p> {{ buyable.description }} </p>
        </article>
      </section>

      </section>

        <article class="boughtAlert" v-if="buyable.bought">
          <h1>BOUGHT</h1>
        </article>
    </section>

    <hr>

    <section  @click="$store.commit('gameData/mutate', {property: 'phase', with: 'DungeonPhase'})" class="buySlot">
      <h3>BACK TO THE DUNGEONS</h3>
    </section>


</section>

    <section class="itemIcons">
      <img :src="item1" alt="">
      <img :src="item2" alt="">
      <img :src="item3" alt="">
    </section>
    </section>
</template>

<script>

import {mapState, mapGetters} from 'vuex'
import shuffle from 'lodash.shuffle'

import ShopSounds from '@/plugins/ShopSounds.js'
import ClericSounds from '@/plugins/ClericSounds.js'
import MerchantSounds from '@/plugins/MerchantSounds.js'
import GraverobberSounds from '@/plugins/GraverobberSounds.js'
import WitchSounds from '@/plugins/WitchSounds.js'

export default {
  name: 'ShopControls',
  data() {
    return {
      shake: false,
      Cleric: ClericSounds,
      Graverobber: GraverobberSounds,
      Merchant: MerchantSounds,
      Witch: WitchSounds
    }
  },
  computed: {
    ...mapState('shopkeepData', {
      shopTitle: state => state.info.shopTitle,
      shopInventory: state => state.inventory,
      item1: state => state.inventory[0].icon,
      item2: state => state.inventory[1].icon,
      item3: state => state.inventory[2].icon,
      shopkeep: state => state.info,
      who: state => state.info.name,
      visited: state => state.visited
    }),
    ...mapState('playerData', {
      coins: state => state.info.coins
    }),
    ...mapGetters('shopkeepData', {
       haveVisited: 'haveVisited',
    }),
    whosSound: function () {
      switch (this.who) {
        case 'cleric':
          return this.Cleric
          break;
        case 'graverobber':
          return this.Graverobber
          break;
        case 'merchant':
          return this.Merchant
          break;
        case 'witch':
          return this.Witch
          break;
      }
    }
  },
  methods: {
    randomRoll(rollMax){
      return Math.floor(Math.random() * Math.floor(rollMax) + 1);
    },
    buy(itemBought) {
      if(itemBought.cost <= this.coins && itemBought.bought === false) {
        
        let roll = this.randomRoll(2);

        if(itemBought.cost <= 4){
          let randomSound = this.randomRoll(this.shopkeep.thankYou.length-1)
          this.whosSound[this.shopkeep.thankYou[randomSound]].play()
        }
        else if (itemBought.cost === 5) {
          if(this.shopkeep.bigBuy.length > 0) {
            let randomSound = this.randomRoll(this.shopkeep.bigBuy.length-1)
            this.whosSound[this.shopkeep.bigBuy[randomSound]].play()
          }
          else {
            console.log(`No Sound Exists.`)
          }
        }
        
        switch (itemBought.cost) {
          case 1:
            ShopSounds[`oneCoin${roll}`].play()
            break;
          case 2:
            ShopSounds[`twoCoin${roll}`].play()
            break;
          case 3:
            ShopSounds[`threeCoin${roll}`].play()
            break;
          case 4:
            ShopSounds[`fourCoin`].play()
            break;
          case 5:
            ShopSounds[`fiveCoin`].play()
            break;
        }
        this.$store.dispatch('shopkeepData/' + itemBought.effect.action, itemBought.effect.payload)
        itemBought.bought = true;
        this.$store.commit('playerData/buyItem', itemBought.cost)
      } else {
        itemBought.noSale = true;
        
        setTimeout(() => {
        if(this.shopkeep.cantBuy.length > 0){
          this.whosSound[this.shopkeep.cantBuy[0]].play()
          this.shopkeep.cantBuy.shift()
        }
        else if (this.shopkeep.cantBuy.length === 0) {
         ShopSounds['cantBuy'].play()
        }
        itemBought.noSale = false;
        }, 500);
      }
    }
  },
  mounted() {
    if(this.haveVisited) {
      let randomSound = this.randomRoll(this.shopkeep.welcomeBack.length-1)
      this.whosSound[this.shopkeep.welcomeBack[randomSound]].play()
    } else {
      let randomSound = this.randomRoll(this.shopkeep.welcome.length-1)
      this.whosSound[this.shopkeep.welcome[randomSound]].play()
      this.$store.commit('shopkeepData/recordVisit')
    }
  },
  beforeDestroy() {
      let randomSound = this.randomRoll(this.shopkeep.goodbye.length-1)
      console.log(randomSound)
      this.whosSound[this.shopkeep.goodbye[randomSound]].play()
  }
}
</script>

<style scoped>
.flexContainer {
  display:flex;
}
.itemImage{
    width:70px;
    height:70px;
    margin-left:10px;
    margin-top:10px;
}

hr {
  border:solid black 1px;
}

.information {
  display:flex;
  justify-content:space-evenly;
  align-items: center;
  width:200px;
}

.itemIcons {
  width:85px;
  height:263px;
  margin-left:10px;
  margin-top:12px;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  align-items: center;

}

.itemIcons img {
  width:75px;
  height:75px;
}

.itemRow {
  display:flex;
  justify-content: flex-start;
  align-items: center;
  position:relative;
}

.textCenter {
  margin:5px 5px 10px 5px;
  font-size:14px;
  width:200px;
}

h2 {
  font-size: 15px;
  text-decoration: none;
  text-align:center;
  margin:0;
  padding:0;
}

article h2 {
  text-align: center;
  font-size:15px;
}

p {
  display:block;
  text-align:center;
  font-size:12px;
  padding:0 0 0px 0;
  margin:0;
}

.battleOptions {
  min-width:215px;
  width:210px;
  margin:0;
}

.buySlot {
  position:relative;
  padding:10px;
  /* background: rgba(207, 207, 207, 1); */
  border:2px solid black;
  margin:0 0 10px 0;
}

.buySlot:hover {
  background: rgb(253,229,144);
  cursor:pointer;
}

.buySlot:first-of-type {
  margin:0px 0px 10px 0px;
}

.buySlot:last-of-type {
  margin:10px 0 0 0;
}

.cost {
  position:relative;
}

.cost > img {
  width:55px;
  max-width:55px;
  margin:0 10px 0 0;
}

.cost h1 {
  position:absolute;
  margin:0;
  margin-block-start: 0;
  margin-block-end: 0;
  line-height: 55px;
  top:0px;
  width:55px;
  left: 0;
}

.flexRow {
  height:50px;
}

.striked {
  text-decoration:line-through;
  background: rgb(255, 75, 75);
  border:crimson 2px solid;
}

.striked:hover{
  cursor:not-allowed;
  background: rgb(255, 24, 24);
}

.bought {
  cursor:not-allowed;
  opacity:.2;
}

.boughtAlert h1{
  color:black;
  text-shadow: none;
  position:absolute;
  left:17px;
  top:32px;
  margin:0;
  padding:0;
  margin-block-start: 0;
  margin-block-end: 0;
  opacity:.5;
}

h1 {
  color:white;
  text-shadow: black -2px 2px 2px;
}
</style>
