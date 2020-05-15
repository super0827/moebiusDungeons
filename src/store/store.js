import Vue from 'vue'
import Vuex from 'vuex'
import shuffle from 'lodash.shuffle';

Vue.use(Vuex);

export const gameData = {
  state: () => ({
    phase: "StartScreen",
    isEntering: true,
    music: {type: String},
    helper: {type: Boolean},
    duration: {type: Number}
  }),
  mutations: {
    mutate(state, payload) {
      state[payload.property] = payload.with;
    }
  }
}

export const player = {
  state: () => ({
    info: {type: Object},
    permenantTraits: [],
    tempTraits: [],
    thisDamage: {type: Number},
    thisAdjDamage: {type: Number},
    log: {type: Object},
    animations: {
      blocking: false,
      hurt: false,
      attacking:false,
      portEffect: false,
      portEffectRed: false,
      portEffectPurple: false,
      portEffectGreen: false,
      isDead: false,
    }
  }),
  mutations: {
    
  }
}

export const monster = {
  state: () => ({
    info: {type: Object},
    roster: 0,
    isBoss: false,
    animations: {
      blocking: false,
      hurt: false,
      attacking:false,
      portEffect: false,
      portEffectRed: false,
      portEffectPurple: false,
      portEffectGreen: false,
      isDead: false,
    },
    variants: [
      {
        name: "emptyObject",
       },
       {
         name:"bats",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/bats.png"), 
         coins:0, health:4, armor:0, attackMax:4, attackType: "physical",
         attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"),
         warning:"Bright red eyes, fangs meant to slice. To stay away is my advice.",
         enterSound: 'batsEnter',
         special(){
           //on tradeblows or be reckless, bats should attack first
         }
       },
       {
         name:"imps",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/imps.png"), 
         coins:1, health:5, armor:1, attackMax:1, attackType: "magical",
         attackTypeImage: require("../assets/imgs/icons/magicalIcon.png"),
         warning: "You feel magic, hear a hissing - your meat and peas and toast are missing!",
         enterSound: 'impsEnter',
         special(){
           //not needed
         }
       },
       {
         name:"slime",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/slime.png"), 
         coins:1, health:6, armor:2, attackMax:4, attackType: "physical",
         attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"),
         warning: "One wrong step to right or left is sure to spell your slimy death.",
         enterSound: 'slimeEnter',
         special(){
           //if player rolls minimum damage, then the slime destroys one point players armor
         }
       },
       {
         name:"kobold",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/kobold.png"), 
         coins:1, health:7, armor:1, attackMax:4, attackType: "physical",
         attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"),
         warning: "greenish armor, sharp teeth too - slay it quick 'fore it slays you!",
         enterSound: 'koboldEnter',
         special() {
           //when you defeat a kobold roll 1d6, on a 1 you must fight another kobold immediately.
         }
       },
       {
         name:"gnoll",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/gnoll.png"), 
         coins:1, health:9, armor:1, attackMax:5, attackType: "physical",
         attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"),
         warning: "a warning growl behind sharp teeth, quickly now your sword unsheath.",
         enterSound: 'gnollEnter',
         special() {
           //fleas! if you roll a 1 for attack you get fleas! Minus one damage until fleas is healed.
         }
       },
       {
         name:"goblins",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/goblins.png"), 
         coins:1, health:8, armor:1, attackMax:4, attackType: "physical",
         attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"),
         warning: "Strong enough to maim and kill, gross enough your lunch might spill.",
         enterSound: 'goblinEnter',
         special(){
           //goblins smell bad. To fight them roll your damage roll twice and take the lower result.
         }
       },
       
       // Level 2 NORMAL
       {
         name:"ghost",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/ghost.png"), 
         coins:2, health:10, armor:2, attackMax:8, attackType: "magical",
         attackTypeImage: require("../assets/imgs/icons/magicalIcon.png"),
         warning: "You lay awake at midnight hour, sounds unearthly shape your cower.",
         enterSound: 'ghostEnter',
         special(){
           //ghosts are incorporeal and can not be escaped from
         }
         
       },
       {
         name:"lizardman",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/lizardman.png"), 
         coins:2, health:12, armor:2, attackMax:8, attackType: "physical",
         attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"),
         warning: "Lizard senses seek out prey, poison venom helps them slay.",
         enterSound: 'lizardmanEnter',
         special(){
           //lizardman can poison you. if lizardman hits for max damage you are poisoned for one damage every time you attack
           //until you recover health
         }
       },
       {
         name:"curse",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/curse.png"), 
         coins:1, health:16, armor:4, attackMax:10, attackType: "magical",
         attackTypeImage: require("../assets/imgs/icons/magicalIcon.png"),
         warning: "A faint feeling of unluck first, your body hurts, you feel your worst.",
         enterSound: 'curseEnter',
         special(){
           //none
         }
       },
       {
         name:"bandits",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/bandits.png"), 
         coins:2, health:15, armor:2, attackMax:8, attackType: "physical",
         attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"),
         warning: "Shadows hide two men from sight. Their motives born of moral spite.",
         enterSound: 'banditsEnter',
         special(){
           //if bandit rolls max damage then they attack again immediately!
         }
       },
       
       // Level 1 VIRULENTS
       {
         dire:true,
         name:"Virulent bats",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/bats.png"), 
         coins:1, health:18, armor:1, attackMax:5, attackType: "physical",
         attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"),
         warning:"Bright red eyes, fangs meant to slice. To stay away is my advice.",
         enterSound: 'batsEnter',
         
       },
       {
         dire: true,
         name:"Virulent imps",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/imps.png"), 
         coins:2, health:12, armor:1, attackMax:2, attackType: "magical",
         attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"),
         warning: "You feel magic, hear a hissing - your meat and peas and toast are missing!",
         enterSound: 'impsEnter',
         
       },
       {
         dire: true,
         name:"Virulent slime",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/slime.png"), 
         coins:2, health:10, armor:2, attackMax:6, attackType: "physical",
         attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"),
         warning: "One wrong step to right or left is sure to spell your slimy death.",
         enterSound: 'slimeEnter',
         
       },
       {
         dire: true,
         name:"Virulent kobold",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/kobold.png"), 
         coins:2, health:11, armor:1, attackMax:6, attackType: "physical",
         attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"),
         warning: "greenish armor, sharp teeth too - slay it quick 'fore it slays you!",
         enterSound: 'koboldEnter',
         
       },
       {
         dire: true,
         name:"Virulent gnoll",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/gnoll.png"), 
         coins:2, health:14, armor:2, attackMax:5, attackType: "physical",
         attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"),
         warning: "a warning growl behind sharp teeth, quickly now your sword unsheath.",
         enterSound: 'gnollEnter',
         
       },
       {
         dire: true,
         name:"Virulent goblins",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/goblins.png"), 
         coins:3, health:17, armor:2, attackMax:6, attackType: "physical",
         attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"),
         warning: "Strong enough to maim and kill, gross enough your lunch might spill.",
         enterSound: 'goblinEnter',
         
       },
       
       //MIMIC!
       {
         name:"mimic",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/mimic.png"), 
         coins:4, health:18, armor:3, attackMax:10, attackType: "physical",
         attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"),
         warning: "You reach out to your surprise, You're met by big bright yellow eyes.",
         enterSound: 'mimicEnter',
         
       },
       
       // LEVEL 2 VIRULENTS
       {
         dire:true,
         name:"virulent ghost",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/ghost.png"), 
         coins:3, health:16, armor:2, attackMax:9, attackType: "magical",
         attackTypeImage: require("../assets/imgs/icons/magicalIcon.png"),
         warning: "You lay awake at midnight hour, sounds unearthly shape your cower.",
         enterSound: 'ghostEnter',
         
       },
       {
         dire:true,
         name:"virulent lizardman",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/lizardman.png"), 
         coins:3, health:18, armor:2, attackMax:9, attackType: "physical",
         attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"),
         warning: "Lizard senses seek out prey, poison venom helps them slay.",
         enterSound: 'lizardmanEnter',
         
       },
       {
         dire:true,
         name:"virulent curse",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/curse.png"), 
         coins:1, health:16, armor:4, attackMax:12, attackType: "magical",
         attackTypeImage: require("../assets/imgs/icons/magicalIcon.png"),
         warning: "A faint feeling of unluck first, your body hurts, you feel your worst.",
         enterSound: 'curseEnter',
         
       },
       {
         dire:true,
         name:"virulent bandits",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/bandits.png"), 
         coins:4, health:15, armor:2, attackMax:8, attackType: "physical",
         attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"),
         warning: "Shadows hide two men from sight. Their motives born of moral spite.",
         enterSound: 'banditsEnter',
         
       },
       
       //MIMIC
       {
         name:"mimic",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/mimic.png"), 
         coins:5, health:18, armor:3, attackMax:10, attackType: "physical",
         attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"),
         warning: "You reach out to your surprise, You're met by big bright yellow eyes.",
         enterSound: 'mimicEnter',
         
       },
       
       // LEVEL 3 NORMAL
       {
         name:"ghoul",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/ghoul.png"), 
         coins:3, health:15, armor:2, attackMax:10, attackType: "physical",
         attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"),
         warning: "You walk between the crumbling tombs, behind you somethimg sickly looms!",
         enterSound: 'ghoulEnter',
         //you become rotten if the ghoul deals max damage.
         //your hp is reduced by 1/6 every monster you fight until you are healed.
       },
       {
         name:"skeleton",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/skeleton.png"), 
         coins:3, health:16, armor:2, attackMax:10, attackType: "physical",
         attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"),
         warning:"strong dark magic guides their hand, to stab and fight and kill and stand.",
         enterSound: 'skeletonEnter',
         special(){
           //on death roll 1d6, on 4-6 the skeleton is dead.
           //on a 1-3 fight another skeleton at 5 hp and 0 armor
         }
       },
       {
         name:"swampling",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/swampling.png"), 
         coins:3, health:16, armor:2, attackMax:10, attackType: "magical",
         attackTypeImage: require("../assets/imgs/icons/magicalIcon.png"),
         warning: "into mud as thick as tar, your skin wil boil, bubble, and scar",
         enterSound: 'swamplingEnter',
         special() {
           //if you roll minimum damage you get the status blight
           //deal half damage until blight is cured
         }
       },
       
       //Level 3 VIRULENTS
       {
         dire:true,
         name:"virulent ghoul",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/ghoul.png"), 
         coins:4, health:20, armor:3, attackMax:10, attackType: "physical",
         attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"),
         warning: "You walk between the crumbling tombs, behind you somethimg sickly looms!",
         enterSound: 'ghoulEnter',
         
       },
       {
         dire:true,
         name:"virulent skeleton",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/skeleton.png"), 
         coins:4, health:21, armor:3, attackMax:11, attackType: "physical",
         attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"),
         warning:"strong dark magic guides their hand, to stab and fight and kill and stand.",
         enterSound: 'skeletonEnter',
         
       },
       {
         dire:true,
         name:"virulent swampling",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/swampling.png"), 
         coins:5, health:23, armor:2, attackMax:10, attackType: "magical",
         attackTypeImage: require("../assets/imgs/icons/magicalIcon.png"),
         warning: "into mud as thick as tar, your skin wil boil, bubble, and scar",
         enterSound: 'swamplingEnter',
         
       },
       
       // Level 4 NORMALS
       
       {
         name:"harpy",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/harpy.png"), 
         coins:4, health:15, armor:3, attackMax:10, attackType: "physical",
         attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"),
         warning: "Halfway bird and halfway horrid, You'll be telling tales quite sordid.",
         enterSound: 'harpyEnter',
         special() {
           //on death roll 1d6 on a 1 or 2 fight another harpy
         }
         
       },
       {
         name:"mushroom",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/mushroom.png"), 
         coins:4, health:18, armor:2, attackMax:10, attackType: "physical",
         attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"),
         warning:"It stands still by a rotting log, spores cloud up a toxic fog.",
         enterSound: 'mushroomEnter',
         special() {
           //on appear roll 1d6, on a 1-3 you are poisoned until healed
         }
         
       },
       {
         name:"dryad",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/dryad.png"), 
         coins:4, health:20, armor:4, attackMax:10, attackType: "magical",
         attackTypeImage: require("../assets/imgs/icons/magicalIcon.png"),
         warning: "she lives beneath a special tree, deaf to any mortal plea.",
         enterSound: 'dryadEnter',
         special() {
           //each turn roll 1d6, on a 1, you are attacked by the dryad and lose your attack turn.
         }
       },
       {
         name:"golem",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/golem.png"), 
         coins:4, health:22, armor:4, attackMax:10, attackType: "physical",
         attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"),
         warning: "a guardian immune to death, you cannot kill what has no breath.",
         enterSound: 'golemEnter',
         special() {
           //when golem reaches 0 hp, it survives and deals half damage until you deal 10+ damage once.
         }
       },
       
       // Level 5
       
       {
         name:"demon",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/demon.png"), 
         coins:5, health:25, armor:4, attackMax:10, attackType: "physical",
         attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"),
         warning: "Human-like but one thing proves, instead of feet they have black hooves.",
         enterSound: 'demonEnter',
         //if demons health reaches 5 hp it takes on it's true form and deals 2d10 damage until killed.
       },
       {
         name:"banshee",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/banshee.png"), 
         coins:5, health:30, armor:5, attackMax:12, attackType: "magical",
         attackTypeImage: require("../assets/imgs/icons/magicalIcon.png"),
         warning: "she moans in anguish, ghostly, gritty. Her eyes shine bright to see your pity.",
         enterSound: 'bansheeEnter',
         special() {
           //on encounter roll 1d6, on 1-2 you are sticken with fear and can not be reckless or flee.
         }
       },
       
       // BOSSES
       
       {
         name:"lich",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/lich.png"), 
         coins:10, health:36, armor:8, attackMax:12, attackType: "magical",
         attackTypeImage: require("../assets/imgs/icons/magicalIcon.png"),
         warning: "Whirling nacre tp body bound, a yearning mind in learn-lust drown.",
         enterSound: 'lichEnter',
         special() {
           //you cant run from the lich
           //if lich rolls max damage, it retreats and summons a skeleton with 1d8 damage 8 hp and 0 armor.
           //when the skeleton dies the lich returns
         }
         
       },
       {
         name:"dragon",
         type:'monster', 
         portrait:require("../assets/imgs/monsters/dragon.png"), 
         coins:10, health:40, armor:8, attackMax:12, attackType: "physical",
         attackTypeImage: require("../assets/imgs/icons/physicalIcon.png"),
         warning:'"I\'ve slain a lizard with breath of fire!" Often heard by boasting liar.',
         enterSound: 'dragonEnter',
         special() {
           //dragons take half damage from non magical attacks
         }
         
       },
    ]
  }),
  mutations: {
    
  }
}

