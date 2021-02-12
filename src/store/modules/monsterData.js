import MonsterSounds from '@/plugins/MonsterSounds.js'
import UiSounds from '@/plugins/UiSounds.js'

const state = () => ({
    monsterLoaded: false,
    info: {
      name:"bats",
      type:'monster', 
      portrait:require("@/assets/imgs/monsters/bats.png"), 
      coins:0, baseHealth:5, baseArmor:0, baseAttackMax:3, attackType: "physical",
      attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
      armorType:'physical',
      warning:"Bright red eyes, fangs meant to slice. To stay away is my advice.",
      enterSound: 'batsEnter',
    },
    roster: 0,
    tempTraits: [],
    isBoss: false,
    thisDamage: 0,
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
      isOneShot: false,
    },
    monsters: {
      roads: [
        {
          name:"goblins",
          type:'monster', 
          portrait:require("@/assets/imgs/monsters/goblins.png"), 
          coins:1, baseHealth:6, baseArmor:1, baseAttackMax:4, attackType: "physical",
          attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
          armorType:'physical',
          warning: "Strong enough to maim and kill, gross enough your lunch might spill.",
          enterSound: 'goblinEnter',
        },
        {
          name:"gnoll",
          type:'monster', 
          portrait:require("@/assets/imgs/monsters/gnoll.png"), 
          coins:1, baseHealth:10, baseArmor:1, baseAttackMax:5, attackType: "physical",
          attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
          armorType:'physical',
          warning: "a warning growl behind sharp teeth, quickly now your sword unsheath.",
          enterSound: 'gnollEnter',
        },
        {
          name:"bandits",
          type:'monster', 
          portrait:require("@/assets/imgs/monsters/bandits.png"), 
          coins:2, baseHealth:13, baseArmor:1, baseAttackMax:6, attackType: "physical",
          attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
          armorType:'physical',
          warning: "Shadows hide two men from sight. Their motives born of moral spite.",
          enterSound: 'banditsEnter',
        },
        {
          name:"bats",
          type:'monster', 
          portrait:require("@/assets/imgs/monsters/bats.png"), 
          coins:0, baseHealth:5, baseArmor:0, baseAttackMax:3, attackType: "physical",
          attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
          armorType:'physical',
          warning:"Bright red eyes, fangs meant to slice. To stay away is my advice.",
          enterSound: 'batsEnter',
        },
      ],
      forest: [
        {
          name:"bats",
          type:'monster', 
          portrait:require("@/assets/imgs/monsters/bats.png"), 
          coins:1, baseHealth:8, baseArmor:0, baseAttackMax:3, attackType: "physical",
          attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
          armorType:'physical',
          warning:"Bright red eyes, fangs meant to slice. To stay away is my advice.",
          enterSound: 'batsEnter',
        },
        {
          name:"swampling",
          type:'monster', 
          portrait:require("@/assets/imgs/monsters/swampling.png"), 
          coins:2, baseHealth:12, baseArmor:2, baseAttackMax:8, attackType: "magical",
          attackTypeImage: require("@/assets/imgs/icons/magicalIcon.png"),
          armorType:'magical',
          warning: "into mud as thick as tar, your skin wil boil, bubble, and scar",
          enterSound: 'swamplingEnter',
        },
        {
          name:"mushroom",
          type:'monster', 
          portrait:require("@/assets/imgs/monsters/mushroom.png"), 
          coins:2, baseHealth:15, baseArmor:2, baseAttackMax:9, attackType: "physical",
          attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
          armorType:'physical',
          warning:"It stands still by a rotting log, spores cloud up a toxic fog.",
          enterSound: 'mushroomEnter',
        },
        {
          name:"dryad",
          type:'monster', 
          portrait:require("@/assets/imgs/monsters/dryad.png"), 
          coins:2, baseHealth:18, baseArmor:3, baseAttackMax:12, attackType: "magical",
          attackTypeImage: require("@/assets/imgs/icons/magicalIcon.png"),
          armorType:'magical',
          warning: "she lives beneath a special tree, deaf to any mortal plea.",
          enterSound: 'dryadEnter',
        },
      ],
      caves: [
        {
          name:"slime",
          type:'monster',
          portrait:require("@/assets/imgs/monsters/slime.png"), 
          coins:2, baseHealth:8, baseArmor:2, baseAttackMax:6, attackType: "physical",
          attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
          armorType:'physical',
          warning: "One wrong step to right or left is sure to spell your slimy death.",
          enterSound: 'slimeEnter',
        },
        {
          name:"kobold",
          type:'monster', 
          portrait:require("@/assets/imgs/monsters/kobold.png"), 
          coins:2, baseHealth:9, baseArmor:3, baseAttackMax:8, attackType: "physical",
          attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
          armorType:'physical',
          warning: "greenish armor, sharp teeth too - slay it quick 'fore it slays you!",
          enterSound: 'koboldEnter',
        },
        {
          name:"mimic",
          type:'monster', 
          portrait:require("@/assets/imgs/monsters/mimic.png"), 
          coins:3, baseHealth:16, baseArmor:3, baseAttackMax:8, attackType: "physical",
          attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
          armorType:'physical',
          warning: "You reach out to your surprise, You're met by big bright yellow eyes.",
          enterSound: 'mimicEnter',
        },
        {
          name:"imps",
          type:'monster', 
          portrait:require("@/assets/imgs/monsters/imps.png"), 
          coins:2, baseHealth:10, baseArmor:3, baseAttackMax:5, attackType: "magical",
          attackTypeImage: require("@/assets/imgs/icons/magicalIcon.png"),
          armorType:'magical',
          warning: "You feel magic, hear a hissing - your meat and peas and toast are missing!",
          enterSound: 'impsEnter',
        },
        {
          name:"dragon",
          type:'monster', 
          portrait:require("@/assets/imgs/monsters/dragon.png"), 
          coins:5, baseHealth:25, baseArmor:5, baseAttackMax:10, attackType: "physical",
          attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
          armorType:'physical',
          warning:'"I\'ve slain a lizard with breath of fire!" Often heard by boasting liar.',
          enterSound: 'dragonEnter',
        },
      ],
      hills: [
        {
          name:"lizardman",
          type:'monster', 
          portrait:require("@/assets/imgs/monsters/lizardman.png"), 
          coins:3, baseHealth:19, baseArmor:4, baseAttackMax:12, attackType: "physical",
          attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
          armorType:'physical',
          warning: "Lizard senses seek out prey, poison venom helps them slay.",
          enterSound: 'lizardmanEnter',
        },
        {
          name:"harpy",
          type:'monster', 
          portrait:require("@/assets/imgs/monsters/harpy.png"),
          coins:3, baseHealth:24, baseArmor:4, baseAttackMax:14, attackType: "physical",
          attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
          armorType:'physical',
          warning: "Halfway bird and halfway horrid, You'll be telling tales quite sordid.",
          enterSound: 'harpyEnter',
        },
        {
          name:"bandits",
          type:'monster', 
          portrait:require("@/assets/imgs/monsters/bandits.png"), 
          coins:3, baseHealth:25, baseArmor:4, baseAttackMax:16, attackType: "physical",
          attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
          armorType:'physical',
          warning: "Shadows hide two men from sight. Their motives born of moral spite.",
          enterSound: 'banditsEnter',
        },
      ],
      ruins: [
        {
          name:"banshee",
          type:'monster', 
          portrait:require("@/assets/imgs/monsters/banshee.png"), 
          coins:3, baseHealth:20, baseArmor:4, baseAttackMax:12, attackType: "magical",
          attackTypeImage: require("@/assets/imgs/icons/magicalIcon.png"),
          armorType:'magical',
          warning: "she moans in anguish, ghostly, gritty. Her eyes shine bright to see your pity.",
          enterSound: 'bansheeEnter',
        },
        {
          name:"ghost",
          type:'monster', 
          portrait:require("@/assets/imgs/monsters/ghost.png"), 
          coins:3, baseHealth:20, baseArmor:4, baseAttackMax:14, attackType: "magical",
          attackTypeImage: require("@/assets/imgs/icons/magicalIcon.png"),
          armorType:'magical',
          warning: "You lay awake at midnight hour, sounds unearthly shape your cower.",
          enterSound: 'ghostEnter',
        },
        {
          name:"ghoul",
          type:'monster', 
          portrait:require("@/assets/imgs/monsters/ghoul.png"), 
          coins:3, baseHealth:24, baseArmor:4, baseAttackMax:15, attackType: "physical",
          attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
          armorType:'physical',
          warning: "You walk between the crumbling tombs, behind you somethimg sickly looms!",
          enterSound: 'ghoulEnter',
        },
        {
          name:"skeleton",
          type:'monster', 
          portrait:require("@/assets/imgs/monsters/skeleton.png"), 
          coins:3, baseHealth:22, baseArmor:5, baseAttackMax:17, attackType: "physical",
          attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
          armorType:'magical',
          warning:"strong dark magic guides their hand, to stab and fight and kill and stand.",
          enterSound: 'skeletonEnter',
        },
      ],
      tower: [
        {
          name:"golem",
          type:'monster', 
          portrait:require("@/assets/imgs/monsters/golem.png"), 
          coins:5, baseHealth:30, baseArmor:6, baseAttackMax:18, attackType: "physical",
          attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
          armorType:'physical',
          warning: "a guardian immune to death, you cannot kill what has no breath.",
          enterSound: 'golemEnter',
        },
        {
          name:"demon",
          type:'monster', 
          portrait:require("@/assets/imgs/monsters/demon.png"), 
          coins:5, baseHealth:35, baseArmor:7, baseAttackMax:22, attackType: "physical",
          attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
          armorType:'magical',
          warning: "Human-like but one thing proves, instead of feet they have black hooves.",
          enterSound: 'demonEnter',
        },
        
        {
          name:"lich",
          type:'monster', 
          portrait:require("@/assets/imgs/monsters/lich.png"), 
          coins:5, baseHealth:40, baseArmor:8, baseAttackMax:25, attackType: "magical",
          attackTypeImage: require("@/assets/imgs/icons/magicalIcon.png"),
          armorType:'magical',
          warning: "Whirling nacre to body bound, a yearning mind in learn-lust drown.",
          enterSound: 'lichEnter',
        },
      ],
      unique: [
        {
          name:"curse",
          type:'monster', 
          portrait:require("@/assets/imgs/monsters/curse.png"), 
          coins:0, baseHealth:20, baseArmor:5, baseAttackMax:14, attackType: "magical",
          attackTypeImage: require("@/assets/imgs/icons/magicalIcon.png"),
          armorType:'magical',
          warning: "A faint feeling of unluck first, your body hurts, you feel your worst.",
          enterSound: 'curseEnter',
        },
      ]
    },
})

