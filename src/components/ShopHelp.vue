<template>
<section>
    <section class="helpModule">
        <h1 @mouseenter="UiSounds.chit.play()" @click="$emit('close')" class="close">X</h1>

        <h1 class="title">Shop Helper</h1>
        
        <br>

        <section>

            <section class="help">
                <section>
                <h1>Coins</h1>
                <img src="@/assets/imgs/icons/coinIcon.png" alt="">
                <p>
                    Represents your wealth.
                </p>
                </section>

                <section>
                    <h1>HP</h1>
                <img src="@/assets/imgs/icons/healthIcon.png" alt="">
                <p>
                    HP means health.
                </p>
                </section>
                
                <section>
                <h1>ARM</h1>
                <img src="@/assets/imgs/icons/armorIcon.png" alt="">
                <p>
                   ARM means armor. 
                </p>
                </section>
                
                <section>
                    <h1>ATK</h1>
                <img src="@/assets/imgs/icons/physicalIcon.png" alt="">
                <p>
                    ATK means attack.
                </p>
                </section>
                
            </section>

            <hr>

            <h2>SHOP PHASE</h2>
            <p>There are four types of shopkeepers in Moebius Dungeons, each has their own unique rotating stock.</p>



            <h2>Merchant</h2>
            <p>
               An honest tradesman. Provides meals to replenish your HP, kits to increase your ARM, and Mettle vials to embolden your ATK.
            </p>
            

            
            <h2>Grave Robber</h2>
            <p>
                An untrustworthy soul. Provides cursed items that usually cost more than simple coins.
            </p>


            <h2>Witch</h2>
            <p>
                A primordial being, unassuming in shape. Powerful spells to boost your stats. Some magics are more trouble than they're worth.
            </p>



            <h2>Cleric</h2>
            <p>
                A devout matron of the Eyien church. Heals your HP, provides ARM blessing, ATK buffs, and powerful boons.
            </p>


        </section>
    </section>
</section>
</template>

<script>
import UiSounds from '@/plugins/UiSounds.js'

export default {
  name: 'BattleHelp',
  data() {
      return {
        UiSounds : UiSounds,
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
