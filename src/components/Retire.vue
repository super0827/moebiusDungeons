<template>
<section>
    <section class="helpModule">

        <h1 class="title">BE CAREFUL!</h1>
        
        <br>

        <section>
                <h3>You're about to end this adventure.</h3>
                    
                    <h3>If you're sure you want to retire click "I'm Sure".</h3>

            <h3>Otherwise, click "Keep Adventuring" to press onward.</h3>

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
        position:fixed;
        top:0px;
        left:0px;
        padding: 0px 50px;
        z-index:99999;
        height:100vh;
        width:100vw;
        background:rgba(22, 21, 21, 0.99);
        display:flex;
        justify-content:center;
        align-items: center;
        flex-direction: column;
    }

    p {
        color:white;
        font-size:15px;
    }

    h1 {
        font-size:23px;
    }

    h2 {
        font-size:20px;
        text-decoration:none;
    }

    h1, h2, h3 {
        color:white;
        margin:2px;
    }

    .exitMenu {
        margin-top:15px;
    }

    .exitMenu .red{
        background:rgba(163, 72, 72, 0.5);
        cursor:pointer;
        color:black;
        padding:10px;
    }
    
    .exitMenu .red:hover{
        background:rgba(212, 20, 20, 0.8);
        color:rgb(98, 0, 0);
    }
    
    .exitMenu .green{
    background:rgba(106, 148, 120, .5);
    color:black;
    cursor:pointer;
    padding:10px;
    }
    
    .exitMenu .green:hover{
    background:rgba(45, 240, 110, 0.8);
    color:green;
    }

    hr {
        background:white;
        border:white 1px solid;
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

    .close {
        color:red;
        text-align:right;
    }

    .help img {
        width:75px;
    }
</style>
