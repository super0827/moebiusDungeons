<template>
<section>

    <section class="animated startScreen slower">
        <section>
            <img src="@/assets/imgs/icons/raceTypeHumanIcon.png" alt="">
            <img src="@/assets/imgs/icons/raceTypeIconMagic.png" alt="">
            <img src="@/assets/imgs/icons/raceTypeBeast.png" alt="">
            <h1>MOEBIUS DUNGEONS</h1>
        </section>
    </section>
    
    <section class="gumroadCenter"
    @click="startGame()"
    @mouseenter="UiSounds.chit.play()">
        <h3>CLICK HERE TO BEGIN</h3>
    </section>

    <br>

    <section class="gumroadCenter"
    @mouseenter="UiSounds.chit.play()"
    >
        <a href="https://gum.co/CsdPh" target="_blank"> or get the playable RPG book that inspired Moebius Dungeons</a>
    </section>

</section>
</template>

<script>
import gameAnimations from '@/components/mixins/gameAnimations';

import { mapState } from 'vuex';
import UiSounds from '@/plugins/UiSounds.js'

export default {
    name: 'StartScreen',
    mixins: [gameAnimations],
    data() {
        return {
            UiSounds: UiSounds
        }
    },
    methods: {
        startGame () {
            this.$store.commit('gameData/mutate', {property: 'phase', with: 'CharacterSelect'});
            UiSounds.startBlip.play();
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
}

h1 {
    margin:10px;
    color:rgb(29, 29, 29);
}

h3 {
    font-family: var(--headers-type);
    font-weight:100;
    font-size:20px;
}


img {
    height:150px;
    width:150px;
}

.gumroad-button {
    margin-top:20px;
}

.gumroadCenter {
    display:flex;
    font-size:16px;
    font-family: var(--paragraphs-type);
    align-items:center;
    justify-content: center;
    text-transform: uppercase;
    background:rgb(238, 238, 238);
    padding:20px;
    color:black;
    border-radius:999px;
}

.gumroadCenter:hover {
    background:grey;
    cursor:pointer;
}

.gumroadCenter a, .gumroadCenter a:visited {
    color:grey;
    text-decoration: none;
}

.gumroadCenter:hover > a, .gumroadCenter:hover > h3 {
    color:white;
}

</style>
