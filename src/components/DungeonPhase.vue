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
        
        <turn-log
        class="animated"
        :class="{'zoomInLeft' : isEntering, 
        'zoomOutLeft' : !isEntering}"
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
        :attack="playerAttack"
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
        :enemyReducedAttackDamage="monsterAdjustedDamage"
        :portEffect="playerportEffect"
        :porteffectRed="playerporteffectRed"
        :porteffectGreen="playerporteffectGreen"
        :porteffectPurple="playerporteffectPurple"
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
        :attack="monsterAttack"
        :attackType="monsterAttackType"
        :attackTypeImg="monsterAttackTypeImage"
        :coins="monsterCoins"
        :isHurt="monsterisHurt"
        :isBlocking="monsterisBlocking"
        :isAttacking="monsterisAttacking"
        :isDead="monsterisDead"
        :statSide="monsterStatSide"
        :enemyAttackType="playerAttackType"
        :enemyAttackTypeImage="playerAttackTypeImage"
        :enemyAttackDamage="playerAttackDamage"
        :enemyReducedAttackDamage="playerAdjustedDamage"
        :portEffect="monsterportEffect"
        :porteffectRed="monsterporteffectRed"
        :porteffectGreen="monsterporteffectGreen"
        :porteffectPurple="monsterporteffectPurple"
        />

        <turn-log
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
import { mapState, mapGetters } from 'vuex';

import BattleControls from './BattleControls.vue';
import CharacterToken from "./CharacterToken.vue";

import BattleHelp from './BattleHelp.vue';

import TurnLog from './TurnLog.vue';

import helperToggles from './mixins/helperToggles';
import gameAnimations from './mixins/gameAnimations';
import gameMusic from './mixins/gameMusic';
import newMonster from './mixins/newMonster';

export default {
    name: 'DungeonPhase',
    mixins: [helperToggles, gameAnimations, gameMusic, newMonster],
    components: {
        BattleHelp,
        CharacterToken,
        BattleControls,
        TurnLog,
    },
    data() {
        return {
            music: ['dungeonMusic1','dungeonMusic2','dungeonMusic3','dungeonMusic4','dungeonMusic5'],
        }
    },
    computed: {
        ...mapState('playerData', {
            playerName: state => state.info.name,
            playerPortrait: state => state.info.portrait,
            playerHealth: state => state.info.health,
            playerArmor: state => state.info.armor,
            playerAttack: state => state.info.attackMax,
            playerAttackType: state => state.info.attackType,
            playerAttackTypeImage: state => state.info.attackTypeImage,
            playerCoins: state => state.info.coins,
            playerStatSide: state => state.statSide,
            playerAttackDamage: state => state.thisDamage,
            playerAdjustedDamage: state => state.thisAdjDamage,
            
            playerisHurt: state => state.animations.hurt,
            playerisBlocking: state => state.animations.blocking,
            playerisAttacking: state => state.animations.attacking,
            playerisDead: state => state.animations.isDead,
            playerportEffect: state => state.animations.portEffect,
            playerporteffectRed: state => state.animations.portEffectRed,
            playerporteffectGreen: state => state.animations.portEffectGreen,
            playerporteffectPurple: state => state.animations.portEffectPurple
        }),
        ...mapState('monsterData', {
            monsterName: state => state.info.name,
            monsterPortrait: state => state.info.portrait,
            monsterHealth: state => state.info.health,
            monsterArmor: state => state.info.armor,
            monsterAttack: state => state.info.attackMax,
            monsterAttackType: state => state.info.attackType,
            monsterAttackTypeImage: state => state.info.attackTypeImage,
            monsterCoins: state => state.info.coins,
            monsterStatSide: state => state.statSide,
            monsterAttackDamage: state => state.thisDamage,
            monsterAdjustedDamage: state => state.thisAdjDamage,
            
            monsterisHurt: state => state.animations.hurt,
            monsterisBlocking: state => state.animations.blocking,
            monsterisAttacking: state => state.animations.attacking,
            monsterisDead: state => state.animations.isDead,
            monsterportEffect: state => state.animations.portEffect,
            monsterporteffectRed: state => state.animations.portEffectRed,
            monsterporteffectGreen: state => state.animations.portEffectGreen,
            monsterporteffectPurple: state => state.animations.portEffectPurple
        }),
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