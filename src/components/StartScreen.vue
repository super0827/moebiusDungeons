<template>
<section class="characterSelectWrapper">

    <h1 class="animated" :class="{'zoomInDown' : storeState.isEntering, 'zoomOutUp' : !storeState.isEntering }">ENTER THE MOEBIUS DUNGEONS</h1>

</section>
</template>

<script>
import { store } from "../store";
import { Howl } from "howler";

const chit = new Howl({
    src: ['../buttonHover.wav'],
    volume:0.4,
});

export default {
  name: 'CharacterSelect',
  data() {
        return {    

        }
}
</script>

<style scoped>
.characterSelectWrapper {
    text-align:center;
}

.chooseChar {
    display:flex;
    flex-direction: row;
}

.chooseChar img {
    max-width:200px;
}

.overlay {
    height:100px;
    width:200px;
    z-index:999;
    position:absolute;
    bottom:0;
}

.portContainer {
    position:relative;
}

#swordsman:hover, #mage:hover, #varlet:hover {
    cursor:pointer;
}
#swordsman:hover .overlay {
    background: linear-gradient(0deg, rgb(187, 16, 58) 0%, rgba(255,192,0,0) 100%);
}

#mage:hover .overlay {
    background: linear-gradient(0deg, rgb(0, 174, 255) 0%, rgba(255,192,0,0) 100%);
    cursor:pointer;
}

#varlet:hover .overlay {
    background: linear-gradient(0deg, rgb(238, 255, 0) 0%, rgba(255,192,0,0) 100%);
    cursor:pointer;
}

#about {
    font-size: 20px;
    position: fixed;
    right: 10px;
    top: 10px;
    margin: 0;
    padding: 5px;
    background: rgb(218, 218, 218);
}
#about:hover {
    background:rgb(185, 185, 185);
    cursor:pointer;
}
</style>
