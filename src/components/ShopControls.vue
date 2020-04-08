<template>
<section class="columns battleOptions">
  
  <!-- Shop Title Description -->
  <h2 class="textCenter">{{ storeState.shopkeep.shopTitle }}</h2>

    <section
    v-for="buyable in storeState.shopkeep.items"
    :key="buyable.name"
    :name="buyable.name"
    :description="buyable.description"
    :cost="buyable.cost"
    @click="setPlayer(characters)"
    class="buySlot">
      <section class="information">
        <article class="cost">
          <img src="../assets/imgs/icons/coinIcon.png">
          <h1>{{ buyable.cost }}</h1>
        </article>
  
        <article>
          <h2 :class="{'striked' : striked }">{{ buyable.name }}</h2>
          <p> {{ buyable.description }} </p>
        </article>
      </section>
    </section>



<hr>


    <section class="buySlot">
      <h3 @click="storeState.phase = 'DungeonPhase'">BACK TO THE DUNGEONS</h3>
    </section>

</section>
</template>

<script>
import { store } from "../store";

export default {
  name: 'ShopControls',
  data() {
    return {
      storeState: store.state,
      
    }
  },
  computed: {
    striked: function() {
      return true;
    }
  }
}
</script>

<style scoped>

hr {
  border:solid black 1px;
}

.information {
  display:flex;
  justify-content:space-evenly;
  align-items: center;
}

.itemWrapper {
  margin-top:10px;
}

.textCenter {
  margin:5px 5px 10px 5px;
  font-size:14px;
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

h1 {
  color:black;
  text-shadow: rgb(255, 153, 0) 2px 2px 2px;
}
</style>
