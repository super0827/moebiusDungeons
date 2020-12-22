<template>
<section class="columnsMiddle battleOptions">
    <StatBar/>

    <br>

    <SpecialBar/>

    <br>

    <ToolTip
        subtitle="Trade Blows"
        :descriptions="[`Deal damage to the monster, if it's still alive after you attack, it attacks back!`]"
        top="true"
    >
    <div @mouseenter="UiSounds.chit.play()" @click="TRADE_BLOWS()" class="controlButton">
        <h2  
        :class="{'striked' : combatLocked }" 
        >Trade Blows</h2>
    </div>
    </ToolTip>

    <ToolTip
        :subtitle="special"
        :descriptions="[specialDescription]"
        left="true"
    >
    <div @mouseenter="UiSounds.chit.play()" @click="RUN_SPECIAL()" class="controlButton">
    <h2 
    :class="{'striked' : combatLocked || mettle <= 0}"
    class="flexColumn"
   >
        {{special}}
    
        <section class="mettleCost">
            <p>
                Costs <img :src="mettleImg">
            </p>
        </section>
    </h2>
    </div>
    </ToolTip>
    
    <br>

    <ToolTip
        subtitle="Turn Tail"
        :descriptions="[`Escape from the Dungeon Phase, more successful when you have low health.`, `Can be used once per Dungeon Phase.`]"
        left="true"
    >
    <div @mouseenter="UiSounds.chit.play()" @click="TURN_TAIL()" class="controlButton">
    <h3  
    :class="{'striked' : turnTailUsed || combatLocked }" 
    >Turn Tail</h3>
    </div>
    </ToolTip>

</section>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'

import StatBar from '@/components/gameUI/StatBar.vue'
import SpecialBar from "@/components/gameUI/SpecialBar.vue"
import ToolTip from "@/components/ui/ToolTip.vue"
import UiSounds from '@/plugins/UiSounds.js'

export default {
    name: 'BattleControls',
     components: {
      StatBar,
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
    .battleOptions {
        margin:0 20px;
        width:200px;
        min-width:200px;
    }

    p {
        font-size:12px;
        text-transform:uppercase;
    }

    h1, h2, h3 {
        transition: all .2s;
    }

    .controlButton {
        background: rgb(207, 207, 207);
        cursor:pointer;
        padding:20px 20px;
        display:block;
        min-width:200px;
        margin:0 0 10px 0;
    }

    .controlButton:hover {
        background: rgb(166, 207, 144);
    }

    h2 {
        text-decoration:none;
    }
    
    h3 {
        font-size:20px;
        text-transform:uppercase;
    }

    .mettleCost {
        display:flex;
        align-items: center;
        justify-content: center;
    }

    .mettleCost img {
        width:20px;
        height:20px;
        position:relative;
        top:5px;
    }

    .mettleCost p {
        display: block;
        margin-block-start: 0em;
        margin-block-end: 0em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }

    .striked {
        text-decoration: line-through;
        opacity:0.2;
        transition:all .6s;
    }
    .striked:hover {
        transition:all .6s;
        cursor:not-allowed;
    }

    .columnsMiddle {
        display:flex;
        justify-content:center;
        align-items:center;
        flex-direction: column;
        min-width:200px;
        text-align:center;
        margin:0 10px;  
    }
</style>
