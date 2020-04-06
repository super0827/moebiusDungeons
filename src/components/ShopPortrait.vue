<template>
<transition appear
    mode="out-in"
    name="custom-classes-transition"
    enter-to-class="animated zoomInRight"
    leave-to-class="animated zoomOutRight"
>
 <section key="shopPortComp" class="columns">

      <h3> {{ storeState.shopkeep.name }}</h3>

      <img class="portrait" :src="storeState.shopkeep.portrait">
      
      <section class="flexRow stats">

          <p> {{ storeState.shopkeep.saying }} </p>

      </section>

  </section>
</transition>
</template>

<script>
import { store } from "../store";

export default {
    name: 'ShopPortrait',
    data() {
      return {
        storeState: store.state, 
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
