<template>
<transition appear
    name="custom-classes-transition"
    enter-to-class="animated zoomInUp"
    leave-to-class="amimated zoomOutUp"
>
<section class="columns battleOptions">
  
  <!-- Shop Title Description -->
  <h2 class="textCenter">{{ shopkeepData.shopTitle }}</h2>

  <hr>

    <section class="buySlot">
      <section class="information">
        <article class="cost">
          <img src="../assets/imgs/icons/coinIcon.png">
          <h1>{{ shopkeepData.items[0].cost }}</h1>
        </article>
      
        <article class="description">
          <h2 :class="{'striked' : !tierOne}">{{ shopkeepData.items[0].name }}</h2>
          <p> {{ shopkeepData.items[0].description }} </p>
        </article>
      </section>
    </section>

    <section class="buySlot">
      <section class="information">
        <article class="cost">
          <img src="../assets/imgs/icons/coinIcon.png">
          <h1>{{ shopkeepData.items[1].cost }}</h1>
        </article>
      
        <article class="description">
          <h2 :class="{'striked' : !tierOne}">{{ shopkeepData.items[1].name }}</h2>
          <p> {{ shopkeepData.items[1].description }} </p>
        </article>
      </section>
    </section>

    <section class="buySlot">
      <section class="information">
        <article class="cost">
          <img src="../assets/imgs/icons/coinIcon.png">
          <h1>{{ shopkeepData.items[2].cost }}</h1>
        </article>
      
        <article class="description">
          <h2 :class="{'striked' : !tierOne}">{{ shopkeepData.items[2].name }}</h2>
          <p> {{ shopkeepData.items[2].description }} </p>
        </article>
      </section>
    </section>

<hr>

</section>
</transition>
</template>

<script>

export default {
  name: 'ShopControls',
  props: {
    shopkeepData: { type: Object, }
  },
  data() {
    return {
      tierOne: false,
      tierTwo: false,
      tierThree: false,
    }
  }
}
</script>

<style scoped>
.information {
  display:flex;
  justify-content:space-around;
  align-items: center;
}

.description {
  display:inline-block;
}

.itemWrapper {
  margin-top:10px;
}

.textCenter {
  margin:10px 10px 20px 10px;
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
  background: rgba(207, 207, 207, 1);
  margin:0 0 10px 0;
}

.buySlot:hover {
  background: rgb(224, 224, 224);
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
