<template>
<section class="columnsMiddle battleOptions"
>

    <p>
        {{storeState.monster.warning}}
    </p>

    <br>

    <h2 @mouseenter="playChit()" :class="{'striked' : combatActive || monsterAttacking }" @click="tradeBlows(storeState.player, storeState.monster)">Trade Blows</h2>
    <h2 @mouseenter="playChit()" :class="{'striked' : combatActive || monsterAttacking }" @click="beReckless(storeState.player, storeState.monster)">Be Reckless</h2>
    
    <br>

    <h3 @mouseenter="playChit()" :class="{'striked' : combatActive || monsterAttacking }" @click="turnTail()">Turn Tail</h3>

</section>
</template>

<script>
import { store } from "../store";
import { Howl } from "howler";


const chit = new Howl({
    src: [require('../assets/audio/buttonHover.wav')],
    volume:0.4,
});



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
        playChit() {
        chit.play();
        },
        randomRoll(rollMax){
            return Math.floor(Math.random() * Math.floor(rollMax) + 1);
        },
        tradeBlows(attacker, defender) {

            //clear animations so they can be repeated
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

                    // if Be Reckless Rules apply
                    if( this.specialAttack === "beReckless" ) {
                        if(attacker.type === 'monster'){

                            let monsterInSound = new Howl ({
                                src: attacker.enterSound,
                            });
                            monsterInSound.play();

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
                           this.monsterRetaliate();
                    }
                    else {
                        setTimeout(()=>{
                            this.monsterAttacking = false;
                        }, 1200);
                    }
                }




                // else some damage is dealt
                else {
                    this.addToLog(defender.type, `Took ${attackRoll} damage`);

                    // Animate defender pulsing
                    this.recoil(defender.type);

                    //Monster attacked with physical damage
                    this.storeState.attackDamage = attackRoll;

                    //set defender health to reflect damage taken
                    defender.health -= attackRoll;

                    

                }
                
                //Clear out the special Attack
                if(attacker.type === 'monster'){
                    this.specialAttack = '';
                    this.monsterAttacking = false;
                }

                if (defender.health <= 0) {
                    this.death(defender.type);
                }
                
                //monster attacks back
                if(attacker.type == 'player' && defender.health > 0) {
                    this.monsterRetaliate();
                }
            }
        },
        beReckless(){
            this.specialAttack = "beReckless"
            this.tradeBlows(this.storeState.player, this.storeState.monster);
        },
        monsterRetaliate() {
            setTimeout(() => {
                this.combatActive = false;
                this.tradeBlows(this.storeState.monster, this.storeState.player);
            },1200);
        },
        turnTail(){
            console.log("turning tail");
        },

        //clears all animation states on monster or player
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

        //handles adding readout to the log found in store.js
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

        //generates random key for the player log
        randomKey: function () {
            return Math.random();
        },

        //runs if monster or player health is >= 0
        death(whoDied){
            setTimeout(() => {
                if(whoDied === 'monster'){
                    this.monsterAnim.monsterDead = true;
                store.sceneChange('ShopPhase');
                }
                else if (whoDied === 'player') {
                    store.sceneChange('LoseScreen');
                }
            },1200);
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
        transition: all .2s;
        width:90%;
    }

    h2 {
        background: rgb(207, 207, 207);
        cursor:pointer;
        padding:20px;
        text-decoration:none;
    }
    
    h3 {
        background: rgb(207, 207, 207);
        cursor:pointer;
        padding:10px 20px;
        font-size:20px;
        text-transform:uppercase;
    }

    h2:hover {
        background: rgb(166, 207, 144);
    }
    
    h3:hover {
        background: rgb(166, 207, 144);
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
