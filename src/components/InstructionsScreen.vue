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
      Tougher beasts boast more coins. Each playable character is different, so try them out and see which you like best.
  </h3>

  <h3>
      Rinse. Repeat.    
  </h3>

  <p>
      Do not falter.
  </p>

<br>
  <h1 id="proceed" @click="storeState.phase = 'CharacterSelect'">
      UNDERSTOOD.
  </h1>
</section>
</template>

<script>
import { store } from "../store";

export default {
  name: 'InstructionsScreen',
  data() {
      return {
          storeState: store.state,
      }
  },
}
</script>

<style scoped>
    #instructions {
        width:350px;
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
        font-size:18px;
        margin:2px;
    }

    h2 {
        font-size:16px;
        text-decoration: none;
    }

    h3 {
        font-size:14px;
    }

    p {
        font-size:10px;
    };
</style>
