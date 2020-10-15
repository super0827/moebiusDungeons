<template>
<section>
    <section class="helpModule">
        <h1 @mouseenter="UiSounds.chit.play()" @click="$emit('close')" class="close">X</h1>

        <h1 class="title">Credits</h1>
        
        <br>

        <section>

            <h3>Hello there, Sean here. Thanks for checking out the credits.</h3>
            
            <p>Moebius Dungeons has been and still is a <strong>HUGE</strong> project, it's spanned a scope beyond myself in many ways. I've used a great many coding libraries, voice actors, audio editors, and other content creators. I couldn't have completed this project without their help.</p>
            
            <hr>

            <h3>I'll update this list until it is complete as I have time, but for now a special thank you to the following people:</h3>

            <br>    

            <section class="flexRow">
                <section class="flexColumn block">
                    <h3>Dedicated To</h3>
                    <p>My beautiful, and patient wife.</p>
                    <p>My loving family.</p>
                    <p>My stalwart friends, who help me blow of steam and reboot.</p>
                    <p>My collaborators in all my artwork and storytelling, who guide me when I'm feeling wayward.</p>
                </section>
                
                <section class="flexColumn block">
                    <h3>Friends</h3>
                    <p>Andy Webb, for building the lore of Moebius Dungeons over the years.</p>
                    <p>David Haines, for always being interested.</p>
                    <p>Josh Haines, for dreaming with me.</p>
                    <p>Jacob Yager, for being my biggest fan.</p>
                    <p>Al Yager, for being an ear.</p>
                    <p>Jerri Yager, for your encouragement.</p>
                </section>

                <section class="flexColumn block">
                    <h3>Voices</h3>
                    <p>Jordan Huges as the Merchant</p>
                    <p>Jacob Yager as the Graverobber</p>
                    <p>Al Yager as half the Monsters</p>
                    <p>Eva Yager as the other Monsters</p>
                    <p>Talethia on Fiverr as the Cleric and Witch</p>
                </section>

            </section>

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

    .block {
        padding:10px;
        margin:0 10px;
        border:black 2px solid;
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
        text-align:center;
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
