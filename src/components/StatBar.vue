<template>
    <div class="barContainer">

        <!-- HEALTH BAR -->
        <section class="bar" id="bar1">
            <!-- PLAYER -->
            <section class="center"></section>
            <section 
            :style="{ width: healthBar + '%' }"
            class="barSize"
            :class="{ 'greenBar': healthBarAbove, 'redBar': !healthBarAbove }"
            >
            </section>
        </section>

        <!-- Armor Bar -->
        <section class="bar" id="bar2">
            <section class="center"></section>
            <section 
            :style="{ width: playerAttackVsArmor + '%' }"
            class="barSize"
            :class="{ 'greenBar': attackBarAbove, 'redBar': !attackBarAbove }"
            >
            </section>
        </section>

         <!--Attack Bar  -->
        <section class="bar" id="bar3">
            <section class="center"></section>
            <section 
            :style="{ width: playerArmorVsAttack + '%' }"
            class="barSize"
            :class="{ 'greenBar': defendBarAbove, 'redBar': !defendBarAbove }"
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
                 playerAttackVsArmor: 'playerAttackVsArmor',
                 playerArmorVsAttack: 'playerArmorVsAttack'
             }),
             healthBarAbove: function() {
                 if (this.healthBar > 49) return true;
                 else if (this.healthBar < 50 ) return false;
             },
             attackBarAbove: function() {
                 if (this.playerAttackVsArmor > 49) return true;
                 else if (this.playerAttackVsArmor < 50 ) return false;
             },
             defendBarAbove: function() {
                 if (this.playerArmorVsAttack > 49) return true;
                 else if (this.playerArmorVsAttack < 50 ) return false;
             },
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

.barSize {
    height:8px;
    transition: width 1s ease-in-out;
}

.greenBar {
    background: rgb(26, 230, 145);
}

.redBar {
    background: rgb(240, 8, 8);
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