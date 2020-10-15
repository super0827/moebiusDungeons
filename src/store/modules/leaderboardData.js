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
  compareToHighScore({state, commit}, payload) {
    if(state[payload.property] < payload.with) {
      commit('mutate', payload)
    }
  },
  loadSavedGame({state, commit}, payload){
    commit('mutate', {property:'shopLoaded', with:true})
    for(const property in payload){
      commit('mutate', {property:property, with:payload[property]})
    }
},
}

const getters = {
  snapshot: (state, commit) => {
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
    }
  },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
        