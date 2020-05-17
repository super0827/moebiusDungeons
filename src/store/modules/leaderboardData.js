const state = () => ({
  stats: {type: Object},
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
        