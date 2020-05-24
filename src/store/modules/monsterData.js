const state = () => ({
    info: {type: Object},
    roster: 0,
    tempTraits: [],
    isBoss: false,
    thisDamage: {type: Number},
    log: [],
    tempHealth: 0,
    tempArmor: 0,
    tempAttackMax: 0,
    logNum: 0,
    animations: {
      blocking: false,
      hurt: false,
      attacking:false,
      portEffect: false,
      redShine: false,
      purpleShine: false,
      greenShine: false,
      isDead: false,
    },
    variants: [
        {
          name: "emptyObject",
         },
         {
           name:"bats",
           type:'monster', 
           portrait:require("@/assets/imgs/monsters/bats.png"), 
           coins:0, baseHealth:4, baseArmor:0, baseAttackMax:4, attackType: "physical",
           attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
           warning:"Bright red eyes, fangs meant to slice. To stay away is my advice.",
           enterSound: 'batsEnter',
           special(){
             //on tradeblows or be reckless, bats should attack first
           }
         },
         {
           name:"imps",
           type:'monster', 
           portrait:require("@/assets/imgs/monsters/imps.png"), 
           coins:1, baseHealth:5, baseArmor:1, baseAttackMax:1, attackType: "magical",
           attackTypeImage: require("@/assets/imgs/icons/magicalIcon.png"),
           warning: "You feel magic, hear a hissing - your meat and peas and toast are missing!",
           enterSound: 'impsEnter',
           special(){
             //not needed
           }
         },
         {
           name:"slime",
           type:'monster', 
           portrait:require("@/assets/imgs/monsters/slime.png"), 
           coins:1, baseHealth:6, baseArmor:2, baseAttackMax:4, attackType: "physical",
           attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
           warning: "One wrong step to right or left is sure to spell your slimy death.",
           enterSound: 'slimeEnter',
           special(){
             //if player rolls minimum damage, then the slime destroys one point players baseArmor
           }
         },
         {
           name:"kobold",
           type:'monster', 
           portrait:require("@/assets/imgs/monsters/kobold.png"), 
           coins:1, baseHealth:7, baseArmor:1, baseAttackMax:4, attackType: "physical",
           attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
           warning: "greenish baseArmor, sharp teeth too - slay it quick 'fore it slays you!",
           enterSound: 'koboldEnter',
           special() {
             //when you defeat a kobold roll 1d6, on a 1 you must fight another kobold immediately.
           }
         },
         {
           name:"gnoll",
           type:'monster', 
           portrait:require("@/assets/imgs/monsters/gnoll.png"), 
           coins:1, baseHealth:9, baseArmor:1, baseAttackMax:5, attackType: "physical",
           attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
           warning: "a warning growl behind sharp teeth, quickly now your sword unsheath.",
           enterSound: 'gnollEnter',
           special() {
             //fleas! if you roll a 1 for attack you get fleas! Minus one damage until fleas is healed.
           }
         },
         {
           name:"goblins",
           type:'monster', 
           portrait:require("@/assets/imgs/monsters/goblins.png"), 
           coins:1, baseHealth:8, baseArmor:1, baseAttackMax:4, attackType: "physical",
           attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
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
           portrait:require("@/assets/imgs/monsters/ghost.png"), 
           coins:2, baseHealth:10, baseArmor:2, baseAttackMax:8, attackType: "magical",
           attackTypeImage: require("@/assets/imgs/icons/magicalIcon.png"),
           warning: "You lay awake at midnight hour, sounds unearthly shape your cower.",
           enterSound: 'ghostEnter',
           special(){
             //ghosts are incorporeal and can not be escaped from
           }
           
         },
         {
           name:"lizardman",
           type:'monster', 
           portrait:require("@/assets/imgs/monsters/lizardman.png"), 
           coins:2, baseHealth:12, baseArmor:2, baseAttackMax:8, attackType: "physical",
           attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
           warning: "Lizard senses seek out prey, poison venom helps them slay.",
           enterSound: 'lizardmanEnter',
           special(){
             //lizardman can poison you. if lizardman hits for max damage you are poisoned for one damage every time you attack
             //until you recover baseHealth
           }
         },
         {
           name:"curse",
           type:'monster', 
           portrait:require("@/assets/imgs/monsters/curse.png"), 
           coins:1, baseHealth:16, baseArmor:4, baseAttackMax:10, attackType: "magical",
           attackTypeImage: require("@/assets/imgs/icons/magicalIcon.png"),
           warning: "A faint feeling of unluck first, your body hurts, you feel your worst.",
           enterSound: 'curseEnter',
           special(){
             //none
           }
         },
         {
           name:"bandits",
           type:'monster', 
           portrait:require("@/assets/imgs/monsters/bandits.png"), 
           coins:2, baseHealth:15, baseArmor:2, baseAttackMax:8, attackType: "physical",
           attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
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
           portrait:require("@/assets/imgs/monsters/bats.png"), 
           coins:1, baseHealth:18, baseArmor:1, baseAttackMax:5, attackType: "physical",
           attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
           warning:"Bright red eyes, fangs meant to slice. To stay away is my advice.",
           enterSound: 'batsEnter',
           
         },
         {
           dire: true,
           name:"Virulent imps",
           type:'monster', 
           portrait:require("@/assets/imgs/monsters/imps.png"), 
           coins:2, baseHealth:12, baseArmor:1, baseAttackMax:2, attackType: "magical",
           attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
           warning: "You feel magic, hear a hissing - your meat and peas and toast are missing!",
           enterSound: 'impsEnter',
           
         },
         {
           dire: true,
           name:"Virulent slime",
           type:'monster', 
           portrait:require("@/assets/imgs/monsters/slime.png"), 
           coins:2, baseHealth:10, baseArmor:2, baseAttackMax:6, attackType: "physical",
           attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
           warning: "One wrong step to right or left is sure to spell your slimy death.",
           enterSound: 'slimeEnter',
           
         },
         {
           dire: true,
           name:"Virulent kobold",
           type:'monster', 
           portrait:require("@/assets/imgs/monsters/kobold.png"), 
           coins:2, baseHealth:11, baseArmor:1, baseAttackMax:6, attackType: "physical",
           attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
           warning: "greenish baseArmor, sharp teeth too - slay it quick 'fore it slays you!",
           enterSound: 'koboldEnter',
           
         },
         {
           dire: true,
           name:"Virulent gnoll",
           type:'monster', 
           portrait:require("@/assets/imgs/monsters/gnoll.png"), 
           coins:2, baseHealth:14, baseArmor:2, baseAttackMax:5, attackType: "physical",
           attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
           warning: "a warning growl behind sharp teeth, quickly now your sword unsheath.",
           enterSound: 'gnollEnter',
           
         },
         {
           dire: true,
           name:"Virulent goblins",
           type:'monster', 
           portrait:require("@/assets/imgs/monsters/goblins.png"), 
           coins:3, baseHealth:17, baseArmor:2, baseAttackMax:6, attackType: "physical",
           attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
           warning: "Strong enough to maim and kill, gross enough your lunch might spill.",
           enterSound: 'goblinEnter',
           
         },
         
         //MIMIC!
         {
           name:"mimic",
           type:'monster', 
           portrait:require("@/assets/imgs/monsters/mimic.png"), 
           coins:4, baseHealth:18, baseArmor:3, baseAttackMax:10, attackType: "physical",
           attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
           warning: "You reach out to your surprise, You're met by big bright yellow eyes.",
           enterSound: 'mimicEnter',
           
         },
         
         // LEVEL 2 VIRULENTS
         {
           dire:true,
           name:"virulent ghost",
           type:'monster', 
           portrait:require("@/assets/imgs/monsters/ghost.png"), 
           coins:3, baseHealth:16, baseArmor:2, baseAttackMax:9, attackType: "magical",
           attackTypeImage: require("@/assets/imgs/icons/magicalIcon.png"),
           warning: "You lay awake at midnight hour, sounds unearthly shape your cower.",
           enterSound: 'ghostEnter',
           
         },
         {
           dire:true,
           name:"virulent lizardman",
           type:'monster', 
           portrait:require("@/assets/imgs/monsters/lizardman.png"), 
           coins:3, baseHealth:18, baseArmor:2, baseAttackMax:9, attackType: "physical",
           attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
           warning: "Lizard senses seek out prey, poison venom helps them slay.",
           enterSound: 'lizardmanEnter',
           
         },
         {
           dire:true,
           name:"virulent curse",
           type:'monster', 
           portrait:require("@/assets/imgs/monsters/curse.png"), 
           coins:1, baseHealth:16, baseArmor:4, baseAttackMax:12, attackType: "magical",
           attackTypeImage: require("@/assets/imgs/icons/magicalIcon.png"),
           warning: "A faint feeling of unluck first, your body hurts, you feel your worst.",
           enterSound: 'curseEnter',
           
         },
         {
           dire:true,
           name:"virulent bandits",
           type:'monster', 
           portrait:require("@/assets/imgs/monsters/bandits.png"), 
           coins:4, baseHealth:15, baseArmor:2, baseAttackMax:8, attackType: "physical",
           attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
           warning: "Shadows hide two men from sight. Their motives born of moral spite.",
           enterSound: 'banditsEnter',
           
         },
         
         //MIMIC
         {
           name:"mimic",
           type:'monster', 
           portrait:require("@/assets/imgs/monsters/mimic.png"), 
           coins:5, baseHealth:18, baseArmor:3, baseAttackMax:10, attackType: "physical",
           attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
           warning: "You reach out to your surprise, You're met by big bright yellow eyes.",
           enterSound: 'mimicEnter',
           
         },
         
         // LEVEL 3 NORMAL
         {
           name:"ghoul",
           type:'monster', 
           portrait:require("@/assets/imgs/monsters/ghoul.png"), 
           coins:3, baseHealth:15, baseArmor:2, baseAttackMax:10, attackType: "physical",
           attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
           warning: "You walk between the crumbling tombs, behind you somethimg sickly looms!",
           enterSound: 'ghoulEnter',
           //you become rotten if the ghoul deals max damage.
           //your hp is reduced by 1/6 every monster you fight until you are healed.
         },
         {
           name:"skeleton",
           type:'monster', 
           portrait:require("@/assets/imgs/monsters/skeleton.png"), 
           coins:3, baseHealth:16, baseArmor:2, baseAttackMax:10, attackType: "physical",
           attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
           warning:"strong dark magic guides their hand, to stab and fight and kill and stand.",
           enterSound: 'skeletonEnter',
           special(){
             //on death roll 1d6, on 4-6 the skeleton is dead.
             //on a 1-3 fight another skeleton at 5 hp and 0 baseArmor
           }
         },
         {
           name:"swampling",
           type:'monster', 
           portrait:require("@/assets/imgs/monsters/swampling.png"), 
           coins:3, baseHealth:16, baseArmor:2, baseAttackMax:10, attackType: "magical",
           attackTypeImage: require("@/assets/imgs/icons/magicalIcon.png"),
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
           portrait:require("@/assets/imgs/monsters/ghoul.png"), 
           coins:4, baseHealth:20, baseArmor:3, baseAttackMax:10, attackType: "physical",
           attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
           warning: "You walk between the crumbling tombs, behind you somethimg sickly looms!",
           enterSound: 'ghoulEnter',
           
         },
         {
           dire:true,
           name:"virulent skeleton",
           type:'monster', 
           portrait:require("@/assets/imgs/monsters/skeleton.png"), 
           coins:4, baseHealth:21, baseArmor:3, baseAttackMax:11, attackType: "physical",
           attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
           warning:"strong dark magic guides their hand, to stab and fight and kill and stand.",
           enterSound: 'skeletonEnter',
           
         },
         {
           dire:true,
           name:"virulent swampling",
           type:'monster', 
           portrait:require("@/assets/imgs/monsters/swampling.png"), 
           coins:5, baseHealth:23, baseArmor:2, baseAttackMax:10, attackType: "magical",
           attackTypeImage: require("@/assets/imgs/icons/magicalIcon.png"),
           warning: "into mud as thick as tar, your skin wil boil, bubble, and scar",
           enterSound: 'swamplingEnter',
           
         },
         
         // Level 4 NORMALS
         
         {
           name:"harpy",
           type:'monster', 
           portrait:require("@/assets/imgs/monsters/harpy.png"), 
           coins:4, baseHealth:15, baseArmor:3, baseAttackMax:10, attackType: "physical",
           attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
           warning: "Halfway bird and halfway horrid, You'll be telling tales quite sordid.",
           enterSound: 'harpyEnter',
           special() {
             //on death roll 1d6 on a 1 or 2 fight another harpy
           }
           
         },
         {
           name:"mushroom",
           type:'monster', 
           portrait:require("@/assets/imgs/monsters/mushroom.png"), 
           coins:4, baseHealth:18, baseArmor:2, baseAttackMax:10, attackType: "physical",
           attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
           warning:"It stands still by a rotting log, spores cloud up a toxic fog.",
           enterSound: 'mushroomEnter',
           special() {
             //on appear roll 1d6, on a 1-3 you are poisoned until healed
           }
           
         },
         {
           name:"dryad",
           type:'monster', 
           portrait:require("@/assets/imgs/monsters/dryad.png"), 
           coins:4, baseHealth:20, baseArmor:4, baseAttackMax:10, attackType: "magical",
           attackTypeImage: require("@/assets/imgs/icons/magicalIcon.png"),
           warning: "she lives beneath a special tree, deaf to any mortal plea.",
           enterSound: 'dryadEnter',
           special() {
             //each turn roll 1d6, on a 1, you are attacked by the dryad and lose your attack turn.
           }
         },
         {
           name:"golem",
           type:'monster', 
           portrait:require("@/assets/imgs/monsters/golem.png"), 
           coins:4, baseHealth:22, baseArmor:4, baseAttackMax:10, attackType: "physical",
           attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
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
           portrait:require("@/assets/imgs/monsters/demon.png"), 
           coins:5, baseHealth:25, baseArmor:4, baseAttackMax:10, attackType: "physical",
           attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
           warning: "Human-like but one thing proves, instead of feet they have black hooves.",
           enterSound: 'demonEnter',
           //if demons baseHealth reaches 5 hp it takes on it's true form and deals 2d10 damage until killed.
         },
         {
           name:"banshee",
           type:'monster', 
           portrait:require("@/assets/imgs/monsters/banshee.png"), 
           coins:5, baseHealth:30, baseArmor:5, baseAttackMax:12, attackType: "magical",
           attackTypeImage: require("@/assets/imgs/icons/magicalIcon.png"),
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
           portrait:require("@/assets/imgs/monsters/lich.png"), 
           coins:10, baseHealth:36, baseArmor:8, baseAttackMax:12, attackType: "magical",
           attackTypeImage: require("@/assets/imgs/icons/magicalIcon.png"),
           warning: "Whirling nacre tp body bound, a yearning mind in learn-lust drown.",
           enterSound: 'lichEnter',
           special() {
             //you cant run from the lich
             //if lich rolls max damage, it retreats and summons a skeleton with 1d8 damage 8 hp and 0 baseArmor.
             //when the skeleton dies the lich returns
           }
           
         },
         {
           name:"dragon",
           type:'monster', 
           portrait:require("@/assets/imgs/monsters/dragon.png"), 
           coins:10, baseHealth:40, baseArmor:8, baseAttackMax:12, attackType: "physical",
           attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
           warning:'"I\'ve slain a lizard with breath of fire!" Often heard by boasting liar.',
           enterSound: 'dragonEnter',
           special() {
             //dragons take half damage from non magical attacks
           }
           
         },
      ]
})

