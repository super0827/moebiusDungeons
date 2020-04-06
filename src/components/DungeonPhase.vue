<template>
<section>
    <section class="flexColumn">
        <img key="dungeonSigil" class="iconImageSize" src="../assets/imgs/icons/monsterSigilIcon.png" alt="">
        <h1 class="textCenter phaseName">DUNGEON</h1>
    </section>

     <!--  Battle Helpers -->
    <transition name="fade" mode="out-in">
        <battle-help key="battleHelper" @close="helper = ''" v-if="helper=='battle'"/>
    </transition>

    <!-- Battle Helper Button -->
    <transition name="fade" mode="out-in">
        <h1 v-if="helper != 'battle'" @click="helper = 'battle'" id="dungeonHelp">DUNGEON HELP</h1>
    </transition>
    
    <section class="flexRow">
        <!-- Player Portrait and Stats -->
        <player-portrait
        key="playerPortrait"/>

        <!-- Dungeon Controls -->
        <battle-controls 
        key="battleControls"/>

        <!-- Monster Portrait -->
        <monster-portrait
        key="monsterPortrait"
        @monster-is-dead="gameplayScene = 'shop'"
        />
    </section>
</section>
</template>

<script>
import BattleControls from './BattleControls.vue';
import PlayerPortrait from "./PlayerPortrait.vue";
import MonsterPortrait from "./MonsterPortrait.vue";
import BattleHelp from './BattleHelp.vue';

export default {
    name: 'DungeonPhase',
    components: {
        BattleHelp,
        PlayerPortrait,
        BattleControls,
        MonsterPortrait,
    },
    data() {
        return {
            helper: false,
        }
    },
}
</script>

<style  scoped>

</style>