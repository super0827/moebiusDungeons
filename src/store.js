export const store = {
    state: {
        player: {type: Object},
        monster: {type: Object},
        shopkeep: {type: Object},
        gameStats: {type: Object},
        monsterRoster: 0,
    },
    characters: {
        playerClasses: "",
        monsterCharacters: [
            // Level 1   
          {
           name: "emptyObject",
          },
          {
            name:"bats",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/bats.png"), 
            coins:0, health:4, armor:0, attackMax:4, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning:"Bright red eyes, fangs meant to slice. To stay away is my advice."
        },
          {
            name:"imps",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/imps.png"), 
            coins:1, health:5, armor:1, attackMax:1, attackType: "magical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "You feel magic, hear a hissing - your meat and peas and toast are missing!"
          },
          {
            name:"slime",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/slime.png"), 
            coins:1, health:6, armor:2, attackMax:4, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "One wrong step to right or left is sure to spell your slimy death."
          },
          {
            name:"kobold",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/kobold.png"), 
            coins:1, health:7, armor:1, attackMax:4, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "greenish armor, sharp teeth too - slay it quick 'fore it slays you!"
          },
          {
            name:"gnoll",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/gnoll.png"), 
            coins:1, health:9, armor:1, attackMax:5, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "a warning growl behind sharp teeth, quick;y now your sword unsheath."
          },
          {
            name:"goblins",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/goblins.png"), 
            coins:1, health:8, armor:1, attackMax:4, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "Strong enough to maim and kill, gross enough your lunch might spill."
          },

            // Level 2
          {
            name:"ghost",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/ghost.png"), 
            coins:2, health:10, armor:2, attackMax:8, attackType: "magical",
            attackTypeImage: require("./assets/imgs/icons/magicalIcon.png"),
            warning: "You lay awake at midnight hour, sounds unearthly shape your cower."
          },
          {
            name:"lizardman",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/lizardman.png"), 
            coins:2, health:12, armor:2, attackMax:8, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "Lizard senses seek out prey, poison venom helps them slay."
          },
          {
            name:"curse",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/curse.png"), 
            coins:2, health:16, armor:4, attackMax:12, attackType: "magical",
            attackTypeImage: require("./assets/imgs/icons/magicalIcon.png"),
            warning: "A faint feeling of unluck first, your body hurts, you feel your worst."
          },
          {
            name:"bandits",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/bandits.png"), 
            coins:2, health:15, armor:2, attackMax:8, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "Shadows hide two men from sight. Their motives born of moral spite."
          },
              
              // Level 3
          
          {
            name:"mimic",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/mimic.png"), 
            coins:5, health:18, armor:3, attackMax:10, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "You reach out to your surprise, You're met by big bright yellow eyes."
          },
          {
            name:"ghoul",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/ghoul.png"), 
            coins:3, health:15, armor:2, attackMax:10, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "You walk between the crumbling tombs, behind you somethimg sickly looms!"
          },
          {
            name:"skeleton",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/skeleton.png"), 
            coins:3, health:16, armor:2, attackMax:10, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning:"strong dark magic guides their hand, to stab and fight and kill and stand."
          },
          {
            name:"swampling",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/swampling.png"), 
            coins:3, health:16, armor:2, attackMax:10, attackType: "magical",
            attackTypeImage: require("./assets/imgs/icons/magicalIcon.png"),
            warning: "into mud as thick as tar, your skin wil boil, bubble, and scar"
          },

            // Level 4

          {
            name:"harpy",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/harpy.png"), 
            coins:4, health:15, armor:3, attackMax:10, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "Halfway bird and halfway horrid, You'll be telling tales quite sordid."
          },
          {
            name:"mushroom",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/mushroom.png"), 
            coins:4, health:18, armor:2, attackMax:10, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning:"It stands still by a rotting log, spores cloud up a toxic fog."
          },
          {
            name:"dryad",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/dryad.png"), 
            coins:4, health:20, armor:4, attackMax:10, attackType: "magical",
            attackTypeImage: require("./assets/imgs/icons/magicalIcon.png"),
            warning: "she lives beneath a special tree, deaf to any mortal plea."
          },
          {
            name:"golem",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/golem.png"), 
            coins:4, health:22, armor:4, attackMax:10, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "a guardian immune to death, you cannot kill what has no breath."
          },
          
            // Level 5

          {
            name:"demon",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/demon.png"), 
            coins:5, health:25, armor:4, attackMax:10, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "Human-like but one thing proves, instead of feet they haver black hooves."
          },
          {
            name:"banshee",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/banshee.png"), 
            coins:5, health:30, armor:5, attackMax:12, attackType: "magical",
            attackTypeImage: require("./assets/imgs/icons/magicalIcon.png"),
            warning: "she moans in anguish, ghostly, gritty. Her eyes shine bright to see your pity."
          },
          
            // BOSSES
          
          {
            name:"lich",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/lich.png"), 
            coins:10, health:36, armor:8, attackMax:12, attackType: "magical",
            attackTypeImage: require("./assets/imgs/icons/magicalIcon.png"),
            warning:'"I\'ve slain a lizard with breath of fire!" Often heard by boasting liar.'
          },
          {
            name:"dragon",
            type:'monster', 
            portrait:require("./assets/imgs/monsters/dragon.png"), 
            coins:10, health:40, armor:8, attackMax:12, attackType: "physical",
            attackTypeImage: require("./assets/imgs/icons/physicalIcon.png"),
            warning: "Whirling nacre tp body bound, a yearning mind in learn-lust drown."
          },
      ],
    },
    newMonster() {
        // Sets monsterRoster to a new value, adding 1-4 to the old value
        this.state.monsterRoster += Math.floor(Math.random() * Math.floor(4)) + 1;
        this.state.monster = this.characters.monsterCharacters[this.state.monsterRoster];

    }
};