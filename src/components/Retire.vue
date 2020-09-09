<template>
<section>
    <section class="helpModule">
        <h1 @mouseenter="UiSounds.chit.play()" @click="$emit('close')" class="close">X</h1>


        <h1 class="title">BE CAREFUL!</h1>
        
        <br>

        <section>
                <h3>You're about to end this adventure.</h3>
                    
                    <h3>If you're sure you want to retire click "I'm Sure".</h3>

            <h3>Otherwise, click "Keep Adventuring" or click the "X" to close this window.</h3>

            <hr>

            <h2>ARE YOU SURE YOU WANT TO RETIRE FROM THIS RUN?</h2>
            
            <section class="exitMenu flexRow">
                <h1 class="red" @click="$emit('retire')">I'M SURE</h1>
                <h1 class="green" @click="$emit('close')">NO! KEEP ADVENTURING</h1>
            </section>
        </section>
    </section>
</section>
</template>

<script>

import { mapState } from 'vuex'
import UiSounds from '@/plugins/UiSounds.js'

export default {
  name: 'Retire',
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
        justify-content:flex-start;
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

    .exitMenu {
        margin-top:15px;
    }

    .exitMenu .red{
        background:rgba(163, 72, 72, 0.5);
        cursor:pointer;
        padding:10px;
    }
    
    .exitMenu .red:hover{
        background:rgba(212, 20, 20, 0.8);
        color:rgb(98, 0, 0);
    }
    
    .exitMenu .green{
    background:rgba(106, 148, 120, .5);
    cursor:pointer;
    padding:10px;
    }
    
    .exitMenu .green:hover{
    background:rgba(45, 240, 110, 0.8);
    color:green;
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
