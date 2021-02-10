<template>
<div class="mt-1">
    <b-row align-h="center" class="mt-4">
        <b-col cols="12" class="d-flex justify-content-center mt-1">
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
        </b-col>
    </b-row>

    <b-row class="mt-3">
        <b-col cols="12" class="mt-5 d-flex justify-content-center">
            <!-- Armor Bar -->
            <section class="bar mt-2" id="bar2">
                <section class="center"></section>
                <section 
                    :style="{ width: playerAttackVsArmor + '%' }"
                    class="barSize"
                    :class="{ 'greenBar': attackBarAbove, 'redBar': !attackBarAbove }"
                >
                </section>
            </section>
        </b-col>
    </b-row>

    <b-row class="mt-3">
        <b-col class="mt-5 d-flex justify-content-center">
            <!--Attack Bar  -->
            <section class="bar mt-2" id="bar3">
                <section class="center"></section>
                <section 
                :style="{ width: playerArmorVsAttack + '%' }"
                class="barSize"
                :class="{ 'greenBar': defendBarAbove, 'redBar': !defendBarAbove }"
                ></section>
            </section>
        </b-col>
    </b-row>
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
    width:170px;
    height:15px;
}

.barSize {
    height:15px;
    transition: width 1s ease-in-out;
}

.greenBar {
    background: rgb(26, 230, 145);
}

.redBar {
    background: rgb(240, 8, 8);
}

.center {
    height:21px;
    width:2px;
    background:black;
    position: absolute;
    left:85px;
    top:-3px;
}
</style>