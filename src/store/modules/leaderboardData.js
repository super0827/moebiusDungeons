const state = () => ({
  highestHealth:0,
  highestArmor:0,
  highestAttack:0,
  monstersKilled:[],
  coinsSpent:0,
  totalCoins:0,
  totalDamageDealt:0,
  totalDamageTaken:0,
  damageBlocked:0,
})

const mutations = {
  resetLeaderboard(state){
    state.highestHealth = 0;
    state.highestArmor = 0;
    state.highestAttack = 0;
    state.monstersKilled = [];
    state.coinsSpent = 0;
    state.totalCoins = 0;
    state.totalDamageDealt = 0;
    state.totalDamageTaken = 0;
    state.damageBlocked = 0;
  },
  mutate(state, payload) {
    state[payload.property] = payload.with;
  },
  incrementByValue(state, payload) {
    state[payload.property] += payload.with
  },
  addToList(state, payload) {
    state[payload.property].push(payload.with)
  },
}

const actions = {
  compareToHighScore({state, commit, rootState, rootGetters}) {
    if(state.highestHealth < rootGetters['playerData/calcHealth']) commit('mutate', {property:'highestHealth', with:rootGetters['playerData/calcHealth']})
    if(state.highestArmor < rootGetters['playerData/calcArmor']) commit('mutate', {property:'highestArmor', with:rootGetters['playerData/calcArmor']})
    if(state.highestAttack < rootGetters['playerData/calcAttackMax']) commit('mutate', {property:'highestAttack', with:rootGetters['playerData/calcAttackMax']})
  },
  loadSavedGame({state, commit}, payload){
    commit('mutate', {property:'shopLoaded', with:true})
    for(const property in payload){
      commit('mutate', {property:property, with:payload[property]})
    }
},
}

const getters = {
  snapshot: (state, getters, rootState, rootGetters) => {
    return {
      highestHealth: state.highestHealth,
      highestArmor: state.highestArmor,
      highestAttack: state.highestAttack,
      monstersKilled: state.monstersKilled,
      coinsSpent: state.coinsSpent,
      totalCoins: state.totalCoins,
      totalDamageDealt: state.totalDamageDealt,
      totalDamageTaken: state.totalDamageTaken,
      damageBlocked: state.damageBlocked,
      highScore: getters.highScore,
      icon: rootGetters['authData/userIcon'],
      playedAs: rootState['playerData'].info.name,
    }
  },
  highScore: (state, getters, rootState, rootGetters ) => {
    let score = (state.highestHealth + state.highestArmor + state.highestAttack + state.monstersKilled.length + state.coinsSpent + state.totalCoins + state.totalDamageDealt + state.totalDamageTaken + state.damageBlocked)
    if(rootGetters['monsterData/monsterRank'] === '') return score
        else if (rootGetters['monsterData/monsterRank'] === 'virulent') return Math.floor(score * 2)
        else if (rootGetters['monsterData/monsterRank'] === 'fearsome') return Math.floor(score * 2.5)
        else if (rootGetters['monsterData/monsterRank'] === 'bloodless') return Math.floor(score * 3)
        else if (rootGetters['monsterData/monsterRank'] === 'flawless') return Math.floor(score * 4)
  }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
        