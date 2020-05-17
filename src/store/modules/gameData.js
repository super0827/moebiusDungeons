import { shuffle } from 'lodash.shuffle'

const state = () => ({
    phase: "StartScreen",
    isEntering: true,
    helper: false,
    duration: {type: Number}
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
        