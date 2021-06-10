<template>
<div class="h-90 px-4 text-black">
    <b-row class="mb-2">
        <b-col>
            <h1>SHOP SELECT</h1>
            <p>After every monster you fight, you have an opprotunity to visit a shopkeeper, rest, or retire from your service to the Coterie.</p>
        </b-col>
    </b-row>

    <b-row class="mb-10">
        <b-col>
            <h2>Choosing a Shopkeep</h2>
            <p>Each shopkeep is different, and each can help you with different aspects of your adventuring. Make sure to visit each of them to begin understanding what each shopkeep offers.</p>
        </b-col>
    </b-row>

    <b-row class="mb-2">
        <b-col>
            <h2>Rest</h2>
            <p>Resting recovers one use of mettle at no cost. Use this if you're healthy and low on coin.</p>
        </b-col>
    </b-row>

    <b-row class="mb-2">
        <b-col>
                <h2>Retire</h2>
            <p>If you find yourself near death, or grow weary in your travels, retiring is your best bet. This option ends your current game and uploads your highscore to the Kingloyal Leaderboards. Being in the top ten Kingloyal is an honor above all honors. Hold the highest rank at the end of the month and you'll be rewarded with a service sigil blessed by King Rense himself.</p>
        </b-col>
    </b-row>
</div>
</template>

<script>

import { mapState } from 'vuex'
import UiSounds from '@/plugins/UiSounds.js'

export default {
  name: 'ShopSelectHelper',
  data() {
      return {
          UiSounds: UiSounds
      }
  },
}
</script>

<style scoped>
</style>
