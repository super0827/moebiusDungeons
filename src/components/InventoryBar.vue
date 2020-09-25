<template>
    <div class="inventory">
        <section v-for="items in inventory" :key="items.name">
            <span class="tooltip">
                <span class="tooltiptext">
                    {{items.description}}
                </span>
                <img :src="items.icon" alt="items.name">
            </span>
        </section>
    </div>
</template>

<script>
    import {mapState, mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters('playerData', {
               inventory: 'inventory'
            }),
        }
    }
</script>

<style scoped>
.inventory {
    margin-top:10px;
    height:50px;
    width:200px;
    display:flex;
}

.inventory img {
    width:50px;
    margin:5px;
}

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: white;
  font-size:15px;
  text-align: center;
  border-radius: 6px;
  padding: 5px 5px;
  position: absolute;
  z-index: 1;
  top: -5px;
  right: 110%;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 100%;
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent transparent black;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>