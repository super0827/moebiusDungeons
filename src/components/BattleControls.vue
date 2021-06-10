<template>
<b-row align-h="center">
    <b-col cols="8" class="d-flex flex-column justify-content-center">
    <!-- Green Comparison Bars -->
    <ToolTip
        subtitle="Mettle"
        :descriptions="[`Mettle allows you to use your special ability up to a max of three times. Cost is always one to one.`]"
    >
        <!-- Mettle Bar -->
        <SpecialBar class="mb-5"/>
     </ToolTip>


    <ToolTip
        subtitle="Trade Blows"
        :descriptions="[`Deal damage to the monster, if it's still alive after you attack, it attacks back!`]"
    >
        <b-button variant="primary" class="mb-2 py-3 w-100" size="lg" @mouseenter="UiSounds.chit.play()" @click="TRADE_BLOWS()">
            <h3 
            class="m-0"
            :class="{'striked' : combatLocked }" 
            >Trade Blows</h3>
        </b-button>
    </ToolTip>

    <ToolTip
        :subtitle="special"
        :descriptions="[specialDescription]"
    >
        <b-button variant="primary" size="lg" class="mb-2 py-3 w-100 d-flex flex-column justify-content-center align-items-center" :class="{'striked' : combatLocked || mettle <= 0}" @mouseenter="UiSounds.chit.play()" @click="RUN_SPECIAL()">
            <h3 class="m-0 mettleIcon">{{special}}</h3>
            <p class="m-0">(Costs <img :src="mettleImg">)</p>
        </b-button>
    </ToolTip>

    <ToolTip
        subtitle="Turn Tail"
        :descriptions="[`Flee you fool! Click this to run away. Not certain to succeed.`]"
    >
        <b-button variant="primary" class="py-3 w-100" @mouseenter="UiSounds.chit.play()" @click="TURN_TAIL()">
            <h3
            class="m-0"
            :class="{'striked' : turnTailUsed || combatLocked }" 
            >Turn Tail</h3>
        </b-button>
    </ToolTip>

    </b-col>
</b-row>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'

import SpecialBar from "@/components/gameUI/SpecialBar.vue"
import ToolTip from "@/components/ui/ToolTip.vue"
import UiSounds from '@/plugins/UiSounds.js'

export default {
    name: 'BattleControls',
     components: {
      SpecialBar,
      ToolTip
    },
    data() {
        return {
            UiSounds: UiSounds
        }
    },
    computed: {
        ...mapState('gameData', [
            'combatLocked',
            'turnTailUsed'
        ]),
        ...mapState('playerData', {
            special: state => state.info.special,
            specialDescription: state => state.info.specialDescription,
            mettleImg: state => state.info.mettleImg,
            mettle: state => state.info.mettle
        }),
    },
    methods: {
        ...mapActions( 'playerData', [
            'ROLL_DAMAGE',
            'TRADE_BLOWS',
            'RUN_SPECIAL',
            'TURN_TAIL',
            'ESCAPE',
        ])
    }
}
</script>

<style scoped>
.striked {
    text-decoration: line-through;
    opacity:0.2;
    transition:all .6s;
}
.striked:hover {
    text-decoration: line-through;
    transition:all .6s;
    cursor:not-allowed;
}

p img {
    max-height:30px;
}
</style>