export const shopkeeps = {
  state: () => ({
    info: {type: Object},
    inventory: [],
    variants: [
        {
          name:"cleric", 
          portrait:require("../assets/imgs/shopkeepers/cleric.png"),
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
        portrait:require("../assets/imgs/shopkeepers/graverobber.png"),
        items: [
          { bought: false, noSale: false, name: 'nacre charm', cost: 1, description: 'ATK +1 | ARM +1 | HP -5', buy: () => { store.state.player.health -= 5; store.state.player.armor += 1; store.state.player.attackMax += 1 } },
          { bought: false, noSale: false, name: 'detriment bangle', cost: 1, description: "Halves your HP | +3 ARM", buy: () => { store.state.player.armor += 3; store.state.player.health = Math.ceil(store.state.player.health / 2);} },
          { bought: false, noSale: false, name: 'unlucky trinket', cost: 3, description: "Grants Double Attack to you and monsters.", buy: () => { store.state.playerTraits.push('double attack'); } },
          { bought: false, noSale: false, name: 'hollow bone', cost: 2, description: "+4 ATK for next battle", buy: () => { store.state.playerTraitsTemp.push("hollow bone") } },
          { bought: false, noSale: false, name: 'Demon Ring', cost: 4, description: 'ATK Type becomes Pyhsical | x2 ATK', buy: () => {store.state.monster.coins *= 2 }},
          { bought: false, noSale: false, name: 'Dessicated Doll', cost: 5, description: 'Revive with 10 HP on death.', buy: () => { store.state.playerTraits.push('dessicated doll') }},
        ],
        saying:"Trust me, nothing I sell is cursed.",
        shopTitle: "Just buy somethin' quick, I don't wanna be seen fencing to the Kingloyal.",
        welcome:'grWelcome',
        goodbye:'grOkay',

        },

        {name:"merchant", 
        portrait:require("../assets/imgs/shopkeepers/merchant.png"),
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
        shopTitle: "It's not much, but it's what I've got. All priced to move.",
        welcome:'meWelcome',
        goodbye:'meGoodbye',
        },

        {name:"witch", 
        portrait:require("../assets/imgs/shopkeepers/witch.png"),
        items: [
          { bought: false, noSale: false, name: 'weak enchantment', cost: 1, description: '+2 ATK', buy: () => { store.state.player.attackMax += 2; } },
          { bought: false, noSale: false, name: 'red potion', cost: 1, description: '+6 HP', buy: () => { store.state.player.health += 6; } },
          { bought: false, noSale: false, name: 'banded charm', cost: 1, description: '+1 ATK | +1 ARM', buy: () => { store.state.player.armor += 1; store.state.player.attackMax += 1; } },
          
          { bought: false, noSale: false, name: 'arcane binding', cost: 2, description: '+2 ATK | +1 ARM', buy: () => { store.state.player.armor += 1; store.state.player.attackMax += 2; } },
          { bought: false, noSale: false, name: 'ochre elixir', cost: 2, description: '+6 HP | +1 ATK', buy: () => { store.state.player.health += 6; store.state.player.attackMax += 1; } },
          { bought: false, noSale: false, name: 'mettle earring', cost: 2, description: '+1 ARM | +1 ATK | +6 HP', buy: () => { store.state.player.health += 6; store.state.player.attackMax += 1; store.state.player.armor += 1; } },
          
          { bought: false, noSale: false, name: 'ancient ward', cost: 3, description: '+3 ATK | +2 ARM', buy: () => { store.state.player.armor += 2; store.state.player.attackMax += 3; } },
          { bought: false, noSale: false, name: 'special drink', cost: 3, description: '+10 HP | +2 ATK', buy: () => { store.state.player.health += 10; store.state.player.attackMax += 2; } },
          { bought: false, noSale: false, name: 'mettle necklace', cost: 3, description: '+1 ARM | +3 ATK | +8 HP', buy: () => { store.state.player.health += 8; store.state.player.attackMax += 3; store.state.player.armor += 1; } },
          
          { bought: false, noSale: false, name: 'blood ritual', cost: 5, description: 'Thirds your HP | + lost HP to your ATK', buy: () => { let temp = Math.ceil((store.state.player.health / 3) * 2); store.state.player.health -= temp; store.state.player.attackMax += temp; } },
        ],
        saying:"Everything you see, all hand enchanted.",
        shopTitle: "Some of my inventory tends to be virulent. Browse at your own risk."
        },
    ]
  }),
  mutations: {

  }
}

export const statTracker = {
  state: () => ({
    stats: {type: Object},
  }),
  mutations: {
  
  }
}

export const store = new Vuex.Store({
  modules: {
    gameData: gameData,
    player: player,
    monsters: monster,
    shopkeeps: shopkeeps,
    statTracker: statTracker,
  }
})

// newShopkeep() {
// this.playerLog = [];
// this.monsterLog = [];
// let randomNumber = Math.floor(Math.random() * Math.floor(this.characters.shopKeeps.length));
// this.state.shopkeep = this.characters.shopKeeps[randomNumber];
// this.state.shopkeep.items = shuffle(this.state.shopkeep.items);
// this.state.shopInventory = this.state.shopkeep.items.slice(0,3);
// console.log(`new shop is ${this.state.shopkeep.name}`)
// },
