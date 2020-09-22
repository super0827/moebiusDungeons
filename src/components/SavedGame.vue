<template>
    <div>
        <div class="flexRow">
            <div v-if="save" class="resumeGame nodule block">
                <h3>Saved Game</h3>
                <hr>
                <p>Player Image</p>
                <p>Current Phase</p>
                <p>HP</p>
                <p>ARM</p>
                <p>ATK</p>
                <p>COINS</p>
                <p>METTLE</p>
                <p>INV</p>
                <p>EXP</p>
            </div>

            <div @click="startNewGame()" class="newGame nodule block">
                <h3>Start A New Game</h3>
                <img src="../assets/imgs/icons/raceTypeHumanIcon.png" alt="">
            </div>
        </div>

        <h3 class="block">Buy the RPG poetry book that inspired this game.</h3>
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
        }),
        }
    }
</script>

<style scoped>
h3 {
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
</style>