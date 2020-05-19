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
    },
    statSide: 'right',
})

const mutations = {
    mutate(state, payload) {
      state[payload.property] = payload.with;
    },
    addHealth(state) {
      state.info.health += 10;
      console.log(state.info.health)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
}
        