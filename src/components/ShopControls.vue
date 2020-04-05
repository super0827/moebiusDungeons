<template>
<transition appear
    name="custom-classes-transition"
    enter-to-class="animated zoomInUp"
    leave-to-class="amimated zoomOutUp"
>
<section class="columns battleOptions">

    <h2 :class="{'striked' : !tierOne}">{{ shopKeep.items[0].name }}</h2>
    <h2 :class="{'striked' : !tierTwo}">{{ shopKeep.items[1].name }}</h2>
    <h2 :class="{'striked' : !tierThree}">{{ shopKeep.items[2].name }}</h2>

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
h2 {
  padding:10px;
  font-size: 17px;
  text-decoration: none;
  background: rgb(207, 207, 207);
}

.battleOptions {
  min-width:200px;
  width:200px
}
</style>
