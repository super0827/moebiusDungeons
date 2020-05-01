<template>
<section class="shopPhaseWrapper" key="shopPhaseWrapper">
    <section class="flexColumn animated"
        :class="{'zoomInDown' : storeState.isEntering, 'zoomOutUp' : !storeState.isEntering}">
    
        <img key="shopSigil" class="iconImageSize" src="../assets/imgs/icons/shopkeepSigilIcon.png" >
        <h1 class="textCenter phaseName">SHOP</h1> 
    </section>

    <!-- Battle Helper Button -->
    <transition name="fade" mode="out-in">
        <h1 @click="helper = !helper" @mouseenter="$sound.play('chit')" id="shopHelp">SHOP HELP</h1>
    </transition>

    <section class="flexRow">
        <!-- Player Portrait -->
        <player-portrait
        class="animated"
        :class="{'zoomInLeft' : storeState.isEntering, 'zoomOutLeft' : !storeState.isEntering }"
        key="playerPortraitShop"/>  

        <!-- Shop Controls -->
        <shop-controls
        class="animated"
        :class="{'zoomInUp' : storeState.isEntering, 'zoomOutDown' : !storeState.isEntering }"
        key="shopControls"/>
        
        <!-- Shop Portrait -->
        <shop-portrait
        class="animated"
        :class="{'zoomInRight' : storeState.isEntering, 'zoomOutRight' : !storeState.isEntering }"
        key="shopPortrait"/>
    </section>

    <!--  Battle Helpers -->
    <transition name="fade" mode="out-in">
        <shop-help key="battleHelper" @close="helper = false" v-if="helper==true"/>
    </transition>
</section>
</template>

<script>
import { store } from "../store";

import ShopControls from './ShopControls.vue';
import PlayerPortrait from "./PlayerPortrait.vue";
import ShopPortrait from "./ShopPortrait.vue";
import ShopHelp from "./ShopHelp.vue";


export default {
    name: 'ShopPhase',
    components:{
        PlayerPortrait,
        ShopControls,
        ShopPortrait,
        ShopHelp,
    },
    data() {
        return {
            storeState: store.state,
            helper:false,
            randomBkg: Number,
        }
    },
    methods: {
        randomRoll(rollMax){
            return Math.floor(Math.random() * Math.floor(rollMax) + 1);
        }
    },
    created() {
        this.randomBkg = this.randomRoll(3);
        this.$sound.play(`shopMusic${this.randomBkg}`, {fade: 1200, volume: .2});

        let roll = this.randomRoll(2);
        this.$sound.play(this.storeState.shopkeep.welcome);
    },
    beforeDestroy() {
        this.$sound.pause(`shopMusic${this.randomBkg}`, {fade: 1200, volume: 0});
        this.$sound.play(this.storeState.shopkeep.goodbye);
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

<style scoped>
.shopPhaseWrapper {
        position:relative;
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
shop-help {
    position:absolute;
    z-index:99999;
    transition: all .4s ease-in-out;
}
</style>