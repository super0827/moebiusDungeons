<template>
<section>
    <section class="helpModule">
        <h1 @mouseenter="UiSounds.chit.play()" @click="$emit('close')" class="close">X</h1>


        <h1 class="title">Shop Select Helper</h1>
        
        <br>

        <section>
                <h3>After every monster you fight, you have an opprotunity to visit a shopkeeper, rest, or retire from your service to the Coterie.</h3>
<br>
                <h1>Choosing a Shopkeep</h1>
                <p>Each shopkeep is different, and each can help you with different aspects of your adventuring. Make sure to visit each of them to begin understanding what each shopkeep offers.</p>
<br>
                <h1>Rest</h1>
                <p>Resting recovers one use of mettle at no cost. Use this if you're healthy and low on coin.</p>
<br>
                <h1>Retire</h1>
                <p>If you find yourself near death, or grow weary in your travels, retiring is your best bet. This option ends your current game and uploads you stats to the Kingloyal Leaderboards. Being in the top ten Kingloyal is an honor above all honors. Hold the highest rank at the end of the month and you'll be rewarded with a service sigil blessed by King Rense himself.</p>
        </section>
    </section>
</section>
</template>

<script>

import { mapState } from 'vuex'
import UiSounds from '@/plugins/UiSounds.js'

export default {
  name: 'BattleHelp',
  data() {
      return {
          UiSounds: UiSounds
      }
  },
}
</script>

<style scoped>
    .title {
        text-decoration: none;
        font-size:30px;
    }

    .helpModule {
        position:absolute;
        top:0px;
        left:-50px;
        padding: 0px 50px;
        z-index:99999;
        height:100%;
        width:100%;
        background:rgba(255, 255, 255, 0.94);
        display:flex;
        justify-content:center;
        align-items: center;
        flex-direction: column;
    }

    .close {
        position:absolute;
        font-size:35px;
        top:0;
        right:0;
        color:rgb(0, 0, 0);
        margin:10px 10px;
        line-height:35px;
        text-decoration: none;
    }

    .close:hover {
        cursor:pointer;
        color:rgb(255, 0, 0)
    }

    p {
        color:black;
        font-size:15px;
    }

    h1 {
        font-size:23px;
    }

    h2 {
        font-size:20px;
        text-decoration:none;
    }

    h1, h2 {
        color:black;
        margin:2px;
    }

    hr {
        background:black;
        border:black 1px solid;
    }

    .help {
        display:flex;
        justify-content: center;
        align-items: flex-start;
    }

    .help section {
        display:flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding:10px;
        text-align: center;
    }

    .help img {
        width:75px;
    }
</style>
