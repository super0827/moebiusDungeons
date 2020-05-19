<template>
    <div class="barContainer">

        <!-- HEALTH BAR -->
        <section class="bar" id="bar1" :style="{gridTemplateColumns: 'repeat(' + this.hpWidth + ', 1fr)'}">
            <!-- PLAYER -->
            <section 
            :key="'php' + playerHP" 
            :style="{ gridColumnStart: 1, gridColumnEnd: this.playerHP + 1 }"
            class="blackBar"
            >
            </section>
            
            <section 
            :key="'mhp' + monsterHP" 
            :style="{ gridColumnStart: this.playerHP + 1, gridColumnEnd: this.hpWidth + 1}"
            class="redBar">
            </section>
        </section>

        <section class="bar" id="bar2" :style="{ gridTemplateColumns: 'repeat(' + this.armWidth + ', 1fr)' }">
            <section 
            :key="'parm' + playerARM" 
            :style="{ gridColumnStart: 1, gridColumnEnd: this.playerARM  + 1}"
            class="blackBar"
            >
            </section>
            
            <section 
            :key="'marm' + monsterARM" 
            :style="{  gridColumnStart: this.playerARM + 1, gridColumnEnd: this.armWidth + 1 }"
            class="redBar">
            </section>
        </section>
            
        <section class="bar" id="bar3" :style="{ gridTemplateColumns: 'repeat(' + this.atkWidth + ', 1fr)' }">
            <section 
            :key="'patk' + playerATK" 
            :style="{ gridColumnStart: 1, gridColumnEnd: this.playerATK + 1 }"
            class="blackBar"
            ></section>
            
            <section 
            :key="'matk' + monsterATK" 
            :style="{ gridColumnStart: this.playerATK + 1, gridColumnEnd: this.atkWidth + 1}"
            class="redBar"></section>
        </section>
    </div>
</template>

<script>

import { mapGetters, mapState } from 'vuex';

    export default {
         name: 'StatBars',
        data() {
            return {
                 healthBar: {
                     
                 },
                 armorBar: {
                     'grid-template-columns': 'repeat(' + this.armWidth + ', 1fr)',
                 },
                 atkBar: {
                     'grid-template-columns': 'repeat(' + this.atkWidth + ', 1fr)',
                 },
            }
        },
        computed: {
             ...mapGetters('gameData/', {
                 hpWidth: 'healthGauge',
                 armWidth: 'armorGauge',
                 atkWidth: 'attackGauge',
             }),
             ...mapState('playerData/', {
                 playerHP: state => state.info.health,
                 playerARM: state => state.info.armor,
                 playerATK: state => state.info.attackMax,
             }),
             ...mapState('monsterData/', {
                 monsterHP: state => state.info.health,
                 monsterARM: state => state.info.armor,
                 monsterATK: state => state.info.attackMax,
             })
        },
    }
</script>

<style scoped>
.bar {
    display:grid;
    background:gray;
    width:200px;
    height:8px;
}
.blackBar {
    background: rgb(0, 255, 136);
    height:8px;
}
.redBar {
    background: rgb(0, 0, 0);
    height:8px;
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