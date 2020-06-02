<template>
<section id="instructions" class="textCenter">

  <img src="../assets/imgs/icons/instructions.png" alt="">
  
  <h1 class="uppercase">
      Welcome to the MOBEIUS DUNGEONS adventurer.
  </h1>

  <h2>
      This is a high fantasy hack and slash adventure where you attack monsters to gain coins, then spend your wealth on lavish equipment and enchantments.
  </h2>

  <h3>
      Tougher beasts drop more coins. Each character class is different, so try them all out.
  </h3>

  <h3>
      Rinse then repeat. Try to make it to the end alive.    
  </h3>

  <p>
      Do not falter.
  </p>

<br>
  <h1 @mouseenter="UiSounds.chit.play()" class="animated pulse slow infinite" id="proceed" @click="toggleHelp()">
      UNDERSTOOD.
  </h1>
</section>
</template>

<script>

import helperToggles from '../components/mixins/helperToggles'
import UiSounds from '@/plugins/UiSounds.js'

export default {
  name: 'InstructionsScreen',
  mixins: [helperToggles],
  data() {
      return {
          UiSounds: UiSounds,
      }
  },
}
</script>

<style scoped>
    #instructions {
        width:100%;
        height:100%;
        background:rgba(255, 255, 255, 0.98);
        position:absolute;
        top:0px;
        display:flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    #instructions img {
        width:200px;
    }

    #proceed {
        padding:20px;
        color:black;
        background: var(--button-background);
    }
    #proceed:hover {
        background:rgb(185, 185, 185);
        cursor:pointer;
    }

    h1 {
        font-size:25px;
        margin:2px;
    }

    h2 {
        font-size:25px;
        margin:10px;
        text-decoration: none;
    }

    h3 {
        font-size:18px;
    }

    p {
        font-size:20px;
    };
</style>
