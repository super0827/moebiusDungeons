<template>
    <div class="barContainer">
        <section class="bar" id="bar1" :style="healthBar">
            <section 
            :key="'php' + storeState.player.health" 
            :style="playerHealthBar"
            class="blackBar"
            >
            </section>
            
            <section 
            :key="'mhp' + storeState.monster.health" 
            :style="monsterHealthBar"
            class="redBar">
            </section>
        </section>

        <section class="bar" id="bar2" :style="armorBar">
            <section 
            :key="'parm' + storeState.player.armor" 
            :style="playerArmorBar"
            class="blackBar"
            >
            </section>
            
            <section 
            :key="'marm' + storeState.monster.armor" 
            :style="monsterArmorBar"
            class="redBar">
            </section>
        </section>
            
        <section class="bar" id="bar3" :style="atkBar">
            <section 
            :key="'patk' + storeState.player.maxAttack" 
            :style="playerAtkBar"
            class="blackBar"
            ></section>
            
            <section 
            :key="'matk' + storeState.monster.maxAttack" 
            :style="monsterAtkBar"
            class="redBar"></section>
        </section>
    </div>
</template>

<script>

    export default {
         name: 'StatBars',
        data() {
            return {
                 healthBar: {
                     'grid-template-columns': 'repeat(' + this.hpTotal + ',1fr)',
                 },
                 armorBar: {
                     'grid-template-columns': 'repeat(' + this.armorTotal + ', 1fr)',
                 },
                 atkBar: {
                     'grid-template-columns': 'repeat(' + this.atkTotal + ', 1fr)',
                 },
                 hpTotal: store.state.player.health + store.state.monster.health,
                 armorTotal: store.state.player.armor + store.state.monster.armor,
                 atkTotal: store.state.player.attackMax + store.state.monster.attackMax,
                 
                 playerHealthBar: {
                     gridColumnStart: 1,
                     gridColumnEnd: store.state.player.health,
                 },
                 monsterHealthBar: {
                     gridColumnStart: store.state.player.health,
                     gridColumnEnd: this.hpTotal,
                 },

                 playerArmorBar: {
                     gridColumnStart: 1,
                     gridColumnEnd: store.state.player.armor,
                 },
                 monsterArmorBar: {
                     gridColumnStart: store.state.player.armor,
                     gridColumnEnd: this.armorTotal,
                 },

                 playerAtkBar: {
                     gridColumnStart: 1,
                     gridColumnEnd: store.state.player.attackMax,
                 },
                 monsterAtkBar: {
                     gridColumnStart: store.state.player.attackMax,
                     gridColumnEnd: this.atkTotal,
                 }
            }
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