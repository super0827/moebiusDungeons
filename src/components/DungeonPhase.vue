<template>
<section class="dungeonBackground" :style="dungeonBackgroundStyle">
    <b-row 
        align-h="center"
        class="mb-3 animated"
        :class="{'zoomInDown' :isEntering, 'zoomOutUp' : !isEntering}"
    >
        <b-col cols="12" class="text-center">
            <section class="d-flex justify-content-center align-items-center">
                <img class="imgScale mr-3" key="dungeonSigil" id="dungeonSigil" src="@/assets/imgs/icons/monsterSigilIcon.png" alt="">
                <h1>DUNGEON PHASE</h1>
            </section>
        </b-col>
    </b-row>

    <b-row no-gutters>
        <b-col cols="1">
            <TurnLog
                class="animated"
                :class="{'zoomInLeft' : isEntering, 
                'zoomOutLeft' : !isEntering
                }"
                :thisLog="playerLog"
                :who="'Player'"
            />
        </b-col>
        <b-col cols="3">
            <!-- Player Portrait and Stats -->
            <CharacterToken
            class="animated"
            :class="{'zoomInLeft' : isEntering, 'zoomOutLeft' : !isEntering}"
            :who="'player'"
            :enemy="playerEnemy"
            :name="playerName"
            :portrait="playerPortrait"
            :health="playerHealth"
            :armor="playerArmor"
            :attack="playerAttackMax"
            :attackType="playerAttackType"
            :attackTypeImg="playerAttackTypeImage"
            :coins="playerCoins"

            :warning="playerWarning"

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
            :blueShine="blueShinePlayer"
            :yellowShine="yellowShinePlayer"
            :armorUp="armorUp"
            />
        </b-col>
        <b-col cols="1">
            <CharacterStats 
                :health="playerHealth"
                :attack="playerAttackMax"
                :armor="playerArmor"
                :attack-type="playerAttackType"
                :armor-type="playerArmorType"
                :order="[1,2]"
            />
        </b-col>
        <b-col cols="2">
            <StatBar/>
        </b-col>
        <b-col cols="1">
            <CharacterStats 
                :health="monsterHealth"
                :armor="monsterArmor"
                :attack="monsterAttackMax"
                :attack-type="monsterAttackType"
                :armor-type="monsterArmorType"
                :order="[2,1]"
            />
        </b-col>
        <b-col cols="3">
            <CharacterToken
                key="monsterPortrait"
                class="animated"
                :class="{'zoomInRight' : isEntering, 'zoomOutRight' : !isEntering}"
                :who="'monster'"
                :name="monsterRank + ' ' + monsterName"
                :enemy="monsterEnemy"
                :portrait="monsterPortrait"
                :health="monsterHealth"
                :armor="monsterArmor"
                :attack="monsterAttackMax"
                :attackType="monsterAttackType"
                :attackTypeImg="monsterAttackTypeImage"
                :coins="monsterCoins"
                :isHurt="monsterisHurt"

                :warning="monsterWarning"

                :isBlocking="monsterisBlocking"
                :monsterisAttacking="monsterisAttacking"
                :isOneShot="monsterisOneShot"
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

                :specialDamage="specialDamage"
                :specialDamageAnimation="specialDamageAnimation"

                :monsterRank="monsterRank"
            />
        </b-col>
        <b-col cols="1">
            <TurnLog
                class="animated"
                :class="{'zoomInLeft' : isEntering, 
                'zoomOutLeft' : !isEntering
                }"
                :thisLog="monsterLog"
                :who="`Monster`"
            />
        </b-col>
    </b-row>

    <b-row align-v="center" align-h="center" no-gutters>
        <b-col cols="3">
            <ToolTip
                subtitle="Your coins"
                :descriptions="[`Value represents your total coins, which are used to buy items during the shop phase.`]"
            > 
                <section class="coinWrapper">
                    <img src="@/assets/imgs/icons/coinIcon.png" alt="">
                    <h1 class="coinValue">
                    <AnimatedNumber 
                        :value="playerCoins"
                        :duration="1000"
                        :formatValue="wholeNumber"
                    />
                    </h1>
                </section>
            </ToolTip>

            <InventoryItems/>
        </b-col>
        <b-col cols="4">
            <!-- Dungeon Controls -->
            <BattleControls
                class="animated"
                :class="{'zoomInUp' : isEntering, 'zoomOutDown' : !isEntering}"
                key="battleControls"
            />
        </b-col>
        <b-col cols="3">
            <ToolTip
                subtitle="Monster's Coins"
                :descriptions="[`If you defeat the monster you'll win their coins.`]"
            >
                <section class="coinWrapper">
                    <img src="@/assets/imgs/icons/coinIcon.png" alt="">
                    <h1 class="coinValue">
                    <AnimatedNumber 
                        :value="monsterCoins"
                        :duration="1000"
                        :formatValue="wholeNumber"
                    />
                    </h1>
                </section>
            </ToolTip>

            <InventoryItems/>
        </b-col>
    </b-row>
