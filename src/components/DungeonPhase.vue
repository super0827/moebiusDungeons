<template>
<section class="dungeonPhaseWrapper" key="dungeonPhaseWrapper">
    <section class="flexColumn animated"
    :class="{'zoomInDown' : storeState.isEntering, 'zoomOutUp' : !storeState.isEntering}">
        <img key="dungeonSigil" class="iconImageSize" src="../assets/imgs/icons/monsterSigilIcon.png" alt="">
        <h1 class="textCenter phaseName">DUNGEON</h1>
    </section>

    <!-- Battle Helper Button -->
    <transition name="fade" mode="out-in">
        <h1 @click="helper = !helper" @mouseenter="$sound.play('chit')" id="dungeonHelp">DUNGEON HELP</h1>
    </transition>
    
    <section class="flexRow">
        
        <player-readout
        class="animated"
        :class="{'zoomInLeft' : storeState.isEntering, 
        'zoomOutLeft' : !storeState.isEntering}"
        />

        <!-- Player Portrait and Stats -->
        <player-portrait
        class="animated"
        :class="{'zoomInLeft' : storeState.isEntering, 'zoomOutLeft' : !storeState.isEntering}"
        />

        <!-- Dungeon Controls -->
        <battle-controls
        class="animated"
        :class="{'zoomInUp' : storeState.isEntering, 'zoomOutDown' : !storeState.isEntering}"
        key="battleControls"/>

        <!-- Monster Portrait -->
        <monster-portrait
        key="monsterPortrait"
        class="animated"
        :class="{'zoomInRight' : storeState.isEntering, 'zoomOutRight' : !storeState.isEntering}"
        @monster-is-dead="gameplayScene = 'shop'"
        />

        <monster-readout
        class="animated"
        :class="{'zoomInRight' : storeState.isEntering, 
        'zoomOutRight' : !storeState.isEntering}"
        />
    </section>
    
    <!--  Battle Helpers -->
    <transition name="fade" mode="out-in">
        <battle-help key="battleHelper" @close="helper = false" v-if="helper==true"/>
    </transition>
</section>
</template>

<script>
import { store } from "../store"

import BattleControls from './BattleControls.vue';
import PlayerPortrait from "./PlayerPortrait.vue";
import MonsterPortrait from "./MonsterPortrait.vue";
import BattleHelp from './BattleHelp.vue';
import PlayerReadout from './PlayerReadout.vue';
import MonsterReadout from './MonsterReadout.vue';

export default {
    name: 'DungeonPhase',
    components: {
        BattleHelp,
        PlayerPortrait,
        BattleControls,
        MonsterPortrait,
        PlayerReadout,
        MonsterReadout,
    },
    methods: {
        randomRoll(rollMax){
            return Math.floor(Math.random() * Math.floor(rollMax) + 1);
        },
    },
    data() {
        return {
            helper: false,
            storeState: store.state,
            randomBkg: Number,
        }
    },
    created() {
        this.randomBkg = this.randomRoll(5);
        this.$sound.play(`dungeonMusic${this.randomBkg}`, {fade: 1200, volume: .2});
        this.storeState.playerLog = [];
        this.storeState.monsterLog = [];
    },
    beforeDestroy() {
        this.$sound.pause(`dungeonMusic${this.randomBkg}`, {fade: 1200, volume: 0});
    },
    watch: {
        helper: function() {
            if(this.helper === true){
                this.$sound.pause(`dungeonMusic${this.randomBkg}`, {fade: 1200, volume:.05})
            } else {
                this.$sound.pause(`dungeonMusic${this.randomBkg}`, {fade: 1200, volume:.2})
            }
        }
    }
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