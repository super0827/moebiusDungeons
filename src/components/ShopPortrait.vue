<template>
 <section key="shopPortComp" class="columns">

      <h3> {{ shopkeepName }}</h3>

      <img class="portrait" :src="shopPort">
      
      <section class="flexRow stats">

          <p> {{ shopTitle }} </p>

      </section>

  </section>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'ShopPortrait',
    data() {
      return {
      }
    },
    computed: {
        ...mapState('shopkeepData', {
            shopkeepName: state => state.info.name,
            shopPort: state => state.info.portrait,
            saying: state => state.info.saying,
            shopTitle: state => state.info.shopTitle,
        }),
    },
}
</script>

<style scoped>
.columns {
    width:200px;
    min-width:200px;
    margin-left:10px;
}
h3 {
    text-transform:uppercase;
}
p{
    text-transform:uppercase;
}
</style>