const mutations = {
    mutate(state, payload) {
        state[payload.property] = payload.with;
    },
    toggleAnimation(state, payload) {
      state.animations[payload.property] = !state.animations[payload.property];
    },
    incrementLog(state) {
      state.logNum++
    },
    takeDamage(state, payload) {
      state.info.baseHealth -= payload.damage;
    },
    addToLog(state, payload){
      state.log.push(payload)
    },
    newMonster(state) {
        const increment = Math.floor(Math.random() * Math.floor(4)) + 1;
        state.roster += increment;
        let roster = state.roster;
        state.info = state.variants[roster];
      }
}

const getters = {
  thisAdjDamage: (state, getters, rootState) => {
    let num;
    if( state.info.attackType === 'physical') {
      num = state.thisDamage - rootState.monsterData.info.baseArmor;
    }
    else if ( state.info.attackType === 'magical') {
      num = state.thisDamage;
    }
    if(num <= 0) return 0
    else return num
  },
  monsterLog: (state) => {
    let maxLog = state.log
    if(maxLog.length > 4) {
      maxLog.shift();
    }
    return maxLog
  },
  calcHealth: (state) => {
    return state.tempHealth + state.info.baseHealth
  },
  calcArmor: (state) => {
    return state.tempArmor + state.info.baseArmor
  },
  calcAttackMax: (state) => {
    return state.tempAttackMax + state.info.baseAttackMax
  }
}

