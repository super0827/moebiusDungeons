<template>
<section class="shopPhaseWrapper" key="shopPhaseWrapper">
    <section class="flexRow animated"
        :class="{'zoomInDown' : isEntering, 'zoomOutUp' : !isEntering}">
    
        <img key="shopSigil" class="iconImageSize shopSigil" src="@/assets/imgs/icons/shopkeepSigilIcon.png" >
        <h1 class="textCenter phaseName">SHOP</h1> 
    </section>

    <!-- Battle Helper Button -->
    <transition name="fade" mode="out-in">
        <h1 @click="toggleHelp()" @mouseenter="UiSounds.chit.play()" id="shopHelp">SHOP HELP</h1>
    </transition>

    <section class="flexRow">
        <!-- Player Portrait -->
        <character-token
        class="character-token"
        :class="{'animated zoomInLeft' : isEntering, 'animated zoomOutLeft' : !isEntering }"
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
        :porteffect="playerportEffect"
        :redShine="redShinePlayer"
        :greenShine="greenShinePlayer"
        :purpleShine="purpleShinePlayer"
        key="playerPortraitShop"/>  

        <!-- Shop Controls -->
        <shop-controls
        class="animated"
        :class="{'zoomInUp' : isEntering, 'zoomOutDown' : !isEntering }"
        key="shopControls"/>
        
        <!-- Shop Portrait -->
        <shop-portrait
        class="animated"
        :class="{'zoomInRight' : isEntering, 'zoomOutRight' : !isEntering }"
        key="shopPortrait"/>
    </section>

    <!--  Battle Helpers -->
    <transition name="fade" mode="out-in">
        <shop-help key="battleHelper" @close="toggleHelp()" v-if="helper"/>
    </transition>
</section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import ShopControls from '@/components/ShopControls.vue';
import CharacterToken from "@/components/CharacterToken.vue";
import ShopPortrait from "@/components/ShopPortrait.vue";
import ShopHelp from "@/components/ShopHelp.vue";

import UiSounds from "@/plugins/UiSounds"

import helperToggles from '@/components/mixins/helperToggles';
import gameAnimations from '@/components/mixins/gameAnimations';
import gameMusic from '@/components/mixins/gameMusic';


export default {
    name: 'ShopPhase',
    components:{
        CharacterToken,
        ShopControls,
        ShopPortrait,
        ShopHelp,
    },
    mixins: [helperToggles, gameAnimations, gameMusic],
    data() {
        return {
            music:['shopMusic1', 'shopMusic2', 'shopMusic3'],
            UiSounds: UiSounds,
        }
    },
    computed: {
        ...mapState('playerData', {
            playerLoaded: state => state.playerLoaded,

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
            purpleShinePlayer: state => state.animations.purpleShine
        }),
        ...mapState('shopkeepData', {
            welcome: state => state.info.welcome,
            goodbye: state => state.info.goodbye,
            thankYou: state => state.info.thankYou,
            shopLoaded: state => state.shoploaded,
            
        }),
        ...mapGetters('playerData', {
            playerLog: 'playerLog',
            playerRealDamage: 'thisAdjDamage',
            playerHealth: 'calcHealth',
            playerArmor: 'calcArmor',
            playerAttackMax: 'calcAttackMax'
        }),
    },
    created() {
        if(this.shopLoaded) {
            this.$store.commit('shopData/mutate', {property:'shopLoaded', with:false}, {root:true})
        }
    },
    mounted() {
        this.$store.dispatch('playerData/RESET_ANIMATIONS', null, {root:true})
    },
    destroyed() {
        this.$store.commit('shopkeepData/newShopkeep');
    },
}
</script>

<style scoped>
.shopPhaseWrapper {
    position:relative;
}
.shopSigil {
    margin-right:10px;
}
#shopHelp {
    font-size: 20px;
    position: fixed;
    right: 10px;
    top: 10px;
    margin: 0;
    padding: 5px;
    background: rgb(218, 218, 218);
    cursor:pointer;
}
.character-token {
    margin-right:10px;
}
shop-help {
    position:absolute;
    z-index:99999;
    transition: all .4s ease-in-out;
}
</style>