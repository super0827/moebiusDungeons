<template>
 <section id="leftTile" class="tile">

    <!-- Player -->
    <section id="charPortWrapper" class="hidden">
        <div id="charClass"></div>
        
        <img class="imgSize" src="./imgs/VOCATIONS.png" alt="">
        
        <section class="levelTitle">
            <p>YOU</p>
        </section>
        
        <div id="playerPortrait">
            <section class="damagePosition">
                <p id="playerDamageIndicator"></p>
                <p id="playerArmorIndicator"></p>
            </section>
            <section id="playerDamageColorPosition">
                <section class="hidden" id="playercolorFlash"></section>
            </section>
            <section id="playerPortraitSlot"></section>
        </div>
        
        <section id="charStats" class="stats">
            <section>
                <p><span id="playerhealth"></span></p>
                <img src="./imgs/HEARTPLAIN.png" alt="">
            </section>
            <section>
                <p><span id="playerarmor"></span></p>
                <img src="./imgs/ARMORPLAIN.png" alt="">
            </section>
            <section id="playerAttackType">
                <p>1d<span id="playerattack"></span></p>
                <section id="playerAttackTypeSlot"></section>
            </section>    
        </section>
        
        <section>
            METTLE<p id="playerXp"></p>
        </section>
    </section>
</section>
</template>

<script>
export default {
  name: 'PlayerPortrait',
  props: {
  }
}
</script>

<style scoped>

</style>
