<template>
<section>
<section class="wrapper">
        <h1 class="title">Credits</h1>
    

        <section>

            <section class='block'>

            <p>
            Hey there kingloyal. Sean Yager here, creator of Moebius Dungeons. This game is created in my free time, and I'm the only web developer on the team. If you'd like to help support the development of the game consider <a @mouseenter="UiSounds.chit.play()" href="paypal.me/MisuseofMana">donating to my Paypal account</a> or consider <a @mouseenter="UiSounds.chit.play()" href="https://gum.co/CsdPh" target="_blank">buying the RPG poetry book that inspired this game.</a>
            </p>
            
            <p>Moebius Dungeons has been and still is a <strong>HUGE</strong> project, it's spanned a scope beyond myself in many ways. I've used a great many coding libraries, voice actors, audio editors, and other content creators. I couldn't have completed this project without their help.</p>
            
            <hr>

            <h3>I'll update this list until it is complete as I have time, but for now a special thank you to the following people.</h3>
            </section>


            <section>
                <section class="block">
                    <h2>Dedicated To:</h2>
                    <p>My beautiful, and patient wife.</p>
                    <p>My loving family.</p>
                    <p>My stalwart friends, who help me blow of steam and reboot.</p>
                    <p>My collaborators in all my artwork and storytelling, who guide me when I'm feeling wayward.</p>
                </section>
                
                <section class="block">
                    <h2>My Friends:</h2>
                    <p>Andy Webb, for building the lore of Moebius Dungeons over the years.</p>
                    <p>David Haines, for always being interested.</p>
                    <p>Josh Haines, for dreaming with me.</p>
                    <p>Jacob Yager, for being my biggest fan.</p>
                    <p>Al Yager, for being an ear.</p>
                    <p>Jerri Yager, for your encouragement.</p>
                </section>

                <section class="block">
                    <h2>The Talented Voices Of:</h2>
                    <p>Jordan Huges as the Merchant</p>
                    <p>Jacob Yager as the Graverobber</p>
                    <p>Al Yager as half the Monsters</p>
                    <p>Eva Yager as the other half of the Monsters</p>
                    <p>Talethia on Fiverr as the Cleric and Witch</p>
                </section>

            </section>

        </section>
</section>
<h3 @click="backToMenu" class="backButton">Back To Main Menu</h3>
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
  methods:{
      backToMenu(){
           this.$store.commit('gameData/mutate', {property: 'phase', with: 'SavedGame'})
      }
  }
}
</script>

<style scoped>
/* width */
::-webkit-scrollbar {
    width: 10px;
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: black;
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

.wrapper {
    width:70vw;
    height:500px;
    overflow-y:scroll;
}

    .title {
        text-decoration: none;
        font-size:30px;
        text-align:center;
    }

    .block {
        padding:10px;
        margin:20px 10px;
        border:black 2px solid;
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

    .backButton{
        padding:20px;
        background:#777;
        width:200px;
        color:white;
        text-align:center;
        margin:20px auto;
        cursor:pointer;
    }

    .backButton:hover {
        background:#ccc;
        color:black;
    }
</style>
