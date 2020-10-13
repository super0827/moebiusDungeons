const state = () => ({
  highestHealth:0,
  highestArmor:0,
  highestAttack:0,
  monstersKilled:0,
  monstersFought: [],
  coinsSpent:0,
  totalCoins:0,
  totalDamageDealt:0,
  totalDamageTaken:0,
  damageBlocked:0,
  itemsBought:[],
})

const mutations = {
  mutate(state, payload) {
    state[payload.property] = payload.with;
  },
  incrementByValue(state, payload) {
    state.payload.property += payload.value
  },
  addToList(state, payload) {
    state.itemsBought.push(payload)
  },
}

const actions = {
  compareToHighScore({state, commit}, payload) {
    if(state.payload.property < payload.with) {
      commit('mutate', payload)
    }
  }
}

const getters = {
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
        