const mutations = {
    mutate(state, payload) {
        state[payload.property] = payload.with;
    },
    mutateInfo(state, payload) {
        state.info[payload.property] = payload.with;
    },
    doubleCoins(state) {
      state.info.coins *= 2
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
    divideHealth(state, payload) {
      state.info.baseHealth = Math.ceil(state.info.baseHealth/2);
    },
    addToLog(state, payload){
      state.log.push(payload)
    },
    changeStats(state, payload){
      if (payload.operator === 'add') state.info[payload.stat] += payload.value;
      else if (payload.operator === 'minus') state.info[payload.stat] -= payload.value;
      else if (payload.operator === 'multiply') state.info[payload.stat] *= payload.value;
      else if (payload.operator === 'divide') state.info [payload.state] /= payload.value;
    },
}

const getters = {
  snapshot: (state, getters) => {
      return {
        monsterLoaded: state.monsterLoaded,
        info: state.info,
        roster: state.roster,
        tempTraits: state.tempTraits,
        isBoss: state.isBoss,
        thisDamage: state.thisDamage,
        log: state.log,
        tempHealth: state.tempHealth,
        tempArmor: state.tempArmor,
        tempAttackMax: state.tempAttackMax,
        logNum: state.logNum,
      }
  },
  monsterRank: (state, getters, rootState) => {
      let ranking = rootState['leaderboardData'].monstersKilled.length
      if (ranking >= 0 && ranking <= 4) return ''
      else if (ranking >= 5 && ranking <= 9) return 'virulent'
      else if (ranking >= 10 && ranking <= 15) return 'fearsome'
      else if (ranking >= 16 && ranking <= 24) return 'bloodless'
      else if (ranking >= 25 ) return 'flawless'
  },
  thisAdjDamage: (state, commit, rootState, rootGetters) => {
    let num;
    if( state.info.attackType === 'physical') {
      num = state.thisDamage - rootGetters['playerData/calcArmor']
    }
    else if ( state.info.attackType === 'magical') {
      num = state.thisDamage;
    }
    if(num <= 0) {
      return 0
    }
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
  loadSavedGame({state, commit, getters}, payload){
    commit('mutate', {property:'monsterLoaded', with:true})
    for(const property in payload){
      commit('mutate', {property:property, with:payload[property]})
    }
  },
  NEW_MONSTER({state, commit, dispatch, rootState}) {

    let location = rootState['gameData'].location

    let newMonster = state.monsters[location][Math.floor(Math.random() * ((state.monsters[location].length) + 1))]

    commit('mutate', {property:'info', with: newMonster})

    dispatch('GENERATE_MONSTER_STATS')

  },
  GENERATE_MONSTER_STATS({state, commit, getters, rootState}){

    let healthRanking = (rootState['leaderboardData'].monstersKilled.length + 1) * 2

    let health = Math.floor(Math.random() * Math.floor(healthRanking)) + healthRanking;

    let armorRanking = rootState['leaderboardData'].monstersKilled.length / 2;

    let armor = Math.floor(Math.random() * Math.floor(armorRanking)) + 2;

    let attackRanking = rootState['leaderboardData'].monstersKilled.length + 2;

    let attack = Math.floor(Math.random() * Math.floor(attackRanking)) + 1;

    let coinRanking = (rootState['leaderboardData'].monstersKilled.length + 1) / 3;
    
    let coin = Math.floor(Math.random() * Math.floor(coinRanking)) + 1;
    
    if(getters.monsterRank === ''){
      health += 2;
      attack += 1;
    }
    else if(getters.monsterRank === 'virulent') {
      health += 5;
      armor += 1;
      attack += 4;
      coin += 1;
    }
    else if (getters.monsterRank === 'fearsome') {
      health += 11;
      armor += 3;
      attack += 8;
      coin += 2;
    }
    else if (getters.monsterRank === 'bloodless') {
      health += 20;
      armor += 5;
      attack += 12;
      coin += 2;
    }
    else if (getters.monsterRank === 'flawless') {
      health += 35;
      armor += 7;
      attack += 18;
      coin += 3;
    }

    commit('mutateInfo', {property:'baseHealth', with: health})
    commit('mutateInfo', {property:'baseArmor', with: armor})
    commit('mutateInfo', {property:'baseAttackMax', with: attack})
    commit('mutateInfo', {property:'coins', with: coin})
  },
  CHECK_HP({state, commit, dispatch}){
      if(state.info.baseHealth > 0){
        dispatch('ROLL_DAMAGE')
      }
      else if (state.info.baseHealth <= 0) {
        dispatch('RESET_ANIMATIONS')
        commit('toggleAnimation', {property: 'isDead'})
        let randomTrack = Math.floor(Math.random() * (3) + 1)
        UiSounds['victory' + randomTrack].play()
        commit('playerData/addCoins', state.info.coins, {root:true})
        commit('gameData/mutate', {property:'turnTailUsed', with:false}, {root: true});
        commit('leaderboardData/incrementByValue', {property:'totalCoins', with:state.info.coins}, {root:true})
        
        setTimeout(() => {
          commit('gameData/mutate', {property:'phase', with:'WorldMap'}, {root:true})
          setTimeout(() => {
            commit('leaderboardData/addToList', {property: 'monstersKilled', with:state.info.name}, {root:true})
          }, 300)
        }, 1500)
      }
  },
  SPECIAL_CHECK_HP ({state, commit, dispatch, rootState}) {
    if (state.info.baseHealth <= 0) {
      dispatch('RESET_ANIMATIONS')
      commit('toggleAnimation', {property: 'isDead'})
      let randomTrack = Math.floor(Math.random() * (3) + 1)
      UiSounds['victory' + randomTrack].play()
      commit('playerData/addCoins', state.info.coins, {root:true})
      commit('leaderboardData/incrementByValue', {property:'totalCoins', with:state.info.coins}, {root:true})
      
      if(rootState['playerData'].info.name === 'varlet') {
        dispatch('playerData/LOG_UPDATE', `You Stole 1 Coin`, {root:true});
        commit('playerData/addCoins', 1, {root:true})
        commit('leaderboardData/incrementByValue', {property:'totalCoins', with:1}, {root:true})
      }
      setTimeout(() => {
        commit('gameData/mutate', {property:'phase', with:'ShopSelect'}, {root:true})
        setTimeout(() => {
          commit('leaderboardData/addToList', {property: 'monstersKilled', with:state.info.name}, {root:true})
        }, 300)
      }, 1500)
    }

    if(state.info.baseHealth > 0){
      setTimeout(() => {
        commit('gameData/toggle', {property:'combatLocked'}, {root: true});
      }, 1200)
      if(rootState['playerData'].info.name === 'varlet') {
        dispatch('playerData/LOG_UPDATE', `Peculate Failed`, {root:true});
      }
    }
  },
  ROLL_DAMAGE({state, commit, dispatch, getters}) {
      const randomRoll = Math.floor((Math.random() * ((getters.calcAttackMax/2) + 1)) + (Math.random() * ((getters.calcAttackMax/2) + 1)));
      commit('mutate', {property:'thisDamage', with:randomRoll})
      let randomAttackSound = Math.floor(Math.random() * (3) + 1)
      if (state.info.attackType === 'physical') {
        MonsterSounds['monsterMelee' + randomAttackSound].play();
      }
      else if (state.info.attackType === 'magical') {
        MonsterSounds['monsterMagic' + randomAttackSound].play();
      }
      dispatch('DEAL_DAMAGE')
  },
  TRADE_BLOWS({dispatch}){
      dispatch('CHECK_HP')
  },
  LOG_UPDATE({commit, state}, payload) {
    commit('addToLog', {id:state.logNum + 'monster', message:payload});
    commit('incrementLog')
  },
  DEAL_DAMAGE({state, commit, getters, dispatch}) {
      commit('toggleAnimation', {property:'attacking'});
      if (getters.thisAdjDamage > 0) {
        dispatch('LOG_UPDATE', `DEALT ${getters.thisAdjDamage} DAMAGE`) 
        commit('playerData/toggleAnimation', {property: 'hurt'}, {root:true})
        commit('playerData/toggleAnimation', {property: 'portEffect'}, {root:true})
        commit('playerData/toggleAnimation', {property: 'redShine'}, {root:true})
        commit('playerData/takeDamage', {damage: getters.thisAdjDamage}, {root:true})
        commit('leaderboardData/incrementByValue', {property:'totalDamageTaken', with:getters.thisAdjDamage}, {root:true})
        commit('leaderboardData/incrementByValue', {property:'damageBlocked', with:state.thisDamage - getters.thisAdjDamage}, {root:true});
      }
      else if (getters.thisAdjDamage > 0 && rootState['playerData'].temporaryTraits.find(item => item.name == 'boon')){
        commit('playerData/toggleAnimation', {property: 'portEffect'}, {root:true})
        commit('playerData/toggleAnimation', {property: 'blueShine'}, {root:true})
        dispatch('LOG_UPDATE', `Boon Prevented Damage`) 
        commit('playerData/removeItemFromInv', 'boon', {root:true})
        commit('leaderboardData/incrementByValue', {property:'damageBlocked', with:state.thisDamage}, {root:true});
      }
      else if(getters.thisAdjDamage <= 0) {
        dispatch('LOG_UPDATE', `ATTACK MISSED`) 
        commit('playerData/toggleAnimation', {property: 'blocking'}, {root:true})
        commit('playerData/toggleAnimation', {property: 'portEffect'}, {root:true})
        commit('playerData/toggleAnimation', {property: 'purpleShine'}, {root:true})
        commit('leaderboardData/incrementByValue', {property:'damageBlocked', with:state.thisDamage}, {root:true});
      }
      dispatch('playerData/CHECK_HP', null, {root:true})
      setTimeout(() => {
        dispatch('RESET_ANIMATIONS')
      }, 1500)
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
        