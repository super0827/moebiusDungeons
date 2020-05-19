import { shuffle } from 'lodash.shuffle'

const state = () => ({
    phase: "StartScreen",
    isEntering: true,
    helper: false,
    duration: {type: Number},
})

const mutations = {
    mutate(state, payload) {
        state[payload.property] = payload.with;
    },
    
    toggleHelp(state){
        state.helper = !state.helper
    }
}

const action = {

}

const getters = {
    healthGauge: (state, getters, rootState) => {
        return rootState.monsterData.info.health + rootState.playerData.info.health
    },
    armorGauge: (state, getters, rootState) => {
        return rootState.monsterData.info.armor + rootState.playerData.info.armor
    },
    attackGauge: (state, getters, rootState) => {
        return rootState.monsterData.info.attackMax + rootState.playerData.info.attackMax
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters
}
        