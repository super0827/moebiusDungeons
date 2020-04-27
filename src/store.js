import shuffle from 'lodash.shuffle';

export const store = {
    state: {
        player: {type: Object},
        playerTraits: [],
        playerTraitsTemp: [],
        monster: {type: Object},
        shopkeep: {type: Object},
        gameStats: {type: Object},
        shopInventory: [],
        monsterRoster: 0,
        phase: "StartScreen",
        finalBoss: false,
        isEntering: true,
        playerDealtDamage: 0,
        playerafterArmorDealtDamage: 0,
        monsterDealtDamage: 0,
        monsterafterArmorDealtDamage: 0,
        playerLog: [],
        monsterLog: [],
        magicAttack: false,
        duration: 1000,
    },
    animations: {
        monster:{
          blocking: false,
          hurt: false,
          attacking:false,
          portEffect: false,
          portEffectRed: false,
          portEffectPurple: false,
          portEffectGreen: false,
          monsterDead: false,
        },
        player: {
          blocking: false,
          hurt: false,
          attacking:false,
          portEffect: false,
          portEffectRed: false,
          portEffectPurple: false,
          portEffectGreen: false,
          dead: false,
        },
    },
    characters: { 
        monsterCharacters: [
            // Level 1 NORMAL  
          {
           name: "emptyObject",
          },
          {
            name:"bats",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/bats.png"), 
            coins:0, health:4, armor:0, attackMax:4, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning:"Bright red eyes, fangs meant to slice. To stay away is my advice.",
            enterSound: 'batsEnter',
            attacks: ['attakname', 'attackname'],
          },
          {
            name:"imps",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/imps.png"), 
            coins:1, health:5, armor:1, attackMax:1, attackType: "magical",
            attackTypeImage: require("./assets/imgs/icons/magicalIcon.png"),
            warning: "You feel magic, hear a hissing - your meat and peas and toast are missing!",
            enterSound: 'impsEnter',
            attacks: ['attakname', 'attackname'],
          },
          {
            name:"slime",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/slime.png"), 
            coins:1, health:6, armor:2, attackMax:4, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "One wrong step to right or left is sure to spell your slimy death.",
            enterSound: 'slimeEnter',
            attacks: ['attakname', 'attackname'],
          },
          {
            name:"kobold",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/kobold.png"), 
            coins:1, health:7, armor:1, attackMax:4, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "greenish armor, sharp teeth too - slay it quick 'fore it slays you!",
            enterSound: 'koboldEnter',
            attacks: ['attakname', 'attackname'],
          },
          {
            name:"gnoll",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/gnoll.png"), 
            coins:1, health:9, armor:1, attackMax:5, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "a warning growl behind sharp teeth, quickly now your sword unsheath.",
            enterSound: 'gnollEnter',
            attacks: ['attakname', 'attackname'],
          },
          {
            name:"goblins",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/goblins.png"), 
            coins:1, health:8, armor:1, attackMax:4, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "Strong enough to maim and kill, gross enough your lunch might spill.",
            enterSound: 'goblinEnter',
            attacks: ['attakname', 'attackname'],
          },
          
          // Level 2 NORMAL
          {
            name:"ghost",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/ghost.png"), 
            coins:2, health:10, armor:2, attackMax:8, attackType: "magical",
            attackTypeImage: require("./assets/imgs/icons/magicalIcon.png"),
            warning: "You lay awake at midnight hour, sounds unearthly shape your cower.",
            enterSound: 'ghostEnter',
            attacks: ['attakname', 'attackname'],
          },
          {
            name:"lizardman",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/lizardman.png"), 
            coins:2, health:12, armor:2, attackMax:8, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "Lizard senses seek out prey, poison venom helps them slay.",
            enterSound: 'lizardmanEnter',
            attacks: ['attakname', 'attackname'],
          },
          {
            name:"curse",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/curse.png"), 
            coins:1, health:16, armor:4, attackMax:10, attackType: "magical",
            attackTypeImage: require("./assets/imgs/icons/magicalIcon.png"),
            warning: "A faint feeling of unluck first, your body hurts, you feel your worst.",
            enterSound: 'curseEnter',
            attacks: ['attakname', 'attackname'],
          },
          {
            name:"bandits",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/bandits.png"), 
            coins:2, health:15, armor:2, attackMax:8, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "Shadows hide two men from sight. Their motives born of moral spite.",
            enterSound: 'banditsEnter',
            attacks: ['attakname', 'attackname'],
          },
          
          // Level 1 VIRULENTS
          {
            dire:true,
            name:"Virulent bats",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/bats.png"), 
            coins:1, health:18, armor:1, attackMax:5, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning:"Bright red eyes, fangs meant to slice. To stay away is my advice.",
            enterSound: 'batsEnter',
            attacks: ['attakname', 'attackname'],
          },
          {
            dire: true,
            name:"Virulent imps",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/imps.png"), 
            coins:2, health:12, armor:1, attackMax:2, attackType: "magical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "You feel magic, hear a hissing - your meat and peas and toast are missing!",
            enterSound: 'impEnter',
            attacks: ['attakname', 'attackname'],
          },
          {
            dire: true,
            name:"Virulent slime",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/slime.png"), 
            coins:2, health:10, armor:2, attackMax:6, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "One wrong step to right or left is sure to spell your slimy death.",
            enterSound: 'slimeEnter',
            attacks: ['attakname', 'attackname'],
          },
          {
            dire: true,
            name:"Virulent kobold",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/kobold.png"), 
            coins:2, health:11, armor:1, attackMax:6, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "greenish armor, sharp teeth too - slay it quick 'fore it slays you!",
            enterSound: 'koboldEnter',
            attacks: ['attakname', 'attackname'],
          },
          {
            dire: true,
            name:"Virulent gnoll",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/gnoll.png"), 
            coins:2, health:14, armor:2, attackMax:5, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "a warning growl behind sharp teeth, quickly now your sword unsheath.",
            enterSound: 'gnollEnter',
            attacks: ['attakname', 'attackname'],
          },
          {
            dire: true,
            name:"Virulent goblins",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/goblins.png"), 
            coins:3, health:17, armor:2, attackMax:6, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "Strong enough to maim and kill, gross enough your lunch might spill.",
            enterSound: 'goblinEnter',
            attacks: ['attakname', 'attackname'],
          },
          
          //MIMIC!
          {
            name:"mimic",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/mimic.png"), 
            coins:4, health:18, armor:3, attackMax:10, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "You reach out to your surprise, You're met by big bright yellow eyes.",
            enterSound: 'mimicEnter',
            attacks: ['attakname', 'attackname'],
          },
          
          // LEVEL 2 VIRULENTS
          {
            dire:true,
            name:"virulent ghost",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/ghost.png"), 
            coins:3, health:16, armor:2, attackMax:9, attackType: "magical",
            attackTypeImage: require("./assets/imgs/icons/magicalIcon.png"),
            warning: "You lay awake at midnight hour, sounds unearthly shape your cower.",
            enterSound: 'ghostEnter',
            attacks: ['attakname', 'attackname'],
          },
          {
            dire:true,
            name:"virulent lizardman",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/lizardman.png"), 
            coins:3, health:18, armor:2, attackMax:9, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "Lizard senses seek out prey, poison venom helps them slay.",
            enterSound: 'lizardmanEnter',
            attacks: ['attakname', 'attackname'],
          },
          {
            dire:true,
            name:"virulent curse",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/curse.png"), 
            coins:1, health:16, armor:4, attackMax:12, attackType: "magical",
            attackTypeImage: require("./assets/imgs/icons/magicalIcon.png"),
            warning: "A faint feeling of unluck first, your body hurts, you feel your worst.",
            enterSound: 'curseEnter',
            attacks: ['attakname', 'attackname'],
          },
          {
            dire:true,
            name:"virulent bandits",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/bandits.png"), 
            coins:4, health:15, armor:2, attackMax:8, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "Shadows hide two men from sight. Their motives born of moral spite.",
            enterSound: 'banditsEnter',
            attacks: ['attakname', 'attackname'],
          },
          
          //MIMIC
          {
            name:"mimic",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/mimic.png"), 
            coins:5, health:18, armor:3, attackMax:10, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "You reach out to your surprise, You're met by big bright yellow eyes.",
            enterSound: 'mimicEnter',
            attacks: ['attakname', 'attackname'],
          },
          
          // LEVEL 3 NORMAL
          {
            name:"ghoul",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/ghoul.png"), 
            coins:3, health:15, armor:2, attackMax:10, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "You walk between the crumbling tombs, behind you somethimg sickly looms!",
            enterSound: 'ghoulEnter',
            attacks: ['attakname', 'attackname'],
          },
          {
            name:"skeleton",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/skeleton.png"), 
            coins:3, health:16, armor:2, attackMax:10, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning:"strong dark magic guides their hand, to stab and fight and kill and stand.",
            enterSound: 'skeletonEnter',
            attacks: ['attakname', 'attackname'],
          },
          {
            name:"swampling",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/swampling.png"), 
            coins:3, health:16, armor:2, attackMax:10, attackType: "magical",
            attackTypeImage: require("./assets/imgs/icons/magicalIcon.png"),
            warning: "into mud as thick as tar, your skin wil boil, bubble, and scar",
            enterSound: 'swamplingEnter',
            attacks: ['attakname', 'attackname'],
          },
          
          //Level 3 VIRULENTS
          {
            dire:true,
            name:"virulent ghoul",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/ghoul.png"), 
            coins:4, health:20, armor:3, attackMax:10, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "You walk between the crumbling tombs, behind you somethimg sickly looms!",
            enterSound: 'ghoulEnter',
            attacks: ['attakname', 'attackname'],
          },
          {
            dire:true,
            name:"virulent skeleton",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/skeleton.png"), 
            coins:4, health:21, armor:3, attackMax:11, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning:"strong dark magic guides their hand, to stab and fight and kill and stand.",
            enterSound: 'skeletonEnter',
            attacks: ['attakname', 'attackname'],
          },
          {
            dire:true,
            name:"virulent swampling",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/swampling.png"), 
            coins:5, health:23, armor:2, attackMax:10, attackType: "magical",
            attackTypeImage: require("./assets/imgs/icons/magicalIcon.png"),
            warning: "into mud as thick as tar, your skin wil boil, bubble, and scar",
            enterSound: 'swamplingEnter',
            attacks: ['attakname', 'attackname'],
          },
          
          // Level 4 NORMALS
          
          {
            name:"harpy",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/harpy.png"), 
            coins:4, health:15, armor:3, attackMax:10, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "Halfway bird and halfway horrid, You'll be telling tales quite sordid.",
            enterSound: 'harpyEnter',
            attacks: ['attakname', 'attackname'],
          },
          {
            name:"mushroom",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/mushroom.png"), 
            coins:4, health:18, armor:2, attackMax:10, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning:"It stands still by a rotting log, spores cloud up a toxic fog.",
            enterSound: 'mushroomEnter',
            attacks: ['attakname', 'attackname'],
          },
          {
            name:"dryad",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/dryad.png"), 
            coins:4, health:20, armor:4, attackMax:10, attackType: "magical",
            attackTypeImage: require("./assets/imgs/icons/magicalIcon.png"),
            warning: "she lives beneath a special tree, deaf to any mortal plea.",
            enterSound: 'dryadEnter',
            attacks: ['attakname', 'attackname'],
          },
          {
            name:"golem",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/golem.png"), 
            coins:4, health:22, armor:4, attackMax:10, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "a guardian immune to death, you cannot kill what has no breath.",
            enterSound: 'golemEnter',
            attacks: ['attakname', 'attackname'],
          },
          
          // Level 5
          
          {
            name:"demon",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/demon.png"), 
            coins:5, health:25, armor:4, attackMax:10, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "Human-like but one thing proves, instead of feet they have black hooves.",
            enterSound: 'demonEnter',
            attacks: ['attakname', 'attackname'],
          },
          {
            name:"banshee",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/banshee.png"), 
            coins:5, health:30, armor:5, attackMax:12, attackType: "magical",
            attackTypeImage: require("./assets/imgs/icons/magicalIcon.png"),
            warning: "she moans in anguish, ghostly, gritty. Her eyes shine bright to see your pity.",
            enterSound: 'bansheeEnter',
            attacks: ['attakname', 'attackname'],
          },
          
          // BOSSES
          
          {
            name:"lich",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/lich.png"), 
            coins:10, health:36, armor:8, attackMax:12, attackType: "magical",
            attackTypeImage: require("./assets/imgs/icons/magicalIcon.png"),
            warning: "Whirling nacre tp body bound, a yearning mind in learn-lust drown.",
            enterSound: 'lichEnter',
            attacks: ['attakname', 'attackname'],
          },
          {
            name:"dragon",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/dragon.png"), 
            coins:10, health:40, armor:8, attackMax:12, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning:'"I\'ve slain a lizard with breath of fire!" Often heard by boasting liar.',
            enterSound: 'dragonEnter',
            attacks: ['attakname', 'attackname'],
          },
        ],
        shopKeeps: [
          {
            name:"cleric", 
            portrait:require("./assets/imgs/shopkeepers/cleric.png"),
            items: [
                { bought: false, noSale: false, name: 'minor heal', cost: 1, description: '+6 HP', buy: () => { store.state.player.health += 6 } },
                { bought: false, noSale: false, name: 'minor blessing', cost: 1, description: '+1 ARM', buy: () => { store.state.player.armor += 1 } },
                { bought: false, noSale: false, name: 'fortune', cost: 2, description: 'doubles coin value of next monster', buy: () => {store.state.monster.coins *= 2 }},
                { bought: false, noSale: false, name: ' great blessing', cost: 2, description: '+3 ARM', buy: () => { store.state.player.armor += 3 } },
                { bought: false, noSale: false, name: 'great miracle', cost: 3, description: '+5 ATK', buy: () => { store.state.player.attackMax += 5 } },
                { bought: false, noSale: false, name: 'boon', cost: 3, description: 'Immune to damage once', buy: () => { store.state.player.attackMax += 5 } },
            ],
            saying:"Come in, are you hurt?",
            shopTitle: "I can heal you... or perhaps you need the favor of the old gods?"
          },

          {
            name:"graverobber", 
          portrait:require("./assets/imgs/shopkeepers/graverobber.png"),
          items: [
            { bought: false, noSale: false, name: 'nacre charm', cost: 1, description: 'ATK +1 | ARM +1 | HP -5', buy: () => { store.state.player.health -= 5; store.state.player.armor += 1; store.state.player.attackMax += 1 } },
            { bought: false, noSale: false, name: 'detriment bangle', cost: 1, description: "Halves your HP | +3 ARM", buy: () => { store.state.player.armor += 3; store.state.player.health = Math.ceil(store.state.player.health / 2);} },
            { bought: false, noSale: false, name: 'unlucky trinket', cost: 3, description: "Grants Double Attack to you and monsters.", buy: () => { store.state.playerTraits.push('double attack'); } },
            { bought: false, noSale: false, name: 'hollow bone', cost: 2, description: "+4 ATK for next battle", buy: () => { store.state.playerTraitsTemp.push("hollow bone") } },
            { bought: false, noSale: false, name: 'Demon Ring', cost: 4, description: 'ATK Type becomes Pyhsical | x2 ATK', buy: () => {store.state.monster.coins *= 2 }},
            { bought: false, noSale: false, name: 'Dessicated Doll', cost: 5, description: 'Revive with 10 HP on death.', buy: () => { store.state.playerTraits.push('dessicated doll') }},
          ],
          saying:"Trust me, nothing I sell is cursed.",
          shopTitle: "Just buy somethin' quick, I don't wanna be seen fencing to the Kingloyal."
          },

          {name:"merchant", 
          portrait:require("./assets/imgs/shopkeepers/merchant.png"),
          items: [
            { bought: false, noSale: false, name: 'rations', cost: 1, description: '+5 HP', buy: () => { store.state.player.health += 5; } },
            { bought: false, noSale: false, name: 'sewing kit', cost: 1, description: '+1 ARM', buy: () => { store.state.player.armor += 1; } },
            { bought: false, noSale: false, name: 'Mettle Poultice', cost: 1, description: '+2 ATK', buy: () => { store.state.player.attackMax += 2; } },
            
            { bought: false, noSale: false, name: 'simple meal', cost: 2, description: '+10 HP', buy: () => { store.state.player.health += 10; } },
            { bought: false, noSale: false, name: 'armor kit', cost: 3, description: '+2 ARM', buy: () => { store.state.player.armor += 2; } },
            { bought: false, noSale: false, name: 'Mettle Draght', cost: 3, description: '+5 ATK', buy: () => { store.state.player.attackMax += 5; } },
            
            { bought: false, noSale: false, name: 'kings feast', cost: 4, description: '+15 HP', buy: () => { store.state.player.health += 15; } },
            { bought: false, noSale: false, name: 'etching kit', cost: 5, description: '+3 ARM', buy: () => { store.state.player.armor += 5; } },
            { bought: false, noSale: false, name: 'Mettle Vulnerary', cost: 5, description: '+8 ATK', buy: () => { store.state.player.attackMax += 8; } },
          ],
          saying:"Friend or foe, what are ya' buyin'?",
          shopTitle: "It's not much, but it's what I've got. All priced to move."
          },

          {name:"witch", 
          portrait:require("./assets/imgs/shopkeepers/witch.png"),
          items: [
            { bought: false, noSale: false, name: 'weak enchantment', cost: 1, description: '+2 ATK', buy: () => { store.state.player.attackMax += 2; } },
            { bought: false, noSale: false, name: 'red potion', cost: 1, description: '+6 HP', buy: () => { store.state.player.health += 6; } },
            { bought: false, noSale: false, name: 'banded charm', cost: 1, description: '+1 ATK | +1 ARM', buy: () => { store.state.player.armor += 1; store.state.player.attackMax += 1; } },
            
            { bought: false, noSale: false, name: 'arcane binding', cost: 2, description: '+2 ATK | +1 ARM', buy: () => { store.state.player.armor += 1; store.state.player.attackMax += 2; } },
            { bought: false, noSale: false, name: 'ochre elixir', cost: 2, description: '+6 HP | +1 ATK', buy: () => { store.state.player.health += 6; store.state.player.attackMax += 1; } },
            { bought: false, noSale: false, name: 'mettle earring', cost: 2, description: '+1 ARM | +1 ATK | +6 HP', buy: () => { store.state.player.health += 6; store.state.player.attackMax += 1; store.state.player.armor += 1; } },
            
            { bought: false, noSale: false, name: 'ancient ward', cost: 3, description: '+3 ATK | +2 ARM', buy: () => { store.state.player.armor += 2; store.state.player.attackMax += 3; } },
            { bought: false, noSale: false, name: 'special drink', cost: 3, description: '+10 HP | +2 ATK', buy: () => { store.state.player.health += 10; store.state.player.attackMax += 2; } },
            { bought: false, noSale: false, name: 'mettle earring', cost: 3, description: '+1 ARM | +3 ATK | +8 HP', buy: () => { store.state.player.health += 8; store.state.player.attackMax += 3; store.state.player.armor += 1; } },
            
            { bought: false, noSale: false, name: 'blood ritual', cost: 5, description: 'Thirds your HP | + lost HP to your ATK', buy: () => { let temp = Math.ceil((store.state.player.health / 3) * 2); store.state.player.health -= temp; store.state.player.attackMax += temp; } },
          ],
          saying:"Everything you see, all hand enchanted.",
          shopTitle: "Some of my inventory tends to be virulent. Browse at your own risk."
          },
        ],
    },
    newMonster() {
        // Sets monsterRoster to a new value, adding 1-4 to the old value
        this.state.monsterRoster += Math.floor(Math.random() * Math.floor(4)) + 1;
        
        if(this.state.monsterRoster > this.characters.monsterCharacters.length) {
          this.state.monsterRoster = this.characters.monsterCharacters.length;
          this.state.finalBoss = true; 
          console.log(`BOSS: there are ${this.characters.monsterCharacters.length} monsters in the list`);
          console.log(`BOSS: the roster is at index ${this.state.monsterRoster}`);
        }else {
          console.log(`there are ${this.characters.monsterCharacters.length} monsters in the list`);
          console.log(`the roster is at index ${this.state.monsterRoster}`);
          this.state.monster = this.characters.monsterCharacters[this.state.monsterRoster];
        }
        console.log(`new monster is ${this.state.monster.name}`);
    },
    newShopkeep() {
      this.newMonster();
      let randomNumber = Math.floor(Math.random() * Math.floor(this.characters.shopKeeps.length));
      this.state.shopkeep = this.characters.shopKeeps[randomNumber];
      this.state.shopkeep.items = shuffle(this.state.shopkeep.items);
      this.state.shopInventory = this.state.shopkeep.items.slice(0,3);
      console.log(`new shop is ${this.state.shopkeep.name}`)
    },
    sceneChange(scene) {
      this.state.isEntering = false;
      
      setTimeout(() => {
        this.state.phase = scene;
        if(this.state.monsterRoster > 0  && scene == 'ShopPhase'){
          this.newShopkeep();
        } else if (this.state.monsterRoster == 0) {
          this.newMonster();
        }
        this.state.isEntering = true;
      }, 300);
    },
    wholeNumber(value) {
      return `${Math.ceil(value)}`;
    }
};