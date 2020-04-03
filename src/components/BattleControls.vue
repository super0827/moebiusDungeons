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
    data() {
        return {
            combatActive: false,
        }
    },
    props:{
        playerData: { type: Object },
        monsterData: { type: Object },
    },
    methods:{
        randomRoll(rollMax){
            let roll = Math.floor(Math.random() * Math.floor(rollMax) + 1);
            return roll;
        },
        tradeBlows(attacker, defender, special) {
            if(!this.combatActive) {
                // prevents player from spamming attack buttons
                this.combatActive = true;
                
                //Determines players attack roll
                let attackRoll = this.randomRoll(attacker.attackMax);
                console.log(`player attack value starts at ${attackRoll}`)

                // sets player portrait state in PlayerPortrait.vue
                EventBus.$emit("player-attacking");
                
                //To be used in additional attack types 
                if(special){
                    console.log('specialAttack!');
                }

                // runs if player attack type is physical
                if (attacker.attackType == 'physical') {
                    //recalculates damage subtracting monsters armor value from attack
                    attackRoll = Math.max(0, (attackRoll - defender.armor));
                    console.log(`monster blocked ${defender.armor} attack deals ${attackRoll} `);

                    //if monster blocked the attack
                    if(attackRoll <= 0){
                        //Listener in MonsterPortrait.vue
                        EventBus.$emit("monster-blocked");
                        //Listener in MonsterPortrait.vue
                        setTimeout(function(){
                            EventBus.$emit('is-monster-dead');
                        }, 1500);
                    }
                }

                //CHANGE THIS IF ELSE STRUCTURE
                //CHANGE THIS IF ELSE STRUCTURE
                //CHANGE THIS IF ELSE STRUCTURE
                //CHANGE THIS IF ELSE STRUCTURE
                    
                //if damage is dealt to the monster
                else {
                    // Animate Monster recoiling in MonsterPortrait
                    EventBus.$emit('monster-recoil');
                    //Monster attacked with physical damage
                    EventBus.$emit('monster-physical-damage', attackRoll);

                    // iterate over damage
                    for(let i = attackRoll; i >= 0; i--) {
                        setTimeout(function(){
                            //Update monsters health in Monster Portrait
                            EventBus.$emit('monster-takes-damage');
                            console.log(i)

                            if (i === 1) {
                                setTimeout(function(){
                                    EventBus.$emit('is-monster-dead');
                                }, 1500);
                            }
                        }, 120 * i);
                    }
                }
            }
        },
        beReckless(){
            console.log("being reckless");
        },


        turnTail(){
            console.log("turning tail");
        },

        // monster attack method back if not dead!
        monsterRetaliate(attacker, defender){
                // Determines attackers attack roll
               let attackRoll = this.randomRoll(attacker.attackMax);
                console.log(`monster attack value starts at ${attackRoll}`);
                    
                // Sets monster portrait state in MonsterPortait.vue
                EventBus.$emit("monster-attacking");

                //runs if monsters attack type is physical
                if(attacker.attackType == 'physical') {
                    //recalculates damage subtracting the players armor value
                    attackRoll = Math.max(0, (attackRoll - defender.armor));
                    console.log(`player blocks ${defender.armor}, attack deals ${attackRoll}`);
                    
                    //if player blocked the attack entirely
                    //meaning monsters attackRoll minus players armor is less than or equal to 0
                    if(attackRoll <= 0){
                        //Listener in PlayerPortrait.vue
                        EventBus.$emit("player-blocked");
                        //Player can attack again.
                        this.combatActive = false;
                    }
                }


                //CHANGE THIS IF ELSE STRUCTURE
                //CHANGE THIS IF ELSE STRUCTURE
                //CHANGE THIS IF ELSE STRUCTURE
                //CHANGE THIS IF ELSE STRUCTURE

                // monster attack roll hits
                else {
                    // Animate player recoiling in PlayerPortrait
                    EventBus.$emit('player-recoil');
                    
                    //player is attacked with physical damage
                    EventBus.$emit('player-physical-damage', attackRoll);

                    // iterate over damage
                    for(let i = attackRoll; i > 0; i--) {
                        setTimeout(function(){
                                    
                                    //Update monsters health in Monster Portrait
                                    EventBus.$emit('player-takes-damage');

                                    console.log(`monster deals damage`);

                                    if (i === 1) {
                                        setTimeout(function(){
                                            EventBus.$emit('is-player-dead');
                                        }, 1500);
                                    }

                                }, 120 * i);
                            }
                        }
        }
        
    },
    mounted() {
            EventBus.$on('monster-retaliate', () => {
                this.monsterRetaliate(this.monsterData, this.playerData);
            });
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
        background: rgb(207, 207, 207);
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
