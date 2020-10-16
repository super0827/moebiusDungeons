<template>
    <div class="relative">
        <h1 @click="toggleHelp()" @mouseenter="UiSounds.chit.play()" id="credits">ABOUT</h1>

        <div class="flexColumn">
        <h1>Welcome To The</h1>
        <h1>Moebius Dungeons</h1>
        </div>

        <p>There are likely a ton of bugs in this game, if you find any please send me an email and a description of the bug so I can fix it! If you have any ideas send them my way as well!</p>
        <h3><a href="mailto:moebuisdungeons@gmail.com">moebiusdungeons@gmail.com</a></h3>

<br>
        
        <div class="flexRow">
            <div @click="startNewGame()" @mouseenter="UiSounds.chit.play()" class="newGame nodule block">
                <h1 class="small"><span v-if="save">Delete Save and</span> Start A New Game</h1>
                <img src="@/assets/imgs/icons/raceTypeHumanIcon.png" alt="">
            </div>

            <div @click="loadSavedGame()" @mouseenter="UiSounds.chit.play()" v-if="save" class="resumeGame nodule block flexColumn">

                <img class="portraitSize" :src="player.info.portrait" alt="">
                <br>
                <h1>Resume Game</h1>
                <h3>{{savedPhase}}</h3>

                <div class="flexRow whiteText">
                    <div class="overlayStats">
                    <img class="iconSize overlayGridPos" src="@/assets/imgs/icons/healthIcon.png">
                    <h3 class="overlayGridPos">{{ player.info.baseHealth + player.tempHealth}}</h3>
                    </div>
                    
                    <div class="overlayStats">
                    <img class="iconSize overlayGridPos" :src="player.info.attackTypeImage">
                    <h3 class="overlayGridPos">{{ player.info.baseAttackMax + player.tempAttackMax}}</h3>
                    </div>
                
                    <div class="overlayStats">
                    <img class="iconSize overlayGridPos" src="@/assets/imgs/icons/armorIcon.png">
                    <h3 class="overlayGridPos">{{ player.info.baseArmor + player.tempArmor}}</h3>
                    </div>
                </div>

                <div class="flexRow blackText">   
                    <div class="overlayStats">
                        <img class="iconSize overlayGridPos" src="@/assets/imgs/icons/coinIcon.png">
                        <h1 class="overlayGridPos">{{ player.info.coins }}</h1>
                    </div>
                    
                    <div class="overlayStats">
                        <img class="iconSize overlayGridPos" :src="player.info.mettleImg">
                        <h1 class="overlayGridPos">{{ player.info.mettle }}</h1>
                    </div>
                </div>
            </div>

        </div>
<br>
        <p class="widthCap">
            Hey there kingloyal. Sean Yager here, creator of Moebius Dungeons. This game is created in my free time, and I'm the only web developer on the team. If you'd like to help support the development of the game consider <a @mouseenter="UiSounds.chit.play()" href="paypal.me/MisuseofMana">donating to my Paypal account</a> or consider <a @mouseenter="UiSounds.chit.play()" href="https://gum.co/CsdPh" target="_blank">buying the RPG poetry book that inspired this game.</a>
        </p>

        <div class="flexColumn">

        <p>Always Remember. A Loyal Squire Will Never Tire</p>

        <h1 @mouseenter="UiSounds.chit.play()" @click="toLeaderboards()" class="leaderboards">LEADERBOARDS</h1>
        </div>
    
    <transition name="fade" mode="out-in">
        <credits-overlay key="battleHelper" @close="toggleHelp()" v-if="helper"/>
    </transition>

    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CreditsOverlay from '@/components/CreditsOverlay';
import helperToggles from '@/components/mixins/helperToggles';
import UiSounds from "@/plugins/UiSounds";

    export default {
        name:"SavedGame",
        mixins: [helperToggles],
        components: {
            CreditsOverlay
        },
        data() {
            return {
                UiSounds: UiSounds,
            }
        },
        methods: {
            startNewGame() {
                this.$store.commit('gameData/mutate', {property: 'phase', with:'CharacterSelect'}, {root:true})
                this.$store.dispatch('authData/deleteSavedGame', null, {root:true})
            },
            ...mapActions( 'authData', [
                'loadSavedGame',
                'deleteSavedGame'
            ]),
            toLeaderboards() {
                this.$store.commit('gameData/mutate', {property: 'phase', with: 'LeaderBoard'})
            }
        },
        computed: {
            ...mapState('authData', {
                save: state => state.user.data.save.saveExists,
                player: state => state.user.data.save.saveState.player
            }),
            savedPhase: function () {
                switch (this.player.currentPhase){
                    case 'DungeonPhase':
                        return 'Dungeon Phase'
                    break;
                    case 'ShopPhase':
                        return 'Shop Phase'
                    break;
                    case 'ShopSelect':
                        return 'Shop Select'
                    break;
                    case 'ShopPhase':
                        return 'Shop Phase'
                    break;
                    default:
                        null
                }
            }
        }
    }
</script>

<style scoped>
.relative {
    position:relative;
    max-width:500px;
}
#credits {
    font-size: 20px;
    position: fixed;
    right: 10px;
    top: 10px;
    margin: 0;
    padding: 5px;
    background: rgb(218, 218, 218);
    cursor:pointer;
}
h3, h1 {
    text-align:center;
}
.leaderboards {
    background:rgb(218,218,218);
    padding:10px;
    margin:10px 0px;
}
.leaderboardsSmaller {
    background:rgb(218,218,218);
    font-size:15px;
    color:black;
    text-decoration: none;
    padding:10px;
    margin:10px 0px;
}
.leaderboards:hover, .leaderboardsSmaller:hover {
    background:rgb(255, 241, 179);
    color:grey;
    cursor:pointer;
}
.resumeGame h1 {
    font-size:20px;
}
.small {
    font-size:20px;
}

.overlayStats{
    width:60px;
    display:grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
}

.overlayGridPos{
    grid-row: 1/2;
    grid-column: 1/2;
    width:60px;
    height:60px;
    text-align:center;
    line-height:60px;
}

.blackText h1 {
    color:white;
    text-shadow:black 1px 1px 2px;
    font-size:20px;
}

.whiteText h3 {
    color:white;
    text-shadow:black 1px 1px 2px;
    font-size:15px;
}

p.overlayGridPos {
    margin:0;
}

.portraitSize{
    width:75px;
}

.iconSize {
    width:60px;
}

.widthCap{
    width:500px;
    text-align:center;
}

.block {
    border:solid 1px black;
    margin:10px;
    padding:10px;
}

.nodule {
    width:200px;
    height:300px;
}

.newGame:hover, .resumeGame:hover {
    background:gold;
    border:goldenrod 1px solid;
    cursor:pointer;
}

.newGame {
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
}

.newGame img {
    height:100px;
    margin:0 auto;
}

h1, h2 {
    margin:0;
}
</style>