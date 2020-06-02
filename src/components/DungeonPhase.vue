<template>
<section class="dungeonPhaseWrapper" key="dungeonPhaseWrapper">
    <section class="flexRow animated"
    :class="{'zoomInDown' :isEntering, 'zoomOutUp' : !isEntering}">
        <img key="dungeonSigil" id="dungeonSigil" class="iconImageSize" src="../assets/imgs/icons/monsterSigilIcon.png" alt="">
        <h1 class="textCenter phaseName">DUNGEON</h1>
    </section>

    <!-- Battle Helper Button -->
    <transition name="fade" mode="out-in">
        <h1 @click="toggleHelp()" @mouseenter="UiSounds.chit.play()" id="dungeonHelp">DUNGEON HELP</h1>
    </transition>
    
    <section class="flexRow">
        
        <turn-log
        class="animated"
        :class="{'zoomInLeft' : isEntering, 
        'zoomOutLeft' : !isEntering
        }"
        :thisLog="playerLog"
        />

        <!-- Player Portrait and Stats -->
        <character-token
        class="animated"
        :class="{'zoomInLeft' : isEntering, 'zoomOutLeft' : !isEntering}"
        :who="'player'"
        :name="playerName"
        :portrait="playerPortrait"
        :health="playerHealth"
        :armor="playerArmor"
        :attack="playerAttackMax"
        :attackType="playerAttackType"
        :attackTypeImg="playerAttackTypeImage"
        :coins="playerCoins"
        :isHurt="playerisHurt"
        :isBlocking="playerisBlocking"
        :isAttacking="playerisAttacking"
        :isDead="playerisDead"
        :statSide="playerStatSide"
        :enemyAttackType="monsterAttackType"
        :enemyAttackTypeImage="monsterAttackTypeImage"
        :enemyAttackDamage="monsterAttackDamage"
        :enemyReducedAttackDamage="monsterRealDamage"
        :porteffect="playerportEffect"
        :redShine="redShinePlayer"
        :greenShine="greenShinePlayer"
        :purpleShine="purpleShinePlayer"
        :goldShine="goldShinePlayer"
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
        :who="'monster'"
        :name="monsterName"
        :portrait="monsterPortrait"
        :health="monsterHealth"
        :armor="monsterArmor"
        :attack="monsterAttackMax"
        :attackType="monsterAttackType"
        :attackTypeImg="monsterAttackTypeImage"
        :coins="monsterCoins"
        :isHurt="monsterisHurt"
        :isBlocking="monsterisBlocking"
        :monsterisAttacking="monsterisAttacking"
        :isDead="monsterisDead"
        :statSide="monsterStatSide"
        :enemyAttackType="playerAttackType"
        :enemyAttackTypeImage="playerAttackTypeImage"
        :enemyAttackDamage="playerAttackDamage"
        :enemyReducedAttackDamage="playerRealDamage"
        :porteffect="monsterportEffect"
        :redShine="redShineMonster"
        :greenShine="greenShineMonster"
        :purpleShine="purpleShineMonster"
        />

        <turn-log
        class="animated"
        :class="{'zoomInRight' : isEntering,
        'zoomOutRight' : !isEntering}"
        :thisLog="monsterLog"
        />
    </section>
    
    <!--  Battle Helpers -->
    <transition name="fade" mode="out-in">
        <battle-help key="battleHelper" @close="toggleHelp()" v-if="helper"/>
    </transition>
</section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import BattleControls from './BattleControls.vue';
import CharacterToken from "./CharacterToken.vue";
import BattleHelp from './BattleHelp.vue';
import TurnLog from './TurnLog.vue';

import UiSounds from '@/plugins/UiSounds.js'

import helperToggles from './mixins/helperToggles';
import gameAnimations from './mixins/gameAnimations';
import gameMusic from './mixins/gameMusic';


export default {
    name: 'DungeonPhase',
    mixins: [helperToggles, gameAnimations, gameMusic],
    components: {
        BattleHelp,
        CharacterToken,
        BattleControls,
        TurnLog,
    },
    data() {
        return {
            music: ['dungeonMusic1','dungeonMusic2','dungeonMusic3','dungeonMusic4','dungeonMusic5'],
            UiSounds : UiSounds
        }
    },
    computed: {
        ...mapState('playerData', {
            playerName: state => state.info.name,
            playerPortrait: state => state.info.portrait,
            playerHealth: state => state.info.baseHealth,
            playerAttack: state => state.info.baseAttackMax,
            playerAttackType: state => state.info.attackType,
            playerAttackTypeImage: state => state.info.attackTypeImage,
            playerCoins: state => state.info.coins,
            playerStatSide: state => state.statSide,
            playerAttackDamage: state => state.thisDamage,
            
            playerisHurt: state => state.animations.hurt,
            playerisBlocking: state => state.animations.blocking,
            playerisAttacking: state => state.animations.attacking,
            playerisDead: state => state.animations.isDead,
            playerportEffect: state => state.animations.portEffect,
            redShinePlayer: state => state.animations.redShine,
            greenShinePlayer: state => state.animations.greenShine,
            purpleShinePlayer: state => state.animations.purpleShine,
            goldShinePlayer: state => state.animations.goldShine,
        }),
        ...mapState('monsterData', {
            monsterName: state => state.info.name,
            monsterPortrait: state => state.info.portrait,
            monsterAttackType: state => state.info.attackType,
            monsterAttackTypeImage: state => state.info.attackTypeImage,
            monsterCoins: state => state.info.coins,
            monsterStatSide: state => state.statSide,
            monsterAttackDamage: state => state.thisDamage,
            
            monsterisHurt: state => state.animations.hurt,
            monsterisBlocking: state => state.animations.blocking,
            monsterisAttacking: state => state.animations.attacking,
            monsterisDead: state => state.animations.isDead,
            monsterportEffect: state => state.animations.portEffect,
            redShineMonster: state => state.animations.redShine,
            greenShineMonster: state => state.animations.greenShine,
            purpleShineMonster: state => state.animations.purpleShine
        }),
        ...mapGetters('playerData', {
            playerLog: 'playerLog',
            playerRealDamage: 'thisAdjDamage',
            playerHealth: 'calcHealth',
            playerArmor: 'calcArmor',
            playerAttackMax: 'calcAttackMax'
        }),
        ...mapGetters('monsterData', {
            monsterLog: 'monsterLog',
            monsterRealDamage: 'thisAdjDamage',
            monsterHealth: 'calcHealth',
            monsterArmor: 'calcArmor',
            monsterAttackMax: 'calcAttackMax'
        })
    },
    destroyed(){
        this.$store.commit('monsterData/newMonster');
    }
}
</script>

<style  scoped>
    .dungeonPhaseWrapper {
        position:relative;
    }
    #dungeonSigil {
        margin-right:10px;
    }
    battle-help {
        position:absolute;
        z-index:99999;
        transition: all .4s ease-in-out;
    }
</style>