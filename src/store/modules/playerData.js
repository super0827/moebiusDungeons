import { mapActions } from "vuex";

const state = () => ({
    info:  {
      name:"swordsman",
      type:'player', 
      portrait:require("@/assets/imgs/playableCharacters/swordsman.png"), 
      description1:"Slicing and Dicing",
      description2:"Bruiser class, high damage, good armor, high health.", 
      coins:0, health:12, armor:2, attackMax:8, attackType: "physical",
      attackTypeImage: require("@/assets/imgs/icons/physicalIcon.png"), 
    },
    permenantTraits: [],
    tempTraits: [],
    thisDamage: 0,
    log: [],
    logNum: 0,
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
})

const mutations = {
  mutate(state, payload) {
    state[payload.property] = payload.with;
  },
  toggle(state, payload) {
    state.animations[payload.property] = !state.animations[payload.property];
  },
  incrementLog(state) {
    state.logNum++
  },
  take_damage(state, payload) {
    state.info.health -= payload.damage;
  },
  addToLog(state, payload){
    state.log.push(payload)
  },
  addHealth(state) {
    state.info.health += 10;
  },
  loseHealth(state) {
    state.info.health -= 10;
  },
  addArmor(state) {
    state.info.armor += 1;
  },
  loseArmor(state) {
    state.info.armor -= 1;
  }
}

const getters = {
  thisAdjDamage: (state, getters, rootState) => {
    let num;
    if( state.info.attackType === 'physical') {
      num = state.thisDamage - rootState.monsterData.info.armor;
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
  }
}

const actions = {
  ROLL_DAMAGE({commit, state, getters}) {
    return new Promise((resolve) => {
        // commit('gameData/toggle', {property:'combatLocked'}, {root: true});
        const randomRoll = Math.floor(Math.random() * (state.info.attackMax) + 1)
        console.log(`monster attack: ${randomRoll}`);
        commit('mutate', {property:'thisDamage', with:randomRoll})
        setTimeout(() => {
          if(state.thisDamage == randomRoll) resolve('damage')
        }, 200)
    })
    
  },
  TRADE_BLOWS({commit, state, dispatch, getters}){
    //ROLL FOR DAMAGE
    dispatch('ROLL_DAMAGE')
    //ANIMATE ATTACK AND DEAL DAMAGE
    .then(() => { 
      dispatch('DEAL_DAMAGE')
    })
    //ADD DAMAGE AMMOUNT TO LOG
    .then(() => {
      dispatch('LOG_UPDATE', `TRADE BLOWS DEALT ${getters.thisAdjDamage} DAMAGE`)
    })
    //Monster Retaliates
    .then(() => {
      dispatch('monsterData/TRADE_BLOWS', null, {root:true})
    })
  },
  LOG_UPDATE({commit, getters, state}, payload) {
    commit('addToLog', {id:state.logNum, message:payload});
    commit('incrementLog')
  },
  DEAL_DAMAGE({commit, getters}) {
    return new Promise((resolve) => {
      commit('toggle', {property:'attacking'});
      commit('monsterData/take_damage', {damage: getters.thisAdjDamage}, {root:true})

    })
  },
  RUN_SPECIAL(context){

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
  }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
}
        