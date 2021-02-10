<template>
<b-col cols='12'>
    <h1 class="text-center">Credits</h1>

    <section class="border wrapper p-4">
        <h4>Hey there kingloyal.</h4>
        <p>
         Sean Yager here, creator of Moebius Dungeons. This game is created in my free time, and I'm the only web developer on the team. If you'd like to help support the development of the game consider donating to my Paypal account or consider buying the RPG poetry book that inspired this game.
        </p>

        <section class="d-flex justify-content-around">
            <a href="paypal.me/MisuseofMana" target="_blank">
                <b-button class="mb-3" variant="primary" @mouseenter="UiSounds.chit.play()">DONATE</b-button>
            </a>

            <a href="https://gum.co/CsdPh" target="_blank">
                <b-button class="mb-3" variant="primary" @mouseenter="UiSounds.chit.play()">BUY THE BOOK THAT INSPIRED THIS GAME</b-button>
            </a>
        </section>

        <p>There are likely a ton of bugs in this game, if you find any please send me an email with a description of the bug so I can fix it!  <a href="https://discord.gg/U2pn7xq" target="_blank">If you use discord, you can report bugs here too.</a> Gameplay ideas are always welcome too so send them my way.</p>
        <h4 class="mb-3 text-right"><a href="mailto:moebuisdungeons@gmail.com">moebiusdungeons@gmail.com</a></h4>
        
        <hr class="my-5">

        <p>Moebius Dungeons has been and still is a <strong>HUGE</strong> project, it's spanned a scope beyond myself in many ways. I've used a great many coding libraries, voice actors, audio editors, and other content creators. I couldn't have completed this project without their help.</p>
        <h4 class="mb-5">I'll update this list until it is complete as I have time, but for now a special thank you to the following people.</h4>


        <h1>Dedicated To:</h1>
        <section class="ml-3 mb-5">
            <p>My beautiful, and patient wife.</p>
            <p>My loving family.</p>
            <p>My stalwart friends, who help me blow off steam and reboot.</p>
            <p>My collaborators in all my artwork and storytelling, who guide me when I'm feeling wayward.</p>
        </section>

        <h1>My Friends:</h1>
        <section class="ml-3 mb-5">
            <p>Andy Webb, for building the lore of Amara and Moebius Dungeons over the years.</p>
            <p>David Haines, for always being interested in my work.</p>
            <p>Josh Haines, for dreaming with me.</p>
            <p>Jacob Yager, for being my biggest fan.</p>
            <p>Al Yager, for always being an ear.</p>
            <p>Jerri Yager, for your unfaltering encouragement.</p>
        </section>
           
        <h1>The Talented Voices Of:</h1>
        <section class="ml-3 mb-0">
            <p>Jordan Huges as the Merchant</p>
            <p>Jacob Yager as the Graverobber</p>
            <p>Al Yager as half the Monsters</p>
            <p>Eva Yager as the other half of the Monsters</p>
            <p>Talethia on Fiverr as the Cleric and Witch</p>
        </section>
    </section>

    <section class="d-flex justify-content-center">
        <b-button size="lg" class="mt-3" @click="backToMenu">Back To Main Menu</b-button>
    </section>
</b-col>
</template>

<script>
import UiSounds from '@/plugins/UiSounds.js'

export default {
  name: 'CreditOverlay',
  data() {
      return {
        UiSounds : UiSounds,
      }
  },
  methods:{
      backToMenu(){
           this.$store.commit('gameData/mutate', {property: 'phase', with: 'SavedGame'})
      }
  }
}
</script>

<style scoped>
.wrapper {
    height:500px;
    overflow-y:scroll;
}

hr {
    background:black;
    border:black 1px solid;
    margin:20px 0px;
}
</style>
