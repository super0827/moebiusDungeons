const state = () => ({
    info: {type: Object},
    permenantTraits: [],
    tempTraits: [],
    thisDamage: {type: Number},
    thisAdjDamage: {type: Number},
    log: [],
    animations: {
      blocking: false,
      hurt: false,
      attacking:false,
      portEffect: false,
      portEffectRed: false,
      portEffectPurple: false,
      portEffectGreen: false,
      isDead: false,
    }
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
        