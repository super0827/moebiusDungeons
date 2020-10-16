<template>
<section>
    <section class="helpModule">
        <h1 @mouseenter="UiSounds.chit.play()" @click="$emit('close')" class="close">X</h1>


        <h1 class="title">Battle Helper</h1>
        
        <br>

        <section>

            <section class="help">
                <section>
                <h1>Health</h1>
                <img src="@/assets/imgs/icons/healthIcon.png" alt="">
                <p>
                    When this value reaches 0, you're dead.
                </p>
                </section>

                <section>
                    <h1>Armor</h1>
                <img src="@/assets/imgs/icons/armorIcon.png" alt="">
                <p>
                   Blocks incoming physical damage.
                </p>
                </section>
                
                <section>
                    <h1>Physical</h1>
                <img src="@/assets/imgs/icons/physicalIcon.png" alt="">
                <p>
                    Physical damage is blocked by armor.
                </p>
                </section>
                
                <section>
                    <h1>Magical</h1>
                <img src="@/assets/imgs/icons/magicalIcon.png" alt="">
                <p>
                    Magical damage is NOT reduced by armor.
                </p>
                </section>
            </section>

            <hr>

            <h2>Trade Blows</h2>
            <p>
                Standard attack in Moebius Dungeons.
                <br>
                Deals a random amount of damage between 1 and your attack score.
                If your attack doesn't kill the monster, it attacks you back so watch out!
            </p>
            <br>
            <h2>{{special}}</h2>
            <p>{{description}}</p>
            <br>
            <h2>Turn Tail</h2>
            <p>
                Flee you fool! Live another day! You may try this once per fight.
                <br>
                You'll roll a random number from 1 to 6 and add your health points,
                the monster will do the same. If you roll higher, you get away. If the
                monster rolls higher it will attack you and you fail to run away.
            </p>


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
  computed: {
    ...mapState('playerData', {
        special: state => state.info.special,
        description: state => state.info.specialDescription
    })
  }
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
