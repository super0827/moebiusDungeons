<template>
<section class="columnsMiddle battleOptions"
>

    <stat-bar/>


    <br>

    <special-bar/>

    <h2 @mouseenter="UiSounds.chit.play()" 
    :class="{'striked' : combatLocked }" 
    @click="TRADE_BLOWS()">Trade Blows</h2>
    
    <h2 @mouseenter="UiSounds.chit.play()" 
    :class="{'striked' : combatLocked || mettle <= 0}"
    class="flexColumn"
    @click="RUN_SPECIAL()">
        {{special}}
    
    <section class="mettleCost">
        <p>
            Costs
        <img :src="mettleImg">
            
        </p>
    </section>
      
    </h2>
    
    <br>

    <h3 @mouseenter="UiSounds.chit.play()" 
    :class="{'striked' : turnTailUsed || combatLocked }" 
    @click="TURN_TAIL()">Turn Tail</h3>

</section>
</template>

<script>
import StatBar from './StatBar.vue'
import {mapActions, mapState, mapGetters} from 'vuex'
import SpecialBar from "./SpecialBar.vue"
import UiSounds from '@/plugins/UiSounds.js'

export default {
    name: 'BattleControls',
     components: {
      StatBar,
      SpecialBar
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
        width:90%;
    }

    h2 {
        background: rgb(207, 207, 207);
        cursor:pointer;
        padding:20px;
        text-decoration:none;
    }
    
    h3 {
        background: rgb(207, 207, 207);
        cursor:pointer;
        padding:10px 20px;
        font-size:20px;
        text-transform:uppercase;
    }
    h2:hover {
        background: rgb(166, 207, 144);
    }
    
    h3:hover {
        background: rgb(166, 207, 144);
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
        justify-content: center;
        align-items:center;
        flex-direction: column;
        width:200px;
        min-width:200px;
        text-align:center;
        margin:0 10px;  
    }
</style>
