<template>
<section>
    <section class="flexColumn">
        <img key="shopSigil" class="iconImageSize" src="../assets/imgs/icons/shopkeepSigilIcon.png" alt="">
        <h1 class="textCenter phaseName">SHOP</h1> 
    </section>

    <section class="flexRow">
        <!-- Player Portrait -->
        <player-portrait
        :class="{'zoomInLeft' : storeState.isEntering, 'zoomOutLeft' : !storeState.isEntering}"
        key="playerPortraitShop"/>  

        <!-- Shop Controls -->
        <shop-controls
        :class="{'zoomInDown' : storeState.isEntering, 'zoomOutDown' : !storeState.isEntering}"
        key="shopControls"/>
        
        <!-- Shop Portrait -->
        <shop-portrait
        :class="{'zoomInRight' : storeState.isEntering, 'zoomOutRight' : !storeState.isEntering}"
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
    created(){
        this.storeState.isEntering = true;
    },
    beforeDestroy() {
        this.storeState.isEntering = false;
    }
}
</script>

<style scoped>

</style>