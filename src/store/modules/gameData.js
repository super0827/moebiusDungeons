import { shuffle } from 'lodash.shuffle'

const state = () => ({
    phase: "DungeonPhase",
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
        let hpGauge = rootState.monsterData.info.health + rootState.playerData.info.health
        console.log('hp bar is: ',hpGauge)
        return hpGauge
    },
    armorGauge: (state, getters, rootState) => {
        let armGauge = rootState.monsterData.info.armor + rootState.playerData.info.armor
        console.log('arm bar is: ',armGauge)
        return armGauge;
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
        