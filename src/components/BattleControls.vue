<template>
<section class="columnsMiddle battleOptions"
>

    <p>
        {{storeState.monster.warning}}
    </p>

    <br>

    <h2 :class="{'striked' : combatActive || monsterAttacking }" @click="tradeBlows(storeState.player, storeState.monster)">Trade Blows</h2>
    <h2 :class="{'striked' : combatActive || monsterAttacking }" @click="beReckless(storeState.player, storeState.monster)">Be Reckless</h2>
    
    <br>

    <h3 :class="{'striked' : combatActive || monsterAttacking }" @click="turnTail()">Turn Tail</h3>

</section>
</template>

<script>
import { EventBus } from "../js/event-bus";
import { store } from "../store";

export default {
    name: 'BattleControls',
    data() {
        return {
            storeState: store.state,
            combatActive: false,
            monsterAttacking: false,
            specialAttack: "",
        }
    },
    methods:{
        randomRoll(rollMax){
            return Math.floor(Math.random() * Math.floor(rollMax) + 1);
        },
        tradeBlows(attacker, defender) {
            // conditional prevents attacking while characters are animating
            if(!this.combatActive && !this.monsterAttacking) {
                
                //Determines attackers attack roll
                let attackRoll = this.randomRoll(attacker.attackMax);
                console.log(`${attacker.name}'s attack is ${attackRoll}`);
                


                // prevents player from spamming attack buttons
                if(attacker.type == 'player'){
                    this.combatActive = true;
                }
                else if(attacker.type == 'monster') {
                    this.monsterAttacking = true;
                }

                // animates attackers portrait to wobble
                EventBus.$emit(`${attacker.type}-attacking`);





                // Physical ATTACKER
                // Physical ATTACKER
                // Physical ATTACKER
                // runs if player attack type is physical
                if (attacker.attackType === 'physical') {

                    //Be Reckless Rules
                    //For Monster Turn
                    if( this.specialAttack === "beReckless" && attacker.type === 'monster' ) {
                         //lowers players defense
                         attackRoll = Math.max(0, (attackRoll - Math.floor(defender.armor/2)));
                         console.log(`players defense halved from be Reckless`);
                    }
                    //For Player Turn
                    else if (this.specialAttack === 'beReckless' && attacker.type === "player") {
                        console.log(`---BE RECKLESS ${attacker.type}---`)
                        attackRoll = Math.ceil(attackRoll * 1.5);
                        console.log(`be reckless attack = ${attackRoll}`)
                        attackRoll = Math.max(0, (attackRoll - defender.armor));
                        console.log(`players attack from be reckless - monster armor = ${attackRoll}`)
                    }

                    //Trade Blows physical calculation if normal attack
                    else {
                        console.log(`---TRADE BLOWS ${attacker.type}---`)
                        //recalculates damage normally subtracting defenders armor value from attack
                        attackRoll = Math.max(0, (attackRoll - defender.armor));
                    }

                    console.log(`${defender.name} blocked ${defender.armor} - so attack deals ${attackRoll} `);
                }



                //MAGIC ATTACKER
                //MAGIC ATTACKER
                //MAGIC ATTACKER
                //runs if attacker attack type is magical
                else if (attacker.attackType === "magical") {
                    //runs during monsters turn
                    if( this.specialAttack === "beReckless" && attacker.type === 'monster' ) {
                         //lowers players defense
                         attackRoll = Math.max(0, (attackRoll - Math.floor(defender.armor/2)));
                         console.log(`players defense halved from be Reckless`);
                    }
                    //For Player Turn
                    else if (this.specialAttack === 'beReckless' && attacker.type === "player") {
                        console.log(`---BE RECKLESS ${attacker.type}---`);
                        attackRoll = Math.ceil(attackRoll * 1.5);
                        console.log(`be reckless attack = ${attackRoll}`);
                    }
                }

                //if defender blocked the attack completely
                if(attackRoll === 0){
                    //animates defender portrait blocking
                    EventBus.$emit(`${defender.type}-blocked`);
                    
                    //checks to see if the defender is dead
                    setTimeout(function(){
                        EventBus.$emit(`is-${defender.type}-dead`);
                    }, 1500);
                }


                // else some damage is dealt
                else {
                    
                    // Animate defender pulsing
                    EventBus.$emit(`${defender.type}-recoil`);

                    //Monster attacked with physical damage
                    EventBus.$emit(`${defender.type}-physical-damage`, attackRoll);

                    // iterate over damage
                    for(let i = 1; i <= attackRoll; i++) {
                        setTimeout(function(){
                            //Update monsters health in Monster Portrait
                            EventBus.$emit(`${defender.type}-takes-damage`);
                            console.log(i, attackRoll);

                            if (i === attackRoll) {
                                setTimeout(function(){
                                    EventBus.$emit(`is-${defender.type}-dead`);
                                }, 1300);
                            }
                        }, 120 * i);
                    }
                }
            }
        },
        beReckless(){
            this.specialAttack = "beReckless"
            this.tradeBlows(this.storeState.player, this.storeState.monster);

        },
        turnTail(){
            console.log("turning tail");
        },
    },
    beforeCreate() {
            EventBus.$on('monster-retaliate', () => {
                this.combatActive = false;
                this.tradeBlows(this.storeState.monster, this.storeState.player);
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
        font-size:20px;
        text-transform:uppercase;
    }

    h1, h2, h3 {
        transition: all .6s;
        width:90%;
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
        opacity:0.2;
        transition:all .6s;
    }
    .striked:hover {
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
