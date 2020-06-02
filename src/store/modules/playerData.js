import PlayerSounds from '@/plugins/PlayerSounds.js'

const state = () => ({
    info:  {
      name:"swordsman",
      type:'player', 
      portrait:require("@/assets/imgs/playableCharacters/swordsman.png"), 
      description1:"Slicing and Dicing",
      description2:"Bruiser class, high damage, good armor, high health.", 
      coins:0, baseHealth:12, baseArmor:2, baseAttackMax:8, attackType: "physical",
      attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"),
      mettleImg: require("@/assets/imgs/icons/swordsmanMettle.png"),
      special: "en'garde",
      specialDescription:"Spend one mettle to gain +2 Armor for this encounter.",
    },
    mettle: 1,
    permenantTraits: [],
    temporaryTraits: [],
    tempArmor:0,
    tempHealth:0,
    tempAttackMax:0,
    thisDamage: 0,
    log: [],
    logNum: 0,
    animations: {
      blocking: false,
      hurt: false,
      attacking:false,
      portEffect: false,
      redShine: false,
      purpleShine: false,
      greenShine: false,
      goldShine:false,
      isDead: false,
    },
})

const mutations = {
  mutate(state, payload) {
    state[payload.property] = payload.with;
  },
  toggleAnimation(state, payload) {
    state.animations[payload.property] = !state.animations[payload.property];
  },
  increment(state, payload) {
    state.info[payload]++
  },
  decrement(state, payload) {
    state.info[payload]--
  },
  incrementLog(state) {
    state.logNum++
  },
  addToLog(state, payload){
    state.log.push(payload)
  },
  addCoins(state, payload) {
    state.info.coins += payload
  },

  //SHOPKEEPER MUTATIONS
  heal(state, payload) {
    state.info.baseHealth += payload
  },
  addArmor(state, payload) {
    state.info.baseArmor += payload
  },
  addAttack(state, payload) {
    state.info.baseAttackMax += payload
  },
  addTempAbility(state, payload) {
    state.temporaryTraits.push(payload)
    console.log(state.temporaryTraits);
  }
}

const getters = {
  thisAdjDamage: (state, getters, rootState, rootGetters) => {
    let num;
    if( state.info.attackType === 'physical') {
      num = state.thisDamage - rootGetters['monsterData/calcArmor']
    }
    else if ( state.info.attackType === 'magical') {
      num = state.thisDamage;
    }
    if(num <= 0) return 0
    else return num
  },
  playerLog: (state) => {
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
    if(state.info.health > 0){
    }
    else if (state.info.health <= 0) {
      commit('toggleAnimation', {property: 'isDead'})     
    }
  },
  ROLL_DAMAGE({commit, state, getters}) {
    commit('gameData/toggle', {property:'combatLocked'}, {root: true});
    const randomRoll = Math.floor(Math.random() * (getters.calcAttackMax) + 1)
    commit('mutate', {property:'thisDamage', with:randomRoll})
    let randomAttackSound = Math.floor(Math.random() * (3) + 1)
    if (state.info.attackType === 'physical') {
      PlayerSounds['playerMelee' + randomAttackSound].play();
    }
  },
  TRADE_BLOWS({dispatch, getters}){
    dispatch('ROLL_DAMAGE')
    .then(() => { dispatch('DEAL_DAMAGE') })
    .then(() => {
      dispatch('LOG_UPDATE', `TRADE BLOWS DEALT ${getters.thisAdjDamage} DAMAGE`)
    })
    .then(() => {
      setTimeout(() => {
        dispatch('monsterData/TRADE_BLOWS', null, {root:true})
      },1500)
    })
  },
  LOG_UPDATE({commit, state}, payload) {
    commit('addToLog', {id:state.logNum + 'player', message:payload});
    commit('incrementLog')
  },
  DEAL_DAMAGE({commit, getters}) {
    return new Promise((resolve) => {
      commit('toggleAnimation', {property:'attacking'});
      if (getters.thisAdjDamage > 0) {
        commit('monsterData/toggleAnimation', {property: 'hurt'}, {root:true})
        commit('monsterData/toggleAnimation', {property: 'portEffect'}, {root:true})
        commit('monsterData/toggleAnimation', {property: 'redShine'}, {root:true})
        commit('monsterData/takeDamage', {damage: getters.thisAdjDamage}, {root:true})
      }
      else if(getters.thisAdjDamage <= 0) {
        commit('monsterData/toggleAnimation', {property: 'blocking'}, {root: true})
        commit('monsterData/toggleAnimation', {property: 'portEffect'}, {root:true})
        commit('monsterData/toggleAnimation', {property: 'purpleShine'}, {root:true})
      }
    })
  },
  RUN_SPECIAL({state, commit, getters, dispatch}){
    if (state.mettle > 0){
      if(state.info.name === 'swordsman') {
        commit('gameData/toggle', {property:'combatLocked'}, {root: true});
        commit('toggleAnimation', {property: 'portEffect'})
        commit('toggleAnimation', {property: 'goldShine'})
        commit('mutate', {property: 'tempArmor', with:state.tempArmor+=2})
        PlayerSounds.armorUp.play();
        setTimeout(() => {
          commit('gameData/toggle', {property:'combatLocked'}, {root: true});
          dispatch('RESET_ANIMATIONS');
        }, 1200)
      }
      else if (state.info.name === 'mage') {
        dispatch('DEAL_SPECIAL_DAMAGE', 5)
      }
      else if (state.info.name === 'varlet') {
        
      }
    }
    commit('decrement', 'mettle')
  },
  DEAL_SPECIAL_DAMAGE({commit, getters}, dealtDamage) {
    commit('monsterData/toggleAnimation', {property: 'hurt'}, {root:true})
    commit('monsterData/toggleAnimation', {property: 'redShine'}, {root:true})
    commit('monsterData/takeDamage', {damage: dealtDamage}, {root:true})
  },
  TURN_TAIL(context){
    //calculate success chance
      //roll die for player and monster
      //add their health to the roll
      //display in the player log
    //if player's roll is higher then they get away
    //run escape
  },
  ESCAPE(context){
    //animate escape
    //change phase
  },
  RESET_ANIMATIONS({state,commit}){
    for (let item in state.animations){
      if (state.animations[item] === true) commit('toggleAnimation', {property: item})
    }
  },
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
}
        