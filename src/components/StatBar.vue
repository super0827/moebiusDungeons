<template>
    <div class="barContainer">
        <section class="bar" id="bar1" :style="healthBar">
            <section 
            :key="'php' + this.playerHP" 
            :style="this.playerHealthBar"
            class="blackBar"
            >
            </section>
            
            <section 
            :key="'mhp' + this.monsterHP" 
            :style="this.monsterHealthBar"
            class="redBar">
            </section>
        </section>

        <section class="bar" id="bar2" :style="armorBar">
            <section 
            :key="'parm' + this.playerARM" 
            :style="playerArmorBar"
            class="blackBar"
            >
            </section>
            
            <section 
            :key="'marm' + this.monsterARM" 
            :style="monsterArmorBar"
            class="redBar">
            </section>
        </section>
            
        <section class="bar" id="bar3" :style="atkBar">
            <section 
            :key="'patk' + this.playerATK" 
            :style="playerAtkBar"
            class="blackBar"
            ></section>
            
            <section 
            :key="'matk' + this.monsterATK" 
            :style="monsterAtkBar"
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
                     'grid-template-columns': 'repeat(' + this.hpWidth + ',1fr)',
                 },
                 armorBar: {
                     'grid-template-columns': 'repeat(' + this.armWidth + ', 1fr)',
                 },
                 atkBar: {
                     'grid-template-columns': 'repeat(' + this.atkWidth + ', 1fr)',
                 },
                 playerHealthBar: {
                     gridColumnStart: 1,
                     gridColumnEnd: this.playerHP,
                 },
                 monsterHealthBar: {
                     gridColumnStart: this.playerHP,
                     gridColumnEnd: this.hpWidth,
                 },

                 playerArmorBar: {
                     gridColumnStart: 1,
                     gridColumnEnd: this.playerARM,
                 },
                 monsterArmorBar: {
                     gridColumnStart: this.playerARM,
                     gridColumnEnd: this.armWidth,
                 },

                 playerAtkBar: {
                     gridColumnStart: 1,
                     gridColumnEnd: this.playerATK,
                 },
                 monsterAtkBar: {
                     gridColumnStart: this.playerATK,
                     gridColumnEnd: this.atkWidth,
                 }
            }
        },
        computed: {
             ...mapGetters('gameData', {
                 hpWidth: 'healthGauge',
                 armWidth: 'armorGauge',
                 atkWidth: 'attackGauge',

             }),
             ...mapState('playerData', {
                 playerHP: state => state.info.health,
                 playerARM: state => state.info.armor,
                 playerATK: state => state.info.attackMax,
             }),
             ...mapState('monsterData', {
                 monsterHP: state => state.info.health,
                 monsterARM: state => state.info.armor,
                 monsterATK: state => state.info.attackMax,
             })
         },
        created() {
            console.log(this.playerHealthBar)
        }
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