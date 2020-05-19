<template>
    <div class="barContainer">

        <!-- HEALTH BAR -->
        <section class="bar" id="bar1">
            <!-- PLAYER -->
            <section class="center"></section>
            <section 
            :style="{ width: healthBar + '%' }"
            class="greenBar"
            >
            </section>
        </section>

        <!-- Armor Bar -->
        <section class="bar" id="bar2">
            <section class="center"></section>
            <section 
            :style="{ width: armorBar + '%' }"
            class="greenBar"
            >
            </section>
        </section>

         <!--Attack Bar  -->
        <section class="bar" id="bar3">
            <section class="center"></section>
            <section 
            :style="{ width: attackBar + '%' }"
            class="greenBar"
            ></section>
        </section>
    </div>
</template>

<script>

import { mapGetters, mapState } from 'vuex';

    export default {
        name: 'StatBars',
        computed: {
             ...mapGetters('gameData/', {
                 healthBar: 'healthBar',
                 armorBar: 'armorBar',
                 attackBar: 'attackBar'
             }),
        },
    }
</script>

<style scoped>
.bar {
    position:relative;
    background:rgb(48, 6, 11);
    width:200px;
    height:8px;
}
.greenBar {
    background: rgb(26, 230, 145);
    height:8px;
    transition: width 1s ease-in-out;
}
.center {
    height:12px;
    width:2px;
    background:black;
    position: absolute;
    left:100px;
    top:-2px;
}
#bar1 {
    margin:60px 0 0 0;
}
#bar2 {
    margin:78px 0 0 0;
}
#bar3 {
    margin:74px 0 20px 0;
}
</style>