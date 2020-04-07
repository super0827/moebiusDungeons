<template>
<section class="dungeonPhaseWrapper" key="dungeonPhaseWrapper">
    <section class="flexColumn animated"
    :class="{'zoomInUp' : storeState.isEntering, 'zoomOutUp' : !storeState.isEntering}">
        <img key="dungeonSigil" class="iconImageSize" src="../assets/imgs/icons/monsterSigilIcon.png" alt="">
        <h1 class="textCenter phaseName">DUNGEON</h1>
    </section>


    <!-- Battle Helper Button -->
    <transition name="fade" mode="out-in">
        <h1 v-if="helper != 'battle'" @click="helper = 'battle'" id="dungeonHelp">DUNGEON HELP</h1>
    </transition>
    
    <section class="flexRow">
        <!-- Player Portrait and Stats -->
        <player-portrait
        class="animated"
        :class="{'zoomInLeft' : storeState.isEntering, 'zoomOutLeft' : !storeState.isEntering}"
        />
        <!-- Dungeon Controls -->
        <battle-controls
        class="animated"
        :class="{'zoomInDown' : storeState.isEntering, 'zoomOutDown' : !storeState.isEntering}"
        key="battleControls"/>

        <!-- Monster Portrait -->
        <monster-portrait
        key="monsterPortrait"
        class="animated"
        :class="{'zoomInRight' : storeState.isEntering, 'zoomOutRight' : !storeState.isEntering}"
        @monster-is-dead="gameplayScene = 'shop'"
        />
    </section>
    
    <!--  Battle Helpers -->
    <transition name="fade" mode="out-in">
        <battle-help key="battleHelper" @close="helper = ''" v-if="helper=='battle'"/>
    </transition>
</section>
</template>

<script>
import { store } from "../store"
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
            storeState: store.state,
        }
    },
}
</script>

<style  scoped>
    .dungeonPhaseWrapper {
        position:relative;
    }
    battle-help {
        position:absolute;
        z-index:99999;
        transition: all .4s ease-in-out;
    }
</style>