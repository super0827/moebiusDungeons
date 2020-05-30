<template>
<section>
<section class="columns battleOptions">
  <!-- Shop Title Description -->
  <h2 class="textCenter">{{ shopTitle}}</h2>
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

    <section class="buySlot">
      <h3 @click="store.sceneChange('DungeonPhase')">BACK TO THE DUNGEONS</h3>
    </section>


</section>

    <section class="itemIcons">

    </section>
    </section>
</template>

<script>

import {mapState} from 'vuex'

export default {
  name: 'ShopControls',
  data() {
    return {
      shake: false,
    }
  },
  computed: {
    ...mapState('shopkeepData', {
      shopTitle: state => state.info.shopTitle,
      shopInventory: state => state.inventory,
      item1: state => state.inventory[0].icon,
      item2: state => state.inventory[1].icon,
      item3: state => state.inventory[2].icon
    }),
    ...mapState('playerData', {
      coins: state => state.info.coins
    }),
  },
  methods: {
    randomRoll(rollMax){
      return Math.floor(Math.random() * Math.floor(rollMax) + 1);
    },
    buy(itemBought) {
      if(itemBought.cost <= this.storeState.player.coins && itemBought.bought === false) {
        
        let roll = this.randomRoll(2);
        
        switch (itemBought.cost) {
          case 1:
            this.$sound.play(`oneCoin${roll}`)
            this.$sound.play()
            break;
          case 2:
            this.$sound.play(`twoCoin${roll}`)
            break;
          case 3:
            this.$sound.play(`threeCoin${roll}`)
            break;
          case 4:
            this.$sound.play(`fourCoin`)
            break;
          case 5:
            this.$sound.play(`fiveCoin$`)
            break;
        }

        itemBought.buy();
        itemBought.bought = true;
        this.storeState.player.coins -= itemBought.cost;
      } else {
        itemBought.noSale = true;
        this.$sound.play('cantBuy');
        setTimeout(() => {
        itemBought.noSale = false;
        }, 500);
      }
    }
  },
}
</script>

<style scoped>

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
  width:100px;
  height:500px;
  background:red;
}

.itemRow {
  display:flex;
  justify-content: flex-start;
  align-items: center;
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
  min-width:200px;
  width:200px;
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
  top:20px;
  left:6px;
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
