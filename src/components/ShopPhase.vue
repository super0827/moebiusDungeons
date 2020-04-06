<template>
<section>
    <section class="flexColumn">
        <img key="shopSigil" class="iconImageSize" src="../assets/imgs/icons/shopkeepSigilIcon.png" alt="">
        <h1 class="textCenter phaseName">SHOP</h1> 
    </section>

    <section class="flexRow">
        <!-- Player Portrait -->
        <player-portrait
        key="playerPortraitShop"/>  

        <!-- Shop Controls -->
        <shop-controls 
        key="shopControls"/>
        
        <!-- Shop Portrait -->
        <shop-portrait
        key="shopPortrait"/>
    </section>
</section>
</template>

<script>
import ShopControls from './ShopControls.vue';
import PlayerPortrait from "./PlayerPortrait.vue";
import ShopPortrait from "./ShopPortrait.vue";

export default {
    name: 'ShopPhase',
    components:{
        PlayerPortrait,
        ShopControls,
        ShopPortrait,
    }
}
</script>

<style  scoped>

</style>