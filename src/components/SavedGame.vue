<template>
    <div>
        <div class="flexColumn">
        <h1>Welcome To The</h1>
        <h1>Moebius Dungeons</h1>
        </div>

<br>
        
        <div class="flexRow">
            <div @click="startNewGame()" class="newGame nodule block">
                <h3>Start A New Game</h3>
                <img src="../assets/imgs/icons/raceTypeHumanIcon.png" alt="">
            </div>

            <div v-if="save" class="resumeGame nodule block flexColumn">
                <h1>Saved Game</h1>

                <img class="portraitSize" :src="player.info.portrait" alt="">
                
                <h3>{{savedPhase}}</h3>

                <div class="flexRow whiteText">
                    <div class="overlayStats">
                    <img class="iconSize overlayGridPos" src="../assets/imgs/icons/healthIcon.png">
                    <h3 class="overlayGridPos">{{ player.info.baseHealth + player.tempHealth}}</h3>
                    </div>
                    
                    <div class="overlayStats">
                    <img class="iconSize overlayGridPos" :src="player.info.attackTypeImage">
                    <h3 class="overlayGridPos">{{ player.info.baseAttackMax + player.tempAttackMax}}</h3>
                    </div>
                
                    <div class="overlayStats">
                    <img class="iconSize overlayGridPos" src="../assets/imgs/icons/armorIcon.png">
                    <h3 class="overlayGridPos">{{ player.info.baseArmor + player.tempArmor}}</h3>
                    </div>
                </div>

                <div class="flexRow blackText">   
                    <div class="overlayStats">
                        <img class="iconSize overlayGridPos" src="../assets/imgs/icons/coinIcon.png">
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
            Hey there kingloyal. Sean Yager here, creator of Moebius Dungeons. This game is created in my free time, and I'm the only web developer on the team. If you'd like to help support the development of the game consider <a href="paypal.me/MisuseofMana">donating to my Paypal account</a> or consider buying the RPG poetry book that inspired this game.
        </p>
        <br>
        <div class="flexColumn">
        <a class="gumroad-button" href="https://gum.co/CsdPh" target="_blank">Get The RPG Book That Inspired This Game</a>
        <br>
        <p>Always Remember. A Loyal Squire Will Never Tire</p>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

    export default {
        name:"SavedGame",
        methods: {
            startNewGame() {
                this.$store.commit('gameData/mutate', {property: 'phase', with:'CharacterSelect'}, {root:true})
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
h3, h1 {
    text-align:center;
}

.resumeGame h1 {
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
    color:black;
    text-shadow:white 0px 0px 2px;
    font-size:20px;
}

.whiteText h3 {
    color:white;
    text-shadow:gold 1px 1px 2px;
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