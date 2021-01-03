<template>
    <div class="gameContainer">
        <section class="block col-left-4 row-top-2">
            <h1>News</h1>
            <p>If the game appears too large on your screen try pressing CRTL- on Windows or CMD- on Mac to resize the interface.</p>
            <p class="warning">WARNING: Moebius Dungeons no longer auto saves your gameplay. To save your game click the cog in the top left corner during game play and click save game before closing the browser.</p>
        </section>

        <section class="flexRow discordHover block col-left-4 row-bottom-1">
            <img class="margin-right" src="@/assets/imgs/icons/discord.png" alt="discord icon">
            <section>
                <h3>Join the Moebius Dungeon Discord</h3>
                <p>Help develop the game as it grows, and become a part of the Amaran community.</p>
            </section>
        </section>
        
        <div class="newGame block col-center-4 row-top-2" @click="startNewGame()" @mouseenter="UiSounds.chit.play()">
            <img src="@/assets/imgs/icons/playerSigilIcon.png" alt="">
            <h1 class="small"><span v-if="save">Delete Save and</span> Start A New Game</h1>
        </div>

        <div class="col-right-4 row-top-2 resumeGame block flexColumn" @click="loadSavedGame()" @mouseenter="UiSounds.chit.play()" v-if="player != null">

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

            <div class="col-right-4 row-top-2 noGameData nodule block flexColumn" v-if="player === null">
                <h1>No Game Data Exists</h1>
            </div>

        <div class="col-center-4 row-bottom-1 ">
            <div class="leaderboards flexRowCenter">
                <img class="margin-right" src="@/assets/imgs/icons/travelersSigilIcon.png" alt="">
                <h1 @mouseenter="UiSounds.chit.play()" @click="toLeaderboards()">LEADERBOARDS</h1>
            </div>
            <div class="leaderboards flexRowCenter">
                <img class="margin-right" src="@/assets/imgs/icons/shopkeepSigilIcon.png" alt="">
                <h1 @click="$store.commit('gameData/mutate', {property: 'phase', with: 'CreditsOverlay'});" @mouseenter="UiSounds.chit.play()">CREDITS</h1>
            </div>
        </div>

        <div class="col-right-4 row-bottom-1 ">
        </div>

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
                this.$store.commit('monsterData/mutate', {property: 'roster', with:0}, {root:true})
                this.$store.commit('leaderboardData/resetLeaderboard', null, {root:true})
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
        },
    }
</script>

<style scoped>
.gameContainer {
    width:85vw;
    height:70vh;
    display:grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows:repeat(3, 1fr);
    grid-gap: 10px 10px;
}

.margin-right {
    margin-right:10px;
}

.col-left-4 {
    grid-column: 1/5;
}

.col-center-4 {
    grid-column:5/9;
}

.col-right-4 {
    grid-column:9/13;
}

.col-right-8 {
    grid-column:5/13;
    grid-row:3/4;
}

.row-all {
    grid-row: 1/4;
}

.row-top-2 {
    grid-row:1/3;
}

.row-bottom-1 {
    grid-row:3/4;
}

.helperButton {
    font-size: 1vw;
    position: fixed;
    right: 10px;
    top: 10px;
    margin: 0;
    padding: 5px;
    background: rgb(218, 218, 218);
    cursor:pointer;
}

.leaderboards {
    background:rgb(218,218,218);
    padding:10px;
    text-align:left;
    margin:10px 0px;
}
.leaderboards img {
    max-width:10%;
    height:auto;
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

h1 {
    font-size:1.8vw;
}

p {
    font-size:1.2vw;
};


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
    padding:10px;
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

.noGameData {
    border:#aaa dashed 1px;
    color:#aaa;
    cursor:not-allowed;
}

h1, h2 {
    margin:0;
}

.discordHover:hover {
    cursor:pointer;
    background: #8A9CFE;
    border:#8A9CFE solid 1px;
}

.warning {
    color:red;
}
</style>