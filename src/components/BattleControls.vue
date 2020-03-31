<template>
<transition appear
    name="custom-classes-transition"
    enter-to-class="animated zoomInUp"
    leave-to-class="amimated zoomOutUp"
>
<section class="columns battleOptions">

    <h2 @click="tradeBlows(playerData, monsterData)">Trade Blows</h2>
    <h2 @click="beReckless(playerData, monsterData)">Be Reckless</h2>
    
    <br>

    <h3 @click="turnTail()">Turn Tail</h3>

</section>
</transition>
</template>

<script>
import { EventBus } from "../js/event-bus";

export default {
    name: 'BattleControls',
    props:{
        playerData: { type: Object },
        monsterData: { type: Object },
    },
    methods:{
        mounted() {

        },
        randomRoll(rollMax){
            let roll = Math.floor(Math.random() * Math.floor(rollMax) + 1);
            return roll;
        },
        tradeBlows(attacker, defender) {
            //Determines attackers attack roll
            let attackRoll = this.randomRoll(attacker.attackMax);
            
            //if attacker is player
            if(attacker.name == this.playerData.name) {
                // Attack route if attacker type is physical
                if (attacker.attackType == 'physical') {
                    attackRoll = Math.max(0, attackRoll - defender.armor);

                    //if monster blocked the attack
                    if(attackRoll <= 0){
                        //Listener in MonsterPortrait.vue
                        EventBus.$emit("monster-blocked");
                    }
                    //if damage is dealt to the monster
                    else{
                        // Animate Monster recoiling in MonsterPortrait
                        EventBus.$emit('monster-recoil');

                        // iterate over damage
                        for(let i = attackRoll; i > 0; i--) {
                            setTimeout(function(){
                                //Update monsters health in Monster Portrait
                                EventBus.$emit('monster-takes-damage');
                                
                                if (i === attackRoll) {
                                    console.log('checking monster death');
                                    EventBus.$emit('is-monster-dead');
                                }
                            }, 120 * i);
                        }
                    }
                }
                else {
                    console.log(`magic attack roll is ${attackRoll}`)
                }
            }
        },
        beReckless(){
            console.log("being reckless");
        },
        turnTail(){
            console.log("turning tail");
        }
    }
}
</script>

<style scoped>
    .battleOptions {
        margin:0 20px;
        width:200px;
        min-width:200px;
    }

    p {
        font-size:10px;
    }

    h2 {
        background: rgb(151, 151, 151);
        cursor:pointer;
    }
    
    h3 {
        background: rgb(207, 207, 207);
        cursor:pointer;
    }

    h2:hover {
        background: rgb(166, 207, 144);
    }
    
    h3:hover {
        background: rgb(166, 207, 144);
    }

    h1 {
        font-size:15px;
        margin:2px;
    }

    h2 {
        padding:10px;
        font-size: 17px;
        text-decoration: none;
    }

    h3 {
        padding:10px;
        font-size:17px;
        text-transform: uppercase;
        text-decoration: none;
    }
</style>