</section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import AnimatedNumber from "animated-number-vue";

import BattleControls from '@/components/BattleControls.vue';
import CharacterToken from "@/components/CharacterToken.vue";
import TurnLog from '@/components/TurnLog.vue';


import StatBar from '@/components/gameUI/StatBar'
import CharacterStats from '@/components/CharacterStats'
import ToolTip from '@/components/ui/ToolTip'

import InventoryItems from '@/components/InventoryItems'

import UiSounds from '@/plugins/UiSounds.js'
import MonsterSounds from '@/plugins/MonsterSounds.js'

import gameAnimations from '@/components/mixins/gameAnimations';
import gameMusic from '@/components/mixins/gameMusic';


export default {
    name: 'DungeonPhase',
    mixins: [gameAnimations, gameMusic],
    components: {
        ToolTip,
        StatBar,
        CharacterStats,
        InventoryItems,
        CharacterToken,
        BattleControls,
        TurnLog,
        AnimatedNumber
    },
    data() {
        return {
            music: ['dungeonMusic1','dungeonMusic2','dungeonMusic3','dungeonMusic4','dungeonMusic5'],
            UiSounds : UiSounds,
            MonsterSounds : MonsterSounds,
            backgrounds: {
                'forest':require('@/assets/imgs/locations/placemats/forest.png'),
                'ruins':require('@/assets/imgs/locations/placemats/ruins.png'),
                'tower':require('@/assets/imgs/locations/placemats/tower.png'),
                'hills':require('@/assets/imgs/locations/placemats/hills.png'),
                'roads':require('@/assets/imgs/locations/placemats/roads.png'),
                'caves':require('@/assets/imgs/locations/placemats/caves.png'),
            },
        }
    },
    methods: {
        wholeNumber(value) {
            return `${Math.ceil(value)}`;
        },
    },
    computed: {
        ...mapState('gameData', {
            location: state => state.location,
            phase: state => state.phase,
            showDungeonBackground: state => state.showDungeonBackground
        }),
        ...mapState('playerData', {
            playerLoaded: state => state.playerLoaded,

            playerName: state => state.info.name,
            playerPortrait: state => state.info.portrait,
            playerAttackType: state => state.info.attackType,
            playerAttackTypeImage: state => state.info.attackTypeImage,
            playerArmorType: state => state.info.armorType,
            playerCoins: state => state.info.coins,
            playerStatSide: state => state.statSide,
            playerAttackDamage: state => state.thisDamage,

            specialDamage: state => state.specialDamage,
            specialDamageAnimation: state => state.specialDamageAnimation,

            monsterEnemy: state => state.info.name,

            playerWarning: state => state.info.warning,

            playerisHurt: state => state.animations.hurt,
            playerisBlocking: state => state.animations.blocking,
            playerisAttacking: state => state.animations.attacking,
            playerisDead: state => state.animations.isDead,
            playerportEffect: state => state.animations.portEffect,
            redShinePlayer: state => state.animations.redShine,
            greenShinePlayer: state => state.animations.greenShine,
            purpleShinePlayer: state => state.animations.purpleShine,
            goldShinePlayer: state => state.animations.goldShine,
            blueShinePlayer: state => state.animations.blueShine,
            yellowShinePlayer: state => state.animations.yellowShine,

            curse: state => state.info.curse,
            armorUp: state => state.animations.armorUp,
        }),
        ...mapState('monsterData', {
            monsterLoaded: state => state.monsterLoaded,

            monsterEnter: state => state.info.enterSound,

            playerEnemy: state => state.info.name,
            
            monsterName: state => state.info.name,
            monsterPortrait: state => state.info.portrait,
            monsterAttackType: state => state.info.attackType,
            monsterAttackTypeImage: state => state.info.attackTypeImage,
            monsterArmorType: state => state.info.armorType,
            monsterCoins: state => state.info.coins,
            monsterStatSide: state => state.statSide,
            monsterAttackDamage: state => state.thisDamage,
            
            monsterWarning: state => state.info.warning,

            monsterisHurt: state => state.animations.hurt,
            monsterisOneShot: state => state.animations.isOneShot,
            monsterisBlocking: state => state.animations.blocking,
            monsterisAttacking: state => state.animations.attacking,
            monsterisDead: state => state.animations.isDead,
            monsterportEffect: state => state.animations.portEffect,
            redShineMonster: state => state.animations.redShine,
            greenShineMonster: state => state.animations.greenShine,
            purpleShineMonster: state => state.animations.purpleShine,
        }),
        ...mapGetters('playerData', {
            playerLog: 'playerLog',
            playerRealDamage: 'thisAdjDamage',
            playerHealth: 'calcHealth',
            playerArmor: 'calcArmor',
            playerAttackMax: 'calcAttackMax',
        }),
        ...mapGetters('monsterData', {
            monsterLog: 'monsterLog',
            monsterRealDamage: 'thisAdjDamage',
            monsterHealth: 'calcHealth',
            monsterArmor: 'calcArmor',
            monsterAttackMax: 'calcAttackMax',
            monsterRank: 'monsterRank'
        }),
        dungeonBackgroundStyle: function() {
            if (this.phase === 'DungeonPhase') {
            return {
                'background-image': `url(${this.backgrounds[this.location]})`,
            }
        }
        return {}
      },
    },
    beforeMount() {
      
    },
    created() {
        if(!this.playerLoaded){
            this.MonsterSounds[this.monsterEnter].play();
            this.$store.dispatch('playerData/RESET_ANIMATIONS');
            this.$store.dispatch('monsterData/RESET_ANIMATIONS');
            this.$store.commit('gameData/mutate', {property:'combatLocked', with:false})
            this.$store.commit('playerData/mutate', {property:'log', with:[]})
            this.$store.commit('monsterData/mutate', {property:'log', with:[]})

        }
        else {
            this.MonsterSounds[this.monsterEnter].play();
            this.$store.dispatch('playerData/RESET_ANIMATIONS');
            this.$store.dispatch('monsterData/RESET_ANIMATIONS');
            this.$store.commit('gameData/mutate', {property:'combatLocked', with:false})
            this.$store.commit('playerData/mutate', {property:'playerLoaded', with:false})
        }
    },
    destroyed(){
        this.$store.commit('monsterData/newMonster');
        this.$store.dispatch('monsterData/GENERATE_MONSTER_STATS');
        this.$store.dispatch('playerData/CHECK_INVENTORY');
        this.$store.commit('playerData/REMOVE_TEMP_STATS');
    }
}
</script>

<style  scoped>
.imgScale {
    height:70px;
}

.dungeonBackground {
  background-size:contain;
  background-repeat:no-repeat;
  background-position:center;
}
</style>