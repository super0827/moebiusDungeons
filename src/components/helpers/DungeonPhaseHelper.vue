<template>
<div class="h-90 px-4 text-black">
    <b-row class="mb-2">
        <b-col cols="7">
            <h1>DUNGEON PHASE</h1>
            <p>So you've encountered a monster while wandering around Amara? Fight it to the death or flee you fool!</p>
        </b-col>
        <b-col cols="5">
            <b-button @click="toggleShown('moves')" class="mr-3" variant="primary">
                <h3 class="m-0">MOVES LEGEND</h3>
            </b-button>
            <b-button @click="toggleShown('icons')" variant="primary">
                <h3 class="m-0">ICON LEGEND</h3>
            </b-button>
        </b-col>
    </b-row>

    <b-row v-if="shown === 'icons'" class="mt-1">
        <!-- COLUMN 1 -->
        <b-col cols="4" class="mt-2">
            <div>
                <h4 class="m-0">
                    <img src="@/assets/imgs/icons/healthIcon.png" alt="a heart icon">
                    HEALTH ICON <strong>[HP]</strong>
                </h4>
                <p>
                    Represents your health, it is reduced when monsters attack you back. There is no upper limit to your HP; be sure to buy health items while in Eyien. <strong>When this value reaches 0, you're dead, and it's GAME OVER</strong>.
                </p>
            </div>

            <hr>

            <div>
                <h4 class="m-0">
                    <img src="@/assets/imgs/icons/physicalIcon.png" alt="a sword icon">
                    ATTACK ICON <strong>[ATK]</strong>
                </h4>
        
                <p class="mb-1">
                    This icon represents your maximum possible <strong>PHYSICAL</strong> attack power, it can be increased by buying <strong>ATK</strong> items in Eyien.
                </p>

                <p>
                    All <strong>ATK</strong> damage is reduced the defenders <strong>ARM</strong> score, this is true of monsters and players attacking each other. <strong>ATK</strong> damage is <strong><em>NOT</em></strong> reduced by <strong>WRD</strong>.
                </p>
            </div>


            <hr>

            <div>
                <h4 class="m-0">
                    <img src="@/assets/imgs/icons/magicalIcon.png" alt="a sword icon">
                    MAGIC ICON <strong>[MAG]</strong>
                </h4>
        
                <p class="mb-1">
                    This icon represents your maximum possible magical attack power, it can be increased by buying attack items in Eyien.
                </p>

                <p>
                    All <strong>MAG</strong> damage is reduced by the defenders <strong>WRD</strong> score, this is true of monsters and players attacking each other. <strong>ATK</strong> damage is <strong><em>NOT</em></strong> reduced by <strong>WRD</strong>.
                </p>
            </div>
        </b-col>

        <!-- COLUMN 2 -->
        <b-col cols="4">
            <div>
                <h4 class="m-0">
                    <img src="@/assets/imgs/icons/armorIcon.png" alt="a sword icon">
                    ARMOR ICON <strong>[ARM]</strong>
                </h4>
        
                <p class="mb-1">
                    This icon represents your <em>physical armor score</em>, it can be increased by the swordsmans special ability or through buying <strong>ATK</strong> items in Eyien.
                </p>

                <p>
                    <strong>ARM</strong> is permenant, it will not be lowered by any attacks but will reduce the damage you take from monsters <strong>ATK</strong> score. 
                </p>
            </div>

            <hr>
            
            <div>
                <h4 class="m-0">
                    <img src="@/assets/imgs/icons/wardIcon.png" alt="a sword icon">
                    WARD ICON <strong>[WRD]</strong>
                </h4>
        
                <p class="mb-1">
                    This icon represents your magical armor score, it can be increased by buying <strong>WRD</strong> items in Eyien.
                </p>

                <p>
                    <strong>WRD</strong> is permenant, it will not be lowered by any attacks but will reduce the damage you take from monsters <strong>MAG</strong> score. 
                </p>
            </div>
        </b-col>

        <!-- COLUMN 3 -->
        <b-col cols="4">    
            <div>
                <h4 class="m-0">
                    <img src="@/assets/imgs/icons/allMettleIcon.png" alt="a sword icon">
                    METTLE ICONS <strong>[MTL]</strong>
                </h4>
        
                <p class="mb-1">
                    These icon represent your <strong>mettle</strong>, a resource needed to use your special abilities.
                </p>

                <p>
                    <strong>Mettle</strong> is consumed by using your sepecial abilities. It is replenished by resting in Eyien or purchasing <strong>Mettle</strong> items.     
                </p>
            </div>
            
            <hr>

            <div>
                <h4 class="m-0">
                    <img src="@/assets/imgs/icons/coinIcon.png" alt="a sword icon">
                    COIN ICON <strong>[COIN]</strong>
                </h4>
        
                <p class="mb-1">
                    <strong>Coins</strong> are the currency in Moebius Dungeons. Use <strong>Coins</strong> to purchase items from the safety of Eyien's walls.  

                </p>

                <p>
                    <strong>Mettle</strong> is consumed by using your sepecial abilities. It is replenished by resting in Eyien or purchasing <strong>Mettle</strong> items.     
                </p>
            </div>
        </b-col>
    </b-row>



    <b-row v-else-if="shown === 'moves'" class="d-flex justify-content-center">
        <b-col cols="9">
            <h2>MOVES</h2>
            <hr>
            <h3>TRADE BLOWS</h3>
            <p>
                Trade Blows is the standard attack in Moebius Dungeons.
                This move deals a randomized amount of damage between 1 and your maximum <strong>ATK</strong> or <strong>MAG</strong> score.
            </p>
            <p>If your attack doesn't reduce the monster to 0 or less <strong>HP</strong> the monster will attack you back.</p>
   
            <h3 class="text-uppercase">{{special}}</h3>
            <p>{{description}}</p>
 
            <h3>TURN TAIL</h3>
            <p>Flee you fool! Live another day! You may try this once per fight.</p>
            <p>
                You'll roll a random number from 1 to 6 and add your health points,the monster will do the same. If you roll higher, you get away. If the monster rolls higher it will attack you and you fail to run away.
            </p>
        </b-col>
    </b-row>
</div>


</template>

<script>

import { mapState } from 'vuex'
import UiSounds from '@/plugins/UiSounds.js'

export default {
    name: 'DungeonPhaseHelper',
    data() {
      return {
          UiSounds: UiSounds,
          shown: 'icons',
      }
    },
    methods: {
        toggleShown(showWhat) {
            this.shown = showWhat
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
img {
    width:50px;
}
</style>
