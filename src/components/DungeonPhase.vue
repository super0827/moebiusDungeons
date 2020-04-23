<template>
<section class="dungeonPhaseWrapper" key="dungeonPhaseWrapper">
    <section class="flexColumn animated"
    :class="{'zoomInDown' : storeState.isEntering, 'zoomOutUp' : !storeState.isEntering}">
        <img key="dungeonSigil" class="iconImageSize" src="../assets/imgs/icons/monsterSigilIcon.png" alt="">
        <h1 class="textCenter phaseName">DUNGEON</h1>
    </section>


    <!-- Battle Helper Button -->
    <transition name="fade" mode="out-in">
        <h1 @click="helper = !helper" id="dungeonHelp">DUNGEON HELP</h1>
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
import { Howl } from "howler";

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
    data() {
        return {
            helper: false,
            storeState: store.state,
            dungeonMusic: new Howl ({
                src: [require('../assets/audio/battlePlanPurpPlan.mp3')],
                volume:0.3,
                loop: true,
            }),
        }
    },
    created() {
        this.dungeonMusic.play();
        this.dungeonMusic.fade(0, .1, 1500);
    },
    beforeDestroy() {
        this.dungeonMusic.fade(.1, 0, 1500);
    },
    watch: {
        helper: function() {
            if(this.helper === true){
                this.dungeonMusic.fade(.1, .01, 1000);
            } else {
                this.dungeonMusic.fade(.01, .1, 1000);
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