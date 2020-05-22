/*
tradeBlows(attacker, defender) {
        //clear animations so they can be repeated
        this.clearAnimations(attacker.type);
        this.clearAnimations(defender.type);

        // BEGIN COMBAT
        // BEGIN COMBAT
        // BEGIN COMBAT
        // conditional prevents attacking while characters are animating
        if(!this.combatActive && !this.monsterAttacking) {

            //Determines inital attackers attack roll
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
                //sets strike out of armor readout value to off
                this.storeState.magicAttack = false;


                //PHYSICAL BE RECKLESS
                //PHYSICAL BE RECKLESS
                //PHYSICAL BE RECKLESS
                if( this.specialAttack === "beReckless" ) {
                    
                    //adds "Being Reckless" to monster Sidebar
                    this.addToLog(attacker.type, `Being Reckless`);
                    
                    //if attacker is monster
                    if(attacker.type === 'monster'){

                        //displays rolled damage in PlayerPortrait.vue
                        this.storeState.monsterDealtDamage = attackRoll;

                        //sets attack value to reflect halved players armor
                        attackRoll = Math.max(0, (attackRoll - Math.floor(defender.armor/2)));
                        
                        //displays armor adjusted damage in PlayerPortrait.vue
                        this.storeState.monsterafterArmorDealtDamage = attackRoll;

                    }
                    //if attacker is player
                    else if (attacker.type === 'player') {
                        //multiplies attack roll by 1.5
                        attackRoll = Math.ceil(attackRoll * 1.5);

                        //displays rolled damage in MonsterPortrait.vue
                        this.storeState.playerDealtDamage = attackRoll;

                        //sets attack value to reflect reduction from monsters armor
                        attackRoll = Math.max(0, (attackRoll - defender.armor));

                        //displays armor adjusted damage in MonsterPortrait.vue
                        this.storeState.playerafterArmorDealtDamage = attackRoll;
                    }
                }




               //PHYSICAL TRADE BLOWS
               //PHYSICAL TRADE BLOWS
               //PHYSICAL TRADE BLOWS
                else if (this.specialAttack === '') {
                    this.addToLog(attacker.type, `TRADING BLOWS`);

                    if(attacker.type === 'monster'){
                        let hitNum = this.randomRoll(3);
                        this.$sound.play(`monsterMelee${hitNum}`);
                        this.storeState.monsterDealtDamage = attackRoll;
                        this.storeState.monsterDealtDamage = attackRoll;
                        attackRoll = Math.max(0, (attackRoll - defender.armor));
                        this.storeState.monsterafterArmorDealtDamage = attackRoll;
                    }
                    else if (attacker.type === 'player'){
                        let hitNum = this.randomRoll(3);
                        this.$sound.play(`playerMelee${hitNum}`);
                        this.storeState.playerDealtDamage = attackRoll;
                        attackRoll = Math.max(0, (attackRoll - defender.armor));
                        this.storeState.playerafterArmorDealtDamage = attackRoll;
                    }
                }
            }
            //END PHYSICAL ATTACK LOGIC



            //MAGIC ATTACKER
            //MAGIC ATTACKER
            //MAGIC ATTACKER
            //runs if attacker attack type is magical
            else if (attacker.attackType === "magical") {
                this.storeState.magicAttack = true;

                //MAGIC BEING RECKLESS
                //MAGIC BEING RECKLESS
                //MAGIC BEING RECKLESS
                if (this.specialAttack === 'beReckless') {
                    //adds "BEING RECKLESS" to the HUD log
                    this.addToLog(attacker.type, `BEING RECKLESS`);
                    
                    //on monsters turn
                    if(attacker.type === 'monster'){
                        //displays rolled damage in PlayerPortrait.vue
                        this.storeState.monsterDealtDamage = attackRoll;

                        //displays actual damage in PlayerPortrait.vue
                        this.storeState.monsterafterArmorDealtDamage = attackRoll;
                    }


                    //on players turn
                    else if (attacker.type === 'player'){
                        //sets attack value to reflect reduction from monsters armor
                        attackRoll = Math.ceil(attackRoll * 1.5);

                        //displays rolled damage in MonsterPortrait.vue
                        this.storeState.playerDealtDamage = attackRoll;

                        //displays armor adjusted damage in MonsterPortrait.vue
                        this.storeState.playerafterArmorDealtDamage = attackRoll;
                    }
                }



                //MAGIC TRADING BLOWS
                //MAGIC TRADING BLOWS
                //MAGIC TRADING BLOWS
                else {
                    //add 'TRADING BLOWS" to HUD log
                    this.addToLog(attacker.type, `TRADING BLOWS`);

                    //on monsters turn
                    if(attacker.type === 'monster'){
                        //play monster attack sound
                        let hitNum = this.randomRoll(3);
                        this.$sound.play(`monsterMagic${hitNum}`);
                        
                        //displays rolled damage in PlayerPortrait.vue
                        this.storeState.monsterDealtDamage = attackRoll;

                        //(same value as above for amgic attacks) displays calculated after armor damage in PlayerPortrait.vue
                        this.storeState.monsterafterArmorDealtDamage = attackRoll;
                    }

                    //on players turn
                    else if (attacker.type === 'player'){
                        //play monster attack sound
                        let hitNum = this.randomRoll(3);
                        this.$sound.play(`playerMagic${hitNum}`);

                        //displays rolled damage in MonsterPortrait.vue
                        this.storeState.playerDealtDamage = attackRoll;

                         //(same value as above for amgic attacks) displays calculated after armor damage in PlayerPortrait.vue
                        this.storeState.playerafterArmorDealtDamage = attackRoll;
                    }
                }
            }
            //END MAGIC ATTACK LOGIC







            // BATTLE OUTCOMES
            // BATTLE OUTCOMES
            // BATTLE OUTCOMES

            //DAMAGE ENTIRELY BLOCKED
            //if defender blocked the attack completely | attackRoll value is less than or equal to 0
            if(attackRoll <= 0){
                // add defender blocked to the HUD log
                this.addToLog(defender.type, `${defender.type} blocked`)

                //animate defender blocking attack entirely
                this.blocking(defender.type);
                
                //during monster attack phase
                if(defender.type === 'monster'){
                    //end player combat state
                    this.combatActive = false;

                    //run trade blows as monster
                    this.monsterRetaliate();
                }

                //during monster attack phase
                else if (defender.type === 'player') {
                    this.monsterAttacking = false;
                }
            }

            // DEFENDER TAKES SOME DAMAGE
            else {
                //add "Took X Damage" to HUD log
                this.addToLog(defender.type, `Took ${attackRoll} damage`);

                // Animate defender pulsing
                this.recoil(defender.type);

                //subtracts attackRoll from defender health to reflect damage taken
                defender.health -= attackRoll;  
            }

            //Clear out the special Attack
            if(attacker.type === 'monster'){
                this.specialAttack = '';
                this.monsterAttacking = false;
            }

            // if defender is at 0 or less hp run death function
            if (defender.health <= 0) {
                setTimeout(()=>{
                    this.death(defender.type);
                }, 1000);
            }
            
            //monster attacks back if not dead
            if(attacker.type == 'player' && defender.health > 0) {
                this.monsterRetaliate();
            }
        }
    },
    randomRoll(rollMax){
        return Math.floor(Math.random() * Math.floor(rollMax) + 1);
    },
    // 
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
            if(this.turnTailAvailable) {
                this.addToLog('player', `Turning Tail`);
                this.addToLog('monster', `Turning Tail`);
                this.$sound.play('escape');
                let playerRoll = this.randomRoll(6) + this.storeState.player.health;
                let monsterRoll = this.randomRoll(6) + this.storeState.monster.health;
                setTimeout(()=>{
                    this.addToLog('player', `You Rolled ${playerRoll}`);
                    this.addToLog('monster', `Monster Rolled ${monsterRoll}`);
                    setTimeout(()=>{
                        if (playerRoll > monsterRoll){
                            this.addToLog('player', `You Escaped!`);
                            setTimeout(()=>{
                                store.sceneChange('ShopPhase');
                            }, 1500);
                        }
                        else if (monsterRoll >= playerRoll) {
                            this.addToLog('player', `You Couldn't Escape!`);
                            this.addToLog('monster', `The Monster Caught You!`);
                            this.monsterRetaliate();
                            this.turnTailAvailable = false;
                        }
                    },1500);
                },1500);
            }
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
            if(whoDied === 'monster'){
                this.monsterAnim.monsterDead = true;
                let soundNum = this.randomRoll(4);
                this.$sound.play(`monsterDead${soundNum}`);
                this.storeState.player.coins += this.storeState.monster.coins;
                this.storeState.monster.coins = 0;
                setTimeout(()=>{
                    store.sceneChange('ShopPhase');
                    this.clearAnimations("monster");
                    this.clearAnimations('player');
                },1200);
            }
            else if (whoDied === 'player') {
                this.playerAnim.playerDead = true;
                this.$sound.play(`playerDead`);
                this.storeState.player.coins += this.storeState.monster.coins;
                this.storeState.monster.coins = 0;
                setTimeout(()=>{
                    store.sceneChange('LoseScreen');
                    this.clearAnimations("monster");
                    this.clearAnimations('player');
                },1200);
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
    created() {
        this.$sound.play(this.storeState.monster.enterSound);
    },
    mounted() {
        this.storeState.monster.special();
    }
}

    */