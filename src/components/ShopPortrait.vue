<template>
 <section key="shopPortComp" class="columns">

      <h3> {{ storeState.shopkeep.name }}</h3>

      <img class="portrait" :src="storeState.shopkeep.portrait">
      
      <section class="flexRow stats">

          <p> {{ storeState.shopkeep.saying }} </p>

      </section>

  </section>
</template>

<script>


export default {
    name: 'ShopPortrait',
    data() {
      return {
      }
    },
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
