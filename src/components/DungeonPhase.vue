<template>
<section class="dungeonPhaseWrapper" key="dungeonPhaseWrapper">
    <section class="flexColumn animated"
    :class="{'zoomInDown' :isEntering, 'zoomOutUp' : !isEntering}">
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
        :class="{'zoomInLeft' : isEntering, 
        'zoomOutLeft' : !isEntering}"
        />

        <!-- Player Portrait and Stats -->
        <character-token
        class="animated"
        :class="{'zoomInLeft' : isEntering, 'zoomOutLeft' : !isEntering}"
        />

        <!-- Dungeon Controls -->
        <battle-controls
        class="animated"
        :class="{'zoomInUp' : isEntering, 'zoomOutDown' : !isEntering}"
        key="battleControls"/>

        <!-- Monster Portrait -->
        <character-token
        key="monsterPortrait"
        class="animated"
        :class="{'zoomInRight' : isEntering, 'zoomOutRight' : !isEntering}"
        @monster-is-dead="gameplayScene = 'shop'"
        />

        <monster-readout
        class="animated"
        :class="{'zoomInRight' : isEntering, 
        'zoomOutRight' : !isEntering}"
        />
    </section>
    
    <!--  Battle Helpers -->
    <transition name="fade" mode="out-in">
        <battle-help key="battleHelper" @close="helper = false" v-if="helper==true"/>
    </transition>
</section>
</template>

<script>

import BattleControls from './BattleControls.vue';
import CharacterToken from "./CharacterToken.vue";

import BattleHelp from './BattleHelp.vue';

import PlayerReadout from './PlayerReadout.vue';
import MonsterReadout from './MonsterReadout.vue';

import gameData from './mixins/gameData';
import helperToggles from './mixins/helperToggles';
import gameAnimations from './mixins/gameAnimations';

export default {
    name: 'DungeonPhase',
    components: {
        BattleHelp,
        CharacterToken,
        BattleControls,
        PlayerReadout,
        MonsterReadout,
    },
    mixins: [gameData, helperToggles, gameAnimations],
    data() {
        return {
        }
    },
    beforeDestroy: function() {
        const increment = Math.floor(Math.random() * Math.floor(4)) + 1;
        const newRoster = this.$store.monsterRoster + increment;
        this.$store.commit('mutate', {property: 'monsterRoster', with: newRoster});
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