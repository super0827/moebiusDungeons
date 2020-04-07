<template>
<section key="shopPhaseWrapper">
    <section class="flexColumn animated"
        :class="{'zoomInUp' : storeState.isEntering, 'zoomOutUp' : !storeState.isEntering}">
    
        <img key="shopSigil" class="iconImageSize" src="../assets/imgs/icons/shopkeepSigilIcon.png" >
        <h1 class="textCenter phaseName">SHOP</h1> 
    </section>

    <section class="flexRow">
        <!-- Player Portrait -->
        <player-portrait
        class="animated"
        :class="{'zoomInLeft' : storeState.isEntering, 'zoomOutLeft' : !storeState.isEntering }"
        key="playerPortraitShop"/>  

        <!-- Shop Controls -->
        <shop-controls
        class="animated"
        :class="{'zoomInDown' : storeState.isEntering, 'zoomOutDown' : !storeState.isEntering }"
        key="shopControls"/>
        
        <!-- Shop Portrait -->
        <shop-portrait
        class="animated"
        :class="{'zoomInRight' : storeState.isEntering, 'zoomOutRight' : !storeState.isEntering }"
        key="shopPortrait"/>
    </section>
</section>
</template>

<script>
import { store } from "../store"

import ShopControls from './ShopControls.vue';
import PlayerPortrait from "./PlayerPortrait.vue";
import ShopPortrait from "./ShopPortrait.vue";

export default {
    name: 'ShopPhase',
    components:{
        PlayerPortrait,
        ShopControls,
        ShopPortrait,
    },
    data() {
        return {
            storeState: store.state,
        }
    },
}
</script>

<style scoped>

</style>