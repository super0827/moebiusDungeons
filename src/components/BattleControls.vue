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
import { store } from "../store";

export default {
    name: 'BattleControls',
    data() {
        return {
            storeState: store.state,
            storeChar: store.characters,
            combatActive: false,
            monsterAttacking: false,
            specialAttack: "",
            monsterAnim: store.animations.monster,
            playerAnim: store.animations.player,
        }
    },
    methods:{
        randomRoll(rollMax){
            return Math.floor(Math.random() * Math.floor(rollMax) + 1);
        },
        tradeBlows(attacker, defender) {

            this.clearAnimations(attacker.type);
            this.clearAnimations(defender.type);

            // BEGIN COMBAT
            // BEGIN COMBAT
            // BEGIN COMBAT
            // conditional prevents attacking while characters are animating
            if(!this.combatActive && !this.monsterAttacking) {

                //Determines attackers attack roll
                let attackRoll = this.randomRoll(attacker.attackMax);

                // prevents player from spamming attack buttons
                if(attacker.type == 'player'){
                    this.combatActive = true;
                }
                else if(attacker.type == 'monster') {
                    this.monsterAttacking = true;
                }


                // animates attackers portrait to wobble
                this.wobble(attacker.type);




                // Physical ATTACKER
                // Physical ATTACKER
                // Physical ATTACKER
                // runs if player attack type is physical
                if (attacker.attackType === 'physical') {
                    this.storeState.magicAttack = false;
                    //Be Reckless Rules
                    if( this.specialAttack === "beReckless" ) {
                        if(attacker.type === 'monster'){
                            //lowers players defense
                            this.storeState.monsterDealtDamage = attackRoll;
                            attackRoll = Math.max(0, (attackRoll - Math.floor(defender.armor/2)));
                            this.storeState.monsterafterArmorDealtDamage = attackRoll;
                            this.addToLog(attacker.type, `Being Reckless`);
                        } 
                        else if (attacker.type === 'player') {
                            attackRoll = Math.ceil(attackRoll * 1.5);
                            this.storeState.playerDealtDamage = attackRoll;
                            attackRoll = Math.max(0, (attackRoll - defender.armor));
                            this.storeState.playerafterArmorDealtDamage = attackRoll;
                        
                            this.addToLog(attacker.type, `BEING RECKLESS`);
                        }
                    }

                    //Trade Blows physical calculation if normal attack
                    else if (this.specialAttack === '') {
                        this.addToLog(attacker.type, `TRADING BLOWS`);

                        if(attacker.type === 'monster'){
                            this.storeState.monsterDealtDamage = attackRoll;
                            this.storeState.monsterDealtDamage = attackRoll;
                            attackRoll = Math.max(0, (attackRoll - defender.armor));
                            this.storeState.monsterafterArmorDealtDamage = attackRoll;
                        }
                        else if (attacker.type === 'player'){
                            this.storeState.playerDealtDamage = attackRoll;
                            attackRoll = Math.max(0, (attackRoll - defender.armor));
                            this.storeState.playerafterArmorDealtDamage = attackRoll;

                        }
                    }
                }



                //MAGIC ATTACKER
                //MAGIC ATTACKER
                //MAGIC ATTACKER
                //runs if attacker attack type is magical
                else if (attacker.attackType === "magical") {
                    this.storeState.magicAttack = true;
                    if (this.specialAttack === 'beReckless') {
                        this.addToLog(attacker.type, `BEING RECKLESS`);
                        if(attacker.type === 'monster'){
                            this.storeState.monsterDealtDamage = attackRoll;
                            this.storeState.monsterafterArmorDealtDamage = attackRoll;
                            }
                        else if (attacker.type === 'player'){
                            attackRoll = Math.ceil(attackRoll * 1.5);
                            this.storeState.playerDealtDamage = attackRoll;
                            this.storeState.playerafterArmorDealtDamage = attackRoll;
                        }
                    }
                    else {
                        this.addToLog(attacker.type, `TRADING BLOWS`);
                        if(attacker.type === 'monster'){
                            this.storeState.monsterDealtDamage = attackRoll;
                            this.storeState.monsterafterArmorDealtDamage = attackRoll;
                            }
                        else if (attacker.type === 'player'){
                            this.storeState.playerDealtDamage = attackRoll;
                            this.storeState.playerafterArmorDealtDamage = attackRoll;
                        }
                    }
                }




                // BATTLE OUTCOME
                // BATTLE OUTCOME
                // BATTLE OUTCOME

                //if defender blocked the attack completely
                if(attackRoll <= 0){
                    this.addToLog(defender.type, `${defender.type} blocked`)
                    this.blocking(defender.type);
                    
                    if(defender.type === 'monster'){
                        this.combatActive = false;
                        setTimeout(()=>{
                           this.monsterRetaliate();
                        }, 1000);
                    }else {
                        setTimeout(()=>{
                            this.resetCombat();
                        }, 1000);
                    }
                }


                // else some damage is dealt
                else {
                    this.addToLog(defender.type, `Took ${attackRoll} damage`);

                    // Animate defender pulsing
                    this.recoil(defender.type);

                    //Monster attacked with physical damage
                    this.storeState.attackDamage = attackRoll;

                    // iterate over damage
                    for(let i = 1; i <= attackRoll; i++) {
                        this.dealDamage(i,attackRoll,defender);
                    }

                }

                if(attacker.type === 'monster'){
                    this.specialAttack = '';
                }
            }
        },
        dealDamage(iterator, attackRoll,defender) {
            
            setTimeout(() => {
                //Update defenders health
                defender.health--;
            }, 120 * iterator);
            
            setTimeout(() => {
                if(defender.health <= 0){
                    setTimeout(() => {
                        this.death(defender.type);
                    }, 1000);
                }
                else if (defender.health > 0 && defender.type === 'monster') {
                    this.combatActive = false;
                    setTimeout(() => {
                        this.monsterRetaliate();
                    }, 1000);
                } else {
                    this.monsterAttacking = false;
                }

            }, 1000);
        },
        beReckless(){
            this.specialAttack = "beReckless"
            this.tradeBlows(this.storeState.player, this.storeState.monster);
        },
        monsterRetaliate() {
            setTimeout(() => {
                this.tradeBlows(this.storeState.monster, this.storeState.player);
            },400);
        },
        turnTail(){
            console.log("turning tail");
        },
        resetCombat(){
            this.monsterAttacking = false;
        },
        clearAnimations(whoToClear){
            if(whoToClear === 'monster'){
                for(let value in this.monsterAnim){
                        this.monsterAnim[value] = false;
                }
            }
            else if (whoToClear === 'player') {
                for(let value in this.playerAnim){
                        this.playerAnim[value] = false;
                }
            }
        },
        addToLog(whichLog, comm){
            let log = "";
            if(whichLog === 'monster'){
                log = store.state.monsterLog;
            }
            else {
                log = store.state.playerLog;
            }
            log.push({id: this.randomKey(), message: comm});
        },
        randomKey: function () {
            return Math.random();
        },
        death(whoDied){
            if(whoDied === 'monster'){
                this.monsterAnim.monsterDead = true;
                store.sceneChange('ShopPhase');
            }
            else if (whoDied === 'player') {
                store.sceneChange('LoseScreen');
            }
        },


        // ANIMATIONS
        recoil (receiver) {
            if (receiver === 'monster') {
                this.monsterAnim.hurt = true;
                this.monsterAnim.portEffect = true;
                this.monsterAnim.portEffectRed = true;
            } else if (receiver === 'player') {
                this.playerAnim.hurt = true;
                this.playerAnim.portEffect = true;
                this.playerAnim.portEffectRed = true;
            }
        },
        wobble (receiver) {
            if (receiver === 'monster') {
                this.monsterAnim.attacking = true;
            } else if (receiver === 'player') {
                this.playerAnim.attacking = true;
            }
        },
        blocking (receiver) {
            if (receiver === 'monster') {
                this.monsterAnim.blocking = true;
                this.monsterAnim.portEffect = true;
                this.monsterAnim.portEffectPurple = true;
            } else if (receiver === 'player') {
                this.playerAnim.blocking = true;
                this.playerAnim.portEffect = true;
                this.playerAnim.portEffectPurple = true;
            }
        }
    },
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
