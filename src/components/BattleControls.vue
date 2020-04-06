<template>
<transition appear
    name="custom-classes-transition"
    enter-to-class="animated zoomInUp"
    leave-to-class="amimated zoomOutUp"
>
<section class="columnsMiddle battleOptions">

    <p>
        {{monsterData.warning}}
    </p>

    <br>

    <h2 :class="{'striked' : combatActive}" @click="tradeBlows(playerData, monsterData)">Trade Blows</h2>
    <h2 :class="{'striked' : combatActive}" @click="beReckless(playerData, monsterData)">Be Reckless</h2>
    
    <br>

    <h3 :class="{'striked' : combatActive}" @click="turnTail()">Turn Tail</h3>

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
            monsterAttacking: false,
        }
    },
    props:{
        playerData: { type: Object },
        monsterData: { type: Object },
    },
    methods:{
        randomRoll(rollMax){
            return Math.floor(Math.random() * Math.floor(rollMax) + 1);
        },
        tradeBlows(attacker, defender, special) {
            if(this.combatActive || !this.monsterAttacking) {
                
                //Determines attackers attack roll
                let attackRoll = this.randomRoll(attacker.attackMax);
                console.log(`${attacker.name} attack value starts at ${attackRoll}`)
                
                // prevents player from spamming attack buttons
                if(attacker.type == 'player'){
                    this.combatActive = true;
                }

                // sets player portrait state in PlayerPortrait.vue
                EventBus.$emit(`${attacker.type}-attacking`);
                
                //To be used in additional attack types 
                if(special == 'beReckless'){
                    attackRoll += attackRoll / 2;
                }

                // runs if player attack type is physical
                if (attacker.attackType == 'physical') {
                    //recalculates damage subtracting defenders armor value from attack
                attackRoll = Math.max(0, (attackRoll - defender.armor));
                    //if monster blocked the attack
                    if(attackRoll <= 0){
                        //Listener in MonsterPortrait.vue
                        EventBus.$emit(`${defender.type}-blocked`);
                        //Listener in MonsterPortrait.vue
                        setTimeout(function(){
                            EventBus.$emit(`is-${defender.type}-dead`);
                        }, 1500);
                    }
                    //damage above 0 is dealt
                    else if (attackRoll >= 1){
                        console.log(`${defender.name} blocked ${defender.armor} so attack deals ${attackRoll} `);
                        // Animate Monster recoiling in MonsterPortrait
                        EventBus.$emit(`${defender.type}-recoil`);
                        //Monster attacked with physical damage
                        EventBus.$emit(`${defender.type}-physical-damage`, attackRoll);

                        // iterate over damage
                        for(let i = 1; i <= attackRoll; i++) {
                            setTimeout(function(){
                                //Update monsters health in Monster Portrait
                                EventBus.$emit(`${defender.type}-takes-damage`);
                                console.log(i, attackRoll);

                                if (i == attackRoll) {
                                    setTimeout(function(){
                                        EventBus.$emit(`is-${defender.type}-dead`);
                                    }, 1300);
                                }
                            }, 120 * i);
                        }
                    }
                }
            }
        },
        beReckless(){
            this.tradeBlows(this.playerData, this.monsterData,)
        },
        turnTail(){
            console.log("turning tail");
        },
    },
    mounted() {
            EventBus.$on('monster-retaliate', () => {
                this.tradeBlows(this.monsterData, this.playerData);
                this.monsterAttacking = true;
            });
            EventBus.$on('reset-combat', () => {
                this.combatActive = false;
                this.monsterAttacking = false;
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

    h1, h2, h3 {
        transition: all .6s;
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

    .striked {
        text-decoration: line-through;
        background:crimson;
        transition:all .6s;
    }
    .striked:hover {
        background:crimson;
        transition:all .6s;
        cursor:not-allowed;
    }

    .columnsMiddle {
        display:flex;
        justify-content: center;
        align-items:center;
        flex-direction: column;
        width:200px;
        min-width:200px;
        text-align:center;
        margin:0 10px;  
        height:449px;
    }
</style>
