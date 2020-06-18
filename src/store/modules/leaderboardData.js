const state = () => ({
  highestHealth:0,
  highestArmor:0,
  highestAttack:0,
  monstersKilled:0,
  monstersFought: [],
  coinsSpent:0,
  totalDamageDealt:0,
  totalDamageTaken:0,
  damageBlocked:0,
  itemsBought:[],
  totalCoins:0,
})

const mutations = {
  mutate(state, payload) {
    state[payload.property] = payload.with;
  }
}

export default {
    namespaced: true,
    state,
    mutations,
}
        