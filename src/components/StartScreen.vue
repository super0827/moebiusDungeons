<template>
<section>

    <section @click="startGame()" class="animated startScreen slower" :class="{'fadeIn' : storeState.isEntering, 
    'fadeOut' : !storeState.isEntering }">
        <section class=" animated pulse infinite slower">
            <img src="../assets/imgs/icons/raceTypeHumanIcon.png" alt="">
            <!-- <img src="../assets/imgs/icons/raceTypeIconMagic.png" alt=""> -->
            <img src="../assets/imgs/icons/travelersSigilIcon.png" alt="">
            <img src="../assets/imgs/icons/raceTypeBeast.png" alt="">
            <h1>DELVE INTO THE <br> MOEBIUS DUNGEONS</h1>
            <!-- <img src="../assets/imgs/icons/playerSigilIcon.png" alt=""> -->
            <!-- <img src="../assets/imgs/icons/monsterSigilIcon.png" alt=""> -->
        </section>
    </section>

</section>
</template>

<script>
import { store } from "../store";
import { Howl } from "howler";

export default {
    name: 'StartScreen',
    data() {
        return {
            storeState: store.state,
            startBlip: new Howl({
                src: [require('../assets/audio/gamestart.ogg')],
                volume:0.5,
            }),
            startGame: function(){
                this.startBlip.play();
                this.storeState.phase = "CharacterSelect";
            }, 
        }
    },
}
</script>

<style scoped>

.startScreen {
    display:flex;
    align-items:center;
    justify-content: center;
    flex-direction:column;
    text-align:center;
    padding:45px;
    cursor:pointer;
}

h1 {
    margin:10px;
    
    color:rgb(29, 29, 29);
}

img {
    height:150px;
    width:150px;
}
</style>