const actions = {
  CHECK_HP({state, commit}){
    return new Promise((resolve) => {
      if(state.info.baseHealth > 0){
        resolve();
      }
      else if (state.info.baseHealth <= 0) {
        commit('toggleAnimation', {property: 'isDead'})
        setTimeout(() => {
          commit('gameData/mutate', {property:'phase', with:'ShopPhase'}, {root:true})
        }, 1100)
        return
      }
    })
  },
  ROLL_DAMAGE({commit, state}) {
      // commit('gameData/toggle', {property:'combatLocked'}, {root: true});
      const randomRoll = Math.floor(Math.random() * (state.info.baseAttackMax) + 1)
      console.log(`monster attack = ${randomRoll}`);
      commit('mutate', {property:'thisDamage', with:randomRoll})
  },
  TRADE_BLOWS({commit, dispatch, getters, state}){
      dispatch('CHECK_HP')
      .then(()=>{ dispatch('ROLL_DAMAGE') })
      .then(() => { dispatch('DEAL_DAMAGE') })
      .then (() => {  
        dispatch('LOG_UPDATE', `TRADE BLOWS DEALT ${getters.thisAdjDamage} DAMAGE`) 
      })
      .then(() => {
        setTimeout(() => {
          dispatch('RESET_ANIMATIONS')
          dispatch('playerData/RESET_ANIMATIONS', null, {root: true})
          commit('gameData/toggle', {property:'combatLocked'}, {root: true});
        },1400)
      })
  },
  LOG_UPDATE({commit, state}, payload) {
    commit('addToLog', {id:state.logNum + 'monster', message:payload});
    commit('incrementLog')
  },
  DEAL_DAMAGE({commit, getters}) {
      commit('toggleAnimation', {property:'attacking'});
      if (getters.thisAdjDamage > 0) {
        commit('playerData/toggleAnimation', {property: 'hurt'}, {root:true})
        commit('playerData/toggleAnimation', {property: 'portEffect'}, {root:true})
        commit('playerData/toggleAnimation', {property: 'redShine'}, {root:true})
        commit('playerData/takeDamage', {damage: getters.thisAdjDamage}, {root:true})
      }
      else if(getters.thisAdjDamage <= 0) {
        commit('playerData/toggleAnimation', {property: 'blocking'}, {root:true})
        commit('playerData/toggleAnimation', {property: 'portEffect'}, {root:true})
        commit('playerData/toggleAnimation', {property: 'purpleShine'}, {root:true})
      }
  },
  RUN_SPECIAL(context){

  },
  RESET_ANIMATIONS({state,commit}){
    for (let item in state.animations){
      if (state.animations[item] === true) commit('toggleAnimation', {property: item})
    }
  }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
        